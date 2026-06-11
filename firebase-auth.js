// ===== FIREBASE AUTHENTICATION & USER MANAGEMENT =====
// This script integrates Firebase with your existing Hallosethu login modal
// Works with existing .modal-input class structure

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// ===== FIREBASE CONFIG =====
const firebaseConfig = {
    apiKey: "AIzaSyDSkTbm5e77JG7CrpY4Cqm-J8RrekiX9h4",
    authDomain: "hallosethu-users.firebaseapp.com",
    projectId: "hallosethu-users",
    storageBucket: "hallosethu-users.firebasestorage.app",
    messagingSenderId: "253018772733",
    appId: "1:253018772733:web:f44e8453617007eeca9a94",
    measurementId: "G-KFD9FGMN1C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ===== LOCAL STORAGE BACKUP =====
const localUsers = JSON.parse(localStorage.getItem('hallosethu_users')) || {};

// ===== INITIALIZE AUTH UI =====
function initAuthUI() {
    const overlay = document.querySelector('.modal-overlay');
    const openLoginBtn = document.getElementById('openLogin');
    const closeBtn = document.querySelector('.modal-close');
    const tabs = document.querySelectorAll('.modal-tab');
    const submitBtns = document.querySelectorAll('.modal-btn');

    // Open login modal
    if (openLoginBtn) {
        openLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            overlay?.classList.add('open');
        });
    }

    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            overlay?.classList.remove('open');
        });
    }

    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('open');
            }
        });
    }

    // Tab switching
    if (tabs.length >= 2) {
        tabs[0].addEventListener('click', () => switchTab('login', tabs));
        tabs[1].addEventListener('click', () => switchTab('signup', tabs));
    }

    // Form submission - prevent default and handle
    if (submitBtns.length > 0) {
        submitBtns[0].addEventListener('click', (e) => {
            e.preventDefault();
            handleLogin();
        });
        if (submitBtns.length > 1) {
            submitBtns[1].addEventListener('click', (e) => {
                e.preventDefault();
                handleSignup();
            });
        }
    }
}

// ===== SWITCH TABS =====
function switchTab(tab, tabs) {
    const forms = document.querySelectorAll('.modal-form');

    if (tab === 'login') {
        tabs[0].classList.add('active');
        tabs[1].classList.remove('active');
        if (forms[0]) forms[0].style.display = 'flex';
        if (forms[1]) forms[1].style.display = 'none';
    } else {
        tabs[0].classList.remove('active');
        tabs[1].classList.add('active');
        if (forms[0]) forms[0].style.display = 'none';
        if (forms[1]) forms[1].style.display = 'flex';
    }
}

// ===== GET ACTIVE FORM INPUTS =====
function getActiveFormInputs() {
    const forms = document.querySelectorAll('.modal-form');
    
    // Find which form is visible
    for (let form of forms) {
        if (form.style.display !== 'none') {
            return form.querySelectorAll('.modal-input');
        }
    }
    
    return [];
}

// ===== HANDLE LOGIN =====
async function handleLogin() {
    const inputs = getActiveFormInputs();
    
    if (inputs.length < 2) {
        showAlert('Form inputs not found. Please refresh the page.', 'error');
        return;
    }

    const email = inputs[0]?.value?.trim() || '';
    const password = inputs[1]?.value?.trim() || '';

    if (!email || !password) {
        showAlert('Please enter email and password', 'error');
        return;
    }

    try {
        // Try Firebase first
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        showAlert('✅ Login successful! Welcome back!', 'success');
        
        setTimeout(() => {
            document.querySelector('.modal-overlay')?.classList.remove('open');
            location.reload();
        }, 1500);
    } catch (firebaseError) {
        console.log('Firebase error:', firebaseError.code);
        
        // Fallback to local storage
        if (localUsers[email] && localUsers[email].password === password) {
            localStorage.setItem('hallosethu_current_user', JSON.stringify({
                email: email,
                mobile: localUsers[email].mobile,
                loginTime: new Date().toLocaleString()
            }));
            showAlert('✅ Login successful!', 'success');
            setTimeout(() => {
                document.querySelector('.modal-overlay')?.classList.remove('open');
                location.reload();
            }, 1500);
        } else {
            showAlert('❌ Invalid email or password', 'error');
        }
    }
}

// ===== HANDLE SIGNUP =====
async function handleSignup() {
    const inputs = getActiveFormInputs();
    
    if (inputs.length < 4) {
        showAlert('Form inputs not found. Please refresh the page.', 'error');
        return;
    }

    const email = inputs[0]?.value?.trim() || '';
    const mobile = inputs[1]?.value?.trim() || '';
    const password = inputs[2]?.value?.trim() || '';
    const confirmPassword = inputs[3]?.value?.trim() || '';

    if (!email || !mobile || !password || !confirmPassword) {
        showAlert('❌ Please fill all fields', 'error');
        return;
    }

    if (password.length < 6) {
        showAlert('❌ Password must be at least 6 characters', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showAlert('❌ Passwords do not match', 'error');
        return;
    }

    if (localUsers[email]) {
        showAlert('❌ Email already registered', 'error');
        return;
    }

    try {
        // Try Firebase first
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('Firebase signup successful:', userCredential.user.uid);
    } catch (firebaseError) {
        console.log('Firebase signup note:', firebaseError.message);
    }

    // Save to local storage as backup
    localUsers[email] = { password, mobile };
    localStorage.setItem('hallosethu_users', JSON.stringify(localUsers));

    showAlert('✅ Account created! Please login now.', 'success');
    setTimeout(() => {
        // Clear signup form
        document.querySelectorAll('.modal-input').forEach(input => input.value = '');
        // Switch to login tab
        const tabs = document.querySelectorAll('.modal-tab');
        switchTab('login', tabs);
    }, 1500);
}

// ===== HANDLE LOGOUT =====
function handleLogout() {
    signOut(auth).catch(() => {});
    localStorage.removeItem('hallosethu_current_user');
    showAlert('✅ Logged out successfully', 'success');
    setTimeout(() => location.reload(), 1000);
}

// ===== CHECK AUTH STATE & UPDATE UI =====
onAuthStateChanged(auth, (user) => {
    const navLoginBtn = document.getElementById('openLogin');

    if (user) {
        // User is logged in via Firebase
        const userData = {
            email: user.email,
            mobile: localUsers[user.email]?.mobile || 'N/A',
            uid: user.uid
        };
        
        updateNavButton(navLoginBtn, userData);
        localStorage.setItem('hallosethu_current_user', JSON.stringify(userData));
        console.log('User logged in:', userData.email);
    } else {
        // Check local storage
        const localUser = JSON.parse(localStorage.getItem('hallosethu_current_user'));
        
        if (localUser) {
            updateNavButton(navLoginBtn, localUser);
            console.log('Local user active:', localUser.email);
        } else {
            // Not logged in - reset button
            if (navLoginBtn) {
                navLoginBtn.innerHTML = '<i class="fa-regular fa-user"></i> Login / Signup';
                navLoginBtn.style.background = 'linear-gradient(135deg, var(--blue), var(--blue-light))';
                navLoginBtn.style.cursor = 'pointer';
            }
        }
    }
});

// ===== UPDATE NAV BUTTON =====
function updateNavButton(btn, userData) {
    if (!btn) return;

    btn.innerHTML = `<i class="fa-solid fa-user-check"></i> ${userData.email}`;
    btn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
    btn.style.cursor = 'pointer';
    btn.onclick = (e) => {
        e.preventDefault();
        if (confirm('Do you want to logout?')) {
            handleLogout();
        }
    };
}

// ===== ALERT HELPER =====
function showAlert(message, type = 'info') {
    let alertDiv = document.getElementById('authAlert');
    
    if (!alertDiv) {
        alertDiv = document.createElement('div');
        alertDiv.id = 'authAlert';
        alertDiv.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            z-index: 3000;
            padding: 15px 20px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 14px;
            max-width: 300px;
            animation: slideIn 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        document.body.appendChild(alertDiv);
    }

    const colors = {
        success: { bg: '#4CAF50', text: '#fff' },
        error: { bg: '#f44336', text: '#fff' },
        info: { bg: '#2196F3', text: '#fff' }
    };

    alertDiv.textContent = message;
    alertDiv.style.background = colors[type]?.bg || colors.info.bg;
    alertDiv.style.color = colors[type]?.text || colors.info.text;
    alertDiv.style.display = 'block';

    setTimeout(() => {
        alertDiv.style.display = 'none';
    }, 4000);
}

// ===== INITIALIZE ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing Firebase Auth...');
    initAuthUI();
});

// ===== EXPORT FUNCTIONS FOR GLOBAL ACCESS =====
window.handleLogin = handleLogin;
window.handleSignup = handleSignup;
window.handleLogout = handleLogout;
