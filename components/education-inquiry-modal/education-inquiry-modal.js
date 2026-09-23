    var _eduInqCategory = '';
    function openEduInquiry() {
      var titleEl = document.getElementById('subsegTitle');
      _eduInqCategory = titleEl ? titleEl.textContent : 'Education & Career';
      var modal = document.getElementById('eduInqModal');
      modal.style.display = 'flex';
      document.getElementById('eduInqName').value = '';
      document.getElementById('eduInqPhone').value = '';
      document.getElementById('eduInqMsg').value = '';
      document.getElementById('eduInqResult').style.display = 'none';
      document.getElementById('eduInqFormBody').style.display = 'block';
    }
    function closeEduInquiry() {
      document.getElementById('eduInqModal').style.display = 'none';
    }
    async function submitEduInquiry() {
      var name = document.getElementById('eduInqName').value.trim();
      var phone = document.getElementById('eduInqPhone').value.trim();
      var msg = document.getElementById('eduInqMsg').value.trim();
      var btn = document.getElementById('eduInqSubmitBtn');
      if (!name || !phone) { alert('Please enter your name and phone number.'); return; }
      btn.textContent = 'Sending…'; btn.disabled = true;
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
        await addDoc(collection(db, 'edu_inquiries'), {
          name, phone, message: msg || '', category: _eduInqCategory,
          submittedAt: new Date().toISOString()
        });
        document.getElementById('eduInqFormBody').style.display = 'none';
        document.getElementById('eduInqResult').style.display = 'block';
      } catch (e) {
        console.error('Edu inquiry error:', e.code, e.message);
        btn.textContent = 'Send Inquiry — We\'ll Get Back to You';
        btn.disabled = false;
        const msg = e.code === 'permission-denied'
          ? 'Permission denied — Firestore rules need update. Please call +91 9010973762.'
          : 'Failed to submit. Please call us at +91 9010973762.';
        alert(msg);
      }
    }
