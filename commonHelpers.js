import{i,S as y,a as L}from"./assets/vendor-f67ecabd.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();i.settings({position:"topRight"});const b="40910932-9fe08a71e8ac0f3a1299db850",f=document.getElementById("search-form"),h=document.querySelector(".gallery");let m=1,u="";const E=new y(".gallery a");let p=!1;f.addEventListener("submit",async a=>{a.preventDefault(),m=1,h.innerHTML="",u=new FormData(f).get("searchQuery").trim(),await g(u)});async function g(a){try{const t=await L.get("https://pixabay.com/api/",{params:{key:b,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,page:m,per_page:40}});if(t.status===200){const s=t.data;if(s&&s.hits&&Array.isArray(s.hits)&&s.totalHits!==void 0){const o=s.hits,e=s.totalHits;o.length===0?i.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again."}):(w(o),p||(i.success({title:"Success",message:`Hooray! We found ${e} images.`}),p=!0),E.refresh(),m++)}else i.error({title:"Error",message:"Response format is incorrect. Please try again."})}else i.error({title:"Error",message:"Failed to fetch images. Please try again."})}catch(t){console.error("Error fetching images:",t),i.error({title:"Error",message:"Failed to fetch images. Please try again."})}}function w(a){a.forEach(t=>{const s=document.createElement("a");s.href=t.largeImageURL,s.setAttribute("data-lightbox","gallery-images");const o=document.createElement("div");o.classList.add("photo-card");const e=document.createElement("img");e.src=t.webformatURL,e.alt=t.tags,e.loading="lazy",s.appendChild(e),o.appendChild(s);const r=document.createElement("div");r.classList.add("info");const n=document.createElement("p");n.classList.add("info-item"),n.innerHTML=`<b>Likes:</b> ${t.likes}`,r.appendChild(n);const c=document.createElement("p");c.classList.add("info-item"),c.innerHTML=`<b>Views:</b> ${t.views}`,r.appendChild(c);const l=document.createElement("p");l.classList.add("info-item"),l.innerHTML=`<b>Comments:</b> ${t.comments}`,r.appendChild(l);const d=document.createElement("p");d.classList.add("info-item"),d.innerHTML=`<b>Downloads:</b> ${t.downloads}`,r.appendChild(d),o.appendChild(r),h.appendChild(o)})}function H(){const{scrollTop:a,clientHeight:t,scrollHeight:s}=document.documentElement;a+t>=s-5&&g(u)}window.addEventListener("scroll",H);
//# sourceMappingURL=commonHelpers.js.map