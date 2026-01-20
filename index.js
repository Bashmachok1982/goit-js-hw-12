import{a as q,S,i as l}from"./assets/vendor-DvfmeZXB.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const v="https://pixabay.com/api/",P="54231324-92d51f5acf633d69a742454d8";async function B(o,t=1){const a={key:P,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t};try{const i=await q.get(v,{params:a});return{hits:i.data.hits,totalHits:i.data.totalHits}}catch(i){throw i}}const c=document.querySelector(".gallery"),d=document.querySelector(".loader"),u=document.querySelector(".load-more"),E=new S(".gallery a",{captionsData:"alt",captionDelay:250});function $(o){if(!o||o.length===0||!c)return;const t=o.map(({webformatURL:a,largeImageURL:i,tags:e="Image",likes:r,views:s,comments:b,downloads:w})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${i}">
          <img
            class="gallery-image"
            src="${a}"
            alt="${e.replace(/"/g,"&quot;")}"
            loading="lazy"
          />
        </a>
        <div class="info">
          <p><b>Likes</b> ${r}</p>
          <p><b>Views</b> ${s}</p>
          <p><b>Comments</b> ${b}</p>
          <p><b>Downloads</b> ${w}</p>
        </div>
      </li>
    `).join("");c.insertAdjacentHTML("beforeend",t),E.refresh()}function g(){c&&(c.innerHTML="")}function h(){d&&d.classList.remove("hidden")}function H(){d&&d.classList.add("hidden")}function M(){u&&u.classList.remove("hidden")}function f(){u&&u.classList.add("hidden")}let p="",n=1,m=0;const y=document.querySelector(".form"),O=document.querySelector(".load-more");y.addEventListener("submit",o=>{o.preventDefault();const t=o.target.elements.searchQuery.value.trim();if(!t){l.warning({message:"Please enter a search query!",position:"topRight",timeout:3e3});return}p=t,n=1,g(),f(),h(),L()});O.addEventListener("click",()=>{n+=1,h(),L(!0)});async function L(o=!1){try{const t=await B(p,n);if(t.hits.length===0){n===1&&l.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),f();return}o||g(),$(t.hits),m=t.totalHits,n*15<m?M():(f(),l.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:5e3}));const a=document.querySelector(".gallery-item");if(a){const i=a.getBoundingClientRect().height;window.scrollBy({top:i*2,behavior:"smooth"})}}catch{l.error({message:"Something went wrong. Please try again later.",position:"topRight",timeout:5e3})}finally{H(),y.reset()}}
//# sourceMappingURL=index.js.map
