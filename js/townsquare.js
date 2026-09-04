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