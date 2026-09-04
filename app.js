/**
 * AGRIZEN LÚA - LOGIC HIỂN THỊ ĐA TRANG (SẢN PHẨM, KỊCH BẢN VG/PH14 & LỊCH PHUN VỤ LÚA)
 * Tiêu chuẩn: 100% Anti-Slop, Loại bỏ toàn bộ từ 'sổ tay', 'nông học'
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const menuToggleBtn = document.getElementById('menu-toggle-btn');
  const appSidebar = document.getElementById('app-sidebar');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const pageMainTitle = document.getElementById('page-main-title');
  const pageMainDesc = document.getElementById('page-main-desc');

  const pageProducts = document.getElementById('page-products');
  const pageScriptVG = document.getElementById('page-script-vg');
  const pageScriptPH = document.getElementById('page-script-ph');
  const pageScheduleRice = document.getElementById('page-schedule-rice');
  const pageAlkalineDeep = document.getElementById('page-alkaline-deep');
  const pageRiceDict = document.getElementById('page-rice-dict');
  const pageCropDict = document.getElementById('page-crop-dict');
  const pageRiceVarieties = document.getElementById('page-rice-varieties');
  const pageCropTypes = document.getElementById('page-crop-types');
  const pageVoucherGenerator = document.getElementById('page-voucher-generator');

  const productTabBar = document.getElementById('product-tab-bar');
  const productCardContainer = document.getElementById('product-card-container');

  let activeProductId = AGRIZEN_DATA.products[0].id;
  let currentPage = 'products';

  // Page titles dictionary
  const pageTitles = {
    'products': {
      title: '1. THÔNG TIN SẢN PHẨM CHI TIẾT & KỸ THUẬT',
      desc: 'Dữ liệu trích xuất chuẩn xác từ Hồ sơ Kỹ thuật Cục BVTV & Tài Liệu Bán Hàng'
    },
    'script-vg': {
      title: '2. KỊCH BẢN TƯ VẤN 5 BƯỚC - ZAKi (RƯỚC ĐÒNG & VÔ GẠO)',
      desc: 'Hướng dẫn gọi điện theo 6 cử sinh lý lúa, xử lý tình huống và chính sách Combo Mua 3 Tặng 1'
    },
    'script-ph': {
      title: '3. KỊCH BẢN TƯ VẤN 5 BƯỚC - PH14',
      desc: 'Hướng dẫn hạ phèn, nâng pH đất, cải tạo đất từ gốc theo công nghệ Biochar hoạt hóa của Mỹ'
    },
    'schedule-rice': {
      title: '4. MÙA VỤ LÚA',
      desc: 'Lịch mùa vụ 3 miền, 5 giai đoạn sinh trưởng kèm ảnh thực tế và quy trình bón phân chuẩn'
    },
    'alkaline-deep': {
      title: '5. KIỀM SINH HỌC BIOCHAR',
      desc: 'Bản chất khoa học kiềm sinh học pH > 13, công nghệ Biochar hoạt hóa Mỹ và quy chuẩn lịch tưới 4 nhóm cây trồng'
    },
    'rice-dict': {
      title: '6. TỪ ĐIỂN LÚA (50 THUẬT NGỮ NÔNG DÂN 3 MIỀN)',
      desc: 'Cẩm nang tra cứu 50 từ ngữ tiếng lóng vùng miền, dấu hiệu nhận biết ngoài ruộng và mẫu câu tư vấn khéo léo'
    },
    'crop-dict': {
      title: '7. TỪ ĐIỂN CÂY TRỒNG (BỆNH ĐẤT & SO SÁNH CÁCH LÀM)',
      desc: 'Giải thích các hiện tượng thổ nhưỡng, bệnh rễ, ngộ độc đất và bảng so sánh cách làm cũ vs Biochar Mỹ'
    },
    'rice-varieties': {
      title: '8. GIỐNG LÚA',
      desc: 'Tra cứu thông số thời gian sinh trưởng, giá bán, năng suất và lịch phun chuẩn theo từng ngày tuổi cho các giống lúa chủ lực'
    },
    'crop-types': {
      title: '9. LOẠI CÂY TRỒNG',
      desc: 'Cẩm nang tra cứu vấn đề thổ nhưỡng, độ pH đất lý tưởng, liều tưới pH 14 và lịch chăm sóc cho các nhóm cây trồng chủ lực'
    },
    'voucher-generator': {
      title: '10. CÔNG CỤ TẠO PHIẾU CAM KẾT & BẢO HÀNH ĐIỆN TỬ',
      desc: 'Nhập tên khách hàng và xuất ngay phiếu cam kết ZAKI chính hãng gửi Zalo trong 5 giây'
    }
  };

  // Switch Page View
  const switchPage = (pageId) => {
    currentPage = pageId;

    // Update active nav button
    document.querySelectorAll('.nav-item-btn').forEach(btn => {
      if (btn.getAttribute('data-page') === pageId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update Header
    if (pageTitles[pageId]) {
      pageMainTitle.textContent = pageTitles[pageId].title;
      pageMainDesc.textContent = pageTitles[pageId].desc;
    }

    // Toggle Page Visibility
    pageProducts.style.display = pageId === 'products' ? 'block' : 'none';
    pageScriptVG.style.display = pageId === 'script-vg' ? 'block' : 'none';
    pageScriptPH.style.display = pageId === 'script-ph' ? 'block' : 'none';
    if (pageScheduleRice) pageScheduleRice.style.display = pageId === 'schedule-rice' ? 'block' : 'none';
    if (pageAlkalineDeep) pageAlkalineDeep.style.display = pageId === 'alkaline-deep' ? 'block' : 'none';
    if (pageRiceDict) pageRiceDict.style.display = pageId === 'rice-dict' ? 'block' : 'none';
    if (pageCropDict) pageCropDict.style.display = pageId === 'crop-dict' ? 'block' : 'none';
    if (pageRiceVarieties) pageRiceVarieties.style.display = pageId === 'rice-varieties' ? 'block' : 'none';
    if (pageCropTypes) pageCropTypes.style.display = pageId === 'crop-types' ? 'block' : 'none';
    if (pageVoucherGenerator) {
      pageVoucherGenerator.style.display = pageId === 'voucher-generator' ? 'block' : 'none';
      if (pageId === 'voucher-generator') {
        renderVoucherGenerator();
      }
    }

    // Close Mobile Drawer if open
    if (appSidebar.classList.contains('open')) {
      toggleMobileMenu();
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render Page 1: Product Tabs
  const renderProductTabs = () => {
    productTabBar.innerHTML = AGRIZEN_DATA.products.map(p => `
      <button class="tab-pill ${p.id === activeProductId ? 'active ' + p.theme : ''}" data-id="${p.id}">
        <span>${p.badgeIcon}</span>
        <span>${p.tabName}</span>
      </button>
    `).join('');

    document.querySelectorAll('.tab-pill').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        activeProductId = id;
        renderProductTabs();
        renderProductDetail(id);
      });
    });
  };

  // Render Page 1: Product Detail Card (Balanced Layout)
  const renderProductDetail = (productId) => {
    const product = AGRIZEN_DATA.products.find(p => p.id === productId);
    if (!product) return;

    // 1. Specs Grid
    const specsHtml = product.specs.map(s => `
      <div class="spec-card-item">
        <span class="spec-card-name">${s.name}</span>
        <span class="spec-card-val">${s.value}</span>
      </div>
    `).join('');

    // 2. Mechanisms Grid
    const mechanismsHtml = product.mechanisms.map(m => `
      <div class="mech-item">
        <h4>${m.title}</h4>
        <p>${m.desc}</p>
      </div>
    `).join('');

    // 3. Dilution Banner
    let dilutionRatesHtml = '';
    if (product.dosage.dilutionRates && product.dosage.dilutionRates.length > 0) {
      dilutionRatesHtml = `
        <div style="background: #f0f7ec; border: 1px solid var(--brand-200); border-radius: var(--radius-sm); padding: 12px 16px; margin-bottom: 16px;">
          <div style="font-size: 13.5px; font-weight: 800; color: var(--brand-900); margin-bottom: 4px;">💧 Tỷ Lệ Pha Nước Chuẩn:</div>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 4px; padding-left: 0; margin: 0;">
            ${product.dosage.dilutionRates.map(r => `<li style="font-size: 13.5px; color: var(--text-main); font-weight: 600;">• ${r}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    // 4. Crops Cards Grid
    let cropsHtml = '';
    if (product.dosage.crops && product.dosage.crops.length > 0) {
      cropsHtml = `
        <div class="crops-grid">
          ${product.dosage.crops.map(c => `
            <div class="crop-card">
              <div class="crop-title">
                <span>🌿</span>
                <span>${c.name}</span>
              </div>
              <div class="crop-rate-badge"><strong>Liều lượng:</strong> ${c.rate}</div>
              ${c.stages && c.stages.length > 0 ? `
                <ul class="crop-stage-list">
                  ${c.stages.map(st => `<li>${st}</li>`).join('')}
                </ul>
              ` : ''}
            </div>
          `).join('')}
        </div>
      `;
    }

    productCardContainer.innerHTML = `
      <article class="product-card ${product.theme}">
        <!-- Header -->
        <div class="prod-header">
          <div class="prod-meta-tags">
            <span class="tag-badge ${product.id === 'vo-gao' ? 'tag-gold' : 'tag-primary'}">${product.badgeIcon} ${product.tag}</span>
            <span class="tag-badge tag-secondary">Mã: ${product.code}</span>
            <span class="tag-badge tag-secondary">Quy cách: ${product.packaging}</span>
            <span class="tag-badge tag-gold">Hồ sơ Cục BVTV: ${product.registeredName}</span>
          </div>
          <h2 class="prod-title">${product.fullName}</h2>
          <p class="prod-desc">${product.shortDesc}</p>
          
          <div class="prod-origin-bar">
            <div><strong>Nguồn gốc / Xuất xứ:</strong> ${product.origin}</div>
            <div><strong>Độc quyền phân phối:</strong> ${product.distributor}</div>
          </div>
        </div>

        <!-- Block 1: Chỉ Tiêu & Thành Phần Hoạt Chất (Full-width Specs Grid) -->
        <div class="specs-full-section">
          <h3 class="block-title ${product.id === 'vo-gao' ? 'gold-title' : ''}">
            <span>🔬</span>
            <span>Chỉ Tiêu & Thành Phần Hoạt Chất</span>
          </h3>
          <div class="specs-grid">
            ${specsHtml}
          </div>
        </div>

        <!-- Block 2: Cơ Chế Tác Động (Balanced 2-Column Grid) -->
        <div class="mechanisms-full-section">
          <h3 class="block-title ${product.id === 'vo-gao' ? 'gold-title' : ''}">
            <span>🌱</span>
            <span>Cơ Chế Tác Động Cốt Lõi</span>
          </h3>
          <div class="mechanisms-grid">
            ${mechanismsHtml}
          </div>
        </div>

        <!-- Block 3: Liều Lượng & Lịch Phun/Tưới Chi Tiết (Full-width Card with 2-Column Crop Grid) -->
        <div class="dosage-card">
          <h3 class="block-title">
            <span>🧪</span>
            <span>Liều Lượng & Lịch Phun / Tưới Chuẩn</span>
          </h3>
          ${dilutionRatesHtml}
          ${cropsHtml}
          
          <div class="mixing-protocol-box">
            <strong>⚠️ Nguyên tắc phối trộn & Phun Drone:</strong> ${product.dosage.mixingRule}
          </div>
        </div>

        <!-- Block 4: So Sánh Đối Thủ -->
        <div class="battlecard-box">
          <div class="battle-side competitor">
            <div class="battle-title">❌ Nhược Điểm Của: ${product.battlecard.competitor}</div>
            <div class="battle-content">${product.battlecard.weakness}</div>
          </div>
          <div class="battle-side agrizen">
            <div class="battle-title">✅ Ưu Thế Vượt Trội Của Dòng ZAKi / pH 14</div>
            <div class="battle-content">${product.battlecard.ourEdge}</div>
          </div>
        </div>
      </article>
    `;
  };

  // Render Table with Dynamic Rowspan Merging (Pages 2 & 3)
  const renderScriptTable = (container, scriptData, icon) => {
    const notesHtml = scriptData.notes.map(n => `<li>${n}</li>`).join('');

    // Pre-calculate Rowspan for consecutive identical Step rows
    const processedRows = [];
    let i = 0;
    while (i < scriptData.rows.length) {
      const currentStep = scriptData.rows[i].step;
      let count = 1;
      while (i + count < scriptData.rows.length && scriptData.rows[i + count].step === currentStep) {
        count++;
      }
      for (let j = 0; j < count; j++) {
        processedRows.push({
          ...scriptData.rows[i + j],
          isFirstOfGroup: j === 0,
          rowSpan: count
        });
      }
      i += count;
    }

    const rowsHtml = processedRows.map(r => `
      <tr>
        ${r.isFirstOfGroup ? `
          <td class="col-step" rowspan="${r.rowSpan}">
            <div class="script-step-badge">${r.step}</div>
          </td>
        ` : ''}
        <td class="col-stage">
          <div class="cell-content-block" style="font-weight: 700;">${r.stage}</div>
        </td>
        <td class="col-guidance">
          <div class="cell-content-block">${r.guidance}</div>
        </td>
        <td class="col-handling">
          <div class="cell-content-block">${r.handling}</div>
        </td>
      </tr>
    `).join('');

    container.innerHTML = `
      <div class="script-container">
        <h2 class="script-header-title">
          <span>${icon}</span>
          <span>${scriptData.title}</span>
        </h2>

        <div class="script-notice-banner">
          <div class="notice-heading">
            <span>📌</span>
            <span>3 Lưu Ý Bắt Buộc Dành Cho Tư Vấn Viên:</span>
          </div>
          <ul class="notice-list">
            ${notesHtml}
          </ul>
        </div>

        <div class="script-table-wrapper">
          <table class="script-master-table">
            <thead>
              <tr>
                <th style="width: 110px; text-align: center;">Bước Kịch Bản</th>
                <th style="width: 230px;">Tên Giai Đoạn & Tình Huống Ruộng</th>
                <th style="width: 500px;">Chỉ Dẫn Tư Vấn</th>
                <th style="width: 440px;">Hướng Dẫn Xử Lý Tình Huống</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>
      </div>
    `;
  };

  // Render Page 2: Script VG
  const renderScriptVG = () => {
    renderScriptTable(pageScriptVG, AGRIZEN_DATA.scriptVG, '🌾');
  };

  // Render Page 3: Script PH
  const renderScriptPH = () => {
    renderScriptTable(pageScriptPH, AGRIZEN_DATA.scriptPH, '🧪');
  };

  // Render Page 4: Interactive Seasons & Growth Stages
  let activeRegionFilter = 'all';
  let activeStageId = 'stage-1';

  const renderScheduleRice = () => {
    if (!pageScheduleRice || !AGRIZEN_DATA.seasonsAndStages) return;
    const data = AGRIZEN_DATA.seasonsAndStages;

    // 1. Render Region Cards based on active filter
    const filteredRegions = activeRegionFilter === 'all'
      ? data.seasonsSection.regions
      : data.seasonsSection.regions.filter(r => r.id === activeRegionFilter);

    const regionsHtml = filteredRegions.map(reg => `
      <div class="region-card">
        <div class="region-header">
          <div class="region-name">
            <span>${reg.icon}</span>
            <span>${reg.name}</span>
          </div>
          <span class="region-badge">${reg.badge}</span>
        </div>
        <div class="season-list">
          ${reg.seasons.map(s => `
            <div class="season-item">
              <div class="season-title-row">
                <span class="season-pill">${s.name}</span>
                <span style="font-size: 12px; color: var(--text-muted); font-weight: 600;">${s.tag}</span>
              </div>
              <div class="season-climate"><strong>Thời tiết:</strong> ${s.climate}</div>
              <div class="season-nutrient"><strong>🌾 Trọng tâm Dinh dưỡng:</strong> ${s.nutrientNeed}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');

    // 2. Render Active Stage Detail
    const activeStage = data.stagesSection.stages.find(st => st.id === activeStageId) || data.stagesSection.stages[0];

    const stepperNavHtml = data.stagesSection.stages.map(st => `
      <button class="step-btn ${st.id === activeStageId ? 'active' : ''}" data-stage="${st.id}">
        <div class="step-btn-num">${st.stepNum}</div>
        <div class="step-btn-title">${st.tabName}</div>
        <div class="step-btn-age">${st.ageTag}</div>
      </button>
    `).join('');

    const stageDetailHtml = `
      <div class="stage-detail-grid">
        <!-- Left: Nutrition & Prescription -->
        <div class="stage-info-column">
          <div>
            <span class="stage-age-pill">⏱️ Tuổi lúa: ${activeStage.ageTag}</span>
            <h3 class="stage-main-title">${activeStage.title}</h3>
          </div>

          <div class="stage-block-box">
            <div class="stage-block-label">
              <span>🎯</span>
              <span>Mục Tiêu Bứt Phá Năng Suất:</span>
            </div>
            <div class="stage-block-text">${activeStage.yieldGoal}</div>
          </div>

          <div class="stage-block-box">
            <div class="stage-block-label">
              <span>🌾</span>
              <span>Nhu Cầu Dinh Dưỡng Cần Thiết:</span>
            </div>
            <div class="stage-block-text">${activeStage.nutrientNeed}</div>
          </div>

          <div class="stage-block-box box-prescription">
            <div class="stage-block-label" style="color: var(--brand-900);">
              <span>🧰</span>
              <span>Liều Phun:</span>
            </div>
            <div class="stage-block-text" style="font-weight: 600;">${activeStage.prescription}</div>
          </div>

          <div class="stage-block-box box-result">
            <div class="stage-block-label" style="color: var(--amber-950);">
              <span>★</span>
              <span>Kết Quả Tăng Năng Suất Thu Về Ngoài Ruộng:</span>
            </div>
            <div class="stage-block-text" style="font-weight: 700; color: var(--amber-950);">${activeStage.yieldResult}</div>
          </div>
        </div>

        <!-- Right: Photographic Image Asset -->
        <div class="stage-image-column">
          <img src="${activeStage.image}" alt="${activeStage.title}" loading="lazy" />
          <div class="stage-image-caption">🌱 Minh Họa: ${activeStage.title} - Ruộng Lúa Chuẩn Năng Suất</div>
        </div>
      </div>
    `;

    // 3. Render Nutrition Classification & Feeding Steps
    const nutriCardsHtml = data.nutritionSection.classifications.map(c => `
      <div class="nutri-box">
        <div class="nutri-box-icon">${c.icon}</div>
        <div class="nutri-box-title">${c.title}</div>
        <div class="nutri-box-desc">${c.desc}</div>
      </div>
    `).join('');

    const feedingStepsHtml = data.nutritionSection.feedingSteps.map(f => `
      <div class="feeding-step-row">
        <div class="step-tag-dark">${f.step}</div>
        <div class="step-info-text">
          <strong>${f.title}</strong>
          <p>${f.desc}</p>
        </div>
      </div>
    `).join('');

    pageScheduleRice.innerHTML = `
      <div class="page4-container">
        
        <!-- SECTION 1: LỊCH VỤ MÙA LÚA 3 MIỀN TRONG NĂM -->
        <section class="stages-stepper-container">
          <div class="section-hero-header">
            <h2>${data.seasonsSection.title}</h2>
            <p>${data.seasonsSection.subtitle}</p>
          </div>

          <div class="region-filter-bar">
            <button class="filter-btn ${activeRegionFilter === 'all' ? 'active' : ''}" data-region="all">Tất Cả Các Miền</button>
            <button class="filter-btn ${activeRegionFilter === 'bac' ? 'active' : ''}" data-region="bac">Miền Bắc</button>
            <button class="filter-btn ${activeRegionFilter === 'trung' ? 'active' : ''}" data-region="trung">Miền Trung</button>
            <button class="filter-btn ${activeRegionFilter === 'nam' ? 'active' : ''}" data-region="nam">Miền Nam</button>
          </div>

          <div class="regions-grid">
            ${regionsHtml}
          </div>
        </section>

        <!-- SECTION 2: 5 GIAI ĐOẠN SINH TRƯỞNG & QUY TRÌNH DINH DƯỠNG -->
        <section class="stages-stepper-container">
          <div class="section-hero-header">
            <h2>${data.stagesSection.title}</h2>
            <p>${data.stagesSection.subtitle}</p>
          </div>

          <!-- Stepper Navigation -->
          <div class="stepper-nav">
            ${stepperNavHtml}
          </div>

          <!-- Stage Detail View -->
          <div id="stage-detail-container">
            ${stageDetailHtml}
          </div>
        </section>

        <!-- SECTION 3: QUY TRÌNH DINH DƯỠNG & 5 ĐỢT BÓN PHÂN -->
        <section class="nutrition-grid-wrapper">
          <div class="nutrition-card-panel">
            <h3 class="panel-header-title">Phân Loại Dinh Dưỡng Lúa</h3>
            <div class="nutrition-class-cards">
              ${nutriCardsHtml}
            </div>
          </div>

          <div class="nutrition-card-panel">
            <h3 class="panel-header-title">5 Đợt Bón Phân & Dưỡng Lúa Chuẩn</h3>
            <div class="feeding-steps-list">
              ${feedingStepsHtml}
            </div>
          </div>
        </section>

      </div>
    `;

    // Bind Region Filter Buttons
    pageScheduleRice.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const region = e.currentTarget.getAttribute('data-region');
        if (region) {
          activeRegionFilter = region;
          renderScheduleRice();
        }
      });
    });

    // Bind Stepper Buttons
    pageScheduleRice.querySelectorAll('.step-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const stId = e.currentTarget.getAttribute('data-stage');
        if (stId) {
          activeStageId = stId;
          renderScheduleRice();
        }
      });
    });
  };

  // Render Page 5: Alkaline Deep Dive & 4 Crops Dosage Schedule
  let activeAlkalineSubTab = 'all';

  const renderAlkalineDeep = () => {
    if (!pageAlkalineDeep || !AGRIZEN_DATA.alkalineDeep) return;
    const data = AGRIZEN_DATA.alkalineDeep;

    // 0. Part II: 6 Cơ Chế Hoạt Động
    const p2 = data.part2_mechanisms;
    const p2MechanismsHtml = p2.mechanisms.map(m => `
      <div class="mech-item">
        <h4>${m.title}</h4>
        <p>${m.desc}</p>
      </div>
    `).join('');

    // 1. Part III: Các Điểm Mạnh Vượt Trội
    const p3 = data.part3_strengths;
    const p3RowsHtml = p3.rows.map(r => `
      <tr>
        <td class="col-indicator">${r.indicator}</td>
        <td class="col-content">${r.content}</td>
        <td class="col-action">${r.action}</td>
      </tr>
    `).join('');

    // 2. Part IV: Giải Thích Chuyên Sâu Bản Chất Kiềm Sinh Học
    const p4 = data.part4_deep_dive;
    const p4RowsHtml = p4.rows.map(r => `
      <tr>
        <td class="col-indicator">${r.concept}</td>
        <td class="col-content">${r.content}</td>
        <td class="col-action">${r.action}</td>
      </tr>
    `).join('');

    // 3. Part V: Liều Lượng & Lịch Phun 4 Nhóm Cây Trồng
    const p5 = data.part5_crops;
    const cropsHtml = p5.crops.map(c => `
      <div class="crop-card">
        <div class="crop-title">
          <span>🌿</span>
          <span>${c.name}</span>
        </div>
        <div class="crop-rate-badge"><strong>Liều lượng:</strong> ${c.rate}</div>
        ${c.stages && c.stages.length > 0 ? `
          <ul class="crop-stage-list">
            ${c.stages.map(st => `<li>${st}</li>`).join('')}
          </ul>
        ` : ''}
      </div>
    `).join('');

    pageAlkalineDeep.innerHTML = `
      <div class="deep-dive-container">
        
        <!-- SUB-TABS NAVIGATION BAR -->
        <div class="region-filter-bar" style="margin-bottom: 8px;">
          <button class="filter-btn ${activeAlkalineSubTab === 'all' ? 'active' : ''}" data-subtab="all">Tất Cả Các Mục</button>
          <button class="filter-btn ${activeAlkalineSubTab === 'mechanisms' ? 'active' : ''}" data-subtab="mechanisms">⚡ Cơ Chế Hoạt Động</button>
          <button class="filter-btn ${activeAlkalineSubTab === 'strengths' ? 'active' : ''}" data-subtab="strengths">🔬 Điểm Mạnh & Biochar Mỹ</button>
          <button class="filter-btn ${activeAlkalineSubTab === 'deepdive' ? 'active' : ''}" data-subtab="deepdive">🧪 Bản Chất Kiềm Sinh Học</button>
          <button class="filter-btn ${activeAlkalineSubTab === 'crops' ? 'active' : ''}" data-subtab="crops">📅 Liều Phun & Lịch Tưới 4 Cây Trồng</button>
        </div>

        <!-- BLOCK 0: II. CƠ CHẾ HOẠT ĐỘNG CỦA KIỀM SINH HỌC BIOCHAR -->
        <section class="deep-panel" id="sec-mechanisms" style="display: ${activeAlkalineSubTab === 'all' || activeAlkalineSubTab === 'mechanisms' ? 'block' : 'none'};">
          <div class="deep-panel-header">
            <h3>
              <span>⚡</span>
              <span>${p2.title}</span>
            </h3>
          </div>
          <div class="mechanisms-grid">
            ${p2MechanismsHtml}
          </div>
        </section>

        <!-- BLOCK 1: III. CÁC ĐIỂM MẠNH VƯỢT TRỘI VÀ CÔNG NGHỆ BIOCHAR HOẠT HÓA MỸ -->
        <section class="deep-panel" id="sec-strengths" style="display: ${activeAlkalineSubTab === 'all' || activeAlkalineSubTab === 'strengths' ? 'block' : 'none'};">
          <div class="deep-panel-header">
            <h3>
              <span>🔬</span>
              <span>${p3.title}</span>
            </h3>
          </div>
          <div class="deep-table-wrapper">
            <table class="deep-master-table">
              <thead>
                <tr>
                  <th style="width: 220px;">${p3.headers[0]}</th>
                  <th style="width: 240px;">${p3.headers[1]}</th>
                  <th>${p3.headers[2]}</th>
                </tr>
              </thead>
              <tbody>
                ${p3RowsHtml}
              </tbody>
            </table>
          </div>
        </section>

        <!-- BLOCK 2: IV. GIẢI THÍCH CHUYÊN SÂU VỀ BẢN CHẤT KIỀM SINH HỌC & TÍNH AN TOÀN CẢI TẠO ĐẤT -->
        <section class="deep-panel" id="sec-deepdive" style="display: ${activeAlkalineSubTab === 'all' || activeAlkalineSubTab === 'deepdive' ? 'block' : 'none'};">
          <div class="deep-panel-header">
            <h3>
              <span>🧪</span>
              <span>${p4.title}</span>
            </h3>
          </div>
          <div class="deep-table-wrapper">
            <table class="deep-master-table">
              <thead>
                <tr>
                  <th style="width: 220px;">${p4.headers[0]}</th>
                  <th style="width: 240px;">${p4.headers[1]}</th>
                  <th>${p4.headers[2]}</th>
                </tr>
              </thead>
              <tbody>
                ${p4RowsHtml}
              </tbody>
            </table>
          </div>
        </section>

        <!-- BLOCK 3: V. LIỀU LƯỢNG & LỊCH PHUN / TƯỚI CHUẨN CHO 4 NHÓM CÂY TRỒNG -->
        <section class="dosage-card" id="sec-crops" style="background-color: #ffffff; display: ${activeAlkalineSubTab === 'all' || activeAlkalineSubTab === 'crops' ? 'block' : 'none'};">
          <h3 class="block-title">
            <span>📅</span>
            <span>${p5.title}</span>
          </h3>

          <div style="background: #f0f7ec; border: 1px solid var(--brand-200); border-radius: var(--radius-sm); padding: 14px 18px; margin-bottom: 20px;">
            <div style="font-size: 14px; font-weight: 800; color: var(--brand-900); margin-bottom: 6px; white-space: pre-line;">${p5.dilutionNote}</div>
          </div>

          <div class="crops-grid">
            ${cropsHtml}
          </div>

          <div class="mixing-protocol-box">
            <strong>⚠️ Nguyên tắc phối trộn & Phun Drone:</strong> ${p5.mixingRule}
          </div>
        </section>

      </div>
    `;

    // Bind SubTab Filter Buttons
    pageAlkalineDeep.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const sub = e.currentTarget.getAttribute('data-subtab');
        if (sub) {
          activeAlkalineSubTab = sub;
          renderAlkalineDeep();
        }
      });
    });
  };

  // Render Page 6: Rice Dictionary (50 Thuật Ngữ Nông Dân 3 Miền)
  let activeRiceDictRegion = 'all';
  let riceDictSearchQuery = '';

  const renderRiceDict = () => {
    if (!pageRiceDict || !AGRIZEN_DATA.riceDictionary) return;
    const data = AGRIZEN_DATA.riceDictionary;

    const filteredTerms = data.terms.filter(t => {
      const matchRegion = activeRiceDictRegion === 'all' || t.region.includes(activeRiceDictRegion);
      const q = riceDictSearchQuery.toLowerCase().trim();
      const matchQuery = !q ||
        t.term.toLowerCase().includes(q) ||
        t.meaning.toLowerCase().includes(q) ||
        t.sign.toLowerCase().includes(q) ||
        t.sampleCall.toLowerCase().includes(q) ||
        t.region.toLowerCase().includes(q);
      return matchRegion && matchQuery;
    });

    const categoryBtnsHtml = data.categories.map(cat => `
      <button class="filter-btn ${cat.id === activeRiceDictRegion ? 'active' : ''}" data-rice-region="${cat.id}">
        ${cat.name}
      </button>
    `).join('');

    const termsHtml = filteredTerms.map(t => `
      <div class="dict-card">
        <div class="dict-card-header">
          <div>
            <h4 class="dict-card-title">📖 ${t.id}. ${t.term}</h4>
            <div style="font-size: 13px; color: var(--text-muted); margin-top: 2px;">📍 Vùng: ${t.region}</div>
          </div>
          <span class="dict-badge">${t.region}</span>
        </div>

        <div style="font-size: 13.5px; line-height: 1.55; color: var(--text-main);">
          <strong>🧠 Ý nghĩa khoa học / Sinh lý:</strong><br>
          ${t.meaning}
        </div>

        <div class="dict-stages-box">
          <h5>🌾 Dấu Hiệu Nhận Biết Ngoài Ruộng:</h5>
          <div style="font-size: 13px; color: var(--text-main); line-height: 1.5;">${t.sign}</div>
        </div>

        <div class="dict-spray-box" style="background-color: #fcf8e3; border-left-color: #856404;">
          <h5 style="color: #856404;">💬 Mẫu Câu Tư Vấn Khéo Léo (Telesales):</h5>
          <div style="font-size: 13.5px; font-weight: 600; color: #533f03; font-style: italic; line-height: 1.5;">
            ${t.sampleCall}
          </div>
        </div>
      </div>
    `).join('');

    pageRiceDict.innerHTML = `
      <div class="dict-container">
        
        <div class="dict-controls-bar">
          <div class="search-input-box">
            <span class="search-icon">🔍</span>
            <input type="text" id="rice-dict-search-input" placeholder="Tìm nhanh 50 thuật ngữ tiếng lóng lúa (tim đèn, ôm bắp, nghẹt rễ, lúa sụm mặt, chắc cậy, gió Lào...)" value="${riceDictSearchQuery}" />
          </div>

          <div class="region-filter-bar" style="margin-bottom: 0; justify-content: flex-start;">
            ${categoryBtnsHtml}
          </div>
        </div>

        <div class="dict-grid">
          ${filteredTerms.length > 0 ? termsHtml : `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; background: #ffffff; border-radius: var(--radius-md); color: var(--text-muted);">
              Không tìm thấy thuật ngữ phù hợp với từ khóa "${riceDictSearchQuery}".
            </div>
          `}
        </div>

      </div>
    `;

    pageRiceDict.querySelectorAll('[data-rice-region]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const r = e.currentTarget.getAttribute('data-rice-region');
        if (r) {
          activeRiceDictRegion = r;
          renderRiceDict();
        }
      });
    });

    const searchInput = document.getElementById('rice-dict-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        riceDictSearchQuery = e.target.value;
        renderRiceDict();
        const reInput = document.getElementById('rice-dict-search-input');
        if (reInput) {
          reInput.focus();
          reInput.setSelectionRange(reInput.value.length, reInput.value.length);
        }
      });
    }
  };

  // Render Page 7: Crop Dictionary (Bệnh Đất & So Sánh Cách Làm)
  let activeCropDictTab = 'all';
  let cropDictSearchQuery = '';

  const renderCropDict = () => {
    if (!pageCropDict || !AGRIZEN_DATA.cropDictionary) return;
    const data = AGRIZEN_DATA.cropDictionary;

    const filteredTerms = data.terms.filter(t => {
      const q = cropDictSearchQuery.toLowerCase().trim();
      return !q ||
        t.term.toLowerCase().includes(q) ||
        t.cause.toLowerCase().includes(q) ||
        t.crops.toLowerCase().includes(q) ||
        t.symptom.toLowerCase().includes(q) ||
        t.solution.toLowerCase().includes(q);
    });

    const categoryBtnsHtml = data.categories.map(cat => `
      <button class="filter-btn ${cat.id === activeCropDictTab ? 'active' : ''}" data-crop-tab="${cat.id}">
        ${cat.name}
      </button>
    `).join('');

    const termsCardsHtml = filteredTerms.map(t => `
      <div class="dict-card">
        <div class="dict-card-header">
          <div>
            <h4 class="dict-card-title">⚠️ ${t.stt}. ${t.term}</h4>
            <div style="font-size: 13px; color: var(--text-muted); margin-top: 2px;">🌿 Đối tượng: ${t.crops}</div>
          </div>
          <span class="dict-badge" style="background-color: var(--red-50); color: var(--red-800); border-color: var(--red-100);">Bệnh Thổ Nhưỡng</span>
        </div>

        <div style="font-size: 13.5px; line-height: 1.55; color: var(--text-main);">
          <strong>🔬 Nguyên nhân sinh học:</strong><br>
          ${t.cause}
        </div>

        <div class="crop-issue-box">
          <strong>⚠️ Triệu chứng thực tế ngoài vườn/ruộng:</strong><br>
          ${t.symptom}
        </div>

        <div class="crop-benefit-box">
          <strong>🧪 Giải pháp Kiềm Sinh Học Biochar Mỹ:</strong><br>
          ${t.solution}
        </div>
      </div>
    `).join('');

    const comparisonsRowsHtml = data.comparisons.map(c => `
      <tr>
        <td class="col-indicator" style="width: 180px;">${c.group}</td>
        <td class="col-content" style="width: 200px;">${c.detail}</td>
        <td style="width: 260px; background-color: var(--red-50); color: var(--red-800); font-size: 13.5px; line-height: 1.5;">
          <strong>❌ Cách làm cũ:</strong><br>${c.oldWay}<br><br>
          <strong>⚠️ Tác hại:</strong><br>${c.oldHarm}
        </td>
        <td style="width: 320px; background-color: #f4faf2; color: var(--brand-950); font-size: 13.5px; line-height: 1.5;">
          <strong>✅ Cách làm mới Biochar:</strong><br>${c.newWay}<br><br>
          <strong>★ Kết quả thu về:</strong><br>${c.newResult}
        </td>
      </tr>
    `).join('');

    pageCropDict.innerHTML = `
      <div class="dict-container">
        
        <div class="dict-controls-bar">
          <div class="search-input-box">
            <span class="search-icon">🔍</span>
            <input type="text" id="crop-dict-search-input" placeholder="Tìm kiếm bệnh rễ, hiện tượng đất chua, thối rễ mùa mưa, mở khóa Lân, rửa mặn..." value="${cropDictSearchQuery}" />
          </div>

          <div class="region-filter-bar" style="margin-bottom: 0; justify-content: flex-start;">
            ${categoryBtnsHtml}
          </div>
        </div>

        <!-- SECTION 1: 9 BỆNH RỄ & THỔ NHƯỠNG -->
        <div id="sec-crop-terms" style="display: ${activeCropDictTab === 'all' || activeCropDictTab === 'terms' ? 'block' : 'none'};">
          <h3 class="panel-header-title" style="margin-bottom: 16px;">⚠️ 9 Hiện Tượng Bệnh Thổ Nhưỡng & Rễ Nông Dân Thường Gặp</h3>
          <div class="dict-grid">
            ${filteredTerms.length > 0 ? termsCardsHtml : `
              <div style="grid-column: 1 / -1; text-align: center; padding: 40px; background: #ffffff; border-radius: var(--radius-md); color: var(--text-muted);">
                Không tìm thấy thuật ngữ phù hợp với từ khóa "${cropDictSearchQuery}".
              </div>
            `}
          </div>
        </div>

        <!-- SECTION 2: BẢNG SO SÁNH CÁCH LÀM CŨ VS BIOCHAR MỸ -->
        <div class="deep-panel" id="sec-crop-comparison" style="margin-top: 10px; display: ${activeCropDictTab === 'all' || activeCropDictTab === 'comparison' ? 'block' : 'none'};">
          <div class="deep-panel-header">
            <h3>
              <span>⚖️</span>
              <span>BẢNG SO SÁNH CÁCH LÀM CŨ DÙNG VÔI ĐÁ VỚI CÁCH LÀM MỚI BIOCHAR MỸ (HỮU pH 14)</span>
            </h3>
          </div>
          <div class="deep-table-wrapper">
            <table class="deep-master-table">
              <thead>
                <tr>
                  <th style="width: 180px;">Nhóm Cây Trồng</th>
                  <th style="width: 200px;">Loại Cây Chi Tiết & Vùng</th>
                  <th style="width: 260px;">Cách Làm Cũ & Tác Hại Chai Đất</th>
                  <th style="width: 320px;">Cách Làm Mới Với Hữu pH 14 & Kết Quả</th>
                </tr>
              </thead>
              <tbody>
                ${comparisonsRowsHtml}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    `;

    pageCropDict.querySelectorAll('[data-crop-tab]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.getAttribute('data-crop-tab');
        if (tab) {
          activeCropDictTab = tab;
          renderCropDict();
        }
      });
    });

    const searchInput = document.getElementById('crop-dict-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        cropDictSearchQuery = e.target.value;
        renderCropDict();
        const reInput = document.getElementById('crop-dict-search-input');
        if (reInput) {
          reInput.focus();
          reInput.setSelectionRange(reInput.value.length, reInput.value.length);
        }
      });
    }
  };

  // Render Page 8: Rice Varieties (10 Giống Lúa Chủ Lực)
  let activeRiceVarietyCategory = 'all';
  let riceVarietySearchQuery = '';

  const renderRiceVarieties = () => {
    if (!pageRiceVarieties || !AGRIZEN_DATA.riceVarieties) return;
    const data = AGRIZEN_DATA.riceVarieties;

    const filteredVarieties = data.varieties.filter(v => {
      const matchCat = activeRiceVarietyCategory === 'all' || v.category === activeRiceVarietyCategory;
      const query = riceVarietySearchQuery.toLowerCase().trim();
      const matchQuery = !query ||
        v.name.toLowerCase().includes(query) ||
        v.region.toLowerCase().includes(query) ||
        v.badge.toLowerCase().includes(query);
      return matchCat && matchQuery;
    });

    const categoryBtnsHtml = data.categories.map(cat => `
      <button class="filter-btn ${cat.id === activeRiceVarietyCategory ? 'active' : ''}" data-variety-cat="${cat.id}">
        ${cat.name}
      </button>
    `).join('');

    const cardsHtml = filteredVarieties.map(v => `
      <div class="dict-card">
        <div class="dict-card-header">
          <div>
            <h4 class="dict-card-title">🌾 ${v.name}</h4>
            <div style="font-size: 13px; color: var(--text-muted); margin-top: 2px;">📍 ${v.region}</div>
          </div>
          <span class="dict-badge">${v.badge}</span>
        </div>

        <div class="dict-specs-grid">
          <div class="dict-spec-item"><strong>⏱️ Tổng ngày:</strong> ${v.duration}</div>
          <div class="dict-spec-item"><strong>💰 Giá lúa tươi:</strong> ${v.price}</div>
          <div class="dict-spec-item"><strong>🌾 Năng suất:</strong> ${v.yield}</div>
          <div class="dict-spec-item"><strong>💵 Doanh thu:</strong> ${v.revenue}</div>
        </div>

        <div class="dict-stages-box">
          <h5>⏱️ Chi Tiết 4 Giai Đoạn Sinh Trưởng:</h5>
          <ul class="dict-stages-list">
            <li>• <strong>Đẻ nhánh:</strong> ${v.stages.tillering}</li>
            <li>• <strong>Làm đòng:</strong> ${v.stages.panicle}</li>
            <li>• <strong>Trổ - Cong me:</strong> ${v.stages.heading}</li>
            <li>• <strong>Chín - Gặt:</strong> ${v.stages.ripening}</li>
          </ul>
        </div>

        <div class="dict-spray-box">
          <h5>🧰 Lịch Phun ZAKi Chuẩn Theo Ngày Tuổi:</h5>
          <ul class="dict-spray-list">
            ${v.spraySchedule.map(s => `<li>• ${s}</li>`).join('')}
          </ul>
        </div>
      </div>
    `).join('');

    pageRiceVarieties.innerHTML = `
      <div class="dict-container">
        
        <div class="dict-controls-bar">
          <div class="search-input-box">
            <span class="search-icon">🔍</span>
            <input type="text" id="variety-search-input" placeholder="Tìm nhanh tên giống lúa (OM18, ST25, Đài Thơm 8...), khu vực canh tác..." value="${riceVarietySearchQuery}" />
          </div>

          <div class="region-filter-bar" style="margin-bottom: 0; justify-content: flex-start;">
            ${categoryBtnsHtml}
          </div>
        </div>

        <div class="dict-sales-tip">
          ${data.salesTip}
        </div>

        <div class="dict-grid">
          ${filteredVarieties.length > 0 ? cardsHtml : `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; background: #ffffff; border-radius: var(--radius-md); color: var(--text-muted);">
              Không tìm thấy giống lúa phù hợp với từ khóa "${riceVarietySearchQuery}".
            </div>
          `}
        </div>

      </div>
    `;

    pageRiceVarieties.querySelectorAll('[data-variety-cat]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const cat = e.currentTarget.getAttribute('data-variety-cat');
        if (cat) {
          activeRiceVarietyCategory = cat;
          renderRiceVarieties();
        }
      });
    });

    const searchInput = document.getElementById('variety-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        riceVarietySearchQuery = e.target.value;
        renderRiceVarieties();
        const reInput = document.getElementById('variety-search-input');
        if (reInput) {
          reInput.focus();
          reInput.setSelectionRange(reInput.value.length, reInput.value.length);
        }
      });
    }
  };

  // Render Page 9: Crop Types (Hệ Đa Cây Trồng)
  let activeCropTypeCategory = 'all';
  let cropTypeSearchQuery = '';

  const renderCropTypes = () => {
    if (!pageCropTypes || !AGRIZEN_DATA.cropTypes) return;
    const data = AGRIZEN_DATA.cropTypes;

    const filteredCrops = data.crops.filter(c => {
      const matchCat = activeCropTypeCategory === 'all' || c.category === activeCropTypeCategory;
      const query = cropTypeSearchQuery.toLowerCase().trim();
      const matchQuery = !query ||
        c.name.toLowerCase().includes(query) ||
        c.issues.toLowerCase().includes(query) ||
        c.benefits.toLowerCase().includes(query);
      return matchCat && matchQuery;
    });

    const categoryBtnsHtml = data.categories.map(cat => `
      <button class="filter-btn ${cat.id === activeCropTypeCategory ? 'active' : ''}" data-crop-type-cat="${cat.id}">
        ${cat.name}
      </button>
    `).join('');

    const cardsHtml = filteredCrops.map(c => `
      <div class="dict-card">
        <div class="dict-card-header">
          <div>
            <h4 class="dict-card-title">${c.icon} ${c.name}</h4>
            <div style="margin-top: 6px;">
              <span class="crop-ph-badge">🎯 pH Đất Lý Tưởng: <strong>${c.targetPh}</strong></span>
            </div>
          </div>
        </div>

        <div class="crop-issue-box">
          <strong>⚠️ Vấn đề thổ nhưỡng & Bệnh rễ:</strong><br>
          ${c.issues}
        </div>

        <div class="dict-stages-box">
          <h5>🧪 Liều Pha & Định Mức Tưới Chuẩn:</h5>
          <div style="font-size: 13.5px; font-weight: 700; color: var(--brand-900); margin-bottom: 4px;">${c.dosage.rate}</div>
          <ul class="dict-stages-list">
            ${c.dosage.treeRates.map(r => `<li>• ${r}</li>`).join('')}
          </ul>
        </div>

        <div class="dict-spray-box">
          <h5>📅 Lịch Tưới 4 Cử Chuẩn Trong Năm:</h5>
          <ul class="dict-spray-list">
            ${c.stages.map(s => `<li>• ${s}</li>`).join('')}
          </ul>
        </div>

        <div class="crop-benefit-box">
          <strong>★ Hiệu quả phục hồi & Cải tạo rễ:</strong> ${c.benefits}
        </div>
      </div>
    `).join('');

    pageCropTypes.innerHTML = `
      <div class="dict-container">
        
        <div class="dict-controls-bar">
          <div class="search-input-box">
            <span class="search-icon">🔍</span>
            <input type="text" id="crop-type-search-input" placeholder="Tìm kiếm cây trồng (Sầu riêng, Bưởi, Cà phê, Ớt...), triệu chứng bệnh đất..." value="${cropTypeSearchQuery}" />
          </div>

          <div class="region-filter-bar" style="margin-bottom: 0; justify-content: flex-start;">
            ${categoryBtnsHtml}
          </div>
        </div>

        <div class="dict-grid">
          ${filteredCrops.length > 0 ? cardsHtml : `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; background: #ffffff; border-radius: var(--radius-md); color: var(--text-muted);">
              Không tìm thấy cây trồng phù hợp với từ khóa "${cropTypeSearchQuery}".
            </div>
          `}
        </div>

      </div>
    `;

    pageCropTypes.querySelectorAll('[data-crop-type-cat]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const cat = e.currentTarget.getAttribute('data-crop-type-cat');
        if (cat) {
          activeCropTypeCategory = cat;
          renderCropTypes();
        }
      });
    });

    const searchInput = document.getElementById('crop-type-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        cropTypeSearchQuery = e.target.value;
        renderCropTypes();
        const reInput = document.getElementById('crop-type-search-input');
        if (reInput) {
          reInput.focus();
          reInput.setSelectionRange(reInput.value.length, reInput.value.length);
        }
      });
    }
  };

  // =========================================================================
  // PAGE 10: VOUCHER GENERATOR (TẠO PHIẾU CAM KẾT & BẢO HÀNH ĐIỆN TỬ)
  // =========================================================================
  let voucherCurrentTab = 'back';
  let vImgFront = new Image();
  let vImgBack = new Image();
  let vImagesLoaded = 0;

  const renderVoucherGenerator = () => {
    if (!pageVoucherGenerator) return;

    pageVoucherGenerator.innerHTML = `
      <style>
        .voucher-tool-container {
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 20px;
          align-items: start;
        }
        @media (max-width: 950px) {
          .voucher-tool-container {
            grid-template-columns: 1fr;
          }
        }
        .voucher-form-card, .voucher-preview-card {
          background: #ffffff;
          border: 1px solid #ccd9c7;
          border-radius: 14px;
          padding: 20px;
          box-shadow: 0 4px 16px rgba(15, 56, 30, 0.06);
        }
        .voucher-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #d8f1e1;
          padding-bottom: 12px;
          margin-bottom: 16px;
        }
        .voucher-card-header h3 {
          font-size: 15px;
          font-weight: 800;
          color: #0f381e;
          margin: 0;
        }
        .voucher-badge {
          background: #fef08a;
          color: #713f12;
          font-size: 11px;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 6px;
          text-transform: uppercase;
        }
        .v-form-group {
          margin-bottom: 14px;
        }
        .v-form-group label {
          display: block;
          font-size: 12px;
          font-weight: 700;
          color: #2d4232;
          margin-bottom: 6px;
        }
        .v-form-group input[type="text"] {
          width: 100%;
          padding: 10px 12px;
          border: 1.5px solid #ccd9c7;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          color: #0a180d;
          background: #ffffff;
          outline: none;
          transition: all 0.2s;
        }
        .v-form-group input[type="text"]:focus {
          border-color: #2e9451;
          box-shadow: 0 0 0 3px #d8f1e1;
        }
        .v-quick-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 6px;
        }
        .v-chip {
          background: #edf8f1;
          border: 1px solid #bde4ca;
          color: #1b5e32;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.15s;
          user-select: none;
        }
        .v-chip:hover {
          background: #d8f1e1;
          border-color: #3db365;
          transform: translateY(-1px);
        }
        .voucher-tab-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 14px;
        }
        .v-tab-btn {
          padding: 8px 14px;
          font-size: 13px;
          font-weight: 700;
          border: 1px solid #ccd9c7;
          background: #edf3e9;
          color: #2d4232;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .v-tab-btn.active {
          background: #237841;
          color: #ffffff;
          border-color: #1b5e32;
          box-shadow: 0 2px 8px rgba(27, 94, 50, 0.2);
        }
        .v-ratio-label {
          margin-left: auto;
          font-size: 12px;
          font-weight: 700;
          color: #4a6350;
        }
        .v-canvas-wrapper {
          background: #142318;
          padding: 16px;
          border-radius: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 280px;
          overflow: hidden;
          box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.3);
        }
        .v-canvas-wrapper canvas {
          max-width: 100% !important;
          height: auto !important;
          border-radius: 6px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
          display: block;
        }
        .v-action-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-top: 14px;
        }
        @media (max-width: 600px) {
          .v-action-grid {
            grid-template-columns: 1fr;
          }
        }
        .v-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 12px 16px;
          font-size: 13px;
          font-weight: 700;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          user-select: none;
        }
        .v-btn-reset {
          width: 100%;
          background: #ffffff;
          color: #2d4232;
          border: 1.5px solid #b3c5ad;
          margin-top: 6px;
        }
        .v-btn-reset:hover {
          background: #e1ecdc;
        }
        .v-btn-copy {
          background: #0284c7;
          color: #ffffff;
          box-shadow: 0 3px 10px rgba(2, 132, 199, 0.25);
        }
        .v-btn-copy:hover {
          background: #0369a1;
          transform: translateY(-1px);
        }
        .v-btn-download {
          background: #237841;
          color: #ffffff;
          box-shadow: 0 3px 10px rgba(27, 94, 50, 0.25);
        }
        .v-btn-download:hover {
          background: #1b5e32;
          transform: translateY(-1px);
        }
        .v-btn-combined {
          grid-column: 1 / -1;
          background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(180, 83, 9, 0.25);
        }
        .v-btn-combined:hover {
          transform: translateY(-1px);
        }
        .v-toast {
          position: fixed;
          bottom: 24px;
          right: 24px;
          background: #0f2918;
          color: #ffffff;
          padding: 14px 20px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          border-left: 4px solid #3db365;
          transform: translateY(120px);
          opacity: 0;
          transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
          z-index: 1000;
        }
        .v-toast.show {
          transform: translateY(0);
          opacity: 1;
        }
      </style>

      <div class="voucher-tool-container">
        <!-- FORM BÊN TRÁI -->
        <div class="voucher-form-card">
          <div class="voucher-card-header">
            <h3>📝 NHẬP THÔNG TIN ĐƠN HÀNG</h3>
            <span class="voucher-badge">Xuất phiếu 5s</span>
          </div>

          <div class="v-form-group">
            <label>1. Tên Khách Hàng / Địa Chỉ</label>
            <input type="text" id="vCustName" value="Chú Năm (Vĩnh Thuận, Kiên Giang)" placeholder="VD: Chú Bảy - An Giang">
            <div class="v-quick-chips">
              <span class="v-chip" data-val="Chú Ba (Thoại Sơn, An Giang)">Chú Ba (An Giang)</span>
              <span class="v-chip" data-val="Anh Tư (Tân Hồng, Đồng Tháp)">Anh Tư (Đồng Tháp)</span>
              <span class="v-chip" data-val="Chú Bảy (Hòn Đất, Kiên Giang)">Chú Bảy (Kiên Giang)</span>
            </div>
          </div>

          <div class="v-form-group">
            <label>2. Số Điện Thoại Khách</label>
            <input type="text" id="vCustPhone" value="0918.765.432" placeholder="VD: 0912.345.678">
          </div>

          <div class="v-form-group">
            <label>3. Sản Phẩm Khách Mua</label>
            <input type="text" id="vCustProduct" value="Combo 3 Lon Rước Đòng + 1 Vô Gạo (Mỹ)" placeholder="VD: 2 Lon ZAKI Rước Đòng 1L">
            <div class="v-quick-chips">
              <span class="v-chip" data-prod="Combo 3 Rước Đòng + 1 Vô Gạo (Mỹ)">Combo 3+1</span>
              <span class="v-chip" data-prod="Combo 2 Lon ZAKI Rước Đòng 1L (Mỹ)">2 Lon Rước Đòng</span>
              <span class="v-chip" data-prod="Bộ 3 Lon ZAKI: pH14 + Rước Đòng + Vô Gạo">Bộ 3 Lon ZAKI</span>
              <span class="v-chip" data-prod="Thùng 8 Lon ZAKI Rước Đòng 1L (Mỹ)">1 Thùng 8 Lon</span>
            </div>
          </div>

          <div class="v-form-group">
            <label>4. Ngày Xuất Phiếu / Sử Dụng</label>
            <input type="text" id="vCustDate" value="04/09/2026">
          </div>

          <div class="v-form-group">
            <label>5. Số Mã Bảo Hành (Serial)</label>
            <input type="text" id="vCustSerial" value="ZK-2026-889" placeholder="ZK-2026-...">
          </div>

          <button class="v-btn v-btn-reset" id="vBtnReset">
            🔄 Làm Mới / Đơn Kế Tiếp (Tạo Mã Mới)
          </button>
        </div>

        <!-- KHU VỰC XEM TRƯỚC VÀ NÚT XUẤT ẢNH -->
        <div class="voucher-preview-card">
          <div class="voucher-tab-bar">
            <button class="v-tab-btn active" id="vTabBack">📄 Mặt Sau (Có Tên)</button>
            <button class="v-tab-btn" id="vTabFront">🌿 Mặt Trước (Cam Kết)</button>
            <button class="v-tab-btn" id="vTabBoth">✨ Ghép Cả 2 Mặt</button>
            <span class="v-ratio-label">Chuẩn In 15cm x 5.8cm (300 DPI)</span>
          </div>

          <div class="v-canvas-wrapper">
            <canvas id="vCanvas"></canvas>
          </div>

          <div class="v-action-grid">
            <button class="v-btn v-btn-copy" id="vBtnCopy">
              📋 Sao Chép Ảnh (Dán Vào Zalo)
            </button>
            <button class="v-btn v-btn-download" id="vBtnDownload">
              💾 Tải Ảnh Này Về Máy (PNG)
            </button>
            <button class="v-btn v-btn-combined" id="vBtnDownloadCombined">
              🖼️ Tải Ảnh Ghép 2 Mặt Gửi Khách (Nét Nhất)
            </button>
          </div>
        </div>
      </div>

      <div id="vToast" class="v-toast">
        ✅ Đã sao chép ảnh vào bộ nhớ tạm! Bạn chỉ cần nhấn <b>Ctrl + V</b> trong Zalo để gửi cho khách.
      </div>
    `;

    // Canvas Logic
    const canvas = document.getElementById('vCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const checkReadyAndDraw = () => {
      if (vImagesLoaded >= 2) {
        drawVoucher();
      }
    };

    vImgFront.onload = () => { vImagesLoaded++; checkReadyAndDraw(); };
    vImgBack.onload = () => { vImagesLoaded++; checkReadyAndDraw(); };
    vImgFront.src = 'assets/voucher_front.png';
    vImgBack.src = 'assets/voucher_back.png';

    const drawVoucher = () => {
      if (vImagesLoaded < 2) return;

      const name = document.getElementById('vCustName')?.value || '...........................................';
      const phone = document.getElementById('vCustPhone')?.value || '...........................................';
      const prod = document.getElementById('vCustProduct')?.value || '...........................................';
      const date = document.getElementById('vCustDate')?.value || '.../.../2026';
      const serial = document.getElementById('vCustSerial')?.value ? `(Mã: ${document.getElementById('vCustSerial').value})` : '';

      const W = vImgBack.width;  // 1701
      const H = vImgBack.height; // 657

      if (voucherCurrentTab === 'front') {
        canvas.width = W;
        canvas.height = H;
        ctx.drawImage(vImgFront, 0, 0);
      } else if (voucherCurrentTab === 'back') {
        canvas.width = W;
        canvas.height = H;
        ctx.drawImage(vImgBack, 0, 0);
        drawTextOnCanvas(ctx, name, phone, prod, date, serial);
      } else if (voucherCurrentTab === 'both') {
        canvas.width = W;
        canvas.height = H * 2 + 30;
        ctx.fillStyle = '#E0E8E1';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Front
        ctx.drawImage(vImgFront, 0, 0);

        // Back
        ctx.drawImage(vImgBack, 0, H + 30);
        ctx.save();
        ctx.translate(0, H + 30);
        drawTextOnCanvas(ctx, name, phone, prod, date, serial);
        ctx.restore();
      }
    };

    const drawTextOnCanvas = (c, name, phone, prod, date, serial) => {
      c.fillStyle = '#004D40'; // Deep emerald green
      c.font = 'bold 30px "Be Vietnam Pro", "Segoe UI", sans-serif';
      c.textBaseline = 'alphabetic';

      // Line 1: Khách hàng (baseline y=446, start x=340)
      c.fillText(name, 340, 446);

      // Line 2: SĐT (baseline y=500)
      c.fillText(phone, 340, 500);

      // Line 3: Sản phẩm (baseline y=554)
      c.font = '600 28px "Be Vietnam Pro", "Segoe UI", sans-serif';
      c.fillText(prod, 340, 554);

      // Line 4: Ngày sử dụng (baseline y=608)
      c.fillText(`${date}  ${serial}`, 340, 608);
    };

    // Event Listeners for Live inputs
    ['vCustName', 'vCustPhone', 'vCustProduct', 'vCustDate', 'vCustSerial'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', drawVoucher);
    });

    // Quick chips
    pageVoucherGenerator.querySelectorAll('.v-chip[data-val]').forEach(ch => {
      ch.addEventListener('click', (e) => {
        const val = e.currentTarget.getAttribute('data-val');
        const inp = document.getElementById('vCustName');
        if (inp) { inp.value = val; drawVoucher(); }
      });
    });

    pageVoucherGenerator.querySelectorAll('.v-chip[data-prod]').forEach(ch => {
      ch.addEventListener('click', (e) => {
        const val = e.currentTarget.getAttribute('data-prod');
        const inp = document.getElementById('vCustProduct');
        if (inp) { inp.value = val; drawVoucher(); }
      });
    });

    // Tab Switchers
    const setVoucherTab = (tab) => {
      voucherCurrentTab = tab;
      pageVoucherGenerator.querySelectorAll('.v-tab-btn').forEach(b => b.classList.remove('active'));
      if (tab === 'back') document.getElementById('vTabBack')?.classList.add('active');
      if (tab === 'front') document.getElementById('vTabFront')?.classList.add('active');
      if (tab === 'both') document.getElementById('vTabBoth')?.classList.add('active');
      drawVoucher();
    };

    document.getElementById('vTabBack')?.addEventListener('click', () => setVoucherTab('back'));
    document.getElementById('vTabFront')?.addEventListener('click', () => setVoucherTab('front'));
    document.getElementById('vTabBoth')?.addEventListener('click', () => setVoucherTab('both'));

    // Reset next order
    document.getElementById('vBtnReset')?.addEventListener('click', () => {
      const nameInp = document.getElementById('vCustName');
      const phoneInp = document.getElementById('vCustPhone');
      const prodInp = document.getElementById('vCustProduct');
      const dateInp = document.getElementById('vCustDate');
      const serialInp = document.getElementById('vCustSerial');

      if (nameInp) nameInp.value = '';
      if (phoneInp) phoneInp.value = '';
      if (prodInp) prodInp.value = 'Combo 3 Lon Rước Đòng + 1 Vô Gạo (Mỹ)';

      const now = new Date();
      const d = String(now.getDate()).padStart(2, '0');
      const m = String(now.getMonth() + 1).padStart(2, '0');
      const y = now.getFullYear();
      if (dateInp) dateInp.value = `${d}/${m}/${y}`;

      const rand = Math.floor(100 + Math.random() * 900);
      if (serialInp) serialInp.value = `ZK-2026-${rand}`;

      if (nameInp) nameInp.focus();
      drawVoucher();
      showVoucherToast('Đã làm mới form và tạo Mã bảo hành mới!');
    });

    // Download Single View
    document.getElementById('vBtnDownload')?.addEventListener('click', () => {
      const name = document.getElementById('vCustName')?.value || 'ZAKI';
      const cleanName = name.replace(/[^a-zA-Z0-9\s]/g, '').trim().replace(/\s+/g, '_');
      const link = document.createElement('a');
      link.download = `Phieu_Cam_Ket_ZAKI_${cleanName}_${voucherCurrentTab}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
      showVoucherToast('Đang tải ảnh xuống máy...');
    });

    // Download Combined 2 Sides
    document.getElementById('vBtnDownloadCombined')?.addEventListener('click', () => {
      const prevTab = voucherCurrentTab;
      voucherCurrentTab = 'both';
      drawVoucher();
      const name = document.getElementById('vCustName')?.value || 'ZAKI';
      const cleanName = name.replace(/[^a-zA-Z0-9\s]/g, '').trim().replace(/\s+/g, '_');
      const link = document.createElement('a');
      link.download = `Phieu_Bao_Hanh_ZAKI_2Mat_${cleanName}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
      voucherCurrentTab = prevTab;
      drawVoucher();
      showVoucherToast('Đã tải ảnh ghép 2 mặt gửi khách!');
    });

    // Copy to Clipboard
    document.getElementById('vBtnCopy')?.addEventListener('click', async () => {
      try {
        canvas.toBlob(async (blob) => {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          showVoucherToast('✅ Đã sao chép ảnh! Nhấn Ctrl + V vào Zalo để gửi cho khách.');
        });
      } catch (err) {
        document.getElementById('vBtnDownload')?.click();
      }
    });

    const showVoucherToast = (msg) => {
      const t = document.getElementById('vToast');
      if (!t) return;
      t.innerHTML = msg;
      t.classList.add('show');
      setTimeout(() => { t.classList.remove('show'); }, 3500);
    };

    // Initial check & draw
    checkReadyAndDraw();
  };

  // Sidebar Nav Button Listeners
  document.querySelectorAll('.nav-item-btn[data-page]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const page = e.currentTarget.getAttribute('data-page');
      if (page) switchPage(page);
    });
  });

  // Mobile Drawer Toggle
  const toggleMobileMenu = () => {
    appSidebar.classList.toggle('open');
    mobileOverlay.classList.toggle('active');
  };

  if (menuToggleBtn) menuToggleBtn.addEventListener('click', toggleMobileMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', toggleMobileMenu);

  // Initial Boot
  renderProductTabs();
  renderProductDetail(activeProductId);
  renderScriptVG();
  renderScriptPH();
  renderScheduleRice();
  renderAlkalineDeep();
  renderRiceDict();
  renderCropDict();
  renderRiceVarieties();
  renderCropTypes();
  renderVoucherGenerator();
});
