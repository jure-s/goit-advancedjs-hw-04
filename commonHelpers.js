import{i,S as y,a as b}from"./assets/vendor-f67ecabd.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const f of s.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&a(f)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();i.settings({position:"topRight",timeout:3e3,close:!1});const L="40910932-9fe08a71e8ac0f3a1299db850",m=document.getElementById("search-form"),g=document.querySelector(".gallery");let u=1,n="";const w=new y(".gallery a");let d=!1,c=!1,l=!1;m.addEventListener("submit",async t=>{if(t.preventDefault(),u=1,g.innerHTML="",n=new FormData(m).get("searchQuery").trim(),d=!1,c=!1,l=!1,n!==""){const a=await p(n);h(a)}else i.info({title:"Info",message:"Please enter a search query."})});async function p(t){return(await b.get("https://pixabay.com/api/",{params:{key:L,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:u,per_page:40}})).data}function h(t){t.hits.length===0?i.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again."}):(v(t.hits),d||(i.success({title:"Success",message:`Hooray! We found ${t.totalHits} images.`}),d=!0),w.refresh(),u++,t.hits.length<40&&(c=!0))}function v(t){let r="";t.forEach(o=>{const a=`
      <div class="info">
        <p class="info-item"><b>Likes:</b> ${o.likes}</p>
        <p class="info-item"><b>Views:</b> ${o.views}</p>
        <p class="info-item"><b>Comments:</b> ${o.comments}</p>
        <p class="info-item"><b>Downloads:</b> ${o.downloads}</p>
      </div>
    `,s=`
      <div class="photo-card">
        ${`
      <a href="${o.largeImageURL}" data-lightbox="gallery-images">
        <img src="${o.webformatURL}" alt="${o.tags}" loading="lazy">
      </a>
    `}
        ${a}
      </div>
    `;r+=s}),g.insertAdjacentHTML("beforeend",r)}function I(){const{scrollTop:t,clientHeight:r,scrollHeight:o}=document.documentElement;t+r>=o-5&&(!c&&!l?p(n).then(a=>{h(a)}):c&&!l&&(i.info({title:"Info",message:"No more images to load."}),l=!0))}window.addEventListener("scroll",I);
//# sourceMappingURL=commonHelpers.js.map
