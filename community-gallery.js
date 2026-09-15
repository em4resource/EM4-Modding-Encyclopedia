/* Approved screenshots, with the supplied photographer and modification credits. */
window.EM4_SCREENSHOTS = [
 {src:'assets/img/community-999-otf-steve-s.png',alt:'A rescue helicopter, ambulances, and police at an emergency scene in 999 OTF',creator:'Steve_S',modification:'999 OTF Modification'},
 {src:'assets/img/community-nowa-sucha-d3lta.png',alt:'Firefighters and fire engines responding to a house fire in the rain in Nowa Sucha',creator:'D3lta',modification:'Nowa Sucha Borough Submod'},
 {src:'assets/img/community-halifax-fire-andrewk332.png',alt:'An East Hants fire engine beside a wooded campground in Halifax County at dusk',creator:'Andrewk332',modification:'Halifax County, Nova Scotia Mod'},
 {src:'assets/img/community-beaverhead-mayjah.png',cropHud:true,alt:'Fire, police, and ambulance crews at a truck incident beside a river in Beaverhead County',creator:'mayjah',modification:'Beaverhead County Modification V1.5'},
 {src:'assets/img/community-halifax-police-andrewk332.png',cropHud:true,alt:'An RCMP vehicle and officer near Highway 102 and 107 signs in Halifax County',creator:'Andrewk332',modification:'Halifax County, Nova Scotia Mod'},
 {src:'assets/img/community-beaverhead-fire.png',cropHud:true,alt:'Emergency crews and ambulances at a nighttime collision on a bridge in Beaverhead County',creator:'Fire',modification:'Beaverhead County Mod V1.5'}
];
let disposeCommunityGallery = () => {};
function mountCommunityGallery(host){
 disposeCommunityGallery();
 const slides=[...window.EM4_SCREENSHOTS];
 if(!host||!slides.length)return;
 for(let i=slides.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[slides[i],slides[j]]=[slides[j],slides[i]];}
 try{const previous=sessionStorage.getItem('em4-gallery-opening');if(slides.length>1&&slides[0].src===previous)[slides[0],slides[1]]=[slides[1],slides[0]];sessionStorage.setItem('em4-gallery-opening',slides[0].src);}catch{}
 const controller=new AbortController(),reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let index=-1,timer,fadeTimer,frame,disposed=false,busy=false,started=0;
 const intervalMs=12000,fadeMs=2000;
 host.className='community-gallery gallery-crossfade';host.setAttribute('role','region');host.setAttribute('aria-label','Community screenshots');
 host.innerHTML='<figure class="community-shot"><div class="shot-window"></div><figcaption><span class="shot-credit"></span></figcaption></figure>';
 const canvas=host.querySelector('.shot-window'),credit=host.querySelector('.shot-credit');
 const images=slides.map((slide,i)=>{const img=document.createElement('img');img.className='shot-slide'+(slide.cropHud?' has-game-hud':'');img.alt=slide.alt;img.setAttribute('aria-hidden','true');img.width=1920;img.height=1080;img.decoding='async';img.fetchPriority=i===0?'high':'low';canvas.append(img);return img;});
 const loaded=new Map();
 function load(i){
  if(loaded.has(i))return loaded.get(i);
  const img=images[i],ready=new Promise(resolve=>{img.onload=()=>resolve(true);img.onerror=()=>resolve(false);img.src=slides[i].src;if(img.complete)resolve(img.naturalWidth>0);});
  loaded.set(i,ready);return ready;
 }
 function schedule(){clearTimeout(timer);if(!disposed&&!busy&&index>=0&&!document.hidden&&slides.length>1)timer=setTimeout(()=>show(index+1),Math.max(0,intervalMs-(performance.now()-started)));}
 async function show(next){
  if(disposed||busy)return;
  const target=(next+slides.length)%slides.length;
  clearTimeout(timer);busy=true;
  if(!await load(target)){busy=false;if(!disposed){if(index<0)credit.textContent='Screenshot unavailable';timer=setTimeout(()=>show(target+1),intervalMs);}return;}
  if(disposed)return;
  try{await images[target].decode();}catch{}
  if(disposed)return;
  const first=index<0,old=index;index=target;
  images[index].setAttribute('aria-hidden','false');if(old>=0)images[old].setAttribute('aria-hidden','true');
  if(first)images[index].style.transition='none';
  frame=requestAnimationFrame(()=>{
   if(disposed)return;
   started=performance.now();images[index].classList.add('is-active');if(old>=0)images[old].classList.remove('is-active');
   const finish=()=>{if(disposed)return;images[index].style.removeProperty('transition');credit.textContent=slides[index].creator+' — '+slides[index].modification;busy=false;schedule();load((index+1)%slides.length);};
   if(first||reduced.matches)finish();else fadeTimer=setTimeout(finish,fadeMs);
  });
 }
 document.addEventListener('visibilitychange',()=>{started=performance.now();schedule();},{signal:controller.signal});
 disposeCommunityGallery=()=>{disposed=true;clearTimeout(timer);clearTimeout(fadeTimer);cancelAnimationFrame(frame);controller.abort();};
 show(0);
}
