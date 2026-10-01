$ErrorActionPreference = 'Stop'
Push-Location (Split-Path $PSScriptRoot -Parent)
try { npm run package; if ($LASTEXITCODE -ne 0) { throw 'Packaging failed' } }
finally { Pop-Location }
