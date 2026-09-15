/* Navigation and reading experience. Article source content lives in data.js. */
"use strict";
const main = document.getElementById("main");
document.querySelector('.search-trigger').setAttribute('aria-label','Search EM4Resource');
const esc = value => String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const slug = text => text.toLowerCase().replace(/\+/g,"-plus").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const plain = html => { const node=document.createElement("div");node.innerHTML=html;return node.textContent.replace(/\s+/g," ").trim(); };
const categories = [...new Set(articles.map(a=>a.category))];
const articleMap = new Map();
articles.forEach(a=>{
  let id=slug(a.title), suffix=2;while(articleMap.has(id)) id=slug(a.title)+"-"+suffix++;
  a.id=id; a.searchText=plain(a.body).toLowerCase();
  const node=document.createElement("div");node.innerHTML=a.body;
  const intro=node.querySelector("p");a.excerpt=(intro?intro.textContent:plain(a.body)).replace(/\s+/g," ").trim();
  a.minutes=Math.max(1,Math.ceil(plain(a.body).split(/\s+/).length/220));articleMap.set(id,a);
});
const groups = [
  {name:"Getting started",description:"Installation, first steps, and the tools you need.",categories:["Start Here","Getting Started","Installing Mods","E4M+ Launcher","EM4 Memory Patcher","EM4 History","Discord Rules","EM4Resource Downloads"]},
  {name:"Editor & assets",description:"Work with the editor, models, prototypes, and game files.",categories:["Editor Manual","Folder Structure","Models","Prototypes","Asset Workshop","Lighting"]},
  {name:"Maps & terrain",description:"From a blank map to a working freeplay world.",categories:["Map Basics","New Freeplay Map","Terrain Cleanup","Ground Texture Files","Road and Grass Art","Detail Polygons","Entries and Boundaries","Virtual Objects","Emergency Roads","Civilian Paths","Freeplay Events","Map Testing","Lag and Performance"]},
  {name:"Models & textures",description:"Prepare 3D assets, materials, and textures for Emergency 4.",categories:["3D Modeling","Textures"]},
  {name:"Scripting & SDK",description:"Learn the script system and study working examples.",categories:["Scripting","SDK Glossary","SDK Reference","Freeplay and Missions","Case Studies","Create Your Own Script","Mission Making"]},
  {name:"Building a mod",description:"Add units, transfer assets, and organize your project.",categories:["Mod Creation","Adding a Vehicle","Transferring a Vehicle","Adding a Person","Transferring a Person"]},
  {name:"Audio & interface",description:"Work with sounds, icons, and the game interface.",categories:["Audio","UI and Icons"]},
  {name:"Troubleshooting",description:"Find the cause of crashes, missing textures, and graphics issues.",categories:["Troubleshooting","Common Issues","Cheats and Debugging","Graphics and Shadows","Windows Fullscreen Fix","White Map Bug","Packed and Locked V3O","White Model Fixes"]}
];
const ungrouped=categories.filter(c=>!groups.some(g=>g.categories.includes(c)));
if(ungrouped.length)groups.push({name:"More resources",description:"Additional community reference material.",categories:ungrouped});
groups.forEach(g=>g.categories=g.categories.filter(c=>categories.includes(c)));
const articleHref = title => {const a=articles.find(a=>a.title===title);return a?'#article/'+a.id:'#library';};
const categoryHref = category => '#category/'+encodeURIComponent(category);
const count = category => articles.filter(a=>a.category===category).length;
function linkArticle(title,label=title){return `<a href="${articleHref(title)}">${esc(label)}</a>`;}
function heading(kicker,title,description=""){return `<header class="page-heading"><span class="eyebrow">${esc(kicker)}</span><h1 tabindex="-1">${esc(title)}</h1>${description?`<p>${esc(description)}</p>`:""}</header>`;}
function crumb(...items){return `<nav class="breadcrumb" aria-label="Breadcrumb"><a href="#home">Home</a>${items.map(([label,href])=>`<span aria-hidden="true">/</span>${href?`<a href="${href}">${esc(label)}</a>`:`<span>${esc(label)}</span>`}`).join("")}</nav>`;}
function sidebar(active=""){
 return `<button type="button" class="mobile-topics" aria-controls="topicNav" aria-expanded="false">Browse topics <span aria-hidden="true">＋</span></button><aside class="docs-sidebar" id="topicNav" aria-label="Guide topics"><div class="sidebar-heading"><a href="#library">The guide library</a><span>${articles.length} articles</span></div>${groups.map((g,i)=>`<details class="nav-section" ${g.categories.includes(active)||(!active&&i===0)?"open":""}><summary>${esc(g.name)}</summary>${g.categories.map(c=>`<a href="${categoryHref(c)}" ${c===active?'aria-current="page"':""}>${esc(c)}</a>`).join("")}</details>`).join("")}</aside>`;
}
function docs(content,active="",breadcrumb=[]){return `<div class="wrap">${crumb(["Guides","#library"],...breadcrumb)}<div class="docs-layout">${sidebar(active)}<div class="docs-content">${content}</div></div></div>`;}
function row(a){return `<a class="result-row" href="#article/${a.id}"><div><span class="result-category">${esc(a.category)} · ${a.minutes} min read</span><h2>${esc(a.title)}</h2><p>${esc(a.excerpt.slice(0,175))}${a.excerpt.length>175?"…":""}</p></div><span aria-hidden="true">↗</span></a>`;}
function renderHome(){
 const files=getDownloadFiles();
 const featured=[files.find(f=>f.title==='999 OTF Mod'),files.find(f=>f.title.startsWith('Beaverhead County Modification Version')),files.find(f=>f.category==='tools')];
 const guides=[['How to Install a Mod','Your first Emergency 4 mod','Install a modification, find its files, and get it running.'],['Adding a Vehicle','Bring your vehicles into the game','Follow the workflow for adding a vehicle to your modification.'],['Emergency 4 Editor Basics','Get to know the editor','Learn the tools and controls you need to start building.']];
 main.innerHTML=`<div class="gpm-home"><a class="gpm-community-bar" href="https://discord.gg/A8jRzGqrPK" target="_blank" rel="noopener noreferrer">Our Discord is open to the Emergency 4 community. Join us! <b aria-hidden="true">›</b></a>
 <section class="gpm-hero"><div id="communityGallery"></div><div class="gpm-hero-inner"><h1>The latest and greatest<br>of EM4 modding.</h1><div class="gpm-hero-links"><a href="${articleHref('E4M+ Launcher 3.5')}">Explore E4M+ <span aria-hidden="true">❯</span></a><a href="#downloads">EM4Resource downloads <span aria-hidden="true">❯</span></a><a href="#library">Modding guides <span aria-hidden="true">❯</span></a></div></div></section>
 <section class="gpm-band gpm-tool"><div class="gpm-container gpm-tool-grid"><div><a class="gpm-section-link" href="${articleHref('E4M+ Launcher 3.5')}">E4M+ Launcher</a><h2>EM4Resource is the home of E4M+</h2><p>Build beyond the standard Emergency 4 map.</p><p>E4M+ gives your projects <strong>four times the playable map area</strong>, supports 16,384 × 16,384 terrain textures, and includes tools to convert existing maps and launch the editor.</p><a class="gpm-button" href="${articleHref('E4M+ Launcher 3.5')}">See how to get started <span aria-hidden="true">❯</span></a><small class="gpm-compatibility">For supported Steam / digital installations.</small></div><figure class="gpm-map-comparison"><div class="comparison-heading"><strong>E4M<span>+</span></strong><span>More room to build.</span></div><div class="area-comparison" role="img" aria-label="E4M+ has four times the playable map area of a standard map. The standard map fills one quarter of the expanded area."><div class="expanded-map"><div class="standard-map">Standard<br>map</div><span class="expanded-map-label">E4M+ map</span></div><div class="comparison-number"><strong>4×</strong><span>playable area</span></div></div><figcaption>Standard map area compared with an expanded E4M+ map.</figcaption></figure></div></section>
 <section class="gpm-band gpm-files"><div class="gpm-container"><a class="gpm-section-link" href="#downloads">EM4Resource Downloads</a><h2>Featured from the file library</h2><p>Community modifications and tools for your next session.</p><div class="gpm-file-grid">${featured.map(f=>`<article class="gpm-featured-file"><a href="#file/${f.id}" class="gpm-file-cover ${f.category==='tools'?'cover-tool':f.title==='999 OTF Mod'?'cover-photo':'cover-beaverhead'}">${f.title==='999 OTF Mod'?'<img src="assets/img/community-999-otf-steve-s.png" alt="999 OTF Modification screenshot by Steve_S" width="1920" height="1024" loading="lazy">':f.category==='tools'?'<span>E4M<span class="cover-plus">+</span><small>Launcher 3.5</small></span>':'<span>BEAVERHEAD<br>COUNTY<small>Modification · Version 1.5</small></span>'}</a><div class="gpm-file-caption"><h3><a href="#file/${f.id}">${esc(f.title)}</a></h3><p>${esc(f.metadata.join(' · '))}</p>${f.title==='999 OTF Mod'?'<small>Photo: Steve_S — 999 OTF Modification</small>':''}</div></article>`).join('')}</div></div></section>
 <section class="gpm-band gpm-guides"><div class="gpm-container"><a class="gpm-section-link" href="#library">EM4Resource Guides</a><h2>From the modding library</h2><p>Practical help for getting started and building something of your own.</p><div class="gpm-guide-grid">${guides.map(([title,label,description])=>`<article><h3><a href="${articleHref(title)}">${label}</a></h3><p>${description}</p><a class="gpm-button" href="${articleHref(title)}">Read the guide <span aria-hidden="true">❯</span></a></article>`).join('')}</div></div></section>
 <section class="gpm-band gpm-about"><div class="gpm-container"><a class="gpm-section-link" href="#article/about-em4resource">About EM4Resource</a><h2>A community built around Emergency 4</h2><p>Find a mod. Learn the tools. Share what you create.</p><div class="gpm-stats"><div><strong>${files.length}</strong><p>files in the download library.</p><a class="gpm-button" href="#downloads">Browse downloads ❯</a></div><div><strong>${articles.length}</strong><p>guides and reference articles.</p><a class="gpm-button" href="#library">Explore the library ❯</a></div><div><strong>${categories.length}</strong><p>topics covering EM4 modding.</p><a class="gpm-button" href="#library">Find your topic ❯</a></div></div><div class="gpm-community-links"><a class="gpm-discord" href="https://discord.gg/A8jRzGqrPK" target="_blank" rel="noopener noreferrer"><img src="assets/img/brands/discord-logo.svg" alt="Discord" width="219" height="32"><span>Join the conversation ❯</span></a><a class="gpm-patreon" href="https://www.patreon.com/em4resource" target="_blank" rel="noopener noreferrer"><img src="assets/img/brands/patreon-wordmark.svg" alt="Patreon" width="1826" height="620"><span>Support EM4Resource ❯</span></a></div></div></section></div>`;
 mountCommunityGallery(document.getElementById('communityGallery'));
 document.title='EM4Resource — Emergency 4 modding community';
}
function renderLibrary(){
 main.innerHTML=docs(heading('The reference library','Guides & reference.',`Browse ${articles.length} articles across ${categories.length} topics. Pick a subject or search for a specific problem.`)+groups.map(g=>`<section class="catalog-section"><h2>${esc(g.name)}</h2><p class="category-description">${esc(g.description)}</p><div class="category-links">${g.categories.map(c=>`<a href="${categoryHref(c)}">${esc(c)}<span>${count(c)} →</span></a>`).join('')}</div></section>`).join(''));
 document.title='Guide library — EM4Resource';
}
function renderCategory(category){
 if(!categories.includes(category)){renderMissing();return;}
 const list=articles.filter(a=>a.category===category);const group=groups.find(g=>g.categories.includes(category));
 main.innerHTML=docs(heading(`${list.length} articles`,category,group.description)+list.map(row).join(''),category,[[category]]);
 document.title=category+' — EM4Resource';
}
function renderTopic(id){
 const g=groups.find(g=>slug(g.name)===id);if(!g){renderMissing();return;}
 const total=g.categories.reduce((n,c)=>n+count(c),0);
 main.innerHTML=docs(heading(`${total} articles · ${g.categories.length} topics`,g.name,g.description)+`<section class="catalog-section"><div class="category-links">${g.categories.map(c=>`<a href="${categoryHref(c)}">${esc(c)}<span>${count(c)} →</span></a>`).join('')}</div></section><h2 style="font-size:22px;margin-top:35px">Start reading</h2>`+g.categories.map(c=>articles.find(a=>a.category===c)).slice(0,6).map(row).join(''),g.categories[0],[[g.name]]);
 document.title=g.name+' — EM4Resource';
}
function enhanceArticle(root){
 root.querySelectorAll('table').forEach(table=>{const wrap=document.createElement('div');wrap.className='table-scroll';wrap.tabIndex=0;wrap.setAttribute('role','region');wrap.setAttribute('aria-label','Scrollable reference table');table.before(wrap);wrap.append(table);});
 root.querySelectorAll('a[target="_blank"]').forEach(a=>a.rel='noopener noreferrer');
 root.querySelectorAll('img').forEach(img=>img.loading='lazy');
 root.querySelectorAll('pre').forEach(pre=>{
  const button=document.createElement('button');button.type='button';button.className='copy-code';button.textContent='Copy code';button.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(pre.textContent);button.textContent='Copied';}catch{const range=document.createRange();range.selectNodeContents(pre);const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);button.textContent='Selected — press Ctrl+C';}setTimeout(()=>button.textContent='Copy code',2500);});pre.before(button);
 });
}
function renderArticle(id){
 const a=articleMap.get(id);if(!a){renderMissing();return;}
 if(a.title==='Modification Downloads'){renderDownloads();return;}
 main.innerHTML=docs(`<div class="reader-layout"><article class="article-sheet">${heading(a.category,a.title)}<div class="article-body">${a.body}</div><div class="topic-tags">Topics: ${a.tags.map(esc).join(' · ')}</div><div class="article-end"><a href="${categoryHref(a.category)}">← More in ${esc(a.category)}</a><a href="https://discord.gg/A8jRzGqrPK" target="_blank" rel="noopener noreferrer">Ask the community ↗</a></div></article><nav class="reader-toc" aria-label="On this page"><strong>On this page</strong><div class="toc-links"></div><div class="toc-bottom"><a href="${categoryHref(a.category)}">← ${esc(a.category)}</a><a href="#home">Back to home</a></div></nav></div>`,a.category,[[a.category,categoryHref(a.category)],[a.title]]);
 const meta=document.createElement('p');meta.className='article-meta';meta.textContent=`${a.minutes} min read · EM4Resource reference`;main.querySelector('.page-heading').append(meta);
 const body=main.querySelector('.article-body');enhanceArticle(body);
 const headings=[...body.querySelectorAll('h2,h3')];main.querySelector('.toc-links').innerHTML=headings.length?headings.map((h,i)=>{h.id='section-'+i;return `<a href="#article/${id}?section=${i}">${esc(h.textContent)}</a>`;}).join(''):'<a href="#main">Article overview ↑</a>';
 document.title=a.title+' — EM4Resource';
}
function renderDownloads(){renderFileLibrary();applyFileRoute();document.title='Downloads — EM4Resource';}
function searchArticles(query){
 const words=query.toLowerCase().trim().split(/\s+/).filter(Boolean);if(!words.length)return [];
 return articles.map(a=>{const title=a.title.toLowerCase();const meta=[title,a.category,...a.tags].join(' ').toLowerCase();const all=meta+' '+a.searchText;return {a,score:words.every(w=>all.includes(w))?words.reduce((s,w)=>s+(title.includes(w)?10:meta.includes(w)?4:1),0):0};}).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).map(x=>x.a);
}
function renderSearch(query){
 const found=searchArticles(query);const foundFiles=getDownloadFiles().filter(f=>matchesFile(f,query));main.innerHTML=docs(heading('Search the library',query?`Results for “${query}”`:'Search the guides',`${found.length} matching guides · ${foundFiles.length} downloads.`)+(foundFiles.length?`<section class="search-file-results"><h2>Downloads</h2>${foundFiles.map(f=>fileCard(f,true)).join('')}</section>`:'')+(found.length?found.map(row).join(''):`<div class="empty-state"><h2>No guides found</h2><p>Try a shorter term, a file extension such as V3O, or the name of the tool you are using.</p><button class="button" type="button" data-search-open>Try another search →</button></div>`));document.title='Search — EM4Resource';
}
function renderMissing(){main.innerHTML=`<div class="wrap" style="padding-top:60px;padding-bottom:90px">${heading('Page not found','Let’s get you back on track.','This article or topic could not be found.')}<a class="button" href="#library">Browse the guide library →</a></div>`;document.title='Page not found — EM4Resource';}
let lastRoute='';
function renderRoute(){
 const raw=location.hash.slice(1)||'home';let path,section;
 try{[path,section]=raw.split('?');path=decodeURIComponent(path);}catch{renderMissing();return;}
 const [type,...rest]=path.split('/');const value=rest.join('/');
 if(path!==lastRoute){
  disposeCommunityGallery();
  main.classList.toggle('is-home',type==='home');
  if(type==='home')renderHome();else if(type==='file')renderFileDetail(value);else if(type==='library')renderLibrary();else if(type==='category')renderCategory(value);else if(type==='topic')renderTopic(value);else if(type==='article')renderArticle(value);else if(type==='downloads')renderDownloads();else if(type==='search')renderSearch(value);else if(type==='main'){if(!lastRoute)renderHome();main.focus();return;}else renderMissing();
  const active=type==='home'?'home':type==='downloads'||type==='file'||(type==='article'&&value==='modification-downloads')?'downloads':type==='article'&&value==='e4m-plus-launcher-3-5'?'launcher':type==='category'&&groups.find(g=>g.name==='Troubleshooting').categories.includes(value)?'help':'library';
  document.querySelectorAll('[data-nav]').forEach(a=>{if(a.dataset.nav===active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  document.getElementById('primaryNav').classList.remove('is-open');document.getElementById('menuToggle').setAttribute('aria-expanded','false');
  if(lastRoute){const h=main.querySelector('h1');if(h){h.tabIndex=-1;h.focus({preventScroll:true});}}
  window.scrollTo({top:0,behavior:'instant'});lastRoute=path;
 }
 if(type==='downloads')applyFileRoute(section);
 if(section && type!=='downloads'){const n=new URLSearchParams(section).get('section');const el=n!==null?document.getElementById('section-'+n):null;if(el)el.scrollIntoView({behavior:'instant',block:'start'});}
}
const dialog=document.getElementById('searchDialog'),searchBox=document.getElementById('searchBox'),quickResults=document.getElementById('searchResults');
function quickSearch(){
 const query=searchBox.value.trim();const found=query?searchArticles(query):['How to Install a Mod','EM4 Memory Patcher','Adding a Vehicle'].map(t=>articles.find(a=>a.title===t));
 quickResults.innerHTML=found.length?`${!query?'<p>Useful starting points</p>':''}${found.slice(0,7).map(a=>`<a href="#article/${a.id}"><strong>${esc(a.title)}</strong><small>${esc(a.category)}</small></a>`).join('')}${query?`<a href="#search/${encodeURIComponent(query)}"><strong>View all ${found.length} results →</strong></a>`:''}`:'<p>No matches yet. Try “V3O”, “editor”, or “install”.</p>';
}
function openSearch(){if(!dialog.open)dialog.showModal();quickSearch();searchBox.focus();searchBox.select();}
document.addEventListener('click',event=>{
 const target=event.target.closest('a,button');if(!target)return;
 if(target.matches('[data-search-open]'))openSearch();
 if(target.matches('.close-search'))dialog.close();
 if(target.matches('.mobile-topics')){const open=target.getAttribute('aria-expanded')!=='true';target.setAttribute('aria-expanded',String(open));document.getElementById('topicNav').classList.toggle('is-open',open);}
 if(target.matches('[data-open-article]')){const href=articleHref(target.dataset.openArticle);location.hash=href.slice(1);}
 if(target.matches('.quick-results a'))dialog.close();
 if(target.getAttribute('href')==='#main'){event.preventDefault();main.focus();main.scrollIntoView();}
 // Existing download anchors scroll within their dedicated page, not away from it.
 const href=target.getAttribute('href');if(href&&href.startsWith('#downloads-')){event.preventDefault();const el=document.getElementById(href.slice(1));if(el)el.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
});
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
document.getElementById('menuToggle').addEventListener('click',event=>{const button=event.currentTarget;const open=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(open));document.getElementById('primaryNav').classList.toggle('is-open',open);});
searchBox.addEventListener('input',quickSearch);
document.getElementById('headerSearch').addEventListener('submit',event=>{event.preventDefault();const q=document.getElementById('headerSearchInput').value.trim();if(q)location.hash='search/'+encodeURIComponent(q);else openSearch();});
document.getElementById('searchForm').addEventListener('submit',event=>{event.preventDefault();const q=searchBox.value.trim();if(q){dialog.close();location.hash='search/'+encodeURIComponent(q);}});
document.addEventListener('keydown',event=>{const editing=/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)||document.activeElement.isContentEditable;if((event.key==='/'&&!editing)||((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k')){event.preventDefault();openSearch();}});
dialog.addEventListener('keydown',event=>{if(!['ArrowDown','ArrowUp'].includes(event.key))return;const links=[...quickResults.querySelectorAll('a')];if(!links.length)return;event.preventDefault();let i=links.indexOf(document.activeElement);i=event.key==='ArrowDown'?(i+1)%links.length:(i<=0?links.length-1:i-1);links[i].focus();});
window.addEventListener('hashchange',renderRoute);renderRoute();
