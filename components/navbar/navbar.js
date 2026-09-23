    // NAVBAR SCROLL
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 30);
    });

    // HAMBURGER
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // NAV → SECTION MAPPING + ACTIVE-STATE TRACKING
    // Built live from the nav markup itself (href -> matching section id), so
    // every current or future nav item is picked up automatically — no
    // hardcoded/parallel list of section ids to keep in sync.
    (function () {
      function headerOffset() {
        const announceH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--announce-h')) || 0;
        // No extra buffer here: sections are laid out back-to-back with no
        // gap between them, so any added buffer just reveals a sliver of
        // the PREVIOUS section rather than adding breathing room to the
        // destination — every section already has its own top padding
        // (48-80px) for that. Landing flush against the nav's bottom edge
        // is what keeps the previous section fully out of view.
        return navbar.offsetHeight + announceH;
      }

      const navSectionLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'))
        .filter(a => a.getAttribute('href').length > 1)
        .map(a => ({ link: a, section: document.querySelector(a.getAttribute('href')) }))
        .filter(entry => entry.section);

      function setActiveLink(id) {
        navSectionLinks.forEach(({ link }) => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }

      let suppressObserver = false;
      let suppressTimer = null;
      let observer = null;

      function buildObserver() {
        if (observer) observer.disconnect();
        observer = new IntersectionObserver((entries) => {
          if (suppressObserver) return;
          const visible = entries.filter(e => e.isIntersecting);
          if (!visible.length) return;
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActiveLink(visible[0].target.id);
        }, {
          root: null,
          rootMargin: `-${headerOffset()}px 0px -60% 0px`,
          threshold: 0
        });
        navSectionLinks.forEach(({ section }) => observer.observe(section));
      }

      buildObserver();
      window.addEventListener('announce-h-change', buildObserver);

      // Close the mobile menu on ANY nav link click (section links or not),
      // then — only for links that target a real section — take over the
      // scroll so the target lands correctly below the fixed nav/announce bar.
      document.querySelectorAll('.nav-links a').forEach(a => {
        a.addEventListener('click', (e) => {
          navLinks.classList.remove('open');
          hamburger.classList.remove('open');

          const href = a.getAttribute('href') || '';
          if (href.length <= 1) return; // not a section link (e.g. Login/Signup)
          const target = document.querySelector(href);
          if (!target) return;

          e.preventDefault();
          setActiveLink(target.id);
          suppressObserver = true;
          clearTimeout(suppressTimer);

          const top = target.getBoundingClientRect().top + window.scrollY - headerOffset();
          window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
          if (history.pushState) history.pushState(null, '', href);

          suppressTimer = setTimeout(() => { suppressObserver = false; }, 900);
        });
      });
    })();
