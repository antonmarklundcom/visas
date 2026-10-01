<?php
// Local router emulates public routing and prevents developer/private source exposure.
$path=rawurldecode(parse_url($_SERVER['REQUEST_URI'],PHP_URL_PATH)??'/');
if(preg_match('~(?:^|/)(?:\.|lib/|scripts/|tests/|docs/|deploy/|node_modules/)|\.(?:mjs|md|py|log|zip|json)$~i',$path)){http_response_code(404);echo 'Not found';return true;}
if($path==='/lead-forward.php'){require __DIR__.'/lead-forward.php';return true;}
if(str_ends_with($path,'index.html')){header('Location: '.substr($path,0,-10),true,301);return true;}
$root=realpath(__DIR__);$file=realpath(__DIR__.$path);
if(!$file || !str_starts_with($file,$root.DIRECTORY_SEPARATOR)&&$file!==$root){http_response_code(404);readfile(__DIR__.'/404.html');return true;}
if(is_dir($file)){if(!str_ends_with($path,'/')){header('Location: '.$path.'/',true,301);return true;}$file.='/index.html';if(!is_file($file)){http_response_code(404);return true;}header('Content-Type: text/html; charset=utf-8');$html=(string)file_get_contents($file);if(($_GET['audit_text']??'')==='200')$html=str_replace('</head>','<style>html{font-size:200%}</style></head>',$html);echo $html;return true;}
return false;
