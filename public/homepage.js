import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {
  getFirestore,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBQixiXScgz6DpQnxaxETxEB_QMWLpPdJs",
  authDomain: "book-library-project-b336d.firebaseapp.com",
  projectId: "book-library-project-b336d",
  storageBucket: "book-library-project-b336d.firebasestorage.app",
  messagingSenderId: "597026794025",
  appId: "1:597026794025:web:2b076ac14d44e5b003ca38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Check authentication state
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const loggedInUserId = user.uid;
    localStorage.setItem("loggedInUserId", loggedInUserId);
    // No need to display user details anymore
  } else {
    console.log("No user logged in");
    window.location.href = "index.html";
  }
});

// Sidebar toggle functionality
const homeIcon = document.getElementById("homeIcon");
const settingsIcon = document.getElementById("settingsIcon");
const leftSidebar = document.getElementById("leftSidebar");
const rightSidebar = document.getElementById("rightSidebar");
const overlay = document.getElementById("overlay");

homeIcon.addEventListener("click", () => {
  leftSidebar.classList.toggle("active");
  overlay.classList.toggle("active");
  rightSidebar.classList.remove("active");
});

settingsIcon.addEventListener("click", () => {
  rightSidebar.classList.toggle("active");
  overlay.classList.toggle("active");
  leftSidebar.classList.remove("active");
});

overlay.addEventListener("click", () => {
  leftSidebar.classList.remove("active");
  rightSidebar.classList.remove("active");
  overlay.classList.remove("active");
});

// Navigation buttons
document.getElementById("profileBtn").addEventListener("click", () => {
  window.location.href = "profile.html";
});

document.getElementById("collectionsBtn").addEventListener("click", () => {
  window.location.href = "collections.html";
});

document.getElementById("friendsBtn").addEventListener("click", () => {
  window.location.href = "friends.html";
});

// Logout functionality
document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("loggedInUserId");
  signOut(auth)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
});