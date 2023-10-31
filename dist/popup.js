function sortByDateDescending(e){return e.sort((e,t)=>new Date(t.dateCreated)-new Date(e.dateCreated))}function formatDateIntl(e){return new Intl.DateTimeFormat("es-ES",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).format(e)}document.addEventListener("DOMContentLoaded",function(){const v=document.getElementById("dataStoredList"),o=document.getElementById("dataHistoryList"),n=document.getElementById("dataName"),i=document.getElementById("dataValue"),a=document.getElementById("addDataForm");var e=document.getElementById("submitButton");document.getElementById("donateButton");const l=document.getElementById("cn-title-add"),d=document.getElementById("cn-form-container");var t=document.getElementById("cn-yearly-stored"),s=document.getElementById("cn-lifetime-stored"),c=document.getElementById("cn-yearly-history"),m=document.getElementById("cn-lifetime-history"),r=document.getElementById("cn-title-stored"),u=document.getElementById("cn-title-history");function E(){chrome.storage.local.get("storedData",function(e){const h=e.storedData||[];v.innerHTML="";let g=0;h.forEach(function(t,e){var n=document.createElement("div"),i=(n.className="cn-list-item-parent",document.createElement("div"));i.className="cn-list-item-namevalue-container";const a=document.createElement("div"),l=(a.id="cn-list-item-title-"+g,a.className="cn-list-item-title",a.textContent=t.name,document.createElement("div")),d=(l.id="cn-list-item-value-"+g,l.innerHTML=t.value,l.className="cn-list-item-value",document.createElement("textarea"));d.id="cn-list-item-value-input-"+g,d.disabled=!0,d.value=t.value,d.className="cn-list-item-value-input";var s=document.createElement("div");s.className="cn-list-item-controls-container";const c=document.createElement("div"),o=(c.className="cn-list-item-button-edit",c.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-3"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>',c.setAttribute("index-elem",g),c.addEventListener("click",()=>{l.style.display="none",d.disabled=!1,d.style.display="flex",d.focus(),c.style.display="none",o.style.display="none",m.style.display="none",document.getElementById("cn-list-item-edit-controls-container-"+r.getAttribute("index-elem")).style.display="flex"}),document.createElement("div")),m=(o.className="cn-list-item-button-copy",o.textContent="Copy",o.addEventListener("click",()=>{navigator.clipboard.writeText(t.value).then(()=>{console.log("Copied to clipboard"),o.textContent="Copied!",o.textContent="Copy",chrome.tabs.query({active:!0,currentWindow:!0},e=>{chrome.tabs.sendMessage(e[0].id,{action:"active",value:t.name},function(e){console.log(e.farewell)})})})}),document.createElement("div")),r=(m.className="cn-list-item-button-delete",m.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF5757" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',m.addEventListener("click",function(){p.style.display="flex",p.classList.add("animate__animated"),p.classList.add("animate__flipInX")}),document.createElement("div")),u=(r.className="cn-list-item-edit-controls-container",r.id="cn-list-item-edit-controls-container-"+g,r.setAttribute("index-elem",g),document.createElement("div"));u.className="cn-list-item-button-save-edit",u.setAttribute("id","cn-list-item-button-save-edit-"+g),u.textContent="Save",u.setAttribute("index-elem",g),u.addEventListener("click",()=>{h[u.getAttribute("index-elem")]={name:a.innerHTML,value:d.value},chrome.storage.local.set({storedData:h},function(){E()}),r.style.display="none",c.style.display="flex",o.style.display="flex",m.style.display="flex"});var y=document.createElement("div");y.className="cn-list-item-button-cancel-edit",y.setAttribute("id","cn-list-item-button-cancel-edit-"+g),y.textContent="Cancel",y.setAttribute("index-elem",g),y.addEventListener("click",()=>{d.style.display="none",l.style.display="flex",r.style.display="none",c.style.display="flex",o.style.display="flex",m.style.display="flex"});const p=document.createElement("div");p.className="cn-list-item-helper-delete",p.innerHTML=`
                                        <div class="cn-helper-title">Are you sure?</div>
                                        <span class="cn-helper-options">
                                          <div id="cn-helper-action-ok-${g}" class="cn-helper-action-ok">Yes, delete</div>
                                          <div id="cn-helper-action-ko-${g}" class="cn-helper-action-ko">Cancel</div>
                                        </span>
                                    `,n.appendChild(i),i.appendChild(a),i.appendChild(l),i.appendChild(d),n.appendChild(s),s.appendChild(o),s.appendChild(c),s.appendChild(m),n.appendChild(r),r.appendChild(u),r.appendChild(y),n.appendChild(p),v.appendChild(n),document.getElementById("cn-helper-action-ok-"+g).addEventListener("click",()=>{h.splice(e,1),chrome.storage.local.set({storedData:h},()=>{E()})}),document.getElementById("cn-helper-action-ko-"+g).addEventListener("click",()=>{p.style.display="none",p.classList.remove("animate__animated"),p.classList.remove("animate__flipInX")}),g+=1})})}function y(e){"stored"==e?(document.getElementById("cn-knob-stored").style.display="flex",document.getElementById("cn-knob-history").style.display="none",document.getElementById("cn-right-stored").style.display="flex",document.getElementById("cn-right-stored").classList.add("animate__animated"),document.getElementById("cn-right-stored").classList.add("animate__fadeIn"),document.getElementById("cn-right-stored").classList.add("animate__fast"),document.getElementById("cn-right-history").style.display="none",document.getElementById("cn-right-history").classList.remove("animate__animated"),document.getElementById("cn-right-history").classList.remove("animate__fadeIn"),document.getElementById("cn-right-history").classList.remove("animate__fast"),document.getElementById("cn-title-stored").classList.add("cn-section-selected"),document.getElementById("cn-title-history").classList.remove("cn-section-selected"),E()):(document.getElementById("cn-knob-stored").style.display="none",document.getElementById("cn-knob-history").style.display="flex",document.getElementById("cn-right-stored").style.display="none",document.getElementById("cn-right-stored").classList.remove("animate__animated"),document.getElementById("cn-right-stored").classList.remove("animate__fadeIn"),document.getElementById("cn-right-stored").classList.remove("animate__fast"),document.getElementById("cn-right-history").style.display="flex",document.getElementById("cn-right-history").classList.add("animate__animated"),document.getElementById("cn-right-history").classList.add("animate__fadeIn"),document.getElementById("cn-right-history").classList.add("animate__fast"),document.getElementById("cn-title-stored").classList.remove("cn-section-selected"),document.getElementById("cn-title-history").classList.add("cn-section-selected"),chrome.storage.local.get("historyData",function(e){e=sortByDateDescending(e=e.historyData||[]);o.innerHTML="";let c=0;e.forEach(function(t,e){console.log("item history: ",t);var n=document.createElement("div"),i=(n.className="cn-list-item-parent",document.createElement("div")),a=(i.className="cn-list-item-namevalue-container",document.createElement("div")),a=(a.id="cn-list-item-title-"+c,a.className="cn-list-item-title",a.textContent=t.name,document.createElement("div")),l=(a.id="cn-list-item-date-"+c,a.className="cn-list-item-date",a.textContent=formatDateIntl(new Date(t.dateCreated)),document.createElement("div")),d=(l.id="cn-list-item-value-"+c,l.innerHTML=t.value,l.className="cn-list-item-value",document.createElement("div"));d.className="cn-list-item-controls-container";const s=document.createElement("div");s.className="cn-list-item-button-copy",s.textContent="Copy",s.addEventListener("click",()=>{navigator.clipboard.writeText(t.value).then(()=>{console.log("Copied to clipboard"),s.textContent="Copied!",s.textContent="Copy",chrome.tabs.query({active:!0,currentWindow:!0},e=>{chrome.tabs.sendMessage(e[0].id,{action:"active",value:t.name},function(e){console.log(e.farewell)})})})}),n.appendChild(i),i.appendChild(a),i.appendChild(l),n.appendChild(d),d.appendChild(s),o.appendChild(n),c+=1})}))}y("stored"),e.addEventListener("click",e=>{e.preventDefault();const t={name:n.value,value:i.value};chrome.storage.local.get("storedData",e=>{e=e.storedData||[];e.push(t),chrome.storage.local.set({storedData:e},()=>{E(),a.reset(),l.style.display="flex",d.style.display="none"})})}),l.addEventListener("click",function(){l.style.display="none",d.style.display="flex",d.classList.add("animate__animated"),d.classList.add("animate__fadeIn"),n.focus()}),t.addEventListener("click",()=>{chrome.tabs.create({url:"https://buy.stripe.com/eVadTG66A292g7u7sv"})}),s.addEventListener("click",()=>{chrome.tabs.create({url:"https://buy.stripe.com/00gcPC66A5lecVi004"})}),c.addEventListener("click",()=>{chrome.tabs.create({url:"https://buy.stripe.com/eVadTG66A292g7u7sv"})}),m.addEventListener("click",()=>{chrome.tabs.create({url:"https://buy.stripe.com/00gcPC66A5lecVi004"})}),r.addEventListener("click",()=>{console.log("stored"),y("stored")}),u.addEventListener("click",()=>{console.log("history"),y("history")})});