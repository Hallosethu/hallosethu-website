// Replace logo placeholders (navbar / footer / login-modal all share this pattern)
    document.querySelectorAll('img[src="LOGO_PLACEHOLDER"]').forEach(img => { img.src = 'assets/images/logo.png'; });

    // REVEAL ON SCROLL
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 80);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Allow escape key to close
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeComingSoon();
        if (document.getElementById('eduOverlay') && document.getElementById('eduOverlay').classList.contains('open')) closeEduFlow();
      }
    });
