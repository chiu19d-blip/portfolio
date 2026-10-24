'use strict';
/* ========= DATA (replace with your real work) =========
   Images: put files in assets/images/. If a file is missing, a coloured placeholder is shown.
   Videos: videoUrl may be a local MP4 ("assets/videos/x.mp4"), a direct MP4 URL,
   or a Google Drive share link (embedded via /preview when Drive allows it). */
const CATEGORIES = ['All','Graphic Design','Branding','Social Media','Photography','Video Editing','Motion Graphics','3D Design'];

const PROJECTS = [
  {id:'p1',title:'Sample Identity System',category:'Branding',description:'Sample layout: logo suite, colour system and stationery mockups. Replace with real work.',thumbnail:'assets/images/p1.jpg',images:['assets/images/p1-a.jpg','assets/images/p1-b.jpg'],videoUrl:'',mediaType:'image',year:2025,software:['Illustrator','Photoshop'],featured:true,size:'wide'},
  {id:'p2',title:'Sample Poster Series',category:'Graphic Design',description:'Sample layout: a three-poster typographic series.',thumbnail:'assets/images/p2.jpg',images:['assets/images/p2-a.jpg'],videoUrl:'',mediaType:'image',year:2025,software:['Illustrator','InDesign'],featured:false,size:'tall'},
  {id:'p3',title:'Sample Campaign Set',category:'Social Media',description:'Sample layout: carousel and story templates.',thumbnail:'assets/images/p3.jpg',images:['assets/images/p3-a.jpg'],videoUrl:'',mediaType:'image',year:2024,software:['Photoshop','Figma'],featured:false,size:''},
  {id:'p4',title:'Sample Portrait Study',category:'Photography',description:'Sample layout: studio portrait series.',thumbnail:'assets/images/p4.jpg',images:['assets/images/p4-a.jpg'],videoUrl:'',mediaType:'image',year:2024,software:['Lightroom','Photoshop'],featured:false,size:'tall'},
  {id:'p5',title:'Sample Title Sequence',category:'Motion Graphics',description:'Sample layout: animated title card.',thumbnail:'assets/images/p5.jpg',images:[],videoUrl:'assets/videos/sample-motion.mp4',mediaType:'video',year:2025,software:['After Effects'],featured:true,size:'wide'},
  {id:'p6',title:'Sample Product Render',category:'3D Design',description:'Sample layout: product visualisation.',thumbnail:'assets/images/p6.jpg',images:['assets/images/p6-a.jpg'],videoUrl:'',mediaType:'image',year:2025,software:['Blender'],featured:false,size:''},
  {id:'p7',title:'Sample Short Edit',category:'Video Editing',description:'Sample layout: a 60-second promo cut.',thumbnail:'assets/images/p7.jpg',images:[],videoUrl:'',mediaType:'video',year:2024,software:['Premiere Pro'],featured:false,size:''}
];

const VIDEOS = [
  {id:'v1',title:'Sample Showreel',category:'Motion Graphics',description:'Add a short description of this film.',thumbnail:'assets/images/v1.jpg',videoUrl:'assets/videos/showreel.mp4'},
  {id:'v2',title:'Sample Brand Film',category:'Video Editing',description:'Hosted on Google Drive (example link format).',thumbnail:'assets/images/v2.jpg',videoUrl:'https://drive.google.com/file/d/YOUR_FILE_ID/view'},
  {id:'v3',title:'Sample Teaser',category:'Motion Graphics',description:'No video URL yet, so a placeholder is shown.',thumbnail:'assets/images/v3.jpg',videoUrl:''}
];

/* ========= DATA LOADING — swap this for a future API call =========
   async function loadData(){ const [p,v]=await Promise.all([fetch('/api/projects').then(r=>r.json()),fetch('/api/videos').then(r=>r.json())]); return {projects:p,videos:v}; } */
async function loadData(){ return {projects:PROJECTS,videos:VIDEOS}; }

/* ========= HELPERS ========= */
const $ = (s,r=document)=>r.querySelector(s);
const esc = s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function placeholder(text,seed=0){
  const P=[['#B89A83','#3D2926'],['#593E36','#E5CFC2'],['#89766D','#3D2926'],['#E5CFC2','#B89A83'],['#3D2926','#D8BBA5']];
  const [a,b]=P[seed%P.length];
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="800" height="600" fill="url(#g)"/><circle cx="600" cy="170" r="110" fill="rgba(248,241,232,.22)"/><text x="40" y="550" font-family="Georgia,serif" font-size="42" fill="#fff" fill-opacity=".9">${esc(text)}</text></svg>`;
  return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
}
function img(src,alt,label,seed,lazy=true){
  const i=new Image(); i.alt=alt; if(lazy)i.loading='lazy'; i.decoding='async';
  i.onerror=()=>{i.onerror=null;i.src=placeholder(label,seed)}; i.src=src||placeholder(label,seed); return i;
}
const seedOf=id=>[...id].reduce((a,c)=>a+c.charCodeAt(0),0);

/* ========= RENDERING ========= */
function renderFilters(){
  const box=$('#filters');
  box.innerHTML=CATEGORIES.map((c,i)=>`<button type="button" data-cat="${c}" aria-pressed="${i===0}" class="${i===0?'on':''}">${c}</button>`).join('');
  box.addEventListener('click',e=>{
    const b=e.target.closest('button'); if(!b)return;
    box.querySelectorAll('button').forEach(x=>{x.classList.toggle('on',x===b);x.setAttribute('aria-pressed',x===b)});
    filterProjects(b.dataset.cat);
  });
}
function renderProjects(list){
  const grid=$('#grid'); grid.innerHTML='';
  list.forEach(p=>{
    const card=document.createElement('button');
    card.type='button'; card.className='card reveal '+(p.size||''); card.dataset.cat=p.category; card.dataset.id=p.id;
    card.setAttribute('aria-label',`View project: ${p.title}`);
    card.append(img(p.thumbnail,p.title,p.title,seedOf(p.id)));
    card.insertAdjacentHTML('beforeend',`<span class="info"><small>${esc(p.category)}</small><b>${esc(p.title)}</b><span class="d">${esc(p.description)}</span><em>View project</em></span>`);
    card.addEventListener('click',()=>openProject(p,card));
    grid.append(card); observe(card);
  });
}
function filterProjects(cat){
  const cards=[...document.querySelectorAll('.card')];
  cards.forEach(c=>c.classList.add('out'));
  setTimeout(()=>{
    cards.forEach(c=>{const show=cat==='All'||c.dataset.cat===cat;c.classList.toggle('gone',!show);c.classList.remove('in')});
    requestAnimationFrame(()=>requestAnimationFrame(()=>cards.forEach(c=>{if(!c.classList.contains('gone'))c.classList.remove('out'),c.classList.add('in')})));
  },reduce?0:350);
}
function renderVideos(list){
  const g=$('#vgrid'); g.innerHTML='';
  list.forEach(v=>{
    const b=document.createElement('button'); b.type='button'; b.className='vcard reveal';
    b.setAttribute('aria-label',`Play video: ${v.title}`);
    const t=document.createElement('span'); t.className='thumb'; t.append(img(v.thumbnail,v.title,v.title,seedOf(v.id)+3)); t.insertAdjacentHTML('beforeend','<span class="play"></span>');
    b.append(t); b.insertAdjacentHTML('beforeend',`<h3>${esc(v.category)}</h3><b>${esc(v.title)}</b><p>${esc(v.description)}</p>`);
    b.addEventListener('click',()=>openVideo(v,b)); g.append(b); observe(b);
  });
}

/* ========= VIDEO URL HANDLING ========= */
function videoEmbed(v){
  const url=(v.videoUrl||'').trim(), poster=v.thumbnail||'';
  if(!url) return `<div class="ph"><p>Video coming soon.<br>Add a <code>videoUrl</code> for this entry.</p></div>`;
  const drive=url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:export=\w+&)?id=)([\w-]+)/);
  if(drive) return `<iframe class="m-media" src="https://drive.google.com/file/d/${drive[1]}/preview" allow="fullscreen" title="${esc(v.title)}" loading="lazy"></iframe>
    <p class="muted" style="margin-top:12px;font-size:.85rem">Video not loading? Google Drive only embeds files shared as “Anyone with the link”. <a href="${esc(url)}" target="_blank" rel="noopener" style="text-decoration:underline">Open in a new tab</a></p>`;
  return `<video class="m-media" controls preload="metadata" playsinline poster="${esc(poster)}" src="${esc(url)}"></video>
    <p class="muted" style="margin-top:12px;font-size:.85rem"><a href="${esc(url)}" target="_blank" rel="noopener" style="text-decoration:underline">Open video in a new tab</a> if it does not play.</p>`;
}

/* ========= MODAL ========= */
const modal=$('#modal'), mBody=$('#m-body'); let lastFocus=null;
function showModal(html,trigger){
  lastFocus=trigger||document.activeElement; mBody.innerHTML=html;
  modal.hidden=false; document.body.style.overflow='hidden';
  requestAnimationFrame(()=>modal.classList.add('open')); $('.close',modal).focus();
  mBody.querySelectorAll('img[data-ph]').forEach(i=>{i.onerror=()=>{i.onerror=null;i.src=placeholder(i.dataset.ph,+i.dataset.seed)}});
}
function closeModal(){
  if(modal.hidden)return; mBody.querySelectorAll('video').forEach(v=>v.pause());
  modal.classList.remove('open'); document.body.style.overflow='';
  setTimeout(()=>{modal.hidden=true;mBody.innerHTML=''},reduce?0:400); lastFocus&&lastFocus.focus();
}
function openProject(p,trigger){
  const s=seedOf(p.id);
  const media=p.videoUrl||p.mediaType==='video'?videoEmbed(p):'';
  const imgs=(p.images||[]).map((src,i)=>`<img src="${esc(src)}" alt="${esc(p.title)} — image ${i+1}" loading="lazy" data-ph="${esc(p.title)} ${i+1}" data-seed="${s+i+1}">`).join('');
  showModal(`<h2 id="m-title">${esc(p.title)}</h2>
    <div class="m-meta"><span>${esc(p.category)}</span><span>${esc(p.year)}</span><span>${(p.software||[]).map(esc).join(', ')}</span></div>
    <p style="max-width:65ch">${esc(p.description)}</p>
    ${media?`<div class="m-imgs">${media}</div>`:''}<div class="m-imgs">${imgs}</div>`,trigger);
}
function openVideo(v,trigger){
  showModal(`<h2 id="m-title">${esc(v.title)}</h2><div class="m-meta"><span>${esc(v.category)}</span></div>${videoEmbed(v)}<p style="margin-top:18px;max-width:65ch">${esc(v.description)}</p>`,trigger);
}
modal.addEventListener('click',e=>{if(e.target===modal||e.target.closest('.close'))closeModal()});
document.addEventListener('keydown',e=>{
  if(e.key==='Escape')closeModal();
  if(e.key==='Tab'&&!modal.hidden){ // focus trap
    const f=[...modal.querySelectorAll('button,a[href],iframe,video')]; if(!f.length)return;
    const a=f[0],z=f[f.length-1];
    if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}
  }
});

/* ========= SCROLL REVEAL, NAV, CURSOR ========= */
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -40px'});
function observe(el){reduce?el.classList.add('in'):io.observe(el)}
document.querySelectorAll('.reveal').forEach(observe);

const nav=$('#nav'), burger=$('.burger'), menu=$('#menu');
addEventListener('scroll',()=>nav.classList.toggle('solid',scrollY>60),{passive:true});
burger.addEventListener('click',()=>{const o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':''});
menu.addEventListener('click',e=>{if(e.target.tagName==='A'){menu.classList.remove('open');burger.setAttribute('aria-expanded',false);document.body.style.overflow=''}});
const links=[...menu.querySelectorAll('a')];
const spy=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){links.forEach(l=>l.classList.toggle('active',l.hash==='#'+e.target.id||(e.target.id==='films'&&l.hash==='#work')))}}),{rootMargin:'-45% 0px -50%'});
['home','about','work','films','contact'].forEach(id=>spy.observe(document.getElementById(id)));

if(matchMedia('(hover:hover) and (pointer:fine)').matches&&!reduce){
  const c=$('.cursor'); let x=0,y=0,cx=0,cy=0;
  document.body.classList.add('has-cursor');
  addEventListener('mousemove',e=>{x=e.clientX;y=e.clientY;c.classList.add('on')});
  document.addEventListener('mouseleave',()=>c.classList.remove('on'));
  document.addEventListener('mouseover',e=>c.classList.toggle('big',!!e.target.closest('.card,.vcard')));
  (function loop(){cx+=(x-cx)*.18;cy+=(y-cy)*.18;c.style.transform=`translate(${cx}px,${cy}px)`;requestAnimationFrame(loop)})();
}

/* ========= ABOUT PORTRAIT FALLBACK, FORM, FOOTER ========= */
const portrait=$('.about-fig img'); portrait.onerror=()=>{portrait.onerror=null;portrait.src=placeholder('Portrait',2)};

const form=$('#form'), note=$('#note');
form.addEventListener('submit',e=>{
  e.preventDefault(); let ok=true;
  form.querySelectorAll('input,textarea').forEach(f=>{
    const m=f.parentElement.querySelector('small'); let msg='';
    if(!f.value.trim())msg='This field is required.';
    else if(f.type==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value))msg='Enter a valid email address.';
    else if(f.name==='message'&&f.value.trim().length<10)msg='Write at least 10 characters.';
    m.textContent=msg; f.setAttribute('aria-invalid',!!msg); if(msg)ok=false;
  });
  note.classList.toggle('ok',ok);
  note.textContent=ok?'Looks good, but nothing was sent. This is a frontend-only demo; backend integration will be added later.':'Please fix the highlighted fields.';
  if(ok)form.reset();
});
$('#year').textContent=new Date().getFullYear();

/* ========= INIT ========= */
renderFilters();
loadData().then(({projects,videos})=>{renderProjects(projects);renderVideos(videos)})
  .catch(()=>{$('#grid').innerHTML='<p class="muted">Projects could not be loaded.</p>'});

/* ===== Scroll progress, hero parallax, staggered reveals (work on touch too) ===== */
(function(){
  const bar=$('.progress'), bg=$('.hero-bg'); let tick=false;
  function onScroll(){
    const y=scrollY, max=document.documentElement.scrollHeight-innerHeight;
    bar.style.transform=`scaleX(${max>0?y/max:0})`;
    if(!reduce&&y<innerHeight*1.2) bg.style.transform=`translate3d(0,${y*.25}px,0) scale(${1+Math.min(y,innerHeight)/innerHeight*.06})`;
    tick=false;
  }
  addEventListener('scroll',()=>{if(!tick){tick=true;requestAnimationFrame(onScroll)}},{passive:true});
  // stagger siblings
  document.querySelectorAll('.about-txt .reveal,.cols>div,.links li,#form label').forEach((el,i)=>{el.classList.add('reveal');el.style.setProperty('--d',(i%5)*.09+'s');observe(el)});
  new MutationObserver(()=>document.querySelectorAll('.card.reveal,.vcard.reveal').forEach((el,i)=>{if(!el.style.getPropertyValue('--d'))el.style.setProperty('--d',(i%3)*.12+'s')})).observe(document.body,{childList:true,subtree:true});
  const fig=$('.about-fig'); if(fig){ if(reduce)fig.classList.add('in'); else new IntersectionObserver((es,o)=>{if(es[0].isIntersecting){fig.classList.add('in');o.disconnect()}},{threshold:.15}).observe(fig.parentElement) } /* observe the section: the figure's own clip-path hides it from the observer */
})();

/* ===== Gen Z layer: split name, tilt, magnet, stickers, dock, cursor label ===== */
(function(){
  const fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
  const h=$('h1'), parts=h.innerHTML.split(/<br\s*\/?>/i); let n=0;
  h.setAttribute('aria-label',parts.join(' ').trim());
  h.innerHTML=parts.map((w,li)=>`<span class="ln" aria-hidden="true">${[...w.trim()].map(c=>`<span class="ch${li?' it':''}" style="--i:${n++}">${c}</span>`).join('')}</span>`).join('');

  if(fine&&!reduce){
    document.querySelectorAll('.btn,.social a,.top').forEach(el=>{
      el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.25}px,${(e.clientY-r.top-r.height/2)*.35}px)`});
      el.addEventListener('pointerleave',()=>el.style.transform='');
    });
    const g=$('#grid');
    g.addEventListener('pointermove',e=>{const c=e.target.closest('.card');if(!c)return;const r=c.getBoundingClientRect();
      c.style.setProperty('--ry',((e.clientX-r.left)/r.width-.5)*10+'deg');c.style.setProperty('--rx',(.5-(e.clientY-r.top)/r.height)*10+'deg')});
    g.addEventListener('pointerout',e=>{const c=e.target.closest('.card');if(c){c.style.setProperty('--rx','0deg');c.style.setProperty('--ry','0deg')}});
    const cur=$('.cursor');
    document.addEventListener('mouseover',e=>{cur.dataset.l=e.target.closest('.card')?'view':e.target.closest('.vcard')?'play':e.target.closest('.sticker')?'drag':''});
  }
  document.querySelectorAll('.sticker').forEach(s=>{let ox=0,oy=0,x=0,y=0,d=false;
    s.addEventListener('pointerdown',e=>{d=true;ox=e.clientX-x;oy=e.clientY-y;s.setPointerCapture(e.pointerId)});
    s.addEventListener('pointermove',e=>{if(d){x=e.clientX-ox;y=e.clientY-oy;s.style.translate=`${x}px ${y}px`}});
    s.addEventListener('pointerup',()=>d=false)});
  const dl=[...document.querySelectorAll('.dock a')];
  const dspy=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)dl.forEach(l=>l.classList.toggle('on',l.hash==='#'+e.target.id||(e.target.id==='films'&&l.hash==='#work')))}),{rootMargin:'-45% 0px -50%'});
  ['home','about','work','films','contact'].forEach(id=>dspy.observe(document.getElementById(id)));
})();
