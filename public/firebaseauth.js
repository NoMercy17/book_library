import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

import { 
    getFirestore, 
    setDoc, 
    doc 
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

import { firebaseConfig } from '../../firebaseConfig.js';


// Initialize Firebase FIRST
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Utility function to show messages
function showMessage(message, divId) {
    const messageDiv = document.getElementById(divId);
    if (messageDiv) {
        messageDiv.style.display = "block";
        messageDiv.innerHTML = message;
        messageDiv.style.opacity = 1;
        setTimeout(function() {
            messageDiv.style.opacity = 0;
            messageDiv.style.display = "none";
        }, 5000);
    }
}

// Form Toggle
const signUpContainer = document.getElementById('signup');
const signInContainer = document.getElementById('signin');
const signUpLink = document.getElementById('signUpLink');
const signInLink = document.getElementById('signInLink');

signInLink.addEventListener('click', (e) => {
    e.preventDefault();
    signUpContainer.classList.add('hidden');
    signInContainer.classList.remove('hidden');
});

signUpLink.addEventListener('click', (e) => {
    e.preventDefault();
    signInContainer.classList.add('hidden');
    signUpContainer.classList.remove('hidden');
});

// Sign Up
const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', (event) => {
    event.preventDefault();
    
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;

    if (!email || !password || !firstName || !lastName) {
        showMessage('Please fill all fields', 'signUpMessage');
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                email: email,
                firstName: firstName,
                lastName: lastName,
                uid: user.uid,
                createdAt: new Date()
            };
            
            showMessage('Account Created Successfully', 'signUpMessage');
            
            const docRef = doc(db, "users", user.uid);
            setDoc(docRef, userData)
                .then(() => {
                    // Clear form
                    document.getElementById('rEmail').value = '';
                    document.getElementById('rPassword').value = '';
                    document.getElementById('fName').value = '';
                    document.getElementById('lName').value = '';
                    
                    // Store user ID and redirect to homepage
                    localStorage.setItem('loggedInUserId', user.uid);
                    
                    setTimeout(() => {
                        window.location.href = "homepage.html";
                    }, 1500);
                })
                .catch((error) => {
                    console.error("Error writing document:", error);
                    showMessage("Error saving user data", 'signUpMessage');
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/email-already-in-use') {
                showMessage("Email Address already in use!", 'signUpMessage');
            } else if (errorCode === 'auth/weak-password') {
                showMessage("Password should be at least 6 characters", 'signUpMessage');
            } else if (errorCode === 'auth/invalid-email') {
                showMessage("Invalid email address", 'signUpMessage');
            } else {
                showMessage("Unable to create user", 'signUpMessage');
            }
            console.error("Sign up error:", error);
        });
});

// Sign In
const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', (event) => {
    event.preventDefault();
    
    const email = document.getElementById('logEmail').value;
    const password = document.getElementById('logPassword').value;

    if (!email || !password) {
        showMessage('Please fill all fields', 'signInMessage');
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            
            // Save user ID to localStorage
            localStorage.setItem('loggedInUserId', user.uid);
            
            console.log("Redirecting to homepage..."); // Debug log
            
            window.location.href = "homepage.html";
        })
        .catch((error) => {
            console.error("Sign in error:", error);
            const errorCode = error.code;
            if (errorCode === 'auth/invalid-credential' || errorCode === 'auth/wrong-password') {
                showMessage('Invalid email or password', 'signInMessage');
            } else if (errorCode === 'auth/user-not-found') {
                showMessage('No account found with this email', 'signInMessage');
            } else if (errorCode === 'auth/invalid-email') {
                showMessage('Invalid email address', 'signInMessage');
            } else if (errorCode === 'auth/too-many-requests') {
                showMessage('Too many failed attempts. Please try again later', 'signInMessage');
            } else {
                showMessage('Unable to sign in', 'signInMessage');
            }
        });
});