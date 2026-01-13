// Animation des cagnotes d'épargne
console.log('🎨 Chargement du script d\'animation des cagnotes...');

/**
 * Animer le remplissage d'une cagnote
 */
function animateSavingsJar(jarElement, newHeight) {
    if (!jarElement) return;
    
    const fillElement = jarElement.querySelector('.fill');
    if (!fillElement) return;
    
    // Déterminer la couleur pour les bulles
    let bubbleColor = 'blue';
    if (fillElement.classList.contains('fill-green')) {
        bubbleColor = 'green';
    } else if (fillElement.classList.contains('fill-purple')) {
        bubbleColor = 'purple';
    }
    
    // Ajouter la classe d'animation
    fillElement.classList.add('animating');
    
    // Créer des bulles d'animation
    createBubbles(jarElement, bubbleColor, 5);
    
    // Mettre à jour la hauteur après un court délai
    setTimeout(() => {
        fillElement.style.height = newHeight + '%';
    }, 50);
    
    // Retirer la classe d'animation après la fin
    setTimeout(() => {
        fillElement.classList.remove('animating');
    }, 800);
}

/**
 * Créer des bulles d'animation
 */
function createBubbles(jarElement, color, count) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const bubble = document.createElement('div');
            bubble.className = `bubble-effect ${color} animating`;
            
            // Position aléatoire dans le bocal
            const randomX = Math.random() * 80 + 10; // 10% à 90%
            bubble.style.left = randomX + '%';
            bubble.style.bottom = '20%';
            
            jarElement.appendChild(bubble);
            
            // Supprimer la bulle après l'animation
            setTimeout(() => {
                bubble.remove();
            }, 800);
        }, i * 100);
    }
}

/**
 * Initialiser les boutons "Ajouter des fonds"
 */
function initSavingsButtons() {
    console.log('🔧 Initialisation des boutons de cagnotes...');
    
    const addFundsButtons = document.querySelectorAll('.saving-card .btn-outline-light');
    
    addFundsButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('💰 Bouton "Ajouter des fonds" cliqué - Cagnote', index + 1);
            
            // Récupérer la carte de cagnote
            const savingCard = this.closest('.saving-card');
            if (!savingCard) return;
            
            // Récupérer le bocal
            const jar = savingCard.querySelector('.jar');
            if (!jar) return;
            
            // Récupérer la hauteur actuelle
            const fill = jar.querySelector('.fill');
            const currentHeight = parseFloat(fill.style.height) || 0;
            
            // Simuler un ajout de 15-25%
            const addedAmount = Math.random() * 10 + 15;
            const newHeight = Math.min(currentHeight + addedAmount, 100);
            
            // Mettre à jour le pourcentage affiché
            const percentage = Math.round(newHeight);
            const amountText = fill.querySelector('small');
            
            // Animer le remplissage
            animateSavingsJar(jar, newHeight);
            
            // Mettre à jour le texte après l'animation
            setTimeout(() => {
                fill.innerHTML = `${percentage}%<br><small>${Math.round(newHeight * 100) / 100}% rempli</small>`;
                
                // Mettre à jour la barre de progression
                const progressBar = savingCard.querySelector('.progress-bar');
                if (progressBar) {
                    progressBar.style.width = percentage + '%';
                }
                
                // Afficher un message de succès
                showSavingsNotification(savingCard, addedAmount);
            }, 400);
        });
    });
}

/**
 * Afficher une notification de succès
 */
function showSavingsNotification(savingCard, amount) {
    const notification = document.createElement('div');
    notification.className = 'savings-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="bi bi-check-circle"></i>
            <span>+${Math.round(amount)}% ajouté!</span>
        </div>
    `;
    
    savingCard.appendChild(notification);
    
    // Animer la notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Supprimer la notification après 2 secondes
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

/**
 * Initialiser au chargement du DOM
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM chargé, initialisation des animations de cagnotes');
    initSavingsButtons();
});
