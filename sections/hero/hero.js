    // HERO SLIDER
    let currentSlide = 0;
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.indicator');
    const heroTitles = ['Education & Career', 'Travel & Hospitality', 'Real Estate', 'Health & Wellness'];

    function goToSlide(n) {
      slides[currentSlide].classList.remove('active');
      indicators[currentSlide].classList.remove('active');
      currentSlide = n;
      slides[currentSlide].classList.add('active');
      indicators[currentSlide].classList.add('active');
      // slide content is self-contained in each .hero-slide-content
    }
    indicators.forEach(ind => { ind.addEventListener('click', () => goToSlide(+ind.dataset.slide)); });
    setInterval(() => goToSlide((currentSlide + 1) % slides.length), 5000);
