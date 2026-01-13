// Vérifier si l'utilisateur est connecté
function checkSession() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const currentPage = window.location.pathname.split('/').pop();
    
    // Pages publiques qui ne nécessitent pas de connexion
    const publicPages = ['pageacceuil.html', 'signin.html', 'signup.html', 'index.html', ''];
    
    // Si l'utilisateur n'est pas connecté ET la page n'est pas publique
    if (!loggedInUser && !publicPages.includes(currentPage)) {
        console.warn('⚠️ Utilisateur non connecté, redirection vers signin');
        window.location.href = 'signin.html';
    }
}

// Déconnecter l'utilisateur
function logout() {
    localStorage.removeItem('loggedInUser');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('prenom');
    window.location.href = 'signup.html';
}

// Afficher le nom de l'utilisateur
function displayUserName() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        try {
            const user = JSON.parse(loggedInUser);
            const userElements = document.querySelectorAll('[data-user-name]');
            userElements.forEach(el => {
                el.textContent = user.prenom || 'Utilisateur';
            });
        } catch (e) {
            console.error('Erreur lors de la lecture de l\'utilisateur:', e);
        }
    }
}

// Exécuter la vérification au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    checkSession();
    displayUserName();
});
