// Gestion des cagnottes d'épargne
console.log('🎨 Initialisation des cagnottes d\'épargne...');

/**
 * Charger et afficher les cagnottes d'épargne
 */
function loadSavingsCards() {
    console.log('📊 Chargement des cagnottes d\'épargne...');
    
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        console.error('❌ Aucun utilisateur connecté');
        return;
    }
    
    const user = JSON.parse(loggedInUser);
    
    // Charger les transactions d'épargne
    getTransactions(user.username, function(transactions) {
        console.log('📋 Transactions trouvées:', transactions.length);
        
        // Filtrer les transactions d'épargne
        const savingsTransactions = transactions.filter(tx => tx.type === 'epargne');
        console.log('💰 Transactions d\'épargne:', savingsTransactions.length);
        
        // Grouper par catégorie (cagnotte)
        const savingsByCategory = {};
        
        savingsTransactions.forEach(tx => {
            const category = tx.category || 'Autre';
            if (!savingsByCategory[category]) {
                savingsByCategory[category] = {
                    total: 0,
                    transactions: []
                };
            }
            savingsByCategory[category].total += tx.amount;
            savingsByCategory[category].transactions.push(tx);
        });
        
        console.log('📊 Cagnottes groupées:', Object.keys(savingsByCategory));
        
        // Mettre à jour l'affichage des cagnottes
        updateSavingsCardsDisplay(savingsByCategory);
    });
}

/**
 * Mettre à jour l'affichage des cagnottes
 */
function updateSavingsCardsDisplay(savingsByCategory) {
    console.log('🎨 Mise à jour de l\'affichage des cagnottes...');
    
    const savingCards = document.querySelectorAll('.saving-card');
    const categories = Object.keys(savingsByCategory);
    
    // Définir les objectifs par défaut pour chaque cagnotte
    const defaultObjectives = {
        'Voyage au Japon': 5000000,
        'Nouvelle voiture': 10000000,
        'Apport maison': 50000000
    };
    
    savingCards.forEach((card, index) => {
        const title = card.querySelector('h5').textContent;
        const objective = defaultObjectives[title] || 5000000;
        
        // Trouver la catégorie correspondante
        const categoryData = savingsByCategory[title];
        const totalSaved = categoryData ? categoryData.total : 0;
        const percentage = (totalSaved / objective) * 100;
        
        console.log(`💾 Cagnotte ${title}: ${totalSaved}/${objective} FCFA (${Math.round(percentage)}%)`);
        
        // Mettre à jour l'objectif
        const objectiveEl = card.querySelector('h6');
        if (objectiveEl) {
            objectiveEl.textContent = `Objectif : ${objective.toLocaleString('fr-FR', {maximumFractionDigits: 0})} FCFA`;
        }
        
        // Mettre à jour le remplissage
        const fill = card.querySelector('.fill');
        if (fill) {
            fill.style.height = Math.min(percentage, 100) + '%';
            fill.innerHTML = `${Math.round(percentage)}%<br><small>${totalSaved.toLocaleString('fr-FR', {maximumFractionDigits: 0})} FCFA</small>`;
        }
        
        // Mettre à jour la barre de progression
        const progressBar = card.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.style.width = Math.min(percentage, 100) + '%';
        }
        
        // Mettre à jour le montant restant
        const remainingElements = card.querySelectorAll('.d-flex.justify-content-between.small.mt-3');
        if (remainingElements[0]) {
            const remaining = Math.max(0, objective - totalSaved);
            const spans = remainingElements[0].querySelectorAll('span');
            if (spans[1]) {
                spans[1].textContent = remaining.toLocaleString('fr-FR', {maximumFractionDigits: 0}) + ' FCFA';
                spans[1].className = 'text-success fw-bold';
            }
        }
    });
    
    console.log('✅ Cagnottes mises à jour');
}

/**
 * Animer le remplissage d'une cagnote avec animation continue
 */
function animateSavingsJarContinuous(jarElement, newHeight) {
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
    createBubblesContinuous(jarElement, bubbleColor, 8);
    
    // Mettre à jour la hauteur avec animation fluide
    fillElement.style.transition = 'height 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
    fillElement.style.height = newHeight + '%';
    
    // Retirer la classe d'animation après la fin
    setTimeout(() => {
        fillElement.classList.remove('animating');
    }, 1200);
}

/**
 * Créer des bulles d'animation continues
 */
function createBubblesContinuous(jarElement, color, count) {
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
            }, 1200);
        }, i * 80);
    }
}

/**
 * Initialiser les boutons "Ajouter des fonds"
 */
function initSavingsButtons() {
    console.log('🔧 Initialisation des boutons de cagnottes...');
    
    const addFundsButtons = document.querySelectorAll('.saving-card .btn-outline-light');
    
    addFundsButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('💰 Bouton "Ajouter des fonds" cliqué - Cagnotte', index + 1);
            
            // Récupérer la carte de cagnote
            const savingCard = this.closest('.saving-card');
            if (!savingCard) return;
            
            // Récupérer le bocal
            const jar = savingCard.querySelector('.jar');
            if (!jar) return;
            
            // Récupérer la hauteur actuelle
            const fill = jar.querySelector('.fill');
            const currentHeight = parseFloat(fill.style.height) || 0;
            
            // Simuler un ajout de 10-20%
            const addedAmount = Math.random() * 10 + 10;
            const newHeight = Math.min(currentHeight + addedAmount, 100);
            
            // Animer le remplissage
            animateSavingsJarContinuous(jar, newHeight);
            
            // Mettre à jour le texte après l'animation
            setTimeout(() => {
                const percentage = Math.round(newHeight);
                fill.innerHTML = `${percentage}%<br><small>${Math.round(newHeight * 100) / 100}% rempli</small>`;
                
                // Mettre à jour la barre de progression
                const progressBar = savingCard.querySelector('.progress-bar');
                if (progressBar) {
                    progressBar.style.width = percentage + '%';
                }
                
                // Afficher un message de succès
                showSavingsNotification(savingCard, addedAmount);
            }, 600);
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
    console.log('✅ DOM chargé, initialisation des cagnottes');
    
    // Attendre que la DB soit prête
    ensureDatabaseReady(function() {
        loadSavingsCards();
        initSavingsButtons();
    });
});

/**
 * Rafraîchir les cagnottes quand les données changent
 */
function refreshSavingsCards() {
    console.log('🔄 Rafraîchissement des cagnottes...');
    loadSavingsCards();
}
