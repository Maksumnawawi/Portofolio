/**
 * MA'SUM NAWAWI - PORTFOLIO INTERACTION SCRIPTS
 * Modern dark portfolio interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initNavbarScroll();
  initMobileMenu();
  initFilterTabs();
  initProjectModals();
  initContactForm();
  initStatsCounter();
});

/* ================= 1. TYPEWRITER EFFECT ================= */
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const words = [
    'Full-Stack Web Developer',
    'Applied Problem Solver',
    'Teknik Informatika @ UMNU',
    'Technopreneur Enthusiast'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 90;
  const deleteSpeed = 50;
  const pauseEnd = 1600;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      el.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentWord.length) {
      delay = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
}

/* ================= 2. NAVBAR SCROLL & ACTIVE SPY ================= */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-item');

  window.addEventListener('scroll', () => {
    // Navbar blur background on scroll
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll spy
    let currentId = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ================= 3. MOBILE MENU ================= */
function initMobileMenu() {
  const toggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = toggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.className = 'fa-solid fa-xmark';
    } else {
      icon.className = 'fa-solid fa-bars';
    }
  });

  // Close when clicking nav item
  navLinks.querySelectorAll('.nav-item').forEach((item) => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const icon = toggle.querySelector('i');
      if (icon) icon.className = 'fa-solid fa-bars';
    });
  });
}

/* ================= 4. PORTFOLIO FILTER TABS ================= */
function initFilterTabs() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.transition = 'all 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ================= 5. PROJECT DETAIL MODALS ================= */
const projectsData = {
  konveksi: {
    title: 'Sistem WIP Tracking Produksi Konveksi & Jersey',
    category: 'Web Application / Industrial Management',
    image: 'assets/images/project-konveksi.png',
    story: 'Projek ini bermula ketika seorang rekan sekelas mendapatkan tawaran dari temannya untuk membuat sistem manajemen konveksi, namun belum sanggup mengeksekusinya. Tantangan ini kemudian dialihkan ke saya. Mengusung prinsip "yang penting berguna dulu", saya merancang sistem yang mampu menyelesaikan masalah tracking antardivisi (potong, jahit, sablon) agar alur kerja tidak lagi rancu dan estimasi pesanan terpantau presisi.',
    solution: 'Membangun aplikasi web WIP (Work-in-Progress) tracking yang mengotomatisasi pembuatan Surat Perintah Kerja (SPK) terintegrasi kode QR dinamis.',
    features: [
      'Penerbitan SPK Otomatis dengan QR Code barcode untuk setiap lembar kerja.',
      'Sistem Multi-Divisi: Pemotongan bahan, Penjahitan, Sablon/Bordir, Finishing & QC.',
      'Scan QR instan di masing-masing workstation operator untuk update status otomatis.',
      'Dashboard Real-time untuk Owner/Manajer produksi memantau progres pesanan.',
      'Role-based Authentication aman untuk Admin, Operator Divisi, dan Klien.'
    ],
    tech: ['Node.js', 'Express.js 5.x', 'EJS View Engine', 'SQLite / sql.js', 'QR Code Generator', 'Session Auth'],
    impact: 'Menghilangkan miskomunikasi status pesanan antar divisi kerja, mempercepat pelacakan inventaris SPK hingga 70%, dan memberi rasa aman pada klien dengan tracking transparan.'
  },
  mujahadah: {
    title: 'Aplikasi Mobile & Web Doa Mujahadah Al Falah',
    category: 'Mobile Application & Digitalisasi Pesantren',
    image: 'assets/images/project-mujahadah.png',
    story: 'Terinspirasi dari kitab fisik amalan & dzikir PonPes Al Falah Somalangu Kebumen setebal 108+ halaman. Saat para santri dan jamaah mengikuti ziarah makam aulia atau amalan luar kota, membawa buku fisik seringkali merepotkan. Saya berinisiatif merancang aplikasi smartphone agar seluruh susunan dzikir dan doa dapat diakses praktis di manapun berada tanpa repot membawa buku tebal.',
    solution: 'Mendigitalisasi seluruh isi buku amalan dan dzikir ke dalam sistem pembaca digital (web & Android APK) dengan navigasi bab dan halaman yang sangat cepat.',
    features: [
      'Digitalisasi lengkap 108+ halaman doa, amalan harian, dan dzikir mujahadah.',
      'Navigasi Daftar Isi Dinamis: Lompat ke surat/bacaan doa tertentu dalam satu klik.',
      'Tampilan nyaman dan responsif dioptimalkan untuk layar handphone santri.',
      'Dukungan akses offline saat berada di lokasi ziarah dengan sinyal minim.',
      'Dirancang untuk siap dibagikan luas ke ribuan santri dan alumni pondok.'
    ],
    tech: ['Android APK Engine', 'Web View Reader UI', 'Optimized PDF Extractor', 'Responsive Layout', 'Local Cache'],
    impact: 'Memudahkan ribuan santri serta jamaah alumni PonPes Al Falah dalam mengamalkan dzikir harian dan ziarah kubur langsung melalui smartphone.'
  },
  mapro: {
    title: 'Website Profil & Service MA PRO AUDIO & Electrical Service',
    category: 'Commercial Web & Technopreneurship Project',
    image: 'assets/images/project-mapro.jpg',
    story: 'Lahir dari penugasan mata kuliah Technopreneurship, di mana dosen menantang mahasiswa untuk membuat karya yang bernilai jual dan menghasilkan. Saya mengimplementasikan strategi "tebar jala kemitraan"—membuatkan website profesional gratis untuk mitra usaha alumni (MA PRO AUDIO). Di dalam website tersebut dicantumkan profil saya sebagai pembuat website, sehingga setiap calon klien MA PRO AUDIO dapat menjadi pintu referral potensial bagi jasa pembuatan website saya.',
    solution: 'Membangun website company profile modern dengan katalog layanan audio balap, persewaan sound hajatan, pembuatan box kustom, dan servis kelistrikan.',
    features: [
      'Katalog showcase galeri audio hajatan, box custom, dan panel genset.',
      'Kalkulator Estimasi Biaya & Kebutuhan Sound interaktif bagi calon penyewa.',
      'Integrasi tombol reservasi dan konsultasi cepat langsung ke WhatsApp resmi.',
      'Desain responsif berkarakter industrial modern dengan performa loading cepat.',
      'Struktur SEO lokal untuk menjangkau pencari jasa audio di Kebumen dan sekitarnya.'
    ],
    tech: ['Semantic HTML5', 'Custom CSS3 Grid & Flexbox', 'JavaScript ES6+', 'WhatsApp Leads Engine', 'Responsive UI'],
    impact: 'Meningkatkan konversi pemesanan audio MA PRO secara digital, sekaligus menjadi portofolio hidup yang mendatangkan prospek jasa web development baru.'
  }
};

function initProjectModals() {
  const modal = document.getElementById('projectModal');
  const modalContent = document.getElementById('modalContent');
  const modalClose = document.getElementById('modalClose');
  const openBtns = document.querySelectorAll('.open-modal-btn');

  if (!modal || !modalContent) return;

  openBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const pKey = btn.getAttribute('data-project');
      const data = projectsData[pKey];
      if (!data) return;

      const techChipsHtml = data.tech
        .map((t) => `<span class="tag" style="background:rgba(139,92,246,0.15); border-color:rgba(139,92,246,0.3); font-size:0.8rem; padding:0.3rem 0.75rem;">${t}</span>`)
        .join('');

      const featuresHtml = data.features
        .map((f) => `<li><i class="fa-solid fa-circle-check"></i> <span>${f}</span></li>`)
        .join('');

      modalContent.innerHTML = `
        <img src="${data.image}" alt="${data.title}" class="modal-hero-img">
        
        <div class="modal-header-meta">
          <span class="modal-category">${data.category}</span>
          <h2 class="modal-title">${data.title}</h2>
        </div>

        <div class="modal-story-box">
          <h4><i class="fa-solid fa-bullhorn"></i> Latar Belakang & Kisah Pembuatan</h4>
          <p>${data.story}</p>
        </div>

        <div class="modal-section-block">
          <h4><i class="fa-solid fa-gear text-purple"></i> Solusi & Cara Kerja</h4>
          <p style="color:var(--text-muted); font-size:0.92rem; margin-bottom:0.75rem;">${data.solution}</p>
          <ul class="modal-feature-list">
            ${featuresHtml}
          </ul>
        </div>

        <div class="modal-section-block">
          <h4><i class="fa-solid fa-code text-cyan"></i> Teknologi yang Digunakan</h4>
          <div class="modal-tech-chips">
            ${techChipsHtml}
          </div>
        </div>

        <div class="modal-section-block">
          <h4><i class="fa-solid fa-chart-line text-green"></i> Dampak & Hasil Nyata</h4>
          <p style="color:#d1d5db; font-size:0.92rem; line-height:1.6;">${data.impact}</p>
        </div>

        <div class="modal-actions-bar">
          <a href="https://wa.me/6285609131995?text=Halo%20Nawawi,%20saya%20tertarik%20dengan%20projek%20${encodeURIComponent(data.title)}" target="_blank" class="btn btn-primary btn-sm btn-glow">
            <i class="fa-brands fa-whatsapp"></i> Diskusikan Solusi Ini
          </a>
          <button class="btn btn-secondary btn-sm" onclick="document.getElementById('projectModal').classList.remove('active')">
            Tutup
          </button>
        </div>
      `;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  if (modalClose) modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

/* ================= 6. CONTACT FORM TO WHATSAPP ================= */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('senderName').value.trim();
    const interest = document.getElementById('projectInterest').value;
    const message = document.getElementById('senderMessage').value.trim();

    if (!name || !message) {
      alert('Harap isi nama dan pesan Anda.');
      return;
    }

    const textPayload = 
      `*Halo Nawawi!*\n\n` +
      `Saya: *${name}*\n` +
      `Perihal: *${interest}*\n\n` +
      `*Pesan:*\n${message}\n\n` +
      `_(Dikirim melalui Website Portofolio)_`;

    const waUrl = `https://wa.me/6285609131995?text=${encodeURIComponent(textPayload)}`;

    // Show toast
    if (toast && toastMsg) {
      toastMsg.textContent = 'Membuka WhatsApp untuk mengirim pesan...';
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3500);
    }

    // Open WhatsApp
    setTimeout(() => {
      window.open(waUrl, '_blank');
      form.reset();
    }, 600);
  });
}

/* ================= 7. STATS NUMBER COUNTER ================= */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  if (!statNumbers.length) return;

  let started = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !started) {
        started = true;
        statNumbers.forEach((num) => {
          const target = +num.getAttribute('data-target');
          let count = 0;
          const speed = 40;
          const inc = target / 20;

          const updateCount = () => {
            count += inc;
            if (count < target) {
              num.innerText = Math.ceil(count);
              setTimeout(updateCount, speed);
            } else {
              num.innerText = target;
            }
          };

          updateCount();
        });
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.stats-strip');
  if (statsSection) observer.observe(statsSection);
}

