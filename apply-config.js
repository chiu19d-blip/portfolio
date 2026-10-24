/* Reads config.js and writes the values into the existing page elements.
   Runs before script.js so the hero-name letter animation uses the new name.
   It only swaps text / image paths / link targets — no layout or style changes. */
(function(){
  'use strict';
  var C=window.SITE_CONFIG; if(!C) return;
  var $=function(s,r){return (r||document).querySelector(s)};
  var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
  var has=function(v){return v!==undefined&&v!==null&&v!==''};
  var text=function(sel,v){var el=$(sel); if(el&&has(v)) el.textContent=v; return el};
  var list=function(ul,items){ if(!ul||!items||!items.length) return;
    ul.innerHTML=''; items.forEach(function(t){var li=document.createElement('li'); li.textContent=t; ul.appendChild(li)}) };
  var full=[C.firstName,C.lastName].filter(has).join(' ');

  /* name, title, brand */
  if(has(C.firstName)||has(C.lastName)){
    var h1=$('h1'); if(h1){ h1.textContent=''; h1.appendChild(document.createTextNode(C.firstName||''));
      h1.appendChild(document.createElement('br')); h1.appendChild(document.createTextNode(C.lastName||'')); }
    var alt=$('#portrait'); if(alt) alt.alt='Portrait of '+full;
  }
  if(full||has(C.role)){
    document.title=[full,C.role].filter(has).join(' — ');
    var md=$('meta[name="description"]'); if(md) md.content='Portfolio of '+full+(C.role?', '+C.role.toLowerCase():'')+'.';
  }
  text('.role',C.role);
  if(has(C.studioName)){
    text('.brand-name',C.studioName);
    var b=$('.brand'); if(b) b.setAttribute('aria-label',C.studioName+' home');
    $$('.foot-brand-name').forEach(function(n){n.textContent=C.studioName});
    var f=$('.foot-copy'); if(f){ f.innerHTML='© <span id="year"></span> '; f.appendChild(document.createTextNode(C.studioName+'. All rights reserved.')); }
  }

  /* logo (header + footer) */
  $$('.js-logo').forEach(function(logo){
    if(!C.logo) return;
    if(has(C.logo.image)){ logo.textContent=''; var li=new Image(); li.alt=(C.studioName||full)+' logo'; li.src=C.logo.image;
      li.onerror=function(){li.onerror=null; logo.textContent=C.logo.text||''}; logo.appendChild(li); }
    else if(has(C.logo.text)) logo.textContent=C.logo.text;
  });

  /* images */
  if(has(C.heroImage)){ var bg=$('.hero-bg'); if(bg) bg.style.setProperty('--hero-image','url("'+String(C.heroImage).replace(/"/g,'%22')+'")'); }
  if(has(C.heroPosition)){ var bp=$('.hero-bg'); if(bp) bp.style.setProperty('--hero-pos',C.heroPosition); }
  var hp=$('#heroPortrait');
  if(hp){ if(has(C.heroPortrait)) hp.src=C.heroPortrait; if(has(C.heroPortraitPosition)) hp.style.objectPosition=C.heroPortraitPosition; if(full) hp.alt='Portrait of '+full; }
  if(has(C.portraitImage)){ var p=$('#portrait'); if(p) p.src=C.portraitImage; }

  /* hero */
  if(C.heroLine&&C.heroLine.length) text('.services',C.heroLine.join(' \u00a0|\u00a0 '));
  text('.hero .btn',C.heroButton);
  if(C.stickerHero&&C.stickerHero.length){ var s=$('.hero .sticker'); if(s){ s.innerHTML='';
    C.stickerHero.forEach(function(t,i){ if(i) s.appendChild(document.createElement('br')); s.appendChild(document.createTextNode(t)) }) } }
  text('.sticker.sm',C.stickerAbout);

  /* marquees */
  var mq=$$('.marquee .track');
  if(C.marqueeWords&&C.marqueeWords.length&&mq[0]){ var u=C.marqueeWords.join(' ✦ ')+' ✦ ';
    $$('span',mq[0]).forEach(function(sp){sp.textContent=u+u+u}) }
  if(has(C.marqueePhrase)&&mq[1]){ var q=C.marqueePhrase+' ✦ ';
    $$('span',mq[1]).forEach(function(sp){sp.textContent=q+q+q}) }

  /* about */
  var A=C.about||{};
  text('.about-txt h2',A.heading);
  text('.about-txt .lead',A.intro);
  var ph=$('.about-txt p:not(.lead)');
  if(ph&&(has(A.philosophyLabel)||has(A.philosophy))){ var st=$('strong',ph);
    ph.innerHTML=''; var s2=document.createElement('strong'); s2.textContent=has(A.philosophyLabel)?A.philosophyLabel:(st?st.textContent:'');
    ph.appendChild(s2); ph.appendChild(document.createTextNode(' '+(has(A.philosophy)?A.philosophy:''))); }
  var cols=$$('.cols > div');
  if(cols[0]){ var h0=$('h3',cols[0]); if(h0&&has(A.skillsHeading)) h0.textContent=A.skillsHeading; list($('ul',cols[0]),A.skills); }
  if(cols[1]){ var h1b=$('h3',cols[1]); if(h1b&&has(A.softwareHeading)) h1b.textContent=A.softwareHeading; list($('ul',cols[1]),A.software); }
  if(cols[2]){ var h2b=$('h3',cols[2]); if(h2b&&has(A.experienceHeading)) h2b.textContent=A.experienceHeading;
    var ex=$('p',cols[2]); if(ex&&has(A.experience)) ex.textContent=A.experience; }

  /* section titles */
  text('.work .sec-head h2',C.workHeading);
  if(has(C.workNote)) text('.work .sec-head p',C.workNote);
  text('.films .sec-head h2',C.filmsHeading);

  /* contact */
  var K=C.contact||{};
  text('.contact h2',K.heading); text('.contact .lead',K.intro);
  $$('[data-label="instagram"]').forEach(function(a){ if(has(K.instagramLabel)) a.textContent=K.instagramLabel });
  $$('[data-label="whatsapp"]').forEach(function(a){ if(has(K.whatsappLabel)) a.textContent=K.whatsappLabel });
  if(has(C.social&&C.social.email)){ var em=C.social.email, addr=em.replace(/^mailto:/,'');
    $$('[data-social="email"]').forEach(function(a){ a.href=/^mailto:/.test(em)?em:'mailto:'+em; a.textContent=addr }) }

  /* footer */
  var F=C.footer||{};
  text('.foot-cta-h',F.ctaHeading); text('.foot-cta-p',F.ctaText); text('.foot-cta .btn',F.ctaButton);
  text('.foot-desc',F.description); text('.foot-tag',F.tagline); text('.foot-invite',F.invite); text('.foot-note',F.note);
  list($('.foot-services'),F.services);

  /* social links */
  var S=C.social||{};
  ['instagram','behance','youtube','pinterest','whatsapp'].forEach(function(k){
    if(has(S[k])) $$('[data-social="'+k+'"]').forEach(function(a){a.href=S[k]});
  });
})();
