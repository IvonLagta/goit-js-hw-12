/* empty css                      */import{a as f,S as b,i}from"./assets/vendor-COEJfE63.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))u(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&u(c)}).observe(document,{childList:!0,subtree:!0});function e(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function u(t){if(t.ep)return;t.ep=!0;const o=e(t);fetch(t.href,o)}})();const v="54673230-281fb694487da15dcd571070d",w="https://pixabay.com/api/";f.defaults.baseURL=w;async function p(s,r=1){return(await f.get("",{params:{key:v,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:15}})).data}const m=document.querySelector(".gallery"),h=document.querySelector(".loader-text"),R=new b(".gallery a",{captionsData:"alt",captionDelay:250});function y(s){const r=s.map(e=>`
      <li class="gallery-item">
        <a href="${e.largeImageURL}">
          <img src="${e.webformatURL}" alt="${e.tags}" />
        </a>
        <div class="info">
          <p><b>Likes</b>${e.likes}</p>
          <p><b>Views</b>${e.views}</p>
          <p><b>Comments</b>${e.comments}</p>
          <p><b>Downloads</b>${e.downloads}</p>
        </div>
      </li>
    `).join("");m.insertAdjacentHTML("beforeend",r),R.refresh()}function S(){m.innerHTML=""}function g(){h.classList.remove("hidden")}function L(){h.classList.add("hidden")}const q=document.querySelector(".form"),a=document.querySelector(".load-more");let l="",n=1,d=0;q.addEventListener("submit",async s=>{s.preventDefault();const r=s.currentTarget.elements["search-text"].value.trim();if(!r){i.warning({message:"Please enter a search query!",position:"topRight"});return}l=r,n=1,S(),a.classList.add("hidden"),g();try{const e=await p(l,n);if(d=e.totalHits,e.hits.length===0){i.info({message:"Sorry, no images found.",position:"topRight"});return}y(e.hits),d>15&&a.classList.remove("hidden")}catch{i.error({message:"Error fetching images.",position:"topRight"})}finally{L()}});a.addEventListener("click",async()=>{n+=1,g(),a.classList.add("hidden");try{const s=await p(l,n);y(s.hits),n*15>=d?(i.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),a.classList.add("hidden")):a.classList.remove("hidden")}catch{i.error({message:"Error loading more images.",position:"topRight"})}finally{L()}});
//# sourceMappingURL=index.js.map
