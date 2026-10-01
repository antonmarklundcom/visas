<?php
declare(strict_types=1);
if(PHP_SAPI!=='cli'){http_response_code(404);exit;}
require dirname(__DIR__) . '/lib/leads.php';
$config=visas_config();$dry=in_array('--dry-run',$argv,true);$send=in_array('--send',$argv,true);$prune=in_array('--prune',$argv,true);
$dir=realpath($config['storage']);
if(!$dir){echo "Queue: 0 (storage not created). CRM configured: ".($config['key']!==''?'yes':'no').PHP_EOL;exit;}
// Validate the existing path before reading or mutating queue entries.
$dir=visas_storage($config);$lock=fopen($dir.'/queue.lock','c');if(!$lock||!flock($lock,LOCK_EX))exit(1);
try{
 $pending=0;$delivered=0;$expired=0;$failed=0;$now=time();
 foreach(glob($dir.'/*.json')?:[] as $file){if(!preg_match('/^[a-f0-9]{64}\.json$/',basename($file)))continue;
  $row=json_decode((string)file_get_contents($file),true);if(!is_array($row)){ $failed++;continue; }
  $isDelivered=($row['status']??'')==='delivered';$old=($row['created']??0)<$now-($isDelivered?86400:30*86400);
  if($old){$expired++;if($prune&&!$dry)unlink($file);continue;}
  if($isDelivered){$delivered++;continue;}$pending++;
  if($send&&!$dry&&($row['last_attempt']??0)<$now-min(3600,60*(2**min(6,$row['attempts']??0)))){
   $result=visas_send($row['payload'],$config);$row['attempts']=($row['attempts']??0)+1;$row['last_attempt']=$now;$row['last_code']=$result['code'];
   if($result['ok']){$row['status']='delivered';unset($row['payload']);$pending--;$delivered++;}else $failed++;
   visas_save($file,$row);
  }
 }
 echo json_encode(['dry_run'=>$dry,'send'=>$send,'prune'=>$prune,'pending'=>$pending,'delivered'=>$delivered,'expired'=>$expired,'failed'=>$failed,'crm_configured'=>$config['key']!=='']).PHP_EOL;
 if($pending>0)error_log('[visas] queue_attention pending='.$pending);
}finally{flock($lock,LOCK_UN);fclose($lock);}
exit($failed>0?1:((in_array('--check',$argv,true)&&$pending>0)?2:0));
