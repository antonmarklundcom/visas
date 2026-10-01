# Connecting visas.com.py to VenderCRM

You need exactly two values. Both are in the CRM at **https://crm.clientes.com.py**
(note: .com.py, not .com).

| What | Where | Value |
|---|---|---|
| CRM base URL | fixed | `https://crm.clientes.com.py` (already in lead-forward.php) |
| Site API key | CRM → business **Visas** → **Sitios** → visas.com.py → *Generar nueva clave* | shown once, starts with `vc_live_` |

Then:
1. Paste the key into `lead-forward.php`, line with `VENDERCRM_API_KEY_FALLBACK = ''`.
2. Save the key also in `C:\Users\anton\vendercrm-new-site-keys.txt` (outside the repo).
3. Rerun `powershell -File deploy/make-zip.ps1` and upload only `lead-forward.php`.
4. Submit the live form once with your own number. Check **Contactos** (phone
   normalised to +595) and **Pipeline** (a deal in the site's default stage).

Nothing else is required. The attribution script (vc-attribution.js) is already on
every page, so UTM/gclid first-touch lands on the contact automatically.

Why a key was needed again: the site was created in the bulk batch of 2026-09-10
and the provisioning script dropped the plaintext key (bug: reads `plaintext`,
route returns `api_key`). Keys cannot be recovered, only reissued.
