import{a as v,S as q,i as d}from"./assets/vendor-DvfmeZXB.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function i(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=i(e);fetch(e.href,o)}})();const S="https://pixabay.com/api/",P="54231324-92d51f5acf633d69a742454d8";async function B(t,r=1){const i={key:P,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:r};try{const n=await v.get(S,{params:i});return{hits:n.data.hits,totalHits:n.data.totalHits}}catch(n){throw n}}const u=document.querySelector(".gallery"),s=document.querySelector(".loader"),a=document.querySelector(".load-more"),E=new q(".gallery a",{captionsData:"alt",captionDelay:250});function $(t){if(!t||t.length===0||!u)return;const r=t.map(({webformatURL:i,largeImageURL:n,tags:e="Image",likes:o,views:l,comments:b,downloads:w})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${n}">
          <img
            class="gallery-image"
            src="${i}"
            alt="${e.replace(/"/g,"&quot;")}"
            loading="lazy"
          />
        </a>
        <div class="info">
          <p><b>Likes</b> ${o}</p>
          <p><b>Views</b> ${l}</p>
          <p><b>Comments</b> ${b}</p>
          <p><b>Downloads</b> ${w}</p>
        </div>
      </li>
    `).join("");u.insertAdjacentHTML("beforeend",r),E.refresh()}function h(){u&&(u.innerHTML="")}function g(t="center"){s&&(s.classList.remove("hidden"),s.classList.remove("centered","inline"),t==="center"&&s.classList.add("centered"),t==="inline"&&(a.classList.add("hidden"),a.before(s),s.classList.add("inline")))}function H(){s&&(s.classList.add("hidden"),s.classList.remove("centered","inline"))}function M(){a&&a.classList.remove("hidden")}function f(){a&&a.classList.add("hidden")}let y="",c=1,m=0;const p=document.querySelector(".form"),I=document.querySelector(".load-more");p.addEventListener("submit",t=>{t.preventDefault();const r=t.target.elements.searchQuery.value.trim();if(!r){d.warning({message:"Please enter a search query!",position:"topRight",timeout:3e3});return}y=r,c=1,h(),f(),g("center"),L()});I.addEventListener("click",()=>{c+=1,g("inline"),L(!0)});async function L(t=!1){try{await new Promise(i=>setTimeout(i,300));const r=await B(y,c);if(r.hits.length===0){c===1&&d.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),f();return}if(t||h(),$(r.hits),m=r.totalHits,c*15<m?M():(f(),d.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:5e3})),t){const i=document.querySelectorAll(".gallery-item");if(i.length>0){const n=i[i.length-15],{height:e}=n.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}}}catch{d.error({message:"Something went wrong. Please try again later.",position:"topRight",timeout:5e3})}finally{H(),p.reset()}}
//# sourceMappingURL=index.js.map
