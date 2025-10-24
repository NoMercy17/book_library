import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {
    getFirestore,
    getDoc,
    doc
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyA3_aGUlHWwcx6rf6Ra9HLHvdNCD-HoRE4",
    authDomain: "booklibrary1710.firebaseapp.com",
    projectId: "booklibrary1710",
    storageBucket: "booklibrary1710.firebasestorage.app",
    messagingSenderId: "825589113555",
    appId: "1:825589113555:web:480faa86ad5eec4338aa26",
    measurementId: "G-ERRSY01H7S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Listen for auth state changes
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const loggedInUserId = user.uid;
        localStorage.setItem("loggedInUserId", loggedInUserId);

        try {
            const docRef = doc(db, "users", loggedInUserId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const userData = docSnap.data();
                document.getElementById("profileFName").innerText = userData.firstName || "Not set";
                document.getElementById("profileLName").innerText = userData.lastName || "Not set";
                document.getElementById("profileEmail").innerText = userData.email || user.email;
            } else {
                console.log("No document found matching ID");
                // Fallback to auth email if no document
                document.getElementById("profileEmail").innerText = user.email;
                document.getElementById("profileFName").innerText = "Not set";
                document.getElementById("profileLName").innerText = "Not set";
            }
        } catch (error) {
            console.error("Error getting user document:", error);
        }
    } else {
        console.log("No user logged in");
        window.location.href = "index.html";
    }
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

// Edit profile button
document.getElementById("editProfile").addEventListener("click", () => {
    alert("Edit functionality coming soon!");
});