


function logout() {
    if(confirm("Voulez-vous vraiment vous déconnecter ?")) {
        localStorage.removeItem("loggedInUser");
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("prenom");
        window.location.href = "signin.html";
    }
}

// Attach logout to button click only, not on page load
document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById("logoutBtn");
    if(logoutBtn) {
        logoutBtn.addEventListener("click", logout);
    }
});
