// Créer la barre de navigation uniforme
function createNavbar(activePage) {
    const navbar = document.createElement('nav');
    navbar.className = 'navbar-unified mb-4';
    navbar.innerHTML = `
        <div class="navbar-container">
            <a href="dashboard.html" class="navbar-item ${activePage === 'dashboard' ? 'active' : ''}">
                <i class="bi bi-house"></i>
                <span>Tableau de Bord</span>
            </a>
            <a href="businessetprofil.html?tab=business" class="navbar-item ${activePage === 'business' ? 'active' : ''}">
                <i class="bi bi-briefcase"></i>
                <span>Mes Business</span>
            </a>
            <a href="historique.html" class="navbar-item ${activePage === 'historique' ? 'active' : ''}">
                <i class="bi bi-clock-history"></i>
                <span>Historique</span>
            </a>
            <a href="businessetprofil.html?tab=profil" class="navbar-item ${activePage === 'profil' ? 'active' : ''}">
                <i class="bi bi-person"></i>
                <span>Profil</span>
            </a>
            <button class="navbar-item bot-button" title="Recommandations IA">
                <i class="bi bi-robot"></i>
                <span>Bot IA</span>
            </button>
        </div>
    `;
    
    return navbar;
}

// Mettre à jour le nom de l'utilisateur dans les headers
function updateUserName() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        try {
            const user = JSON.parse(loggedInUser);
            const userName = user.prenom || 'Utilisateur';
            
            // Mettre à jour tous les éléments avec le nom d'utilisateur
            document.querySelectorAll('[data-user-name]').forEach(el => {
                el.textContent = userName;
            });
            
            // Mettre à jour les spans dans les headers
            document.querySelectorAll('.welcome-card span, .welcome-banner h2 span, .header-card span').forEach(el => {
                if (el.textContent === 'Daniella' || el.textContent === 'Utilisateur') {
                    el.textContent = userName;
                }
            });
            
            // Mettre à jour les h2 et h4 avec le nom
            document.querySelectorAll('.welcome-card h4, .welcome-banner h2, .header-card h4').forEach(el => {
                if (el.textContent.includes('Bonjour')) {
                    el.innerHTML = `Bonjour, <span>${userName}</span>`;
                }
            });
        } catch (e) {
            console.error('Erreur lors de la lecture de l\'utilisateur:', e);
        }
    }
}

// Injecter la navbar au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Mettre à jour le nom de l'utilisateur
    updateUserName();
    
    // Trouver le conteneur principal
    const mainContainer = document.querySelector('.container-fluid') || document.querySelector('.container');
    
    if (mainContainer && !document.querySelector('.navbar-unified')) {
        // Déterminer la page active
        let activePage = 'dashboard';
        const currentPage = window.location.pathname.split('/').pop();
        const params = new URLSearchParams(window.location.search);
        const tab = params.get('tab');
        
        if (currentPage.includes('businessetprofil')) {
            activePage = tab === 'profil' ? 'profil' : 'business';
        } else if (currentPage.includes('historique')) {
            activePage = 'historique';
        }
        
        const navbar = createNavbar(activePage);
        
        // Trouver le premier élément de header (welcome-card, welcome-banner ou header-card)
        const headerElement = mainContainer.querySelector('.welcome-card, .welcome-banner, .header-card');
        
        if (headerElement && headerElement.nextElementSibling) {
            // Insérer la navbar après le header
            headerElement.parentNode.insertBefore(navbar, headerElement.nextElementSibling);
        } else if (headerElement) {
            // Si c'est le dernier élément, l'ajouter après
            headerElement.parentNode.insertBefore(navbar, headerElement.nextElementSibling);
        } else {
            // Sinon, l'ajouter au début
            mainContainer.insertBefore(navbar, mainContainer.firstChild);
        }
    }
});


// Ajouter l'event listener pour le bouton bot
document.addEventListener('DOMContentLoaded', function() {
    // Attendre que la navbar soit créée
    setTimeout(function() {
        const botButton = document.querySelector('.bot-button');
        if (botButton) {
            botButton.addEventListener('click', function() {
                if (typeof showAIChat === 'function') {
                    showAIChat();
                } else {
                    console.error('Fonction showAIChat non trouvée');
                }
            });
        }
    }, 100);
});
