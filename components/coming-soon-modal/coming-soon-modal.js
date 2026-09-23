    // ══ COMING SOON MODAL ══
    function openComingSoon(name, icon, desc, pct) {
      document.getElementById('csTitle').textContent = name + ' — Launching Soon!';
      document.getElementById('csSubtitle').textContent = 'We\'re building this service for Vizag right now.';
      document.getElementById('csSvcName').textContent = name;
      document.getElementById('csSvcDesc').textContent = desc;
      document.getElementById('csSvcIcon').className = 'fa-solid ' + icon;
      document.getElementById('csPercent').textContent = pct + '%';
      var bar = document.getElementById('csBarFill');
      bar.style.width = '0%';
      document.getElementById('csOverlay').classList.add('open');
      document.body.style.overflow = 'hidden';
      // Animate bar after paint
      setTimeout(function () { bar.style.width = pct + '%'; }, 80);
      // Set emoji based on service
      var emojiMap = { 'Travel & Hospitality': '✈️', 'Travel &amp; Hospitality': '✈️', 'Real Estate': '🏠', 'Health & Wellness': '❤️', 'Health &amp; Wellness': '❤️', 'Finance': '💰', 'Digital Marketing': '📢' };
      document.getElementById('csEmoji').textContent = emojiMap[name] || '🚀';
      document.getElementById('csNotifyBtn').textContent = 'Notify Me';
      document.getElementById('csNotifyBtn').style.background = '';
      document.getElementById('csPhone').value = '';
    }
    function closeComingSoon() {
      document.getElementById('csOverlay').classList.remove('open');
      document.body.style.overflow = '';
    }
    async function submitNotify() {
      var ph = document.getElementById('csPhone').value.trim();
      var btn = document.getElementById('csNotifyBtn');
      var svcName = document.getElementById('csSvcName').textContent;
      if (!ph) { document.getElementById('csPhone').focus(); return; }
      btn.textContent = 'Saving...';
      btn.disabled = true;
      try {
        const { initializeApp, getApps } = await import("https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js");
        const { getFirestore, collection, addDoc } = await import("https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js");
        const firebaseConfig = {
          apiKey: "AIzaSyDSkTbm5e77JG7CrpY4Cqm-J8RrekiX9h4",
          authDomain: "hallosethu-users.firebaseapp.com",
          projectId: "hallosethu-users",
          storageBucket: "hallosethu-users.firebasestorage.app",
          messagingSenderId: "253018772733",
          appId: "1:253018772733:web:f44e8453617007eeca9a94"
        };
        const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
        const db = getFirestore(app);
        await addDoc(collection(db, 'notify_signups'), {
          phone: ph, service: svcName, submittedAt: new Date().toISOString()
        });
        btn.textContent = '✓ Registered!';
        btn.disabled = false;
        btn.style.background = 'linear-gradient(135deg,#16A34A,#22C55E)';
        setTimeout(function () { closeComingSoon(); }, 1800);
      } catch (e) {
        console.error('Notify save error:', e.code, e.message);
        btn.textContent = 'Notify Me';
        btn.disabled = false;
        alert(e.code === 'permission-denied'
          ? 'Permission denied — database rules need update. Please contact support.'
          : 'Failed to register. Please try again.');
      }
    }
