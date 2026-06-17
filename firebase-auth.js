// ===== FIREBASE AUTHENTICATION & USER MANAGEMENT =====

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let loginInProgress = false;
let signupInProgress = false;
let _originalOpenModal = null;

// ===== HANDLE LOGIN =====
async function handleLogin(btn) {
    if (loginInProgress) return;

    const loginForm = document.getElementById('loginForm');
    if (!loginForm) {
        showAlert('Login form not found. Please refresh.', 'error');
        return;
    }

    const inputs = loginForm.querySelectorAll('.modal-input');
    const email    = inputs[0]?.value?.trim() || '';
    const password = inputs[1]?.value?.trim() || '';

    if (!email || !password) {
        showAlert('Please enter your email and password.', 'error');
        return;
    }

    loginInProgress = true;
    const originalText = btn ? btn.textContent : '';
    if (btn) { btn.textContent = 'Logging in…'; btn.disabled = true; }

    try {
        await signInWithEmailAndPassword(auth, email, password);
        showAlert('✅ Login successful! Welcome back!', 'success');
        setTimeout(() => {
            if (typeof closeModal === 'function') closeModal();
            location.reload();
        }, 1500);
    } catch (error) {
        showAlert('❌ ' + getFriendlyError(error.code), 'error');
        if (btn) { btn.textContent = originalText; btn.disabled = false; }
        loginInProgress = false;
    }
}

// ===== HANDLE SIGNUP =====
async function handleSignup(btn) {
    if (signupInProgress) return;

    const signupForm = document.getElementById('signupForm');
    if (!signupForm) {
        showAlert('Signup form not found. Please refresh.', 'error');
        return;
    }

    const inputs = signupForm.querySelectorAll('.modal-input');
    if (inputs.length < 4) {
        showAlert('Form inputs not found. Please refresh the page.', 'error');
        return;
    }

    // Form order in index.html: name, email, mobile, password
    const name     = inputs[0]?.value?.trim() || '';
    const email    = inputs[1]?.value?.trim() || '';
    const mobile   = inputs[2]?.value?.trim() || '';
    const password = inputs[3]?.value?.trim() || '';

    if (!name || !email || !mobile || !password) {
        showAlert('❌ Please fill in all fields.', 'error');
        return;
    }

    if (password.length < 6) {
        showAlert('❌ Password must be at least 6 characters.', 'error');
        return;
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
        showAlert('❌ Please enter a valid 10-digit mobile number.', 'error');
        return;
    }

    signupInProgress = true;
    const originalText = btn ? btn.textContent : '';
    if (btn) { btn.textContent = 'Creating account…'; btn.disabled = true; }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, { displayName: name });

        // Save user data to Firestore
        try {
            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                name: name,
                email: email,
                mobile: mobile,
                createdAt: new Date().toISOString()
            });
            console.log('✅ User data saved to Firestore');
        } catch (firestoreError) {
            console.error('❌ Firestore write failed:', firestoreError.code, firestoreError.message);
            // Auth account created successfully — Firestore failure is a rules issue
        }

        showAlert('✅ Account created! Welcome to Hallosethu!', 'success');
        setTimeout(() => { location.reload(); }, 2000);
    } catch (error) {
        console.error('❌ Signup error:', error.code, error.message);
        showAlert('❌ ' + getFriendlyError(error.code), 'error');
        if (btn) { btn.textContent = originalText; btn.disabled = false; }
        signupInProgress = false;
    }
}

// ===== HANDLE LOGOUT =====
async function handleLogout() {
    try {
        await signOut(auth);
        showAlert('✅ Logged out successfully.', 'success');
        setTimeout(() => location.reload(), 1000);
    } catch (e) {
        showAlert('❌ Logout failed. Please try again.', 'error');
    }
}

// ===== AUTH STATE CHANGE =====
onAuthStateChanged(auth, async (user) => {
    const navBtn = document.getElementById('openLogin');
    if (!navBtn) return;

    if (user) {
        let displayName = user.displayName || user.email;
        try {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
                displayName = userDoc.data().name || displayName;
            }
        } catch (e) {}

        navBtn.innerHTML = `<i class="fa-solid fa-user-check"></i> ${displayName}`;
        navBtn.style.background = 'linear-gradient(135deg, #16A34A, #22C55E)';

        if (!_originalOpenModal && typeof window.openModal === 'function') {
            _originalOpenModal = window.openModal;
        }
        window.openModal = () => {
            if (confirm(`Logged in as ${displayName}.\n\nDo you want to logout?`)) {
                handleLogout();
            }
        };
    } else {
        navBtn.innerHTML = '<i class="fa-regular fa-user"></i> Login / Signup';
        navBtn.style.background = '';

        if (_originalOpenModal) {
            window.openModal = _originalOpenModal;
            _originalOpenModal = null;
        }
    }
});

// ===== FRIENDLY ERROR MESSAGES =====
function getFriendlyError(code) {
    const errors = {
        'auth/user-not-found':        'No account found with this email.',
        'auth/wrong-password':        'Incorrect password. Please try again.',
        'auth/invalid-credential':    'Invalid email or password.',
        'auth/email-already-in-use':  'This email is already registered. Please login.',
        'auth/invalid-email':         'Please enter a valid email address.',
        'auth/weak-password':         'Password must be at least 6 characters.',
        'auth/too-many-requests':     'Too many attempts. Please try again later.',
        'auth/network-request-failed':'Network error. Please check your connection.',
    };
    return errors[code] || 'Something went wrong. Please try again.';
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
            max-width: 320px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transition: opacity 0.3s;
        `;
        document.body.appendChild(alertDiv);
    }

    const colors = {
        success: { bg: '#16A34A', text: '#fff' },
        error:   { bg: '#f44336', text: '#fff' },
        info:    { bg: '#2196F3', text: '#fff' }
    };

    alertDiv.textContent = message;
    alertDiv.style.background = colors[type]?.bg || colors.info.bg;
    alertDiv.style.color      = colors[type]?.text || colors.info.text;
    alertDiv.style.display    = 'block';
    alertDiv.style.opacity    = '1';

    setTimeout(() => { alertDiv.style.opacity = '0'; }, 3500);
    setTimeout(() => { alertDiv.style.display = 'none'; alertDiv.style.opacity = '1'; }, 4000);
}

// ===== GLOBAL EXPORTS =====
window.handleLogin  = handleLogin;
window.handleSignup = handleSignup;
window.handleLogout = handleLogout;
