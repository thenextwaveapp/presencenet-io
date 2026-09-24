(function () {
  // Nav shadow on scroll
  var nav = document.querySelector('nav');
  function onScroll(){ if(nav){ nav.classList.toggle('scrolled', window.scrollY > 8); } }
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  // Reveal-on-scroll for .rv elements
  var els = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el, i) { el.style.transitionDelay = (i % 3) * 70 + 'ms'; obs.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
  }
})();
