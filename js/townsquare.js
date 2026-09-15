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


/* Interactive comment threads: preview two, expand to the full displayed count. */
document.addEventListener('DOMContentLoaded', () => {
  const localNames = [
    'Sam','Gregory','Nurse','Lawrence','Mia G.','Crystal M.','Sariah G.',
    'Jessica M.','Paco D.','Natalie R.','Jack W.','Lisa D.','Eva T.',
    'Lauren W.','Booker H.','Kevin H.','Mojave Local','Desert Rat'
  ];
  const localReplies = [
    '😂','This tracks.','Only in Mojave.','I knew somebody was going to say it.',
    'Absolutely not.','Well, there it is.','You people are exhausting. ❤️',
    'See you at the shop.','I have questions.','No notes.','This made my day.',
    'Please behave.','That seems completely reasonable.','I am staying out of this.',
    'Somebody screenshot this.','Noted. 👀','The desert provides. 🌵','Okay, this is funny.'
  ];

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

    const existing = thread.querySelectorAll('.comment, .business-comment').length;
    const needed = Math.max(0, total - existing);

    for (let i = 0; i < needed; i++) {
      const row = document.createElement('div');
      row.className = (thread.classList.contains('business-comments') ? 'business-comment ' : 'comment ') + 'thread-extra generated-comment';
      const name = localNames[(postIndex + i) % localNames.length];
      const reply = localReplies[(postIndex * 3 + i) % localReplies.length];

      if (thread.classList.contains('business-comments')) {
        row.innerHTML = '<span class="generated-avatar">' + name.charAt(0) + '</span><div><b>' + name + '</b><p>' + reply + '</p><small>Like · Reply</small></div>';
      } else {
        row.innerHTML = '<span class="generated-avatar">' + name.charAt(0) + '</span><div><b>' + name + '</b><p>' + reply + '</p><small>Like · Reply</small></div>';
      }
      thread.appendChild(row);
    }

    // Replace static count text with an accessible clickable control.
    const countButton = document.createElement('button');
    countButton.type = 'button';
    countButton.className = 'comment-count-link';
    countButton.textContent = total + (total === 1 ? ' comment' : ' comments');
    countNode.replaceWith(countButton);

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'thread-toggle';
    toggle.textContent = 'View all ' + total + (total === 1 ? ' comment' : ' comments');
    thread.appendChild(toggle);

    const setExpanded = (expanded) => {
      thread.classList.toggle('thread-expanded', expanded);
      toggle.textContent = expanded ? 'Hide comments' : 'View all ' + total + (total === 1 ? ' comment' : ' comments');
      countButton.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    };

    countButton.addEventListener('click', () => setExpanded(!thread.classList.contains('thread-expanded')));
    toggle.addEventListener('click', () => setExpanded(!thread.classList.contains('thread-expanded')));

    const commentAction = [...post.querySelectorAll('.actions button')].find(b => /comment/i.test(b.textContent));
    if (commentAction) commentAction.addEventListener('click', () => setExpanded(true));
  });
});
