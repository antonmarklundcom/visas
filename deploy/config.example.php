<?php
// Copy outside public_html to ../visas-private/config.php. Never put a real key in this template.
// Legacy fallback and storage settings. New CRM setup: persistent ../private/vendercrm.php
// returning VENDERCRM_URL (base origin) and VENDERCRM_API_KEY; see docs/VENDERCRM-CONFIGURATION.md.
return [
 'crm_url' => 'https://crm.clientes.com.py',
 'api_key' => '',
 // Optional absolute directory outside public_html; otherwise the handler uses ../visas-private/data.
];
