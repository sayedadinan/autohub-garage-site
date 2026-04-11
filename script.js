/* ========================
   AUTOHUB GARAGE SHARJAH
   script.js
======================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- Sticky nav shadow on scroll ---
  const nav = document.getElementById('top-nav');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // --- Mobile nav toggle ---
  const toggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
    toggle.innerHTML = isOpen ? '&times;' : '&#9776;';
  });

  // --- Close mobile nav on link click ---
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.innerHTML = '&#9776;';
      toggle.setAttribute('aria-expanded', false);
    });
  });

  // --- Intersection Observer — fade-in sections on scroll ---
  const revealEls = document.querySelectorAll(
    '.trust-item, .service-card, .review-card, .contact-list li'
  );
  revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, 60 * (Array.from(revealEls).indexOf(entry.target) % 6));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => observer.observe(el));

  // --- Smooth scroll offset for fixed nav ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // --- Sticky WhatsApp: hide temporarily when footer is in view ---
  const stickyWa = document.querySelector('.sticky-wa');
  const footer = document.getElementById('footer');
  if (stickyWa && footer) {
    const footerObserver = new IntersectionObserver((entries) => {
      stickyWa.style.opacity = entries[0].isIntersecting ? '0' : '1';
      stickyWa.style.pointerEvents = entries[0].isIntersecting ? 'none' : 'auto';
    }, { threshold: 0.2 });
    footerObserver.observe(footer);
  }

});
