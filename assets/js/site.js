(() => {
  // Optional message preparation stays in the browser; only the user sends in WhatsApp.
  const preparer = document.querySelector('[data-enquiry-preparer]');
  if (preparer) {
    const destination = preparer.querySelector('#enquiry-destination');
    const stage = preparer.querySelector('#enquiry-stage');
    const updateMessage = () => {
      const en = preparer.dataset.lang === 'en';
      const message = en
        ? `Hi! I found visas.com.py. ${destination.value ? 'Destination: ' + destination.value + '. ' : ''}${stage.value ? 'Topic: ' + stage.value + '. ' : ''}I have a general question. Please tell me who handles this channel and what help is available.`
        : `Hola! Vengo de visas.com.py. ${destination.value ? 'Destino: ' + destination.value + '. ' : ''}${stage.value ? 'Tema: ' + stage.value + '. ' : ''}Tengo una consulta general. ¿Quién atiende este canal y qué ayuda está disponible?`;
      preparer.querySelector('[data-enquiry-preview]').textContent = message;
      preparer.querySelector('[data-enquiry-link]').href = `https://wa.me/${preparer.dataset.waNumber}?text=${encodeURIComponent(message)}`;
    };
    destination.addEventListener('change', updateMessage);
    stage.addEventListener('change', updateMessage);
    updateMessage();
  }
})();
(() => {
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('#mobile-menu');
  if (burger && menu) {
    const closeMenu = () => menu.close();
    burger.addEventListener('click', () => {
      menu.showModal();
      document.body.classList.add('menu-open');
      burger.setAttribute('aria-expanded', 'true');
      menu.querySelector('.menu-close').focus();
    });
    menu.querySelector('.menu-close').addEventListener('click', closeMenu);
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    menu.addEventListener('close', () => {
      document.body.classList.remove('menu-open');
      burger.setAttribute('aria-expanded', 'false');
      burger.focus();
    });
    window.matchMedia('(min-width: 1200px)').addEventListener('change', event => {
      if (event.matches && menu.open) closeMenu();
    });
  }
  document.querySelectorAll('.desktop-nav details').forEach(details => {
    document.addEventListener('click', event => {
      if (!details.contains(event.target)) details.open = false;
    });
    details.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        details.open = false;
        details.querySelector('summary').focus();
      }
    });
  });

  const form = document.querySelector('#contact-form');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if ('IntersectionObserver' in window) {
    // P8 route-map arcs share the one-shot reveal observer.
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove('is-pending');
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    if (!reducedMotion.matches) reveals.forEach(el => {
      el.classList.add('is-pending');
      revealObserver.observe(el);
    });
    reducedMotion.addEventListener('change', event => {
      if (event.matches) {
        revealObserver.disconnect();
        reveals.forEach(el => el.classList.remove('is-pending'));
      }
    });
    const sticky = document.querySelector('.mobile-wa');
    if (form && sticky) {
      new IntersectionObserver(entries => {
        sticky.hidden = entries.some(entry => entry.isIntersecting);
      }, { threshold: 0 }).observe(form);
    }
  }
})();
document.querySelector('[data-print]')?.addEventListener('click', () => window.print());

// P7: native dialog supplies modal focus containment and Escape handling.
(() => {
  const dialog = document.querySelector('#wa-menu');
  if (!dialog) return;
  let trigger;
  const nav = document.querySelector('#mobile-menu');
  let restoreNav = false;
  document.querySelectorAll('[data-wa-trigger]').forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault();
      trigger = button;
      restoreNav = Boolean(nav?.contains(button));
      // The navigation link handler closes its dialog before this handler runs.
      if (nav?.open) nav.close();
      dialog.showModal();
      trigger.setAttribute('aria-expanded', 'true');
      dialog.querySelector('[data-wa-option]').focus();
    });
  });
  dialog.querySelector('.wa-menu__close').addEventListener('click', () => dialog.close());
  dialog.querySelectorAll('[data-wa-option]').forEach(option => option.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    trigger?.setAttribute('aria-expanded', 'false');
    if (restoreNav && !nav.open) {
      nav.showModal();
      document.body.classList.add('menu-open');
      document.querySelector('.burger').setAttribute('aria-expanded', 'true');
    }
    trigger?.focus();
  });
  // A queued navigation close event must not steal focus from the intent menu.
  nav?.addEventListener('close', () => {
    if (dialog.open) dialog.querySelector('[data-wa-option]').focus();
  });
})();
// Optional measurement: consent first; no enquiry fields or full URLs in events.
(() => {
 const id=document.querySelector('meta[name="analytics-id"]')?.content;
 const panel=document.querySelector('[data-consent]'),settings=document.querySelector('[data-privacy-settings]');
 let allowed=false,loaded=false;
 const read=()=>{try{return localStorage.getItem('visas-analytics');}catch{return 'no';}};
 const track=(name,params={})=>{if(allowed&&typeof window.gtag==='function')window.gtag('event',name,{page_path:location.pathname,...params});};
 window.visasTrack=track;
 function enable(){
  allowed=true;
  if(!loaded){window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments);};window.gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});window.gtag('js',new Date());window.gtag('config',id,{page_location:location.origin+location.pathname,send_page_view:true,allow_google_signals:false});const script=document.createElement('script');script.async=true;script.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(id);document.head.append(script);loaded=true;}
  else window.gtag('consent','update',{analytics_storage:'granted'});
 }
 if(id&&/^G-[A-Z0-9]+$/.test(id)){settings.hidden=false;if(read()==='yes')enable();else if(read()!=='no')panel.hidden=false;settings.addEventListener('click',()=>{panel.hidden=false;panel.querySelector('button').focus();});panel.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{const yes=b.dataset.consentChoice==='yes';try{localStorage.setItem('visas-analytics',yes?'yes':'no');}catch{}allowed=yes;window['ga-disable-'+id]=!yes;if(yes)enable();else window.gtag?.('consent','update',{analytics_storage:'denied'});panel.hidden=true;}));}
 document.querySelectorAll('[data-wa-trigger]').forEach(a=>a.addEventListener('click',()=>track('whatsapp_menu_open')));
 document.querySelectorAll('a[href^="https://wa.me/"]').forEach(a=>a.addEventListener('click',()=>{if(!a.hasAttribute('data-wa-trigger'))track('whatsapp_click',{intent:a.dataset.waOption||'contextual'});}));
})();

const visasAttribution=(()=>{
 const attr={};const query=new URLSearchParams(location.search);
 for(const key of ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','fbclid'])if(query.has(key))attr[key]=query.get(key).slice(0,200);
 // First touch is session-only, excludes referrer and arbitrary query data.
 try{const saved=JSON.parse(sessionStorage.getItem('visas-attribution')||'null');if(saved&&typeof saved==='object')Object.assign(attr,saved);else if(Object.keys(attr).length)sessionStorage.setItem('visas-attribution',JSON.stringify(attr));}catch{}
 return attr;
})();

// Same-origin progressive enhancement: form text stays in the DOM on every error.
(() => {
 const form=document.querySelector('#contact-form');if(!form)return;
 const en=form.dataset.lang==='en',error=document.querySelector('#form-error'),result=document.querySelector('#form-result');
 const submit=form.querySelector('[type=submit]'),label=submit.textContent;
 form.elements.page_url.value=location.origin+location.pathname;
 const attr=visasAttribution;const query=new URLSearchParams(location.search);
 const topic=query.get('topic');if(topic&&[...form.elements.tipo_visa.options].some(o=>o.value===topic))form.elements.tipo_visa.value=topic;
 async function token(){const r=await fetch('/lead-forward.php?action=token',{headers:{Accept:'application/json'},cache:'no-store'});if(!r.ok)throw Error('session');const t=await r.json();form.elements.csrf.value=t.csrf;form.elements.submission_id.value=t.submission_id;}
 let ready=token().then(()=>true,()=>false);
 function showError(message,field){error.textContent=message;error.hidden=false;const input=field?form.elements.namedItem(field):null;if(input&&input.type!=='hidden'){input.setAttribute('aria-invalid','true');input.setAttribute('aria-describedby','form-error');input.focus();}else error.focus();}
 form.addEventListener('input',e=>{e.target.removeAttribute('aria-invalid');});
 form.addEventListener('submit',async event=>{
  event.preventDefault();if(submit.disabled)return;error.hidden=true;submit.disabled=true;submit.textContent=en?'Sending…':'Enviando…';
  try {
   if(!await ready){await token();ready=Promise.resolve(true);}
   const data=new FormData(form);data.set('attribution',JSON.stringify(attr));
   const response=await fetch(form.action,{method:'POST',body:data,headers:{Accept:'application/json'}});
   const body=await response.json();
   if(body.status==='error'){if(body.csrf)form.elements.csrf.value=body.csrf;showError(body.message,body.field);return;}
   if(!['pending','delivered'].includes(body.status))throw Error('response');
   result.replaceChildren();const h=document.createElement('h2');h.textContent=body.status==='delivered'?(en?'Enquiry received':'Consulta recibida'):(en?'Delivery pending':'Entrega pendiente');const p=document.createElement('p');p.textContent=body.message;const ref=document.createElement('p');ref.textContent='Ref: '+body.reference;const wa=document.createElement('a');wa.className='button button--wa';wa.href='https://wa.me/595995628862?text='+encodeURIComponent((en?'Hello, my enquiry reference is ':'Hola, la referencia de mi consulta es ')+body.reference);wa.textContent=en?'Continue on WhatsApp':'Seguir por WhatsApp';wa.addEventListener('click',()=>window.visasTrack?.('whatsapp_click',{intent:'form_followup'}));result.append(h,p,ref,wa);result.hidden=false;result.focus();
   if(body.status==='delivered'){form.hidden=true;if(!body.duplicate)window.visasTrack?.('generate_lead',{delivery:'crm'});}else{window.visasTrack?.('lead_pending');}
  }catch{showError(en?'We could not confirm delivery. Your text is still here. Retry or use WhatsApp.':'No pudimos confirmar el envío. Tu texto sigue acá. Reintentá o escribinos por WhatsApp.');}
  finally{submit.disabled=false;submit.textContent=label;}
 });
})();
