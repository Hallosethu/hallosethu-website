    (function () {
      var bar = document.getElementById('ccTopBar');
      function syncAnnounceHeight() {
        var h = bar && bar.style.display !== 'none' ? bar.offsetHeight : 0;
        document.documentElement.style.setProperty('--announce-h', h + 'px');
        window.dispatchEvent(new Event('announce-h-change'));
      }
      window.dismissAnnounceBar = function () {
        bar.style.display = 'none';
        document.documentElement.style.setProperty('--announce-h', '0px');
        window.dispatchEvent(new Event('announce-h-change'));
      };
      window.addEventListener('load', syncAnnounceHeight);
      window.addEventListener('resize', syncAnnounceHeight);
      syncAnnounceHeight();

      // Pause the mobile ticker while the user is touching/holding it (no-op
      // on desktop, where the track never animates).
      var track = document.getElementById('ccbTrack');
      if (track) {
        var pause = function () { track.classList.add('ccb-paused'); };
        var resume = function () { track.classList.remove('ccb-paused'); };
        track.addEventListener('touchstart', pause, { passive: true });
        track.addEventListener('touchend', resume);
        track.addEventListener('touchcancel', resume);
        track.addEventListener('pointerdown', pause);
        track.addEventListener('pointerup', resume);
        track.addEventListener('pointerleave', resume);
      }
    })();
