    // CONTACT FORM
    document.getElementById('submitBtn').addEventListener('click', async () => {
      const btn = document.getElementById('submitBtn');
      const contactForm = document.querySelector('.contact-form');
      const inputs = contactForm.querySelectorAll('input, select, textarea');

      const firstName = inputs[0]?.value?.trim() || '';
      const lastName = inputs[1]?.value?.trim() || '';
      const email = inputs[2]?.value?.trim() || '';
      const phone = inputs[3]?.value?.trim() || '';
      const service = inputs[4]?.value || '';
      const message = inputs[5]?.value?.trim() || '';

      if (!firstName || !email || !message) {
        alert('Please fill in at least your name, email, and message.');
        return;
      }

      btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending…';
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

        await addDoc(collection(db, 'contact_messages'), {
          firstName, lastName, email, phone, service, message,
          submittedAt: new Date().toISOString()
        });

        btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Message Sent!';
        btn.style.background = 'linear-gradient(135deg,#2E7D32,#4CAF50)';
        inputs.forEach(el => { el.value = ''; });
        setTimeout(() => {
          btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      } catch (err) {
        console.error('Contact form error:', err.code, err.message);
        btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
        btn.style.background = '';
        btn.disabled = false;
        const msg = err.code === 'permission-denied'
          ? 'Permission denied — Firestore rules need to be updated. Please contact support.'
          : 'Failed to send. Please call us at +91 9010973762 or email support@hallosethu.com';
        alert(msg);
      }
    });
