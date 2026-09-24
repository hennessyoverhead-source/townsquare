(()=> {
const tabs=[...document.querySelectorAll('.tab[data-tab]')];
const panels=[...document.querySelectorAll('.tab-panel')];

function openTab(id){
  panels.forEach(p=>p.hidden=p.id!==id);
  tabs.forEach(t=>t.classList.toggle('active',t.dataset.tab===id));
  document.querySelectorAll('.profile-more-menu,.tabs-more-menu').forEach(m=>m.hidden=true);
  window.scrollTo({top:document.querySelector('.profile-shell').offsetTop,behavior:'smooth'});
}
tabs.forEach(t=>t.addEventListener('click',()=>openTab(t.dataset.tab)));
document.querySelectorAll('[data-tab-jump]').forEach(b=>b.addEventListener('click',(e)=>{e.preventDefault();openTab(b.dataset.tabJump)}));

document.querySelectorAll('.comment-toggle').forEach(b=>b.addEventListener('click',()=>{
  const post=b.closest('.post'), c=post.querySelector('.comments');
  c.hidden=!c.hidden;
}));

const moreProfile=document.querySelector('.more-menu-button');
const profileMenu=document.querySelector('.profile-more-menu');
if(moreProfile&&profileMenu){
  moreProfile.addEventListener('click',()=>{
    profileMenu.hidden=!profileMenu.hidden;
    moreProfile.setAttribute('aria-expanded',String(!profileMenu.hidden));
  });
}
const moreTab=document.querySelector('.more-tab');
const tabsMenu=document.querySelector('.tabs-more-menu');
if(moreTab&&tabsMenu){
  moreTab.addEventListener('click',()=>{
    tabsMenu.hidden=!tabsMenu.hidden;
    moreTab.setAttribute('aria-expanded',String(!tabsMenu.hidden));
  });
}

const lb=document.getElementById('lightbox'), img=document.getElementById('lightbox-image');
const triggers=[...document.querySelectorAll('.photo-trigger')];
let i=-1;
function show(n){
  i=n; const t=triggers[i];
  img.src=t.dataset.full||t.querySelector('img')?.src||'';
  img.alt=t.querySelector('img')?.alt||'Photo';
  lb.hidden=false; document.body.style.overflow='hidden';
}
function close(){lb.hidden=true;document.body.style.overflow=''; if(i>=0)triggers[i].focus();}
function move(d){
  if(!triggers.length)return;
  i=(i+d+triggers.length)%triggers.length;
  const t=triggers[i];
  img.src=t.dataset.full||t.querySelector('img')?.src||'';
  img.alt=t.querySelector('img')?.alt||'Photo';
}
triggers.forEach((t,n)=>t.addEventListener('click',()=>show(n)));
if(lb){
  lb.querySelector('.close')?.addEventListener('click',close);
  lb.querySelector('.prev')?.addEventListener('click',()=>move(-1));
  lb.querySelector('.next')?.addEventListener('click',()=>move(1));
}
document.addEventListener('keydown',e=>{
  if(!lb||lb.hidden)return;
  if(e.key==='Escape')close();
  if(e.key==='ArrowLeft')move(-1);
  if(e.key==='ArrowRight')move(1);
});
})();
// TownSquare profile search
const townSquareProfiles=[{name:"Romeo Montague",url:"/profiles/romeo-montague/"},{name:"Benvolio",url:"/profiles/benvolio/"},{name:"Mercutio",url:"/profiles/mercutio/"},{name:"The Apothecary",url:"/profiles/apothecary/"}];
document.querySelectorAll('.search').forEach(input=>{input.addEventListener('keydown',e=>{if(e.key==='Enter'){const q=input.value.trim().toLowerCase();const hit=townSquareProfiles.find(p=>p.name.toLowerCase().includes(q));if(hit){const base=location.hostname.includes('github.io')?'/townsquare':'';location.href=base+hit.url;}}});});

// TownSquare business search augmentation
document.addEventListener('DOMContentLoaded',()=>{
 const input=document.querySelector('#site-search');
 const box=document.querySelector('#search-results');
 if(!input||!box) return;
 input.addEventListener('input',()=>{
   const q=input.value.trim().toLowerCase();
   if(q && ("montague's auto repair".includes(q) || "montagues auto repair".includes(q) || "auto repair".includes(q))){
     const a=document.createElement('a');
     a.href=(location.pathname.includes('/profiles/')?'../../businesses/montagues-auto-repair/':location.pathname.includes('/businesses/')?'../montagues-auto-repair/':'businesses/montagues-auto-repair/');
     a.textContent="Montague's Auto Repair";
     a.className='search-result business-search-result';
     if(!box.textContent.includes("Montague's Auto Repair")) box.appendChild(a);
     box.hidden=false;
   }
 });
});


/* Interactive comment threads: Update 22 — character-first TownSquare ecosystem. */
document.addEventListener('DOMContentLoaded', () => {
  const root = (() => {
    const p = location.pathname;
    if (p.includes('/profiles/') || p.includes('/businesses/') || p.includes('/events/')) return '../../';
    return './';
  })();

  const people = {
    'Romeo Montague': {url:'profiles/romeo-montague/', img:'assets/romeo-profile.svg'},
    'Romeo': {url:'profiles/romeo-montague/', img:'assets/romeo-profile.svg'},
    'Benvolio': {url:'profiles/benvolio/', img:'assets/benvolio-profile.jpg'},
    'Mercutio': {url:'profiles/mercutio/', img:'assets/mercutio-profile.jpg'},
    'The Apothecary': {url:'profiles/apothecary/', img:'assets/apothecary-profile.jpg'},
    'Apothecary': {url:'profiles/apothecary/', img:'assets/apothecary-profile.jpg'},
    'Lord Capulet': {url:'profiles/lord-capulet/', img:'assets/lord-capulet-profile.jpg'}
  };
  const placeholder = root+'assets/friend-placeholder.svg';
  const avatarFor = name => people[name]?.img ? root+people[name].img : placeholder;
  const hrefFor = name => people[name]?.url ? root+people[name].url : '';

  const style=document.createElement('style');
  style.textContent=`
    .comments .comment,.business-comments .business-comment{display:flex;gap:9px;align-items:flex-start;margin:10px 0}
    .comments .comment>a:first-child,.comments .comment>img:first-child,.business-comments .business-comment>a:first-child,.business-comments .business-comment>img:first-child{flex:0 0 34px}
    .comments .comment>a:first-child img,.comments .comment>img:first-child,.business-comments .business-comment>a:first-child img,.business-comments .business-comment>img:first-child,.ts-comment-avatar{width:34px!important;height:34px!important;min-width:34px;object-fit:cover;border-radius:50%!important;display:block}
    .comments .comment.reply,.business-comments .business-comment.reply{margin-left:42px}
    .comment-count-link,.thread-toggle{border:0;background:none;color:#65676b;cursor:pointer;padding:0;font:inherit}
    .comment-count-link:hover,.thread-toggle:hover{text-decoration:underline}
    .thread-toggle{display:block;margin:9px 0 2px;font-weight:600}
    .comments:not(.thread-expanded) .comment:nth-of-type(n+3),.business-comments:not(.thread-expanded) .business-comment:nth-of-type(n+3){display:none}
    .ts-deleted p{color:#777;font-style:italic;background:#f0f2f5;border-radius:10px;padding:8px 10px;margin-top:3px}
    .ts-story-post{border-top:1px solid #ddd;margin-top:14px;padding-top:14px}
    .ts-reaction-note{color:#65676b;font-size:13px;margin:5px 0 0 43px}
    .ts-event-discussion{margin-top:18px;padding-top:18px;border-top:1px solid #ddd}
    .ts-event-discussion h2{margin-bottom:12px}
  `;
  document.head.appendChild(style);

  const comment = (name, text, opts={}) => ({name,text,...opts});
  const C = {
    mercutioHubris:[
      comment('Benvolio','This is exactly the kind of thing I mean.'),
      comment('Romeo Montague','Please do not challenge the gods from the shop account.'),
      comment('Mercutio','cowards. both of you.',{reply:true})
    ],
    mercutioGo:[
      comment('Benvolio','I am afraid to ask.'),
      comment('Romeo Montague','Whatever happened, congratulations.'),
      comment('Peter','I support this level of enthusiasm without knowing what happened.')
    ],
    mercutioAsked:[
      comment('Benvolio','Merc.'),
      comment('Mercutio','what',{reply:true}),
      comment('Tybalt','This comment was removed for violating TownSquare\'s Terms of Service.',{reply:true,deleted:true}),
      comment('Mercutio','and there it is',{reply:true})
    ],
    benReasonable:[
      comment('Mercutio','boring. do something irresponsible'),
      comment('Romeo Montague','Appreciated, coz.'),
      comment('Nurse','Someone has to have some sense around here.')
    ],
    benCoffee:[
      comment('Mercutio','counterpoint: no'),
      comment('Romeo Montague','Coffee first. Everything else second.'),
      comment('Peter','This seems like a very optimistic plan.')
    ],
    romeoDistance:[
      comment('Benvolio','You know where to find us.'),
      comment('Mercutio','bro discovered distance 💀'),
      comment('Nurse','Go to bed, Romeo.')
    ],
    romeoShop:[
      comment('Mercutio','skill issue'),
      comment('Benvolio','It was the heat shield. I told you it was the heat shield.'),
      comment('Balthasar','Mystery rattle: undefeated since the invention of the automobile.'),
      comment('Romeo Montague','I hate that this is true.',{reply:true})
    ],
    apothLavender:[
      comment('Lawrence','Save me a bundle. I may have a use for it.'),
      comment('The Apothecary','You always do.',{reply:true}),
      comment('Nurse','Put one aside for me too, please.')
    ],
    apothPrivate:[
      comment('Nurse','Private order? Now you have me curious.'),
      comment('The Apothecary','That is why it is called private.',{reply:true}),
      comment('Peter','Fair point.',{reply:true})
    ],
    lordParty:[
      comment('Peter','I was told there would be food and have chosen not to ask any further questions.'),
      comment('Nurse','There had better be dancing.'),
      comment('Lady Capulet','SO excited for this!! ✨🥂 The house is going to look AMAZING. #CapuletParty #MojaveNights #Blessed'),
      comment('Gregory','Samson says he\'s dressing up. I would like everyone to remember he said this voluntarily.'),
      comment('Samson','Delete this.',{reply:true}),
      comment('Potpan','Everybody\'s excited about the party. Nobody\'s excited about helping with the dishes.'),
      comment('Mercutio','heard the guest list needed better people so i made some executive decisions. you\'re welcome'),
      comment('Tybalt','This comment was removed for violating TownSquare\'s Terms of Service.',{reply:true,deleted:true}),
      comment('Benvolio','Merc.',{reply:true}),
      comment('Mercutio','what',{reply:true}),
      comment('Peter','I don\'t know what happened but I support Benvolio.',{reply:true}),
      comment('Lord Capulet','Not again.',{reply:true})
    ],
    lordWeather:[
      comment('Lady Capulet','7!!! ❤️❤️❤️'),
      comment('Mercutio','we heard you',{reply:true}),
      comment('Tybalt','I\'ll be there.'),
      comment('Lord Capulet','Try to stay out of trouble.',{reply:true}),
      comment('Tybalt','Always do.',{reply:true}),
      comment('Mercutio','does lord c have to come pick you up every time you get banned or is there like a shuttle',{reply:true}),
      comment('Tybalt','This comment was removed for violating TownSquare\'s Terms of Service.',{reply:true,deleted:true}),
      comment('Lord Capulet','Not again.',{reply:true})
    ]
  };

  function makeComment(c, business=false){
    const row=document.createElement('div');
    row.className=(business?'business-comment ':'comment ')+(c.reply?'reply ':'')+(c.deleted?'ts-deleted ':'');
    const href=hrefFor(c.name), img=avatarFor(c.name);
    const av=href?`<a href="${href}"><img class="ts-comment-avatar" src="${img}" alt="${c.name}"></a>`:`<img class="ts-comment-avatar" src="${img}" alt="">`;
    const nm=href?`<a href="${href}"><b>${c.name}</b></a>`:`<b>${c.name}</b>`;
    row.innerHTML=`${av}<div>${nm}<p>${c.text}</p><small>Like · Reply</small></div>`;
    row.querySelector('img')?.addEventListener('error',e=>{e.currentTarget.src=placeholder},{once:true});
    return row;
  }

  function choose(post){
    const txt=(post.textContent||'').toLowerCase();
    if(txt.includes('hubris')) return C.mercutioHubris;
    if(txt.includes('let’s fucking')||txt.includes("let's fucking")) return C.mercutioGo;
    if(txt.includes('literally no one asked')) return C.mercutioAsked;
    if(txt.includes('reasonable one')) return C.benReasonable;
    if(txt.includes('keep merc from starting')) return C.benCoffee;
    if(txt.includes('farther away than it is')) return C.romeoDistance;
    if(txt.includes('mystery rattle')) return C.romeoShop;
    if(txt.includes('fresh desert lavender')) return C.apothLavender;
    if(txt.includes('private order')) return C.apothPrivate;
    if(txt.includes('party preparations are underway')) return C.lordParty;
    if(txt.includes('weather checked. whiskey stocked')) return C.lordWeather;
    return null;
  }

  function wireThread(post, curated){
    const summary=post.querySelector('.summary');
    if(!summary) return;
    let thread=post.querySelector('.comments, .business-comments');
    if(!thread){thread=document.createElement('div');thread.className='comments';(post.querySelector('.actions')||summary).insertAdjacentElement('afterend',thread);}
    if(curated){thread.innerHTML='';curated.forEach(c=>thread.appendChild(makeComment(c,thread.classList.contains('business-comments'))));}
    const total=thread.querySelectorAll('.comment,.business-comment').length;
    const old=[...summary.querySelectorAll('span,button')].find(el=>/\d+\s+comments?/i.test(el.textContent));
    const countButton=document.createElement('button');countButton.type='button';countButton.className='comment-count-link';countButton.textContent=total+(total===1?' comment':' comments');
    if(old) old.replaceWith(countButton); else summary.appendChild(countButton);
    thread.querySelectorAll('.thread-toggle').forEach(x=>x.remove());
    if(total>2){const toggle=document.createElement('button');toggle.type='button';toggle.className='thread-toggle';thread.appendChild(toggle);
      const setExpanded=expanded=>{thread.classList.toggle('thread-expanded',expanded);toggle.textContent=expanded?'Hide comments':'View all '+total+' comments';countButton.setAttribute('aria-expanded',String(expanded));};
      setExpanded(false);countButton.addEventListener('click',()=>setExpanded(!thread.classList.contains('thread-expanded')));toggle.addEventListener('click',()=>setExpanded(!thread.classList.contains('thread-expanded')));
      const action=[...post.querySelectorAll('.actions button')].find(b=>/comment/i.test(b.textContent));if(action)action.addEventListener('click',()=>setExpanded(true));
    }
  }

  // Replace inflated/template threads only where Update 22 has a character-specific conversation.
  document.querySelectorAll('.post, .business-card').forEach(post=>{const curated=choose(post);if(curated)wireThread(post,curated);});

  // Old-photo history: one copy only, on Romeo's All feed. The joke implies 35 years of history without exposition.
  if(location.pathname.includes('/profiles/romeo-montague/')){
    const feed=document.querySelector('#all .feed');
    if(feed && !document.querySelector('.ts-1991-post')){
      const art=document.createElement('article');art.className='card post modern-card ts-1991-post';
      art.innerHTML=`<header><a href="./"><img src="${avatarFor('Romeo Montague')}" alt="Romeo Montague"></a><div><a href="./"><b>Romeo Montague</b></a><small>Throwback · 🌐</small></div></header><p>Found this in a box at the shop. 1991 was a choice.</p><div class="summary"><span>😂 ❤️ 73</span><span>8 comments</span></div><div class="actions"><button class="decorative">♡ Like</button><button class="decorative">▢ Comment</button><button class="decorative">↗ Share</button></div><div class="comments"></div>`;
      const story=[
        comment('Mercutio','oh my god. THE PONYTAIL'),comment('Romeo Montague','It was 1991.',{reply:true}),
        comment('Mercutio','you had a ponytail AND a goatee',{reply:true}),comment('Romeo Montague','So did half the guys we knew.',{reply:true}),
        comment('Mercutio','and history has judged all of you',{reply:true}),comment('Benvolio',"I didn't.",{reply:true}),
        comment('Mercutio','did you ever have any hair above your neckline? 😘',{reply:true}),comment('Benvolio','I hate you.',{reply:true})
      ];
      feed.appendChild(art);wireThread(art,story);
      const note=document.createElement('div');note.className='ts-reaction-note';note.textContent='Juliet ❤️ reacted to this';art.querySelector('.comments').appendChild(note);
    }
  }

  // Event page gets its own living discussion without changing the event's established details.
  if(location.pathname.includes('/events/capulet-party/')){
    const body=document.querySelector('.event-body');
    if(body && !body.querySelector('.ts-event-discussion')){
      const sec=document.createElement('section');sec.className='ts-event-discussion';sec.innerHTML='<h2>Discussion</h2><div class="comments thread-expanded"></div>';
      C.lordParty.forEach(c=>sec.querySelector('.comments').appendChild(makeComment(c)));
      body.appendChild(sec);
    }
  }
});


/* Update 23 — universal Photos-section full-image viewer. */
document.addEventListener('DOMContentLoaded', () => {
  const candidates=[...document.querySelectorAll('.photo-grid img, #photos img, [data-tab-panel="photos"] img, .photos-grid img')]
    .filter((img,index,arr)=>arr.indexOf(img)===index)
    .filter(img=>{
      const src=(img.currentSrc||img.src||'').toLowerCase();
      return src && !src.includes('placeholder') && !src.endsWith('.svg');
    });
  if(!candidates.length) return;

  const style=document.createElement('style');
  style.textContent=`
    .ts-photo-viewable{cursor:zoom-in}
    .ts-photo-lightbox[hidden]{display:none!important}
    .ts-photo-lightbox{position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.92);display:flex;align-items:center;justify-content:center;padding:54px 64px 42px}
    .ts-photo-lightbox-image{display:block;max-width:100%;max-height:calc(100vh - 96px);width:auto;height:auto;object-fit:contain;box-shadow:0 8px 40px rgba(0,0,0,.45)}
    .ts-photo-lightbox-close,.ts-photo-lightbox-prev,.ts-photo-lightbox-next{position:fixed;border:0;background:rgba(0,0,0,.38);color:#fff;cursor:pointer;z-index:10001;font-family:Arial,sans-serif}
    .ts-photo-lightbox-close{right:18px;top:14px;width:44px;height:44px;border-radius:50%;font-size:32px;line-height:40px}
    .ts-photo-lightbox-prev,.ts-photo-lightbox-next{top:50%;transform:translateY(-50%);width:48px;height:64px;border-radius:8px;font-size:40px;line-height:60px}
    .ts-photo-lightbox-prev{left:10px}.ts-photo-lightbox-next{right:10px}
    .ts-photo-lightbox button:hover,.ts-photo-lightbox button:focus{background:rgba(255,255,255,.18);outline:2px solid rgba(255,255,255,.65)}
    @media(max-width:700px){.ts-photo-lightbox{padding:54px 10px 24px}.ts-photo-lightbox-image{max-height:calc(100vh - 78px)}.ts-photo-lightbox-prev,.ts-photo-lightbox-next{width:38px;height:54px;font-size:30px;background:rgba(0,0,0,.5)}}
  `;
  document.head.appendChild(style);

  const overlay=document.createElement('div');
  overlay.className='ts-photo-lightbox';overlay.hidden=true;
  overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-label','Full photo viewer');
  overlay.innerHTML='<button class="ts-photo-lightbox-close" type="button" aria-label="Close photo">×</button><button class="ts-photo-lightbox-prev" type="button" aria-label="Previous photo">‹</button><img class="ts-photo-lightbox-image" alt=""><button class="ts-photo-lightbox-next" type="button" aria-label="Next photo">›</button>';
  document.body.appendChild(overlay);
  const full=overlay.querySelector('.ts-photo-lightbox-image');
  const closeBtn=overlay.querySelector('.ts-photo-lightbox-close');
  const prevBtn=overlay.querySelector('.ts-photo-lightbox-prev');
  const nextBtn=overlay.querySelector('.ts-photo-lightbox-next');
  let current=0,lastFocus=null;

  const render=()=>{const source=candidates[current];full.src=source.dataset.full||source.currentSrc||source.src;full.alt=source.alt||'Photo';const multi=candidates.length>1;prevBtn.hidden=!multi;nextBtn.hidden=!multi;};
  const open=n=>{current=n;lastFocus=document.activeElement;render();overlay.hidden=false;document.body.style.overflow='hidden';closeBtn.focus();};
  const close=()=>{overlay.hidden=true;document.body.style.overflow='';full.removeAttribute('src');if(lastFocus&&lastFocus.focus)lastFocus.focus();};
  const move=d=>{current=(current+d+candidates.length)%candidates.length;render();};

  candidates.forEach((img,n)=>{img.classList.add('ts-photo-viewable');img.tabIndex=0;img.setAttribute('role','button');img.setAttribute('aria-label',(img.alt||'Photo')+' — open full image');img.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();open(n)});img.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open(n)}})});
  closeBtn.addEventListener('click',close);prevBtn.addEventListener('click',()=>move(-1));nextBtn.addEventListener('click',()=>move(1));
  overlay.addEventListener('click',e=>{if(e.target===overlay)close()});
  document.addEventListener('keydown',e=>{if(overlay.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')move(-1);if(e.key==='ArrowRight')move(1)});
});
