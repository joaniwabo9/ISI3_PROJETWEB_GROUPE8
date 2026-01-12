


function logout() {
    if(confirm("Voulez-vous vraiment vous déconnecter ?")) {
       
        alert("Déconnexion en cours...");
        window.location.reload();
    }
}

document.addEventListener('DOMContentLoaded', logout);
