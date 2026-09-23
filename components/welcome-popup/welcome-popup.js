    (function () {
      var STORAGE_KEY = 'hs_welcome_popup_seen';
      var overlay = document.getElementById('welcomePopup');
      if (!overlay) return;

      function closePopup() {
        overlay.classList.remove('open');
      }

      function openPopup() {
        if (localStorage.getItem(STORAGE_KEY)) return;
        overlay.classList.add('open');
        localStorage.setItem(STORAGE_KEY, '1');
      }

      document.getElementById('welcomePopupClose').addEventListener('click', closePopup);
      document.getElementById('welcomePopupLater').addEventListener('click', closePopup);
      document.getElementById('welcomePopupCta').addEventListener('click', function () {
        closePopup();
        if (typeof openEduFlow === 'function') openEduFlow();
      });
      overlay.addEventListener('click', function (e) { if (e.target === overlay) closePopup(); });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && overlay.classList.contains('open')) closePopup();
      });

      window.addEventListener('load', function () { setTimeout(openPopup, 1200); });
    })();
