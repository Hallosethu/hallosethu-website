    // MODAL
    const modal = document.getElementById('loginModal');
    function openModal() { modal.classList.add('open'); }
    function closeModal() { modal.classList.remove('open'); }
    document.getElementById('openLogin').addEventListener('click', e => { e.preventDefault(); openModal(); });
    if (document.getElementById('openLogin2')) document.getElementById('openLogin2').addEventListener('click', e => { e.preventDefault(); openModal(); });
    document.getElementById('closeModal').addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    function switchToSignup(e) { e.preventDefault(); document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active')); document.querySelectorAll('.modal-tab')[1].classList.add('active'); document.getElementById('loginForm').style.display = 'none'; document.getElementById('signupForm').style.display = 'flex'; }
    function switchToLogin(e) { e.preventDefault(); document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active')); document.querySelectorAll('.modal-tab')[0].classList.add('active'); document.getElementById('loginForm').style.display = 'flex'; document.getElementById('signupForm').style.display = 'none'; }
    function handleLogin(btn) { btn.textContent = 'Logging in…'; setTimeout(function () { btn.textContent = '✓ Welcome back!'; btn.style.background = 'linear-gradient(135deg,#16A34A,#22C55E)'; setTimeout(function () { closeModal(); btn.textContent = 'Login to Account'; btn.style.background = ''; }, 1200); }, 900); }
    function handleSignup(btn) { btn.textContent = 'Creating account…'; setTimeout(function () { btn.textContent = '✓ Account Created!'; btn.style.background = 'linear-gradient(135deg,#16A34A,#22C55E)'; setTimeout(function () { closeModal(); btn.textContent = 'Create Free Account'; btn.style.background = ''; }, 1500); }, 1000); }
    document.querySelectorAll('.modal-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('loginForm').style.display = tab.dataset.tab === 'login' ? 'flex' : 'none';
        document.getElementById('signupForm').style.display = tab.dataset.tab === 'signup' ? 'flex' : 'none';
      });
    });
