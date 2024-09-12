// Event Listener
const portfolioButton = document.getElementById("portfolio-button");
if (portfolioButton) {
    portfolioButton.addEventListener("click", function () {
        window.open("https://ejwebdev.github.io/portfolio", "_blank");
    });
}

const firebaseLink = document.getElementById("firebase-link");
if (firebaseLink) {
    firebaseLink.addEventListener("click", function () {
        window.open("https://firebase.google.com", "_blank");
    });
}
