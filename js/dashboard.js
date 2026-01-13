// dashboard.js
// Gestion du dashboard NIVELO

// Récupérer l'utilisateur connecté
function getLoggedInUser() {
    const user = localStorage.getItem("loggedInUser");
    return user ? JSON.parse(user) : null;
}

// Vérifier si utilisateur connecté
function checkLogin() {
    const user = getLoggedInUser();
    if(!user){
        window.location.href = "signin.html";
    }
}

// Déconnexion - Commenté car géré par le bouton logout dans le profil
// const logoutBtn = document.getElementById("logoutBtn");
// if(logoutBtn){
//     logoutBtn.addEventListener("click", () => {
//         if(confirm("Voulez-vous vraiment vous déconnecter ?")){
//             localStorage.removeItem("loggedInUser");
//             window.location.href = "signin.html";
//         }
//     });
// }

// Notification
const notifEl = document.getElementById("notification");
function showNotification(message) {
    if(!notifEl) return;
    notifEl.textContent = message;
    notifEl.style.display = "block";
    setTimeout(() => { notifEl.style.display = "none"; }, 3000);
}

// Initialisation du dashboard
function initDashboard() {
    checkLogin();

    // Mettre à jour solde, tableau et graphique
    loadDashboard();

    // Gestion du formulaire transaction
    const transactionForm = document.getElementById("transactionForm");
    if(transactionForm){
        transactionForm.addEventListener("submit", e => {
            e.preventDefault();
            const type = document.getElementById("type").value;
            const amount = Number(document.getElementById("amount").value);
            if(amount <= 0){
                showNotification("Montant invalide !");
                return;
            }

            addNewTransaction(type, amount, success => {
                if(success){
                    document.getElementById("amount").value = "";
                    loadDashboard();
                    showNotification("✅ Transaction ajoutée !");
                } else {
                    showNotification("❌ Erreur lors de l'ajout !");
                }
            });
        });
    }

    // Gestion filtrage type et période
    const filterType = document.getElementById("filterType");
    const periodSelect = document.getElementById("periodSelect");

    if(filterType){
        filterType.addEventListener("change", () => {
            updateTransactions(filterType.value, periodSelect.value);
            updateChart(filterType.value, periodSelect.value);
        });
    }

    if(periodSelect){
        periodSelect.addEventListener("change", () => {
            updateTransactions(filterType.value, periodSelect.value);
            updateChart(filterType.value, periodSelect.value);
        });
    }
}

// Charger tableau, solde et graphique
function loadDashboard() {
    updateBalance();
    updateTransactions();
    updateChart();
}

// Mettre à jour le solde et vérifier alertes
const originalUpdateBalance = updateBalance;
updateBalance = () => {
    originalUpdateBalance();
    getUserBalance(solde => {
        if(solde < 0) showNotification("⚠️ Attention ! Solde négatif !");
        else if(solde < 50) showNotification("⚠️ Solde faible !");
    });
};

// Lancer le dashboard quand le DOM est prêt et IndexedDB ouvert
document.addEventListener("DOMContentLoaded", () => {
    openDB(() => {
        initDashboard();
    });
});