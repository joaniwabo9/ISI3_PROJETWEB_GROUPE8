// Gestion dynamique du dashboard
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔄 Initialisation du dashboard dynamique...');
    
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        console.error('❌ Aucun utilisateur connecté');
        return;
    }
    
    const user = JSON.parse(loggedInUser);
    
    // Attendre que la DB soit prête
    ensureDatabaseReady(function() {
        console.log('✅ DB prête');
        
        // Charger les transactions récentes
        loadRecentTransactions(user.username);
        
        // Ajouter les event listeners pour les cagnottes
        setupSavingsButtons();
    });
});

// Charger les transactions récentes
function loadRecentTransactions(username) {
    console.log('📋 Chargement des transactions récentes pour:', username);
    
    getTransactions(username, function(transactions) {
        console.log('📊 Transactions trouvées:', transactions.length);
        
        // Trier par date décroissante et prendre les 5 dernières
        const recentTransactions = transactions
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5);
        
        console.log('📌 Transactions récentes:', recentTransactions.length);
        
        // Afficher les transactions
        displayRecentTransactions(recentTransactions);
    });
}

// Afficher les transactions récentes
function displayRecentTransactions(transactions) {
    const container = document.querySelector('.mb-5');
    if (!container || !container.querySelector('.transaction-card')) {
        console.error('❌ Container transactions non trouvé');
        return;
    }
    
    // Récupérer tous les cards de transactions
    const cards = container.querySelectorAll('.transaction-card');
    
    // Remplir les cartes avec les transactions
    cards.forEach((card, index) => {
        if (index < transactions.length) {
            const tx = transactions[index];
            
            // Déterminer l'icône et la couleur
            let iconClass = 'blue';
            let icon = 'bi-activity';
            
            if (tx.type === 'revenu' || tx.type === 'salaire') {
                iconClass = 'green';
                icon = 'bi-currency-dollar';
            } else if (tx.type === 'epargne') {
                iconClass = 'green';
                icon = 'bi-piggy-bank';
            } else if (tx.type === 'depense') {
                iconClass = 'blue';
                icon = 'bi-arrow-down';
            }
            
            // Déterminer le signe et la classe
            const isIncome = tx.type === 'revenu' || tx.type === 'salaire';
            const sign = isIncome ? '+' : '-';
            const amountClass = isIncome ? 'positive' : 'negative';
            
            // Formater la date
            const date = new Date(tx.date);
            const dateStr = date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
            
            // Mettre à jour la carte
            card.innerHTML = `
                <div class="transaction-left">
                    <div class="icon ${iconClass}">
                        <i class="bi ${icon}"></i>
                    </div>
                    <div>
                        <h6>${tx.description}</h6>
                        <small>${tx.category}</small>
                    </div>
                </div>

                <div class="transaction-right">
                    <span class="amount ${amountClass}">${sign}${tx.amount.toLocaleString('fr-FR', {maximumFractionDigits: 0})} FCFA</span>
                    <small>${dateStr}</small>
                    <i class="bi bi-three-dots-vertical"></i>
                </div>
            `;
            
            console.log('✅ Transaction affichée:', tx.description);
        } else {
            // Vider les cartes non utilisées
            card.innerHTML = `
                <div class="transaction-left">
                    <div class="icon blue">
                        <i class="bi bi-activity"></i>
                    </div>
                    <div>
                        <h6>-</h6>
                        <small>-</small>
                    </div>
                </div>

                <div class="transaction-right">
                    <span class="amount positive">+0 FCFA</span>
                    <small>-</small>
                    <i class="bi bi-three-dots-vertical"></i>
                </div>
            `;
        }
    });
    
    console.log('✅ Transactions récentes affichées');
}

// Configurer les boutons des cagnottes
function setupSavingsButtons() {
    console.log('🎯 Configuration des boutons des cagnottes...');
    
    const savingsButtons = document.querySelectorAll('.saving-card .btn-outline-light');
    
    savingsButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('💰 Bouton cagnotte cliqué:', index);
            
            // Récupérer le nom de la cagnotte
            const savingCard = button.closest('.saving-card');
            const savingName = savingCard.querySelector('h5').textContent;
            
            // Afficher un modal pour ajouter des fonds
            showAddFundsModal(savingName, index);
        });
    });
    
    console.log('✅ Boutons des cagnottes configurés');
}

// Afficher le modal pour ajouter des fonds
function showAddFundsModal(savingName, savingIndex) {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) return;
    
    const user = JSON.parse(loggedInUser);
    
    let modalHTML = `
        <div class="modal fade" id="addFundsModal" tabindex="-1" aria-labelledby="addFundsLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content bg-dark-card border-light">
                    <div class="modal-header border-light">
                        <h5 class="modal-title text-white" id="addFundsLabel">
                            <i class="bi bi-plus-circle me-2"></i>Ajouter des fonds à ${savingName}
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="fundsAmount" class="form-label text-white">Montant à ajouter (FCFA)</label>
                            <input type="number" class="form-control bg-input border-light text-white" id="fundsAmount" placeholder="0" min="0" step="0.01" required>
                        </div>
                        <div class="mb-3">
                            <label for="fundsDescription" class="form-label text-white">Description</label>
                            <input type="text" class="form-control bg-input border-light text-white" id="fundsDescription" placeholder="Raison de l'ajout" required>
                        </div>
                    </div>
                    <div class="modal-footer border-light">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                        <button type="button" class="btn btn-primary-gradient" id="confirmAddFundsBtn">Ajouter les fonds</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Supprimer l'ancien modal s'il existe
    const oldModal = document.getElementById('addFundsModal');
    if (oldModal) {
        oldModal.remove();
    }
    
    // Ajouter le nouveau modal au DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Afficher le modal
    const modal = new bootstrap.Modal(document.getElementById('addFundsModal'));
    modal.show();
    
    // Ajouter l'event listener au bouton de confirmation
    setTimeout(() => {
        const confirmBtn = document.getElementById('confirmAddFundsBtn');
        if (confirmBtn) {
            confirmBtn.addEventListener('click', function() {
                const amount = parseFloat(document.getElementById('fundsAmount').value);
                const description = document.getElementById('fundsDescription').value;
                
                if (!amount || amount <= 0) {
                    alert('Veuillez entrer un montant valide');
                    return;
                }
                
                if (!description) {
                    alert('Veuillez entrer une description');
                    return;
                }
                
                // Créer une transaction d'épargne
                const transaction = {
                    username: user.username,
                    type: 'epargne',
                    category: savingName,
                    description: description,
                    amount: amount,
                    date: new Date().toISOString().split('T')[0],
                    timestamp: new Date().toISOString()
                };
                
                console.log('💾 Enregistrement de la transaction d\'épargne:', transaction);
                
                // Enregistrer dans la base de données
                addTransaction(transaction, function(success) {
                    if (success) {
                        console.log('✅ Fonds ajoutés avec succès');
                        alert('Fonds ajoutés avec succès !');
                        
                        // Fermer le modal
                        modal.hide();
                        
                        // Recharger les transactions
                        loadRecentTransactions(user.username);
                        
                        // Mettre à jour les soldes
                        if (typeof updateAllBalances === 'function') {
                            updateAllBalances(user.username);
                        }
                    } else {
                        console.error('❌ Erreur lors de l\'ajout des fonds');
                        alert('Erreur lors de l\'ajout des fonds');
                    }
                });
            });
        }
    }, 300);
}

// Fonction pour vérifier si la DB est prête
function ensureDatabaseReady(callback) {
    if (typeof db !== 'undefined' && db) {
        callback();
        return;
    }
    
    // Attendre que la DB soit prête
    const checkInterval = setInterval(() => {
        if (typeof db !== 'undefined' && db) {
            clearInterval(checkInterval);
            callback();
        }
    }, 50);
    
    // Timeout après 5 secondes
    setTimeout(() => {
        clearInterval(checkInterval);
        if (typeof db === 'undefined' || !db) {
            console.error('❌ DB n\'a pas pu être initialisée');
        }
    }, 5000);
}
