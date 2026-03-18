document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     Mobile Navigation
  ========================= */
  const navToggle = document.getElementById("navToggle");
  const siteNav = document.getElementById("siteNav");

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = siteNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });

    siteNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        siteNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  /* =========================
     Sticky Header on Scroll
  ========================= */
  const header = document.querySelector(".site-header");
  const onScrollHeader = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 20);
  };
  window.addEventListener("scroll", onScrollHeader);
  onScrollHeader();

  /* =========================
     Hero Slider
  ========================= */
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".hero-dots .dot");
  const prevBtn = document.getElementById("prevSlide");
  const nextBtn = document.getElementById("nextSlide");

  let currentSlide = 0;
  let sliderTimer;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === index);
    });
    currentSlide = index;
  }

  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }

  function prevSlide() {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev);
  }

  function startSlider() {
    if (slides.length <= 1) return;
    sliderTimer = setInterval(nextSlide, 5000);
  }

  function resetSlider() {
    clearInterval(sliderTimer);
    startSlider();
  }

  if (slides.length) {
    showSlide(0);
    startSlider();

    nextBtn?.addEventListener("click", () => {
      nextSlide();
      resetSlider();
    });

    prevBtn?.addEventListener("click", () => {
      prevSlide();
      resetSlider();
    });

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showSlide(index);
        resetSlider();
      });
    });
  }

  /* =========================
     Counter Animation
  ========================= */
  const counters = document.querySelectorAll("[data-counter]");

  function animateCounter(el) {
    const target = Number(el.dataset.counter);
    const duration = 1400;
    const startTime = performance.now();

    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.floor(progress * target);
      el.textContent = value.toLocaleString("th-TH");
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target.toLocaleString("th-TH");
      }
    }

    requestAnimationFrame(update);
  }

  /* =========================
     Scroll Reveal + Counter Trigger
  ========================= */
  const revealItems = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("is-visible");

      entry.target.querySelectorAll("[data-counter]").forEach(counter => {
        if (!counter.dataset.animated) {
          counter.dataset.animated = "true";
          animateCounter(counter);
        }
      });

      if (entry.target.matches("[data-counter]") && !entry.target.dataset.animated) {
        entry.target.dataset.animated = "true";
        animateCounter(entry.target);
      }

      obs.unobserve(entry.target);
    });
  }, { threshold: 0.18 });

  revealItems.forEach(item => observer.observe(item));
  counters.forEach(counter => observer.observe(counter));

  /* =========================
     Dashboard Metric Tabs
  ========================= */
  const metricTabs = document.querySelectorAll(".segment-btn");
  const metricPanels = document.querySelectorAll(".metric-panel");

  metricTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.target;

      metricTabs.forEach(btn => btn.classList.remove("is-active"));
      metricPanels.forEach(panel => panel.classList.remove("is-active"));

      tab.classList.add("is-active");
      document.querySelector(`.metric-panel[data-panel="${target}"]`)?.classList.add("is-active");
    });
  });

  /* =========================
     News Filter
  ========================= */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const newsCards = document.querySelectorAll(".modern-news .news-card");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach(btn => btn.classList.remove("is-active"));
      button.classList.add("is-active");

      newsCards.forEach(card => {
        const category = card.dataset.category;
        const show = filter === "all" || category === filter;
        card.classList.toggle("hidden", !show);
      });
    });
  });
});