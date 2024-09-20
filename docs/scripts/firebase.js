// Import from Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDE9d2CEV6erfcRbrLmeJwk5YKtTunBOfw",
    authDomain: "signup-form-31024.firebaseapp.com",
    projectId: "signup-form-31024",
    storageBucket: "signup-form-31024.appspot.com",
    messagingSenderId: "400288532348",
    appId: "1:400288532348:web:e0a155c1d110176256c6f9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Show Notification
function showNotification(message, type) {
    const notification = document.getElementById("notif");
    notification.textContent = message;
    notification.className = "notif " + type;
    notification.style.display = "block";

    setTimeout(() => {
        notification.style.display = "none";
    }, 3000);
}

// Password Validation
function isValidPassword(password) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return passwordRegex.test(password);
}

// Sign Up Form Button
const signupForm = document.getElementById("signup-form");
if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const firstname = document.getElementById("signup-firstname").value;
        const lastname = document.getElementById("signup-lastname").value;
        const email = document.getElementById("signup-email").value;
        const password = document.getElementById("signup-password").value;

        if (!isValidPassword(password)) {
            showNotification(
                "Password must be 6+ character, include a letter and number.",
                "error"
            );
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                firstname: firstname,
                lastname: lastname,
                email: email,
            });

            showNotification("Signed Up Successfully", "success");
            signupForm.reset();
        } catch (error) {
            console.error("Sign up error:", error);
            showNotification(error.message, "error");
        }
    });
}

// Login Form Button
const loginForm = document.getElementById("login-form");
if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        try {
            await signInWithEmailAndPassword(auth, email, password);

            sessionStorage.setItem("loginSuccess", "Logged In Successfully");
            loginForm.reset();

            window.location.href = "main.html";
        } catch (error) {
            console.error("Login error:", error);
            showNotification(error.message, "error");
        }
    });
}

// Home Page First Name
function displayUserFirstName(user) {
    if (user) {
        const userDocRef = doc(db, "users", user.uid);
        getDoc(userDocRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    const loggedFirstName =
                        document.getElementById("logged-firstname");
                    loggedFirstName.textContent = userData.firstname;
                }
            })
            .catch((error) => {
                console.error("Error getting user document:", error);
            });
    }
}

// Listen for Auth Changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        displayUserFirstName(user);
    }
});

// Logout Button
const logoutButton = document.getElementById("logout-button");
if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
        try {
            await signOut(auth);

            sessionStorage.setItem("logoutSuccess", "Logged Out Successfully");
            window.location.href = "index.html";
        } catch (error) {
            showNotification(error.message, "error");
        }
    });
}

// Session Storage
const loginSuccessMessage = sessionStorage.getItem("loginSuccess");
if (loginSuccessMessage) {
    showNotification(loginSuccessMessage, "success");
    sessionStorage.removeItem("loginSuccess");
}

const logoutSuccessMessage = sessionStorage.getItem("logoutSuccess");
if (logoutSuccessMessage) {
    showNotification(logoutSuccessMessage, "success");
    sessionStorage.removeItem("logoutSuccess");
}
