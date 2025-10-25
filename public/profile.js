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

import { firebaseConfig } from './firebaseConfig.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Listen for auth state changes
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = "index.html";
        return;
    }

    localStorage.setItem("loggedInUserId", user.uid);

    try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            
            document.getElementById("profileNickname").innerText = userData.nickname || "Not set";
            document.getElementById("profileEmail").innerText = userData.email || user.email;
        }
    } catch (error) {
        console.error("Error loading profile:", error);
        document.getElementById("profileNickname").innerText = "Error loading";
    }
});

// Logout
document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("loggedInUserId");
    signOut(auth)
        .then(() => window.location.href = "index.html")
        .catch((error) => console.error("Logout error:", error));
});

// Edit Profile
document.getElementById("editProfile").addEventListener("click", () => {
    alert("Edit functionality coming soon!");
});