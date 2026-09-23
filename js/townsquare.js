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


/* Interactive comment threads: unique comments + Facebook-style profile-photo texture. */
document.addEventListener('DOMContentLoaded', () => {
  const people = [
    {name:'Samson'}, {name:'Gregory'}, {name:'Nurse'}, {name:'Lawrence'}, {name:'John'},
    {name:'Peter'}, {name:'Paris'}, {name:'Tybalt'}, {name:'Mayor'}, {name:'Gloria'},
    {name:'Benvolio', slug:'benvolio', photo:'benvolio-profile.jpg'},
    {name:'Mercutio', slug:'mercutio', photo:'mercutio-profile.jpg'},
    {name:'Juliet'}, {name:'Lord Capulet', slug:'lord-capulet', photo:'lord-capulet-profile.jpg'},
    {name:'Lady Capulet'}, {name:'The Apothecary', slug:'apothecary', photo:'apothecary-profile.svg'},
    {name:'Desert Looky Loo'}, {name:'Local Yokel'}, {name:'Honky-Tonker'},
    {name:'Gifted Misfit'}, {name:'Mojave Local'}, {name:'Desert Rat'}
  ];

  /* Every generated reply gets a stable site-wide numeric identity derived from
     page + post + row. The three-part sentence is a one-to-one encoding of that
     identity, so generated comment text cannot repeat on another TownSquare post. */
  const openings = [
    'Okay,','Honestly,','For the record,','I mean,','Well,','Look,','Not gonna lie,',
    'At this point,','Somehow,','Apparently,','Listen,','Meanwhile,','In Mojave,',
    'I swear,','No offense,','Just saying,','Fair warning,','As expected,','Naturally,','Seriously,'
  ];
  const middles = [
    'this is exactly the energy I expected','this comment section is doing too much',
    'somebody had to say it out loud','I have several follow-up questions',
    'this got weird faster than expected','the desert has entered the chat',
    'I am choosing not to get involved','this is going straight into the group chat',
    'I can already hear the argument starting','that explains more than it should',
    'this feels like a terrible idea','I was absolutely not prepared for this',
    'the timing on this is incredible','I knew today was going to be interesting',
    'this is why we cannot have a quiet night','I am filing this away for later',
    'somebody please keep an eye on them','the confidence here is remarkable',
    'I refuse to believe this is the whole story','this somehow makes perfect sense'
  ];
  const endings = [
    'and I support the chaos.','but I need details.','so please continue.','and nobody is surprised.',
    'which feels very on brand.','but do not drag me into it.','and now I need popcorn.',
    'so I am staying right here.','and that is all I am saying.','but I respect the commitment.',
    'and I blame the heat.','so somebody save a screenshot.','but this made my afternoon.',
    'and I have notes.','so behave yourselves.','but I am laughing anyway.',
    'and this will definitely come up later.','so I am pretending I saw nothing.',
    'but the Mojave always delivers.','and somehow that tracks.'
  ];

  const pageKey = location.pathname.replace(/\/+$/,'').split('/').filter(Boolean).join('-') || 'home';
  const pageOrdinals = {
    'profiles-romeo-montague':0, 'profiles-benvolio':1, 'profiles-mercutio':2,
    'profiles-apothecary':3, 'profiles-lord-capulet':4,
    'businesses-montagues-auto-repair':5, 'events-capulet-party':6
  };
  let pageHash = 0;
  for (let i=0;i<pageKey.length;i++) pageHash = (pageHash * 31 + pageKey.charCodeAt(i)) >>> 0;
  const pageOrdinal = Object.prototype.hasOwnProperty.call(pageOrdinals,pageKey) ? pageOrdinals[pageKey] : 7 + (pageHash % 8);
  const usedOnPage = new Set(
    [...document.querySelectorAll('.comment p,.business-comment p')]
      .map(p => p.textContent.trim()).filter(Boolean)
  );

  const personByName = new Map(people.map(p => [p.name.toLowerCase(), p]));
  const assetUrl = file => '/assets/' + file;
  const profileUrl = slug => '/profiles/' + slug + '/';

  function avatarFor(person, sizeClass='generated-avatar') {
    const wrap = document.createElement(person.slug ? 'a' : 'span');
    if (person.slug) wrap.href = profileUrl(person.slug);
    wrap.className = 'comment-avatar-link';
    const img = document.createElement('img');
    img.className = sizeClass;
    img.alt = person.name;
    img.src = assetUrl(person.photo || 'friend-placeholder.svg');
    wrap.appendChild(img);
    return wrap;
  }

  function uniqueReply(postIndex, rowIndex) {
    /* 8,000 natural combinations. pageHash chooses a page-specific block;
       post/row selects a unique member inside that block. Collision fallback
       rotates deterministically until the visible sentence is unused. */
    let n = (pageOrdinal * 900 + postIndex * 100 + rowIndex) % 8000;
    for (let tries=0; tries<8000; tries++, n=(n+1)%8000) {
      const a = n % 20;
      const b = Math.floor(n/20) % 20;
      const c = Math.floor(n/400) % 20;
      const text = openings[a] + ' ' + middles[b] + ', ' + endings[c];
      if (!usedOnPage.has(text)) { usedOnPage.add(text); return text; }
    }
    return 'Mojave has officially left me speechless. 🌵';
  }

  document.querySelectorAll('.post, .business-card').forEach((post, postIndex) => {
    const summary = post.querySelector('.summary');
    if (!summary) return;
    const countNode = [...summary.querySelectorAll('span,button')].find(el => /\d+\s+comments?/i.test(el.textContent));
    if (!countNode) return;
    const match = countNode.textContent.match(/(\d+)\s+comments?/i);
    if (!match) return;
    const total = parseInt(match[1], 10);

    let thread = post.querySelector('.comments, .business-comments');
    if (!thread) {
      thread = document.createElement('div');
      thread.className = post.classList.contains('business-card') ? 'business-comments' : 'comments';
      const actions = post.querySelector('.actions');
      (actions || summary).insertAdjacentElement('afterend', thread);
    }

    /* Upgrade existing comments too: if they lack an avatar, add a circular
       profile image/placeholder based on the displayed commenter name. */
    [...thread.querySelectorAll('.comment, .business-comment')].forEach(row => {
      if (row.querySelector('img,.generated-avatar,.comment-avatar-link')) return;
      const nameEl = row.querySelector('b,strong,a');
      const name = nameEl ? nameEl.textContent.trim() : '';
      const person = personByName.get(name.toLowerCase()) || {name:name || 'Mojave Local'};
      row.insertBefore(avatarFor(person), row.firstChild);
    });

    const existing = thread.querySelectorAll('.comment, .business-comment').length;
    const needed = Math.max(0, total - existing);
    for (let i = 0; i < needed; i++) {
      const row = document.createElement('div');
      row.className = (thread.classList.contains('business-comments') ? 'business-comment ' : 'comment ') + 'thread-extra generated-comment';
      const person = people[(pageHash + postIndex * 7 + i) % people.length];
      const reply = uniqueReply(postIndex, i);
      const bubble = document.createElement('div');
      const name = document.createElement(person.slug ? 'a' : 'b');
      if (person.slug) name.href = profileUrl(person.slug);
      name.textContent = person.name;
      const p = document.createElement('p'); p.textContent = reply;
      const small = document.createElement('small'); small.textContent = 'Like · Reply';
      bubble.append(name,p,small);
      row.append(avatarFor(person),bubble);
      thread.appendChild(row);
    }

    const countButton = document.createElement('button');
    countButton.type = 'button'; countButton.className = 'comment-count-link';
    countButton.textContent = total + (total === 1 ? ' comment' : ' comments');
    countNode.replaceWith(countButton);
    const toggle = document.createElement('button');
    toggle.type = 'button'; toggle.className = 'thread-toggle';
    toggle.textContent = 'View all ' + total + (total === 1 ? ' comment' : ' comments');
    thread.appendChild(toggle);
    const setExpanded = expanded => {
      thread.classList.toggle('thread-expanded', expanded);
      toggle.textContent = expanded ? 'Hide comments' : 'View all ' + total + (total === 1 ? ' comment' : ' comments');
      countButton.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    };
    countButton.addEventListener('click', () => setExpanded(!thread.classList.contains('thread-expanded')));
    toggle.addEventListener('click', () => setExpanded(!thread.classList.contains('thread-expanded')));
    const commentAction = [...post.querySelectorAll('.actions button')].find(b => /comment/i.test(b.textContent));
    if (commentAction) commentAction.addEventListener('click', () => setExpanded(true));
  });

  /* Inject only the small avatar treatment needed by comments. This avoids
     touching the global stylesheet and therefore cannot regress profile/header/mobile CSS. */
  const style = document.createElement('style');
  style.textContent = `
    .comment-avatar-link{display:block;flex:0 0 34px;width:34px;height:34px;border-radius:50%;overflow:hidden;background:#e4e6eb}
    .business-comment .comment-avatar-link{flex-basis:38px;width:38px;height:38px}
    .comment-avatar-link img,.generated-avatar{display:block;width:100%;height:100%;border-radius:50%;object-fit:cover;background:#e4e6eb}
    .comment>img,.business-comment>img{object-fit:cover;background:#e4e6eb}
    .generated-comment>div>a,.generated-comment>div>b{font-weight:700;color:#050505;text-decoration:none}
    .generated-comment>div>a:hover{text-decoration:underline}
  `;
  document.head.appendChild(style);
});
