// ===== FIREBASE AUTHENTICATION & USER MANAGEMENT =====
// This script integrates Firebase with your existing Hallosethu login modal
// No HTML changes needed - just pure functionality

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

// ===== LOCAL STORAGE BACKUP (For testing without Firestore) =====
const localUsers = JSON.parse(localStorage.getItem('hallosethu_users')) || {};

// ===== MODAL ELEMENTS =====
function getModalElements() {
    return {
        overlay: document.querySelector('.modal-overlay'),
        modal: document.querySelector('.modal'),
        closeBtn: document.querySelector('.modal-close'),
        loginTab: document.querySelector('.modal-tabs .modal-tab:first-child'),
        signupTab: document.querySelector('.modal-tabs .modal-tab:last-child'),
        loginForm: document.querySelector('.modal-form:first-of-type') || createLoginForm(),
        signupForm: document.querySelector('.modal-form:last-of-type') || createSignupForm(),
        openLoginBtn: document.getElementById('openLogin') || document.querySelector('[id*="login"]'),
        submitBtns: document.querySelectorAll('.modal-btn')
    };
}

// ===== CREATE LOGIN FORM IF NOT EXISTS =====
function createLoginForm() {
    const form = document.createElement('form');
    form.className = 'modal-form';
    form.innerHTML = `
        <input type="email" class="modal-input" id="loginEmail" placeholder="Email address" required>
        <input type="password" class="modal-input" id="loginPassword" placeholder="Password" required>
        <button type="submit" class="modal-btn">Login</button>
        <div class="modal-divider">or</div>
        <a href="#" class="forgot">Forgot password?</a>
    `;
    return form;
}

// ===== CREATE SIGNUP FORM IF NOT EXISTS =====
function createSignupForm() {
    const form = document.createElement('form');
    form.className = 'modal-form';
    form.style.display = 'none';
    form.innerHTML = `
        <input type="email" class="modal-input" id="signupEmail" placeholder="Email address" required>
        <input type="tel" class="modal-input" id="signupMobile" placeholder="Mobile number" pattern="[0-9]{10}" required>
        <input type="password" class="modal-input" id="signupPassword" placeholder="Password (min 6 chars)" minlength="6" required>
        <input type="password" class="modal-input" id="signupConfirmPassword" placeholder="Confirm password" required>
        <button type="submit" class="modal-btn">Sign Up</button>
    `;
    return form;
}

// ===== INITIALIZE AUTH UI =====
function initAuthUI() {
    const elements = getModalElements();

    // Open login modal
    if (elements.openLoginBtn) {
        elements.openLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            elements.overlay.classList.add('open');
        });
    }

    // Close modal
    if (elements.closeBtn) {
        elements.closeBtn.addEventListener('click', () => {
            elements.overlay.classList.remove('open');
        });
    }
    if (elements.overlay) {
        elements.overlay.addEventListener('click', (e) => {
            if (e.target === elements.overlay) {
                elements.overlay.classList.remove('open');
            }
        });
    }

    // Tab switching
    if (elements.loginTab && elements.signupTab) {
        elements.loginTab.addEventListener('click', () => switchAuthTab('login'));
        elements.signupTab.addEventListener('click', () => switchAuthTab('signup'));
    }

    // Form submission
    elements.submitBtns.forEach((btn, idx) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (idx === 0) handleLogin();
            else handleSignup();
        });
    });
}

// ===== SWITCH TABS =====
function switchAuthTab(tab) {
    const elements = getModalElements();
    
    if (tab === 'login') {
        elements.loginTab.classList.add('active');
        elements.signupTab.classList.remove('active');
        elements.loginForm.style.display = 'flex';
        elements.signupForm.style.display = 'none';
    } else {
        elements.loginTab.classList.remove('active');
        elements.signupTab.classList.add('active');
        elements.loginForm.style.display = 'none';
        elements.signupForm.style.display = 'flex';
    }
}

// ===== HANDLE LOGIN =====
async function handleLogin() {
    const email = document.getElementById('loginEmail')?.value;
    const password = document.getElementById('loginPassword')?.value;

    if (!email || !password) {
        showAlert('Please fill all fields', 'error');
        return;
    }

    try {
        // Try Firebase first
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('Firebase login successful:', userCredential.user.uid);
        
        showAlert('Login successful! Welcome back!', 'success');
        setTimeout(() => {
            document.querySelector('.modal-overlay')?.classList.remove('open');
            location.reload();
        }, 1500);
    } catch (firebaseError) {
        // Fallback to local storage
        if (localUsers[email] && localUsers[email].password === password) {
            localStorage.setItem('hallosethu_current_user', JSON.stringify({
                email: email,
                mobile: localUsers[email].mobile,
                loginTime: new Date().toLocaleString()
            }));
            showAlert('Login successful!', 'success');
            setTimeout(() => {
                document.querySelector('.modal-overlay')?.classList.remove('open');
                location.reload();
            }, 1500);
        } else {
            showAlert('Invalid email or password', 'error');
        }
    }
}

// ===== HANDLE SIGNUP =====
async function handleSignup() {
    const email = document.getElementById('signupEmail')?.value;
    const mobile = document.getElementById('signupMobile')?.value;
    const password = document.getElementById('signupPassword')?.value;
    const confirmPassword = document.getElementById('signupConfirmPassword')?.value;

    if (!email || !mobile || !password || !confirmPassword) {
        showAlert('Please fill all fields', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showAlert('Passwords do not match', 'error');
        return;
    }

    if (localUsers[email]) {
        showAlert('Email already registered', 'error');
        return;
    }

    try {
        // Try Firebase first
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('Firebase signup successful:', userCredential.user.uid);
    } catch (firebaseError) {
        console.log('Firebase signup failed, using local storage:', firebaseError.message);
    }

    // Save to local storage as backup
    localUsers[email] = { password, mobile };
    localStorage.setItem('hallosethu_users', JSON.stringify(localUsers));

    showAlert('Account created! Please login now.', 'success');
    setTimeout(() => {
        document.getElementById('signupEmail').value = '';
        document.getElementById('signupMobile').value = '';
        document.getElementById('signupPassword').value = '';
        document.getElementById('signupConfirmPassword').value = '';
        switchAuthTab('login');
    }, 1500);
}

// ===== HANDLE LOGOUT =====
function handleLogout() {
    signOut(auth).catch(() => {});
    localStorage.removeItem('hallosethu_current_user');
    showAlert('Logged out successfully', 'success');
    setTimeout(() => location.reload(), 1000);
}

// ===== CHECK AUTH STATE & UPDATE UI =====
onAuthStateChanged(auth, (user) => {
    const overlay = document.querySelector('.modal-overlay');
    const loginTab = document.querySelector('.modal-tabs .modal-tab:first-child');
    const signupTab = document.querySelector('.modal-tabs .modal-tab:last-child');
    const navLoginBtn = document.getElementById('openLogin');

    if (user) {
        // User is logged in
        const userData = {
            email: user.email,
            mobile: localUsers[user.email]?.mobile || 'N/A',
            uid: user.uid
        };
        
        // Update nav button
        if (navLoginBtn) {
            navLoginBtn.innerHTML = `<i class="fa-solid fa-user-check"></i> ${user.email}`;
            navLoginBtn.onclick = handleLogout;
            navLoginBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
        }

        // Store user data
        localStorage.setItem('hallosethu_current_user', JSON.stringify(userData));
        
        console.log('User logged in:', userData);
    } else {
        // User is logged out
        const localUser = JSON.parse(localStorage.getItem('hallosethu_current_user'));
        
        if (localUser) {
            // Show local user as logged in
            if (navLoginBtn) {
                navLoginBtn.innerHTML = `<i class="fa-solid fa-user-check"></i> ${localUser.email}`;
                navLoginBtn.onclick = () => {
                    localStorage.removeItem('hallosethu_current_user');
                    showAlert('Logged out', 'success');
                    setTimeout(() => location.reload(), 1000);
                };
                navLoginBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            }
        } else {
            // Show login button
            if (navLoginBtn) {
                navLoginBtn.innerHTML = '<i class="fa-regular fa-user"></i> Login / Signup';
                navLoginBtn.onclick = (e) => {
                    e.preventDefault();
                    if (overlay) overlay.classList.add('open');
                };
                navLoginBtn.style.background = 'linear-gradient(135deg, var(--blue), var(--blue-light))';
            }
        }
    }
});

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
            animation: slideIn 0.3s ease;
        `;
        document.body.appendChild(alertDiv);
    }

    const colors = {
        success: { bg: '#4CAF50', text: '#fff' },
        error: { bg: '#f44336', text: '#fff' },
        info: { bg: '#2196F3', text: '#fff' }
    };

    alertDiv.textContent = message;
    alertDiv.style.background = colors[type].bg;
    alertDiv.style.color = colors[type].text;
    alertDiv.style.display = 'block';

    setTimeout(() => {
        alertDiv.style.display = 'none';
    }, 3000);
}

// ===== INITIALIZE ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', initAuthUI);

// ===== EXPORT FUNCTIONS FOR GLOBAL ACCESS =====
window.handleLogin = handleLogin;
window.handleSignup = handleSignup;
window.handleLogout = handleLogout;
window.switchAuthTab = switchAuthTab;
