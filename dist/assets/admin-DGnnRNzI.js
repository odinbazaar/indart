import"./siteData-BqOVeA-w.js";var e={};sessionStorage.getItem(`indart_auth`)===`true`&&(document.getElementById(`loginScreen`).style.display=`none`,document.getElementById(`adminDashboard`).style.display=`flex`,a());var t=document.querySelector(`.cursor`);document.addEventListener(`mousemove`,e=>{t.style.left=e.clientX+`px`,t.style.top=e.clientY+`px`}),document.getElementById(`loginBtn`).addEventListener(`click`,n),document.getElementById(`password`).addEventListener(`keypress`,e=>{e.key===`Enter`&&n()});function n(){document.getElementById(`password`).value===`tavuzkusu35`?(sessionStorage.setItem(`indart_auth`,`true`),document.getElementById(`loginScreen`).style.opacity=`0`,setTimeout(()=>{document.getElementById(`loginScreen`).style.display=`none`,document.getElementById(`adminDashboard`).style.display=`flex`,a()},300)):document.getElementById(`errorMsg`).style.display=`block`}document.getElementById(`logoutBtn`).addEventListener(`click`,()=>{sessionStorage.removeItem(`indart_auth`),location.reload()});function r(e,t){document.querySelectorAll(`.tab-content`).forEach(e=>e.classList.remove(`active`)),document.querySelectorAll(`.tab-btn`).forEach(e=>e.classList.remove(`active`)),document.getElementById(e).classList.add(`active`),t.classList.add(`active`)}function i(e,t,n){let r=e.files[0];if(!r)return;let i=new FileReader;i.onload=function(e){document.getElementById(t).value=e.target.result,n&&(document.getElementById(n).src=e.target.result)},i.readAsDataURL(r)}function a(){let t=localStorage.getItem(`indart_site_data`);e=JSON.parse(t||JSON.stringify(window.defaultSiteData)),o()}function o(){document.getElementById(`hero_eyebrow`).value=e.hero.eyebrow,document.getElementById(`hero_titleLine1`).value=e.hero.titleLine1,document.getElementById(`hero_titleLine2`).value=e.hero.titleLine2,document.getElementById(`hero_titleLine3`).value=e.hero.titleLine3,document.getElementById(`hero_meta`).value=e.hero.meta;let t=document.getElementById(`hero_stats_container`);t.innerHTML=e.hero.stats.map((e,t)=>`
    <div class="card" style="padding:15px; margin-bottom:0;">
      <div style="font-size:12px; color:var(--gold); margin-bottom:10px; font-weight:500;">İstatistik ${t+1}</div>
      <div class="form-group" style="margin-bottom:10px;">
        <label>Sayı (Örn: 20+)</label>
        <input type="text" id="hero_stat_num_${t}" value="${e.num}">
      </div>
      <div class="form-group" style="margin-bottom:0;">
        <label>Başlık</label>
        <input type="text" id="hero_stat_label_${t}" value="${e.label}">
      </div>
    </div>
  `).join(``);let n=document.getElementById(`hero_videos_container`);n.innerHTML=e.hero.videos.map((t,n)=>`
    <div class="project-list-item" style="flex-direction:column; align-items:stretch; gap:15px; background:rgba(255,255,255,0.01);">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <strong style="color:var(--gold); font-size:12px;">Slayt Videosu ${n+1}</strong>
        ${e.hero.videos.length>1?`<button class="btn-sm btn-danger" onclick="deleteVideo(${n})">Sil</button>`:``}
      </div>
      <div class="grid-2" style="gap:15px;">
        <div class="form-group" style="margin-bottom:0;">
          <label>WebM Video Yolu</label>
          <input type="text" id="hero_video_webm_${n}" value="${t.webm}">
          <div class="media-preview-container">
            <input type="file" accept="video/webm" onchange="uploadFile(this, 'hero_video_webm_${n}')">
          </div>
        </div>
        <div class="form-group" style="margin-bottom:0;">
          <label>MP4 Video Yolu</label>
          <input type="text" id="hero_video_mp4_${n}" value="${t.mp4}">
          <div class="media-preview-container">
            <input type="file" accept="video/mp4" onchange="uploadFile(this, 'hero_video_mp4_${n}')">
          </div>
        </div>
      </div>
    </div>
  `).join(``)+`
    <button class="btn-outline" onclick="addVideo()" style="margin-top:15px; font-size:11px;">Yeni Video Slaytı Ekle</button>
  `,document.getElementById(`about_tag`).value=e.about.tag,document.getElementById(`about_title`).value=e.about.title,document.getElementById(`about_lead`).value=e.about.lead,document.getElementById(`about_paragraph1`).value=e.about.paragraph1,document.getElementById(`about_paragraph2`).value=e.about.paragraph2,document.getElementById(`about_image`).value=e.about.image,document.getElementById(`about_img_preview`).src=e.about.image,document.getElementById(`about_signatureName`).value=e.about.signatureName,document.getElementById(`about_signatureRole`).value=e.about.signatureRole,document.getElementById(`about_statNum`).value=e.about.statNum,document.getElementById(`about_statLabel`).value=e.about.statLabel,document.getElementById(`services_tag`).value=e.services.tag,document.getElementById(`services_title`).value=e.services.title;let r=document.getElementById(`services_pillars_container`);r.innerHTML=e.services.pillars.map((e,t)=>`
    <div class="card">
      <div class="card-title">Sütun ${t+1}: ${e.title}</div>
      <div class="grid-2">
        <div class="form-group">
          <label>Numara</label>
          <input type="text" id="services_pillar_num_${t}" value="${e.num}">
        </div>
        <div class="form-group">
          <label>Başlık</label>
          <input type="text" id="services_pillar_title_${t}" value="${e.title}">
        </div>
      </div>
      <div class="form-group">
        <label>Alt Başlık</label>
        <input type="text" id="services_pillar_sub_${t}" value="${e.sub}">
      </div>
      <div class="form-group">
        <label>Açıklama</label>
        <textarea id="services_pillar_desc_${t}" rows="2">${e.desc}</textarea>
      </div>
      <div class="form-group" style="margin-bottom:0;">
        <label>Öne Çıkan Liste Maddeleri (Satır satır yazınız)</label>
        <textarea id="services_pillar_list_${t}" rows="4">${e.list.join(`
`)}</textarea>
      </div>
    </div>
  `).join(``),s(),document.getElementById(`values_tag`).value=e.values.tag,document.getElementById(`values_title`).value=e.values.title;let i=document.getElementById(`values_list_container`);i.innerHTML=e.values.list.map((e,t)=>`
    <div class="project-list-item" style="flex-direction:column; align-items:stretch; gap:10px; background:rgba(255,255,255,0.01);">
      <div style="font-weight:600; font-size:12px; color:var(--gold);">İlke ${t+1} — ${e.title}</div>
      <div class="grid-2">
        <div class="form-group" style="margin-bottom:0;">
          <label>Numara</label>
          <input type="text" id="values_item_num_${t}" value="${e.num}">
        </div>
        <div class="form-group" style="margin-bottom:0;">
          <label>Başlık</label>
          <input type="text" id="values_item_title_${t}" value="${e.title}">
        </div>
      </div>
      <div class="form-group" style="margin-bottom:0;">
        <label>Açıklama</label>
        <input type="text" id="values_item_desc_${t}" value="${e.desc}">
      </div>
    </div>
  `).join(``),document.getElementById(`process_tag`).value=e.process.tag,document.getElementById(`process_title`).value=e.process.title;let a=document.getElementById(`process_list_container`);a.innerHTML=e.process.list.map((e,t)=>`
    <div class="project-list-item" style="flex-direction:column; align-items:stretch; gap:10px; background:rgba(255,255,255,0.01);">
      <div style="font-weight:600; font-size:12px; color:var(--gold);">Aşama ${t+1} — ${e.name.replace(/<[^>]*>/g,``)}</div>
      <div class="grid-2">
        <div class="form-group" style="margin-bottom:0;">
          <label>Numara</label>
          <input type="text" id="process_item_num_${t}" value="${e.num}">
        </div>
        <div class="form-group" style="margin-bottom:0;">
          <label>Adı (İtalik için &lt;em&gt; kullanabilirsiniz)</label>
          <input type="text" id="process_item_name_${t}" value="${e.name}">
        </div>
      </div>
      <div class="form-group" style="margin-bottom:0;">
        <label>Açıklama</label>
        <input type="text" id="process_item_desc_${t}" value="${e.desc}">
      </div>
    </div>
  `).join(``),document.getElementById(`contact_tag`).value=e.contact.tag,document.getElementById(`contact_title`).value=e.contact.title,document.getElementById(`contact_phone`).value=e.contact.phone,document.getElementById(`contact_email`).value=e.contact.email,document.getElementById(`contact_centerOffice_title`).value=e.contact.centerOffice.title,document.getElementById(`contact_centerOffice_text`).value=e.contact.centerOffice.text,document.getElementById(`contact_factoryOffice_title`).value=e.contact.factoryOffice.title,document.getElementById(`contact_factoryOffice_text`).value=e.contact.factoryOffice.text,document.getElementById(`contact_footerText`).value=e.contact.footerText}function s(){let t=document.getElementById(`admin_projects_list`);t.innerHTML=e.projects.map((e,t)=>`
    <div class="project-list-item">
      <div class="proj-info">
        <img class="proj-thumb" src="${e.image}" alt="">
        <div class="proj-details">
          <h4>${e.title}</h4>
          <p>${e.cat} · ${e.meta}</p>
        </div>
      </div>
      <div class="proj-actions">
        <button class="btn-sm btn-outline" onclick="openEditProjectModal(${t})">Düzenle</button>
        <button class="btn-sm btn-danger" onclick="deleteProject(${t})">Sil</button>
      </div>
    </div>
  `).join(``)}function c(){e.hero.videos.push({webm:``,mp4:``}),o()}function l(t){e.hero.videos.splice(t,1),o()}function u(t){confirm(`Bu projeyi silmek istediğinizden emin misiniz?`)&&(e.projects.splice(t,1),s(),g(`Proje silindi! Değişiklikleri yayına almak için Kaydet butonuna basınız.`))}function d(){document.getElementById(`modalTitle`).textContent=`Yeni Proje Ekle`,document.getElementById(`modal_project_index`).value=`-1`,document.getElementById(`modal_project_title`).value=``,document.getElementById(`modal_project_cat`).value=`Office`,document.getElementById(`modal_project_meta`).value=``,document.getElementById(`modal_project_image`).value=``,document.getElementById(`modal_proj_preview`).src=``,document.getElementById(`projectModal`).style.display=`flex`}function f(t){let n=e.projects[t];document.getElementById(`modalTitle`).textContent=`Proje Düzenle`,document.getElementById(`modal_project_index`).value=t,document.getElementById(`modal_project_title`).value=n.title,document.getElementById(`modal_project_cat`).value=n.cat,document.getElementById(`modal_project_meta`).value=n.meta,document.getElementById(`modal_project_image`).value=n.image,document.getElementById(`modal_proj_preview`).src=n.image,document.getElementById(`projectModal`).style.display=`flex`}function p(){document.getElementById(`projectModal`).style.display=`none`}function m(){let t=parseInt(document.getElementById(`modal_project_index`).value),n=document.getElementById(`modal_project_title`).value,r=document.getElementById(`modal_project_cat`).value,i=document.getElementById(`modal_project_meta`).value,a=document.getElementById(`modal_project_image`).value;if(!n||!a){alert(`Lütfen Proje Adı ve Görsel alanlarını doldurunuz.`);return}let o={title:n,cat:r,meta:i,image:a};t===-1?e.projects.push(o):e.projects[t]=o,p(),s(),g(`Proje güncellendi! Değişiklikleri yayına almak için Kaydet butonuna basınız.`)}function h(){e.hero.eyebrow=document.getElementById(`hero_eyebrow`).value,e.hero.titleLine1=document.getElementById(`hero_titleLine1`).value,e.hero.titleLine2=document.getElementById(`hero_titleLine2`).value,e.hero.titleLine3=document.getElementById(`hero_titleLine3`).value,e.hero.meta=document.getElementById(`hero_meta`).value,e.hero.stats=e.hero.stats.map((e,t)=>({num:document.getElementById(`hero_stat_num_${t}`).value,label:document.getElementById(`hero_stat_label_${t}`).value})),e.hero.videos=e.hero.videos.map((e,t)=>({webm:document.getElementById(`hero_video_webm_${t}`).value,mp4:document.getElementById(`hero_video_mp4_${t}`).value})),e.about.tag=document.getElementById(`about_tag`).value,e.about.title=document.getElementById(`about_title`).value,e.about.lead=document.getElementById(`about_lead`).value,e.about.paragraph1=document.getElementById(`about_paragraph1`).value,e.about.paragraph2=document.getElementById(`about_paragraph2`).value,e.about.image=document.getElementById(`about_image`).value,e.about.signatureName=document.getElementById(`about_signatureName`).value,e.about.signatureRole=document.getElementById(`about_signatureRole`).value,e.about.statNum=document.getElementById(`about_statNum`).value,e.about.statLabel=document.getElementById(`about_statLabel`).value,e.services.tag=document.getElementById(`services_tag`).value,e.services.title=document.getElementById(`services_title`).value,e.services.pillars=e.services.pillars.map((e,t)=>({num:document.getElementById(`services_pillar_num_${t}`).value,title:document.getElementById(`services_pillar_title_${t}`).value,sub:document.getElementById(`services_pillar_sub_${t}`).value,desc:document.getElementById(`services_pillar_desc_${t}`).value,list:document.getElementById(`services_pillar_list_${t}`).value.split(`
`).filter(e=>e.trim()!==``)})),e.values.tag=document.getElementById(`values_tag`).value,e.values.title=document.getElementById(`values_title`).value,e.values.list=e.values.list.map((e,t)=>({num:document.getElementById(`values_item_num_${t}`).value,title:document.getElementById(`values_item_title_${t}`).value,desc:document.getElementById(`values_item_desc_${t}`).value})),e.process.tag=document.getElementById(`process_tag`).value,e.process.title=document.getElementById(`process_title`).value,e.process.list=e.process.list.map((e,t)=>({num:document.getElementById(`process_item_num_${t}`).value,name:document.getElementById(`process_item_name_${t}`).value,desc:document.getElementById(`process_item_desc_${t}`).value})),e.contact.tag=document.getElementById(`contact_tag`).value,e.contact.title=document.getElementById(`contact_title`).value,e.contact.phone=document.getElementById(`contact_phone`).value,e.contact.email=document.getElementById(`contact_email`).value,e.contact.centerOffice.title=document.getElementById(`contact_centerOffice_title`).value,e.contact.centerOffice.text=document.getElementById(`contact_centerOffice_text`).value,e.contact.factoryOffice.title=document.getElementById(`contact_factoryOffice_title`).value,e.contact.factoryOffice.text=document.getElementById(`contact_factoryOffice_text`).value,e.contact.footerText=document.getElementById(`contact_footerText`).value,localStorage.setItem(`indart_site_data`,JSON.stringify(e)),g(`Tüm değişiklikler başarıyla kaydedildi ve yayınlandı!`)}function g(e){let t=document.getElementById(`toastMsg`);t.textContent=e,t.classList.add(`show`),setTimeout(()=>{t.classList.remove(`show`)},3e3)}document.getElementById(`exportJsonBtn`).addEventListener(`click`,()=>{let t=`data:text/json;charset=utf-8,`+encodeURIComponent(JSON.stringify(e,null,2)),n=document.createElement(`a`);n.setAttribute(`href`,t),n.setAttribute(`download`,`indart_site_data.json`),document.body.appendChild(n),n.click(),n.remove()}),document.getElementById(`importJsonBtn`).addEventListener(`click`,()=>{document.getElementById(`jsonFileInput`).click()}),document.getElementById(`jsonFileInput`).addEventListener(`change`,function(t){let n=t.target.files[0];if(!n)return;let r=new FileReader;r.onload=function(t){try{let n=JSON.parse(t.target.result);n.hero&&n.about&&n.services&&n.projects?(e=n,localStorage.setItem(`indart_site_data`,JSON.stringify(e)),o(),g(`JSON Ayarları başarıyla içe aktarıldı ve kaydedildi!`)):alert(`Hatalı veri yapısı! Lütfen geçerli bir indart_site_data JSON dosyası yükleyin.`)}catch(e){alert(`JSON ayrıştırılırken hata oluştu: `+e.message)}},r.readAsText(n)}),window.switchTab=r,window.uploadFile=i,window.deleteVideo=l,window.deleteProject=u,window.openAddProjectModal=d,window.openEditProjectModal=f,window.closeProjectModal=p,window.saveProjectFromModal=m,window.saveData=h,window.addVideo=c,window.doLogin=n;