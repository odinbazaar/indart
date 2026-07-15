var activeData = {};

// Oturum sifresi (kaydetme isteklerinde sunucuya gonderilir).
// Sifre artik istemci kodunda TUTULMAZ; dogrulama api/auth.php tarafindan yapilir.
function getSessionPassword() {
  return sessionStorage.getItem('indart_pw') || '';
}

// Auth state check
if (sessionStorage.getItem('indart_auth') === 'true' && getSessionPassword()) {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('adminDashboard').style.display = 'flex';
  initDashboard();
}

// Cursor script
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// Login click handler
document.getElementById('loginBtn').addEventListener('click', doLogin);
document.getElementById('password').addEventListener('keypress', e => {
  if (e.key === 'Enter') doLogin();
});

async function doLogin() {
  const password = document.getElementById('password').value;
  const errEl = document.getElementById('errorMsg');
  const btn = document.getElementById('loginBtn');

  errEl.style.display = 'none';
  btn.disabled = true;
  btn.textContent = 'Kontrol ediliyor...';

  let result;
  try {
    const res = await fetch('api/auth.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    result = await res.json().catch(() => null);
  } catch (e) {
    result = null;
  }

  btn.disabled = false;
  btn.textContent = 'Giriş Yap';

  if (!result) {
    errEl.textContent = 'Sunucuya bağlanılamadı. Yönetim paneli yalnızca yayındaki sitede çalışır (PHP gerekir).';
    errEl.style.display = 'block';
    return;
  }
  if (!result.ok) {
    errEl.textContent = 'Hatalı şifre girdiniz. Lütfen tekrar deneyin.';
    errEl.style.display = 'block';
    return;
  }

  sessionStorage.setItem('indart_auth', 'true');
  sessionStorage.setItem('indart_pw', password);
  document.getElementById('loginScreen').style.opacity = '0';
  setTimeout(() => {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'flex';
    initDashboard();
  }, 300);
}

// Logout handler
document.getElementById('logoutBtn').addEventListener('click', () => {
  sessionStorage.removeItem('indart_auth');
  sessionStorage.removeItem('indart_pw');
  location.reload();
});

// Navigation tabs
function switchTab(tabId, btn) {
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  
  document.getElementById(tabId).classList.add('active');
  btn.classList.add('active');
}

// Base64 File Uploader utility
function uploadFile(input, targetInputId, previewImgId) {
  const file = input.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(e) {
    document.getElementById(targetInputId).value = e.target.result;
    if (previewImgId) {
      document.getElementById(previewImgId).src = e.target.result;
    }
  };
  reader.readAsDataURL(file);
}

// Load and Render active data in form

async function initDashboard() {
  // Kaynak artik sunucudaki kayit; yoksa koddaki varsayilanlar.
  let serverData = null;
  try {
    serverData = await window.fetchServerData();
  } catch (e) {
    serverData = null;
  }

  activeData = serverData
    ? window.mergeWithDefaults(serverData)
    : JSON.parse(JSON.stringify(window.defaultSiteData)); // deep clone

  populateForm();
}

function populateForm() {
  // 1. Hero Tab
  document.getElementById('hero_eyebrow').value = activeData.hero.eyebrow;
  document.getElementById('hero_titleLine1').value = activeData.hero.titleLine1;
  document.getElementById('hero_titleLine2').value = activeData.hero.titleLine2;
  document.getElementById('hero_titleLine3').value = activeData.hero.titleLine3;
  document.getElementById('hero_meta').value = activeData.hero.meta;
  
  // stats
  const statsContainer = document.getElementById('hero_stats_container');
  statsContainer.innerHTML = activeData.hero.stats.map((stat, idx) => `
    <div class="card" style="padding:15px; margin-bottom:0;">
      <div style="font-size:12px; color:var(--gold); margin-bottom:10px; font-weight:500;">İstatistik ${idx+1}</div>
      <div class="form-group" style="margin-bottom:10px;">
        <label>Sayı (Örn: 20+)</label>
        <input type="text" id="hero_stat_num_${idx}" value="${stat.num}">
      </div>
      <div class="form-group" style="margin-bottom:0;">
        <label>Başlık</label>
        <input type="text" id="hero_stat_label_${idx}" value="${stat.label}">
      </div>
    </div>
  `).join('');

  // videos
  const videosContainer = document.getElementById('hero_videos_container');
  videosContainer.innerHTML = activeData.hero.videos.map((vid, idx) => `
    <div class="project-list-item" style="flex-direction:column; align-items:stretch; gap:15px; background:rgba(255,255,255,0.01);">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <strong style="color:var(--gold); font-size:12px;">Slayt Videosu ${idx+1}</strong>
        ${activeData.hero.videos.length > 1 ? `<button class="btn-sm btn-danger" onclick="deleteVideo(${idx})">Sil</button>` : ''}
      </div>
      <div class="grid-2" style="gap:15px;">
        <div class="form-group" style="margin-bottom:0;">
          <label>WebM Video Yolu</label>
          <input type="text" id="hero_video_webm_${idx}" value="${vid.webm}">
          <div class="media-preview-container">
            <input type="file" accept="video/webm" onchange="uploadFile(this, 'hero_video_webm_${idx}')">
          </div>
        </div>
        <div class="form-group" style="margin-bottom:0;">
          <label>MP4 Video Yolu</label>
          <input type="text" id="hero_video_mp4_${idx}" value="${vid.mp4}">
          <div class="media-preview-container">
            <input type="file" accept="video/mp4" onchange="uploadFile(this, 'hero_video_mp4_${idx}')">
          </div>
        </div>
      </div>
    </div>
  `).join('') + `
    <button class="btn-outline" onclick="addVideo()" style="margin-top:15px; font-size:11px;">Yeni Video Slaytı Ekle</button>
  `;

  // 2. About Tab
  document.getElementById('about_tag').value = activeData.about.tag;
  document.getElementById('about_title').value = activeData.about.title;
  document.getElementById('about_lead').value = activeData.about.lead;
  document.getElementById('about_paragraph1').value = activeData.about.paragraph1;
  document.getElementById('about_paragraph2').value = activeData.about.paragraph2;
  document.getElementById('about_image').value = activeData.about.image;
  document.getElementById('about_img_preview').src = activeData.about.image;
  document.getElementById('about_signatureName').value = activeData.about.signatureName;
  document.getElementById('about_signatureRole').value = activeData.about.signatureRole;
  document.getElementById('about_statNum').value = activeData.about.statNum;
  document.getElementById('about_statLabel').value = activeData.about.statLabel;

  // 3. Services Tab
  document.getElementById('services_tag').value = activeData.services.tag;
  document.getElementById('services_title').value = activeData.services.title;
  
  const pillarsContainer = document.getElementById('services_pillars_container');
  pillarsContainer.innerHTML = activeData.services.pillars.map((pillar, pIdx) => `
    <div class="card">
      <div class="card-title">Sütun ${pIdx+1}: ${pillar.title}</div>
      <div class="grid-2">
        <div class="form-group">
          <label>Numara</label>
          <input type="text" id="services_pillar_num_${pIdx}" value="${pillar.num}">
        </div>
        <div class="form-group">
          <label>Başlık</label>
          <input type="text" id="services_pillar_title_${pIdx}" value="${pillar.title}">
        </div>
      </div>
      <div class="form-group">
        <label>Alt Başlık</label>
        <input type="text" id="services_pillar_sub_${pIdx}" value="${pillar.sub}">
      </div>
      <div class="form-group">
        <label>Açıklama</label>
        <textarea id="services_pillar_desc_${pIdx}" rows="2">${pillar.desc}</textarea>
      </div>
      <div class="form-group" style="margin-bottom:0;">
        <label>Öne Çıkan Liste Maddeleri (Satır satır yazınız)</label>
        <textarea id="services_pillar_list_${pIdx}" rows="4">${pillar.list.join('\n')}</textarea>
      </div>
    </div>
  `).join('');

  // 4. Projects Tab
  renderProjectsList();

  // 4.5 İş Bitirme Belgeleri Tab
  if (!activeData.certificates) {
    // Eski kayıtta yoksa varsayılandan getir
    activeData.certificates = JSON.parse(JSON.stringify(window.defaultSiteData.certificates));
  }
  document.getElementById('certs_tag').value = activeData.certificates.tag;
  document.getElementById('certs_title').value = activeData.certificates.title;
  document.getElementById('certs_lead').value = activeData.certificates.lead;
  renderCertsList();

  // 5. Values Tab
  document.getElementById('values_tag').value = activeData.values.tag;
  document.getElementById('values_title').value = activeData.values.title;
  
  const valuesContainer = document.getElementById('values_list_container');
  valuesContainer.innerHTML = activeData.values.list.map((val, idx) => `
    <div class="project-list-item" style="flex-direction:column; align-items:stretch; gap:10px; background:rgba(255,255,255,0.01);">
      <div style="font-weight:600; font-size:12px; color:var(--gold);">İlke ${idx+1} — ${val.title}</div>
      <div class="grid-2">
        <div class="form-group" style="margin-bottom:0;">
          <label>Numara</label>
          <input type="text" id="values_item_num_${idx}" value="${val.num}">
        </div>
        <div class="form-group" style="margin-bottom:0;">
          <label>Başlık</label>
          <input type="text" id="values_item_title_${idx}" value="${val.title}">
        </div>
      </div>
      <div class="form-group" style="margin-bottom:0;">
        <label>Açıklama</label>
        <input type="text" id="values_item_desc_${idx}" value="${val.desc}">
      </div>
    </div>
  `).join('');

  // 6. Process Tab
  document.getElementById('process_tag').value = activeData.process.tag;
  document.getElementById('process_title').value = activeData.process.title;
  
  const processContainer = document.getElementById('process_list_container');
  processContainer.innerHTML = activeData.process.list.map((proc, idx) => `
    <div class="project-list-item" style="flex-direction:column; align-items:stretch; gap:10px; background:rgba(255,255,255,0.01);">
      <div style="font-weight:600; font-size:12px; color:var(--gold);">Aşama ${idx+1} — ${proc.name.replace(/<[^>]*>/g, '')}</div>
      <div class="grid-2">
        <div class="form-group" style="margin-bottom:0;">
          <label>Numara</label>
          <input type="text" id="process_item_num_${idx}" value="${proc.num}">
        </div>
        <div class="form-group" style="margin-bottom:0;">
          <label>Adı (İtalik için &lt;em&gt; kullanabilirsiniz)</label>
          <input type="text" id="process_item_name_${idx}" value="${proc.name}">
        </div>
      </div>
      <div class="form-group" style="margin-bottom:0;">
        <label>Açıklama</label>
        <input type="text" id="process_item_desc_${idx}" value="${proc.desc}">
      </div>
    </div>
  `).join('');

  // 7. Contact Tab
  document.getElementById('contact_tag').value = activeData.contact.tag;
  document.getElementById('contact_title').value = activeData.contact.title;
  document.getElementById('contact_phone').value = activeData.contact.phone;
  document.getElementById('contact_email').value = activeData.contact.email;
  document.getElementById('contact_centerOffice_title').value = activeData.contact.centerOffice.title;
  document.getElementById('contact_centerOffice_text').value = activeData.contact.centerOffice.text;
  document.getElementById('contact_factoryOffice_title').value = activeData.contact.factoryOffice.title;
  document.getElementById('contact_factoryOffice_text').value = activeData.contact.factoryOffice.text;
  document.getElementById('contact_footerText').value = activeData.contact.footerText;
}

// Projects CRUD Render helper
function renderProjectsList() {
  const projContainer = document.getElementById('admin_projects_list');
  projContainer.innerHTML = activeData.projects.map((proj, idx) => `
    <div class="project-list-item">
      <div class="proj-info">
        <img class="proj-thumb" src="${proj.image}" alt="">
        <div class="proj-details">
          <h4>${proj.title}</h4>
          <p>${proj.cat} · ${proj.meta} · ${Array.isArray(proj.gallery) && proj.gallery.length ? proj.gallery.length + ' fotoğraf' : 'tek görsel'}</p>
        </div>
      </div>
      <div class="proj-actions">
        <button class="btn-sm btn-outline" onclick="openEditProjectModal(${idx})">Düzenle</button>
        <button class="btn-sm btn-danger" onclick="deleteProject(${idx})">Sil</button>
      </div>
    </div>
  `).join('');
}

// İş Bitirme Belgeleri CRUD Render helper
function renderCertsList() {
  const listEl = document.getElementById('admin_certs_list');
  if (!listEl) return;
  const items = (activeData.certificates && activeData.certificates.list) || [];
  if (!items.length) {
    listEl.innerHTML = `<p style="font-size:13px; color:var(--grey);">Henüz belge eklenmedi. "Yeni Belge Ekle" ile başlayın.</p>`;
    return;
  }
  listEl.innerHTML = items.map((c, idx) => `
    <div class="project-list-item">
      <div class="proj-info">
        <img class="proj-thumb" src="${c.image}" alt="">
        <div class="proj-details">
          <h4>${c.client}</h4>
          <p>${c.type} · ${c.meta}</p>
        </div>
      </div>
      <div class="proj-actions">
        <button class="btn-sm btn-outline" onclick="openEditCertModal(${idx})">Düzenle</button>
        <button class="btn-sm btn-danger" onclick="deleteCert(${idx})">Sil</button>
      </div>
    </div>
  `).join('');
}

function openAddCertModal() {
  document.getElementById('certModalTitle').textContent = "Yeni Belge Ekle";
  document.getElementById('modal_cert_index').value = "-1";
  document.getElementById('modal_cert_client').value = "";
  document.getElementById('modal_cert_type').value = "Kesin Kabul Tutanağı";
  document.getElementById('modal_cert_scope').value = "";
  document.getElementById('modal_cert_meta').value = "";
  document.getElementById('modal_cert_image').value = "";
  document.getElementById('modal_cert_preview').src = "";
  document.getElementById('certModal').style.display = 'flex';
}

function openEditCertModal(idx) {
  const c = activeData.certificates.list[idx];
  document.getElementById('certModalTitle').textContent = "Belge Düzenle";
  document.getElementById('modal_cert_index').value = idx;
  document.getElementById('modal_cert_client').value = c.client;
  document.getElementById('modal_cert_type').value = c.type;
  document.getElementById('modal_cert_scope').value = c.scope;
  document.getElementById('modal_cert_meta').value = c.meta;
  document.getElementById('modal_cert_image').value = c.image;
  document.getElementById('modal_cert_preview').src = c.image;
  document.getElementById('certModal').style.display = 'flex';
}

function closeCertModal() {
  document.getElementById('certModal').style.display = 'none';
}

function saveCertFromModal() {
  const idx = parseInt(document.getElementById('modal_cert_index').value);
  const client = document.getElementById('modal_cert_client').value;
  const type = document.getElementById('modal_cert_type').value;
  const scope = document.getElementById('modal_cert_scope').value;
  const meta = document.getElementById('modal_cert_meta').value;
  const image = document.getElementById('modal_cert_image').value;

  if (!client || !image) {
    alert('Lütfen İşveren ve Belge Görseli alanlarını doldurunuz.');
    return;
  }

  const certData = { client, type, scope, meta, image };

  if (idx === -1) {
    activeData.certificates.list.push(certData);
  } else {
    activeData.certificates.list[idx] = certData;
  }

  closeCertModal();
  renderCertsList();
  showToast('Belge güncellendi! Değişiklikleri yayına almak için Kaydet butonuna basınız.');
}

function deleteCert(idx) {
  if (confirm('Bu belgeyi silmek istediğinizden emin misiniz?')) {
    activeData.certificates.list.splice(idx, 1);
    renderCertsList();
    showToast('Belge silindi! Değişiklikleri yayına almak için Kaydet butonuna basınız.');
  }
}

// Add/Delete Video helper
function addVideo() {
  activeData.hero.videos.push({ webm: '', mp4: '' });
  populateForm();
}
function deleteVideo(idx) {
  activeData.hero.videos.splice(idx, 1);
  populateForm();
}

// Delete Project helper
function deleteProject(idx) {
  if(confirm('Bu projeyi silmek istediğinizden emin misiniz?')) {
    activeData.projects.splice(idx, 1);
    renderProjectsList();
    showToast('Proje silindi! Değişiklikleri yayına almak için Kaydet butonuna basınız.');
  }
}

// Project Modals
function openAddProjectModal() {
  document.getElementById('modalTitle').textContent = "Yeni Proje Ekle";
  document.getElementById('modal_project_index').value = "-1";
  document.getElementById('modal_project_title').value = "";
  document.getElementById('modal_project_cat').value = "Office";
  document.getElementById('modal_project_meta').value = "";
  document.getElementById('modal_project_image').value = "";
  document.getElementById('modal_project_gallery').value = "";
  document.getElementById('modal_proj_preview').src = "";

  document.getElementById('projectModal').style.display = 'flex';
}

function openEditProjectModal(idx) {
  const proj = activeData.projects[idx];
  document.getElementById('modalTitle').textContent = "Proje Düzenle";
  document.getElementById('modal_project_index').value = idx;
  document.getElementById('modal_project_title').value = proj.title;
  document.getElementById('modal_project_cat').value = proj.cat;
  document.getElementById('modal_project_meta').value = proj.meta;
  document.getElementById('modal_project_image').value = proj.image;
  document.getElementById('modal_project_gallery').value = Array.isArray(proj.gallery) ? proj.gallery.join('\n') : "";
  document.getElementById('modal_proj_preview').src = proj.image;

  document.getElementById('projectModal').style.display = 'flex';
}

function closeProjectModal() {
  document.getElementById('projectModal').style.display = 'none';
}

function saveProjectFromModal() {
  const idx = parseInt(document.getElementById('modal_project_index').value);
  const title = document.getElementById('modal_project_title').value;
  const cat = document.getElementById('modal_project_cat').value;
  const meta = document.getElementById('modal_project_meta').value;
  const image = document.getElementById('modal_project_image').value;
  const gallery = document.getElementById('modal_project_gallery').value
    .split('\n').map(s => s.trim()).filter(s => s !== '');

  if(!title || !image) {
    alert('Lütfen Proje Adı ve Kapak Görseli alanlarını doldurunuz.');
    return;
  }

  const projData = { title, cat, meta, image };
  if(gallery.length) projData.gallery = gallery;

  if(idx === -1) {
    // Add
    activeData.projects.push(projData);
  } else {
    // Edit
    activeData.projects[idx] = projData;
  }

  closeProjectModal();
  renderProjectsList();
  showToast('Proje güncellendi! Değişiklikleri yayına almak için Kaydet butonuna basınız.');
}

// Formdaki degerleri activeData'ya alir ve sunucuya kalici olarak kaydeder
async function saveData() {
  // 1. Hero
  activeData.hero.eyebrow = document.getElementById('hero_eyebrow').value;
  activeData.hero.titleLine1 = document.getElementById('hero_titleLine1').value;
  activeData.hero.titleLine2 = document.getElementById('hero_titleLine2').value;
  activeData.hero.titleLine3 = document.getElementById('hero_titleLine3').value;
  activeData.hero.meta = document.getElementById('hero_meta').value;
  
  // stats
  activeData.hero.stats = activeData.hero.stats.map((_, idx) => ({
    num: document.getElementById(`hero_stat_num_${idx}`).value,
    label: document.getElementById(`hero_stat_label_${idx}`).value
  }));

  // videos
  activeData.hero.videos = activeData.hero.videos.map((_, idx) => ({
    webm: document.getElementById(`hero_video_webm_${idx}`).value,
    mp4: document.getElementById(`hero_video_mp4_${idx}`).value
  }));

  // 2. About
  activeData.about.tag = document.getElementById('about_tag').value;
  activeData.about.title = document.getElementById('about_title').value;
  activeData.about.lead = document.getElementById('about_lead').value;
  activeData.about.paragraph1 = document.getElementById('about_paragraph1').value;
  activeData.about.paragraph2 = document.getElementById('about_paragraph2').value;
  activeData.about.image = document.getElementById('about_image').value;
  activeData.about.signatureName = document.getElementById('about_signatureName').value;
  activeData.about.signatureRole = document.getElementById('about_signatureRole').value;
  activeData.about.statNum = document.getElementById('about_statNum').value;
  activeData.about.statLabel = document.getElementById('about_statLabel').value;

  // 3. Services
  activeData.services.tag = document.getElementById('services_tag').value;
  activeData.services.title = document.getElementById('services_title').value;
  
  activeData.services.pillars = activeData.services.pillars.map((p, idx) => ({
    num: document.getElementById(`services_pillar_num_${idx}`).value,
    title: document.getElementById(`services_pillar_title_${idx}`).value,
    sub: document.getElementById(`services_pillar_sub_${idx}`).value,
    desc: document.getElementById(`services_pillar_desc_${idx}`).value,
    list: document.getElementById(`services_pillar_list_${idx}`).value.split('\n').filter(line => line.trim() !== '')
  }));

  // 4. Projects are already saved during modal submission

  // 4.5 İş Bitirme Belgeleri (genel bilgiler; liste modal ile kaydedilir)
  if (activeData.certificates) {
    activeData.certificates.tag = document.getElementById('certs_tag').value;
    activeData.certificates.title = document.getElementById('certs_title').value;
    activeData.certificates.lead = document.getElementById('certs_lead').value;
  }

  // 5. Values
  activeData.values.tag = document.getElementById('values_tag').value;
  activeData.values.title = document.getElementById('values_title').value;
  activeData.values.list = activeData.values.list.map((_, idx) => ({
    num: document.getElementById(`values_item_num_${idx}`).value,
    title: document.getElementById(`values_item_title_${idx}`).value,
    desc: document.getElementById(`values_item_desc_${idx}`).value
  }));

  // 6. Process
  activeData.process.tag = document.getElementById('process_tag').value;
  activeData.process.title = document.getElementById('process_title').value;
  activeData.process.list = activeData.process.list.map((_, idx) => ({
    num: document.getElementById(`process_item_num_${idx}`).value,
    name: document.getElementById(`process_item_name_${idx}`).value,
    desc: document.getElementById(`process_item_desc_${idx}`).value
  }));

  // 7. Contact
  activeData.contact.tag = document.getElementById('contact_tag').value;
  activeData.contact.title = document.getElementById('contact_title').value;
  activeData.contact.phone = document.getElementById('contact_phone').value;
  activeData.contact.email = document.getElementById('contact_email').value;
  activeData.contact.centerOffice.title = document.getElementById('contact_centerOffice_title').value;
  activeData.contact.centerOffice.text = document.getElementById('contact_centerOffice_text').value;
  activeData.contact.factoryOffice.title = document.getElementById('contact_factoryOffice_title').value;
  activeData.contact.factoryOffice.text = document.getElementById('contact_factoryOffice_text').value;
  activeData.contact.footerText = document.getElementById('contact_footerText').value;

  // Sunucuya kalici olarak yaz
  await pushToServer();
}

// Veriyi sunucudaki JSON dosyasina yazar — tum ziyaretcilerde gecerli olur
async function pushToServer() {
  const password = getSessionPassword();
  if (!password) {
    showToast('Oturum düştü. Lütfen tekrar giriş yapın.');
    return false;
  }

  showToast('Kaydediliyor...');
  try {
    const res = await fetch('api/save.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, data: activeData })
    });
    const result = await res.json().catch(() => null);

    if (!result) {
      showToast('Sunucuya bağlanılamadı — kayıt YAPILMADI. (Yerelde PHP çalışmaz; yayındaki sitede deneyin.)');
      return false;
    }
    if (!result.ok) {
      showToast('Kayıt başarısız: ' + (result.error || 'bilinmeyen hata'));
      return false;
    }

    showToast('Kaydedildi! Değişiklikler artık sitede herkes için yayında.');
    return true;
  } catch (e) {
    showToast('Sunucuya bağlanılamadı — kayıt YAPILMADI.');
    return false;
  }
}

// Toast notifier
function showToast(msg) {
  const toast = document.getElementById('toastMsg');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Export JSON file
document.getElementById('exportJsonBtn').addEventListener('click', () => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(activeData, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", "indart_site_data.json");
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
});

// Import JSON file
document.getElementById('importJsonBtn').addEventListener('click', () => {
  document.getElementById('jsonFileInput').click();
});

document.getElementById('jsonFileInput').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async function(e) {
    try {
      const importedData = JSON.parse(e.target.result);

      // Simple validation check
      if(importedData.hero && importedData.about && importedData.services && importedData.projects) {
        activeData = window.mergeWithDefaults(importedData);
        populateForm();
        await pushToServer();
      } else {
        alert('Hatalı veri yapısı! Lütfen geçerli bir indart_site_data JSON dosyası yükleyin.');
      }
    } catch (err) {
      alert('JSON ayrıştırılırken hata oluştu: ' + err.message);
    }
  };
  reader.readAsText(file);
});

// Expose module functions globally for HTML events
window.switchTab = switchTab;
window.uploadFile = uploadFile;
window.deleteVideo = deleteVideo;
window.deleteProject = deleteProject;
window.openAddProjectModal = openAddProjectModal;
window.openEditProjectModal = openEditProjectModal;
window.closeProjectModal = closeProjectModal;
window.saveProjectFromModal = saveProjectFromModal;
window.openAddCertModal = openAddCertModal;
window.openEditCertModal = openEditCertModal;
window.closeCertModal = closeCertModal;
window.saveCertFromModal = saveCertFromModal;
window.deleteCert = deleteCert;
window.saveData = saveData;
window.addVideo = addVideo;
window.doLogin = doLogin;
