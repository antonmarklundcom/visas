<?php
declare(strict_types=1);
require __DIR__ . '/lib/leads.php';
header('Cache-Control: no-store');
header('X-Robots-Tag: noindex, nofollow');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: strict-origin-when-cross-origin');
ini_set('session.use_strict_mode', '1');
session_name('visas_session');
session_set_cookie_params(['lifetime'=>0,'path'=>'/','secure'=>!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS']!=='off','httponly'=>true,'samesite'=>'Lax']);
session_start();
$_SESSION['csrf'] ??= bin2hex(random_bytes(24));
$_SESSION['submission_id'] ??= bin2hex(random_bytes(24));
$lang = is_string($_POST['lang'] ?? $_GET['lang'] ?? null) && ($_POST['lang'] ?? $_GET['lang']) === 'en' ? 'en' : 'es';
$en = $lang === 'en';
$json = str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json');
function esc_value(string $v): string { return htmlspecialchars($v, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }
function form_page(string $message = '', string $field = '', int $status = 200): never {
    global $en;
    http_response_code($status); header('Content-Type: text/html; charset=utf-8');
    $html=(string)file_get_contents(__DIR__ . ($en ? '/lib/forms/en.html' : '/lib/forms/es.html'));
    foreach(['csrf','submission_id'] as $name) $html=preg_replace('/(<input[^>]*name="'.$name.'")([^>]*>)/', '$1 value="'.esc_value($_SESSION[$name]).'"$2', $html);
    foreach(['nombre','telefono','email','page_url'] as $name) {
        $value=is_string($_POST[$name]??null)?substr($_POST[$name],0,2000):'';
        $html=preg_replace_callback('/(<input[^>]*name="'.$name.'")([^>]*>)/', fn($m)=>$m[1].' value="'.esc_value($value).'"'.$m[2], $html);
    }
    $value=is_string($_POST['mensaje']??null)?substr($_POST['mensaje'],0,5000):'';
    $html=preg_replace_callback('/(<textarea[^>]*name="mensaje"[^>]*>).*?(<\/textarea>)/s',fn($m)=>$m[1].esc_value($value).$m[2],$html);
    $type=is_string($_POST['tipo_visa']??null)?$_POST['tipo_visa']:'';
    if($type!=='') $html=str_replace('<option value="'.esc_value($type).'">','<option selected value="'.esc_value($type).'">',$html);
    if($message!=='') $html=str_replace('<p id="form-error" class="form-error" role="alert" tabindex="-1" hidden></p>','<p id="form-error" class="form-error" role="alert" tabindex="-1">'.esc_value($message).'</p>',$html);
    echo $html; exit;
}
function reply_error(string $code, int $status, string $field = ''): never {
    global $en,$json;
    $messages=[
      'invalid'=>$en?'Check the highlighted field and try again.':'Revisá el campo indicado e intentá de nuevo.',
      'session'=>$en?'Please try again. The secure form has been refreshed.':'Volvé a intentar. Actualizamos la seguridad del formulario.',
      'rate'=>$en?'Too many attempts. Please wait ten minutes or use WhatsApp.':'Hubo varios intentos. Esperá diez minutos o escribinos por WhatsApp.',
      'unavailable'=>$en?'We could not save your enquiry. Your text remains in the form; try again or use WhatsApp.':'No pudimos guardar tu consulta. El texto sigue en el formulario; reintentá o escribinos por WhatsApp.',
      'size'=>$en?'The message is too long. Please shorten it.':'El mensaje es demasiado largo. Por favor, acortalo.',
    ];
    $message=$messages[$code]??$messages['unavailable'];
    if($code==='invalid'&&$field==='telefono')$message=$en?'That number looks incomplete or invalid. Use digits and a country code, for example +595 981 123456.':'Ese número parece incompleto o inválido. Probá con 0981 123 456 o +595 981 123456.';
    if($json){http_response_code($status);header('Content-Type: application/json');echo json_encode(['status'=>'error','message'=>$message,'field'=>$field,'csrf'=>$_SESSION['csrf']]);exit;}
    form_page($message,$field,$status);
}
if(($_SERVER['REQUEST_METHOD']??'GET')==='GET') {
    if(($_GET['action']??'')==='token') {header('Content-Type: application/json');echo json_encode(['csrf'=>$_SESSION['csrf'],'submission_id'=>$_SESSION['submission_id']]);exit;}
    form_page();
}
if(($_SERVER['REQUEST_METHOD']??'')!=='POST'){http_response_code(405);header('Allow: GET, POST');exit;}
if((int)($_SERVER['CONTENT_LENGTH']??0)>20000) reply_error('size',413);
$csrf=$_POST['csrf']??null;
if(!is_string($csrf)||!hash_equals($_SESSION['csrf'],$csrf)) reply_error('session',403);
$origin=$_SERVER['HTTP_ORIGIN']??'';
if($origin!=='') {
    $parsed=parse_url($origin);$authority=($parsed['host']??'').(isset($parsed['port'])?':'.$parsed['port']:'');
    if(strtolower($authority)!==strtolower($_SERVER['HTTP_HOST']??'')) reply_error('session',403);
}
try {
    $config=visas_config();
    if(!visas_rate_limit($config,$_SERVER['REMOTE_ADDR']??'unknown')) reply_error('rate',429);
    $honey=visas_text($_POST,'website',200);
    if($honey!=='') reply_error('invalid',422,'website');
    $attr=[];
    if(isset($_POST['attribution'])&&is_string($_POST['attribution'])&&strlen($_POST['attribution'])<=2500) $attr=json_decode($_POST['attribution'],true)?:[];
    if(!is_array($attr)) $attr=[];
    $payload=visas_payload($_POST,$attr);
    $result=visas_deliver($payload,$config);
} catch(InvalidArgumentException $e) {reply_error('invalid',422,$e->getMessage());}
catch(Throwable $e) {error_log('[visas] handler_unavailable');reply_error('unavailable',503);}
$delivered=$result['status']==='delivered';
$message=$delivered ? ($en?'Your enquiry was received. Keep your reference for follow-up.':'Recibimos tu consulta. Conservá la referencia para el seguimiento.') : ($en?'Your enquiry was saved, but delivery is pending. For a direct conversation, please use WhatsApp.':'Guardamos tu consulta, pero su entrega está pendiente. Para conversar directamente, escribinos por WhatsApp.');
$ref=substr($result['id'],0,12);
$source=($payload['page_url'] ?? '') ?: 'https://visas.com.py'.($en?'/en/contact/':'/contacto/');
$topic=$payload['fields']['tipo_visa'] ?? ($en?'General enquiry':'Consulta general');
$waText=$en ? 'Hi! I found visas.com.py. Page: '.$source.'. Interested in: '.$topic.'. Enquiry reference: '.$ref : 'Hola! Vengo de visas.com.py. Página: '.$source.'. Me interesa: '.$topic.'. Referencia de consulta: '.$ref;
$waUrl='https://wa.me/595992279599?text='.rawurlencode($waText);
if($delivered) $_SESSION['submission_id']=bin2hex(random_bytes(24));
if($json){http_response_code($delivered?200:202);header('Content-Type: application/json');echo json_encode(['status'=>$result['status'],'message'=>$message,'reference'=>$ref,'duplicate'=>$result['duplicate'],'whatsapp_url'=>$waUrl]);exit;}
header('Content-Type: text/html; charset=utf-8');
echo '<!doctype html><html lang="'.($en?'en':'es').'"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'.($en?'Your enquiry':'Tu consulta').'</title><link rel="stylesheet" href="/assets/css/site.css"><main class="container section"><h1>'.($en?'Your enquiry':'Tu consulta').'</h1><p>'.esc_value($message).'</p><p>Ref: '.esc_value($ref).'</p><p><a class="button button--wa" href="'.esc_value($waUrl).'">WhatsApp</a></p><a href="'.($en?'/en/':'/').'">'.($en?'Home':'Inicio').'</a></main></html>';
