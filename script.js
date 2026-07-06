/**
 * Half Price Print — Premium Homepage Interactions
 * Lightweight vanilla JS — no dependencies
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     Sticky Header
     -------------------------------------------------------------------------- */
  const header = document.getElementById('header');

  function handleScroll() {
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* --------------------------------------------------------------------------
     Hero Carousel
     (Mobile nav is handled by mega-menu.js)
     -------------------------------------------------------------------------- */
  const heroCarousel = document.getElementById('heroCarousel');
  const heroDots = document.getElementById('heroDots');

  if (heroCarousel && heroDots) {
    const slides = heroCarousel.querySelectorAll('.hero__slide');
    let currentSlide = 0;
    let carouselInterval;

    slides.forEach(function (_, index) {
      const dot = document.createElement('button');
      dot.className = 'hero__dot' + (index === 0 ? ' hero__dot--active' : '');
      dot.setAttribute('aria-label', 'Go to slide ' + (index + 1));
      dot.addEventListener('click', function () {
        goToSlide(index);
        resetCarouselInterval();
      });
      heroDots.appendChild(dot);
    });

    const dots = heroDots.querySelectorAll('.hero__dot');

    function goToSlide(index) {
      slides[currentSlide].classList.remove('hero__slide--active');
      dots[currentSlide].classList.remove('hero__dot--active');
      currentSlide = index;
      slides[currentSlide].classList.add('hero__slide--active');
      dots[currentSlide].classList.add('hero__dot--active');
    }

    function nextSlide() {
      goToSlide((currentSlide + 1) % slides.length);
    }

    function resetCarouselInterval() {
      clearInterval(carouselInterval);
      carouselInterval = setInterval(nextSlide, 5000);
    }

    resetCarouselInterval();

    heroCarousel.addEventListener('mouseenter', function () {
      clearInterval(carouselInterval);
    });

    heroCarousel.addEventListener('mouseleave', resetCarouselInterval);
  }

  /* --------------------------------------------------------------------------
     Testimonials Slider
     -------------------------------------------------------------------------- */
  const testimonialsTrack = document.getElementById('testimonialsTrack');
  const testimonialsPrev = document.getElementById('testimonialsPrev');
  const testimonialsNext = document.getElementById('testimonialsNext');

  if (testimonialsTrack && testimonialsPrev && testimonialsNext) {
    var scrollAmount = 360;

    testimonialsPrev.addEventListener('click', function () {
      testimonialsTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    testimonialsNext.addEventListener('click', function () {
      testimonialsTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }

  /* --------------------------------------------------------------------------
     SEO Content Toggle
     -------------------------------------------------------------------------- */
  const seoToggle = document.getElementById('seoToggle');
  const seoSection = document.querySelector('.seo-content');

  if (seoToggle && seoSection) {
    seoToggle.addEventListener('click', function () {
      var isExpanded = seoSection.classList.toggle('seo-content--expanded');
      seoToggle.textContent = isExpanded ? 'View less' : 'View more';
      seoToggle.setAttribute('aria-expanded', isExpanded);
    });
  }

  /* --------------------------------------------------------------------------
     Scroll Reveal
     -------------------------------------------------------------------------- */
  var revealElements = document.querySelectorAll('.reveal');

  function showReveal(el) {
    el.classList.add('reveal--visible');
  }

  function initReveal() {
    revealElements.forEach(showReveal);
  }

  if ('IntersectionObserver' in window && revealElements.length) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            showReveal(entry.target);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px 0px 0px' }
    );

    revealElements.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        showReveal(el);
      } else {
        revealObserver.observe(el);
      }
    });
  } else {
    initReveal();
  }

  /* --------------------------------------------------------------------------
     FAQ Accordion — single open at a time
     -------------------------------------------------------------------------- */
  var accordion = document.getElementById('faqAccordion');

  if (accordion) {
    var accordionItems = accordion.querySelectorAll('.accordion__item');

    accordionItems.forEach(function (item) {
      item.addEventListener('toggle', function () {
        if (item.open) {
          accordionItems.forEach(function (other) {
            if (other !== item && other.open) {
              other.open = false;
            }
          });
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     Newsletter Form
     -------------------------------------------------------------------------- */
  var newsletterForm = document.querySelector('.newsletter__form');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = newsletterForm.querySelector('.newsletter__input');
      var btn = newsletterForm.querySelector('.btn');

      if (input.value.trim()) {
        var originalText = btn.textContent;
        btn.textContent = 'Subscribed!';
        btn.style.pointerEvents = 'none';
        input.value = '';

        setTimeout(function () {
          btn.textContent = originalText;
          btn.style.pointerEvents = '';
        }, 3000);
      }
    });
  }

  /* --------------------------------------------------------------------------
     Quick Inquiry Button
     -------------------------------------------------------------------------- */
  var chatBtn = document.getElementById('chatBtn');

  if (chatBtn) {
    chatBtn.addEventListener('click', function () {
      window.open('https://wa.me/971501058911?text=Hi%2C%20I%20have%20a%20quick%20inquiry', '_blank');
    });
  }

  /* --------------------------------------------------------------------------
     Smooth anchor scroll offset for sticky header
     -------------------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var headerOffset = (header ? header.offsetHeight : 0) + 16;
        var elementPosition = target.getBoundingClientRect().top;
        var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    });
  });

})();
