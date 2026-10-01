<?php
declare(strict_types=1);

function visas_config(): array {
    $file = getenv('VISAS_CONFIG_FILE') ?: dirname(__DIR__, 2) . '/visas-private/config.php';
    $private = is_file($file) ? require $file : [];
    if (!is_array($private)) throw new RuntimeException('Invalid private configuration');
    return [
        'url' => getenv('VENDERCRM_URL') ?: ($private['crm_url'] ?? 'https://crm.clientes.com.py'),
        'key' => getenv('VENDERCRM_API_KEY') ?: ($private['api_key'] ?? ''),
        'storage' => getenv('VISAS_STORAGE_DIR') ?: ($private['storage_dir'] ?? dirname(__DIR__, 2) . '/visas-private/data'),
    ];
}

function visas_storage(array $config): string {
    $dir = $config['storage'];
    if (!is_dir($dir) && !@mkdir($dir, 0700, true) && !is_dir($dir)) throw new RuntimeException('Storage unavailable');
    $resolved = realpath($dir);
    $root = realpath(dirname(__DIR__));
    if (!$resolved || !$root) throw new RuntimeException('Invalid storage path');
    $normalized = strtolower(str_replace('\\', '/', $resolved));
    $public = strtolower(str_replace('\\', '/', $root));
    if ($normalized === $public || str_starts_with($normalized . '/', $public . '/')) throw new RuntimeException('Storage must be outside public root');
    return $resolved;
}

function visas_text(array $input, string $key, int $limit): string {
    $value = $input[$key] ?? '';
    if (!is_string($value) || strlen($value) > $limit || !preg_match('//u', $value)) throw new InvalidArgumentException($key);
    return trim($value);
}

function visas_payload(array $input, array $attribution = []): array {
    $phone = visas_text($input, 'telefono', 30);
    if (!preg_match('/^\+?[0-9 ()\-.]+$/D', $phone)) throw new InvalidArgumentException('telefono');
    $phone = preg_replace('/[^0-9+]/', '', $phone);
    if (str_starts_with($phone, '00')) $phone = '+' . substr($phone, 2);
    if (str_starts_with($phone, '0')) $phone = '+595' . substr($phone, 1);
    elseif (!str_starts_with($phone, '+')) $phone = '+' . $phone;
    if (!preg_match('/^\+[1-9][0-9]{6,14}$/D', $phone)) throw new InvalidArgumentException('telefono');
    $email = visas_text($input, 'email', 254);
    if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) throw new InvalidArgumentException('email');
    $type = visas_text($input, 'tipo_visa', 120);
    $types = ['', 'Turista EE.UU.', 'Renovación EE.UU.', 'Estudiante o Work and Travel', 'Trabajo EE.UU.', 'Canadá', 'España', 'Australia', 'Residencia en Paraguay', 'Visa para entrar a Paraguay', 'Otro', 'Paraguay entry visa', 'US visitor visa', 'US visa renewal', 'Canada visa', 'Other'];
    if (!in_array($type, $types, true)) throw new InvalidArgumentException('tipo_visa');
    $lang = visas_text($input, 'lang', 2) === 'en' ? 'en' : 'es';
    $page = visas_text($input, 'page_url', 2000);
    // Attribution URLs are reduced to origin + path, never arbitrary query-string data.
    if ($page !== '') {
        $url = parse_url($page);
        $page = isset($url['host']) && in_array($url['host'], ['visas.com.py','www.visas.com.py','127.0.0.1','localhost'], true)
            ? 'https://visas.com.py' . ($url['path'] ?? '/') : '';
    }
    $payload = array_filter([
        'phone' => $phone, 'name' => visas_text($input, 'nombre', 200), 'email' => $email,
        'message' => visas_text($input, 'mensaje', 5000), 'source' => 'site:visas', 'page_url' => $page,
        'fields' => array_filter(['tipo_visa' => $type, 'lang' => $lang]),
    ], static fn($v) => $v !== '');
    foreach (['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','fbclid'] as $key) {
        if (isset($attribution[$key]) && is_string($attribution[$key]) && strlen($attribution[$key]) <= 200) $payload[$key] = $attribution[$key];
    }
    $submission = visas_text($input, 'submission_id', 80);
    if (!preg_match('/^[a-f0-9-]{32,80}$/D', $submission)) throw new InvalidArgumentException('submission_id');
    $payload['idempotency_key'] = hash('sha256', $submission . '|' . json_encode($payload, JSON_THROW_ON_ERROR));
    return $payload;
}

function visas_send(array $payload, array $config): array {
    if ($config['key'] === '') return ['ok' => false, 'code' => 'unconfigured'];
    $url = rtrim($config['url'], '/') . '/api/v1/leads';
    $test = PHP_SAPI === 'cli-server' && getenv('VISAS_TEST_MODE') === '1';
    if ((!str_starts_with($url, 'https://') && !($test && preg_match('~^http://127\.0\.0\.1:\d+/~', $url))) || preg_match('/[\r\n]/', $config['key'])) return ['ok'=>false,'code'=>'configuration'];
    $context = stream_context_create(['http'=>[
        'method'=>'POST', 'timeout'=>8, 'ignore_errors'=>true, 'follow_location'=>0,
        'header'=>"Content-Type: application/json\r\nX-Api-Key: " . $config['key'] . "\r\n",
        'content'=>json_encode($payload, JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE),
    ], 'ssl'=>['verify_peer'=>true,'verify_peer_name'=>true]]);
    $body = @file_get_contents($url, false, $context, 0, 32768);
    $status = 0;
    foreach ($http_response_header ?? [] as $header) if (preg_match('/^HTTP\/\S+\s+(\d+)/', $header, $m)) $status = (int)$m[1];
    $data = is_string($body) ? json_decode($body, true) : null;
    $ok = in_array($status, [200,201], true) && is_array($data) && !empty($data['contactId']) && !empty($data['submissionId']);
    return ['ok'=>$ok,'code'=>$ok?'delivered':($status ? 'http_' . $status : 'network')];
}

function visas_save(string $file, array $data): void {
    $temp = $file . '.' . bin2hex(random_bytes(6)) . '.tmp';
    if (@file_put_contents($temp, json_encode($data, JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE), LOCK_EX) === false) throw new RuntimeException('Queue write failed');
    @chmod($temp,0600);
    if (!@rename($temp,$file)) { @unlink($temp); throw new RuntimeException('Queue update failed'); }
}

function visas_deliver(array $payload, array $config): array {
    $dir = visas_storage($config); $id = $payload['idempotency_key'];
    $lock = fopen($dir . '/queue.lock','c');
    if (!$lock || !flock($lock, LOCK_EX)) throw new RuntimeException('Queue lock failed');
    try {
        $file=$dir . '/' . $id . '.json';
        $existing=is_file($file)?json_decode((string)file_get_contents($file),true):null;
        if (($existing['status']??'')==='delivered') return ['status'=>'delivered','duplicate'=>true,'id'=>$id];
        $row=$existing ?: ['created'=>time(),'attempts'=>0,'status'=>'pending','payload'=>$payload];
        visas_save($file,$row); // durable before network; a timeout can be safely replayed
        $sent=visas_send($payload,$config);
        $row['attempts']++; $row['last_attempt']=time(); $row['last_code']=$sent['code'];
        if ($sent['ok']) { $row['status']='delivered'; unset($row['payload']); }
        visas_save($file,$row);
        if (!$sent['ok']) error_log('[visas] lead_pending code=' . $sent['code'] . ' ref=' . substr($id,0,12));
        return ['status'=>$row['status'],'duplicate'=>false,'id'=>$id];
    } finally { flock($lock,LOCK_UN); fclose($lock); }
}

function visas_rate_limit(array $config, string $ip): bool {
    $file=visas_storage($config) . '/rate.json';
    $handle=fopen($file,'c+'); if(!$handle || !flock($handle,LOCK_EX)) throw new RuntimeException('Rate storage unavailable');
    try {
        $rows=json_decode(stream_get_contents($handle),true) ?: []; $now=time();
        $rows=array_filter($rows,fn($r)=>is_array($r)&&($r['until']??0)>$now);
        $id=hash('sha256',$ip); $row=$rows[$id]??['until'=>$now+600,'count'=>0];
        $allowed=$row['count']<8; $row['count']++; $rows[$id]=$row;
        // A fixed cap bounds disk use even under many distinct source addresses.
        if(count($rows)>10000) $rows=array_slice($rows,-10000,null,true);
        rewind($handle); ftruncate($handle,0); fwrite($handle,json_encode($rows)); fflush($handle);
        return $allowed;
    } finally {flock($handle,LOCK_UN);fclose($handle);}
}
