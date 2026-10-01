from pathlib import Path
import hashlib,json,zipfile
root=Path(__file__).resolve().parent.parent
files=json.loads((root/'dist/package-files.json').read_text(encoding='utf-8'))
manifest=json.loads((root/'dist/release-manifest.json').read_text(encoding='utf-8'))
release=manifest['releaseDate']
import re
assert re.fullmatch(r'\d{4}-\d{2}-\d{2}',release)
archive=root/f'dist/visas-com-py-hostinger-{release}.zip'
with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED,compresslevel=9) as z:
    for name in files:
        p=(root/name).resolve()
        assert p.is_relative_to(root) and p.is_file()
        z.write(p,p.relative_to(root).as_posix())
with zipfile.ZipFile(archive) as z:
    assert z.testzip() is None
    assert z.namelist()==files and 'index.html' in z.namelist() and '.htaccess' in z.namelist()
    for name in z.namelist():
        assert '\\' not in name and not name.startswith('/') and '..' not in Path(name).parts
        assert z.read(name)==(root/name).read_bytes()
    extracted=root/'dist/verified-extraction'
    extracted.mkdir(exist_ok=True)
    z.extractall(extracted)
    for name in files:assert (extracted/name).read_bytes()==(root/name).read_bytes()
digest=hashlib.sha256(archive.read_bytes()).hexdigest()
(archive.with_suffix('.zip.sha256')).write_text(digest+'  '+archive.name+'\n')
print(f'PASS: {len(files)} ZIP entries verified byte-for-byte; root index.html; forward-slash paths; extracted copy verified.')
print(f'ZIP: {archive}\nBytes: {archive.stat().st_size}\nSHA256: {digest}')
