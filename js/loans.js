// Gestion des prêts
console.log('🔄 Initialisation de la gestion des prêts...');

// Types de prêts disponibles
const LOAN_TYPES = {
    'auto': { name: 'Prêt Automobile', icon: 'bi-car-front', color: 'info' },
    'etudiant': { name: 'Prêt Étudiant', icon: 'bi-book', color: 'info' },
    'immobilier': { name: 'Prêt immobilier', icon: 'bi-house-door', color: 'info' }
};

/**
 * Initialiser les boutons de paiement des prêts
 */
function initLoanPaymentButtons() {
    console.log('🔧 Initialisation des boutons de paiement des prêts...');
    
    const addBtns = document.querySelectorAll('.add-btn');
    
    addBtns.forEach((btn, index) => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('💳 Bouton paiement prêt cliqué - Prêt', index + 1);
            
            // Récupérer la carte de prêt
            const loanCard = this.closest('.loan-card');
            if (!loanCard) return;
            
            // Récupérer le titre du prêt
            const loanTitle = loanCard.querySelector('h5').textContent;
            
            // Ouvrir le formulaire de paiement
            showLoanPaymentModal(loanTitle, index);
        });
    });
}

/**
 * Afficher le modal de paiement de prêt
 */
function showLoanPaymentModal(loanTitle, loanIndex) {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        alert('Vous devez être connecté');
        return;
    }
    
    const user = JSON.parse(loggedInUser);
    
    let modalHTML = `
        <div class="modal fade" id="loanPaymentModal" tabindex="-1" aria-labelledby="loanPaymentLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content bg-dark-card border-light">
                    <div class="modal-header border-light bg-gradient-header">
                        <div class="d-flex align-items-center">
                            <div class="modal-icon-wrapper">
                                <i class="bi bi-credit-card"></i>
                            </div>
                            <div class="ms-3">
                                <h5 class="modal-title text-white mb-0" id="loanPaymentLabel">Paiement de Prêt</h5>
                                <small class="text-muted">${loanTitle}</small>
                            </div>
                        </div>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="loanPaymentForm">
                            <!-- Montant à payer -->
                            <div class="mb-4">
                                <label for="loanAmount" class="form-label text-white fw-600">
                                    <i class="bi bi-cash-coin me-2 text-success"></i>Montant à payer (FCFA)
                                </label>
                                <input type="number" class="form-control form-control-lg bg-input border-light text-white" id="loanAmount" placeholder="0" min="0" step="100" required>
                                <small class="text-muted d-block mt-2">Montant de la mensualité ou du paiement</small>
                            </div>

                            <!-- Date d'échéance -->
                            <div class="mb-4">
                                <label for="loanDueDate" class="form-label text-white fw-600">
                                    <i class="bi bi-calendar-event me-2 text-warning"></i>Date d'échéance
                                </label>
                                <input type="date" class="form-control form-control-lg bg-input border-light text-white" id="loanDueDate" required>
                                <small class="text-muted d-block mt-2">Date limite de paiement</small>
                            </div>

                            <!-- Description -->
                            <div class="mb-4">
                                <label for="loanDescription" class="form-label text-white fw-600">
                                    <i class="bi bi-file-text me-2 text-info"></i>Description
                                </label>
                                <textarea class="form-control form-control-lg bg-input border-light text-white" id="loanDescription" placeholder="Ex: Mensualité du prêt automobile" rows="3"></textarea>
                                <small class="text-muted d-block mt-2">Détails du paiement</small>
                            </div>

                            <!-- Montant total du prêt -->
                            <div class="mb-4">
                                <label for="loanTotal" class="form-label text-white fw-600">
                                    <i class="bi bi-calculator me-2 text-primary"></i>Montant total du prêt (FCFA)
                                </label>
                                <input type="number" class="form-control form-control-lg bg-input border-light text-white" id="loanTotal" placeholder="0" min="0" step="100" required>
                                <small class="text-muted d-block mt-2">Montant initial du prêt</small>
                            </div>

                            <!-- Montant déjà remboursé -->
                            <div class="mb-4">
                                <label for="loanAlreadyPaid" class="form-label text-white fw-600">
                                    <i class="bi bi-check-circle me-2 text-success"></i>Montant déjà remboursé (FCFA)
                                </label>
                                <input type="number" class="form-control form-control-lg bg-input border-light text-white" id="loanAlreadyPaid" placeholder="0" min="0" step="100" value="0">
                                <small class="text-muted d-block mt-2">Montant payé jusqu'à présent</small>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer border-light bg-light-footer">
                        <button type="button" class="btn btn-secondary btn-lg" data-bs-dismiss="modal">
                            <i class="bi bi-x-circle me-2"></i>Annuler
                        </button>
                        <button type="button" class="btn btn-primary-gradient btn-lg" id="saveLoanPaymentBtn">
                            <i class="bi bi-check-circle me-2"></i>Enregistrer le paiement
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Supprimer l'ancien modal s'il existe
    const oldModal = document.getElementById('loanPaymentModal');
    if (oldModal) {
        oldModal.remove();
    }
    
    // Ajouter le nouveau modal au DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Afficher le modal
    const modal = new bootstrap.Modal(document.getElementById('loanPaymentModal'));
    modal.show();
    
    // Ajouter l'event listener au bouton de sauvegarde
    setTimeout(() => {
        const saveBtn = document.getElementById('saveLoanPaymentBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', function() {
                const amount = parseFloat(document.getElementById('loanAmount').value);
                const dueDate = document.getElementById('loanDueDate').value;
                const description = document.getElementById('loanDescription').value;
                const totalLoan = parseFloat(document.getElementById('loanTotal').value);
                const alreadyPaid = parseFloat(document.getElementById('loanAlreadyPaid').value);
                
                if (!amount || !dueDate || !totalLoan) {
                    alert('Veuillez remplir tous les champs obligatoires');
                    return;
                }
                
                if (amount <= 0 || totalLoan <= 0) {
                    alert('Les montants doivent être positifs');
                    return;
                }
                
                // Créer une transaction pour le paiement du prêt
                const transaction = {
                    type: 'depense',
                    category: 'prêt',
                    description: description || `Paiement de ${loanTitle}`,
                    amount: amount,
                    date: dueDate,
                    username: user.username,
                    createdAt: new Date().toISOString(),
                    loanInfo: {
                        loanTitle: loanTitle,
                        totalLoan: totalLoan,
                        alreadyPaid: alreadyPaid,
                        newPayment: amount,
                        totalPaid: alreadyPaid + amount,
                        remaining: totalLoan - (alreadyPaid + amount)
                    }
                };
                
                console.log('💾 Enregistrement du paiement de prêt:', transaction);
                
                // Ajouter la transaction
                addTransaction(transaction, function(success) {
                    if (success) {
                        console.log('✅ Paiement de prêt enregistré');
                        alert('Paiement de prêt enregistré avec succès!');
                        modal.hide();
                        
                        // Rafraîchir les données
                        setTimeout(() => {
                            location.reload();
                        }, 500);
                    } else {
                        alert('Erreur lors de l\'enregistrement du paiement');
                    }
                });
            });
        }
    }, 300);
}

/**
 * Charger et afficher les informations des prêts
 */
function loadLoansInfo() {
    console.log('📊 Chargement des informations des prêts...');
    
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) return;
    
    const user = JSON.parse(loggedInUser);
    
    // Charger les transactions pour calculer les paiements de prêts
    getTransactions(user.username, function(transactions) {
        console.log('📋 Transactions trouvées:', transactions.length);
        
        // Filtrer les transactions de prêts
        const loanTransactions = transactions.filter(tx => tx.category === 'prêt');
        console.log('💳 Transactions de prêts:', loanTransactions.length);
        
        // Grouper par type de prêt
        const loansByType = {
            'auto': { paid: 0, total: 0, transactions: [] },
            'etudiant': { paid: 0, total: 0, transactions: [] },
            'immobilier': { paid: 0, total: 0, transactions: [] }
        };
        
        loanTransactions.forEach(tx => {
            if (tx.loanInfo) {
                const loanTitle = tx.loanInfo.loanTitle.toLowerCase();
                let loanType = 'auto';
                
                if (loanTitle.includes('étudiant')) {
                    loanType = 'etudiant';
                } else if (loanTitle.includes('immobilier')) {
                    loanType = 'immobilier';
                }
                
                if (!loansByType[loanType]) {
                    loansByType[loanType] = { paid: 0, total: 0, transactions: [] };
                }
                
                loansByType[loanType].paid = tx.loanInfo.totalPaid || 0;
                loansByType[loanType].total = tx.loanInfo.totalLoan || 0;
                loansByType[loanType].transactions.push(tx);
            }
        });
        
        // Mettre à jour l'affichage des prêts
        updateLoansDisplay(loansByType);
    });
}

/**
 * Mettre à jour l'affichage des prêts
 */
function updateLoansDisplay(loansByType) {
    console.log('🎨 Mise à jour de l\'affichage des prêts...');
    
    const loanCards = document.querySelectorAll('.loan-card');
    
    loanCards.forEach((card, index) => {
        const loanType = Object.keys(loansByType)[index];
        if (!loanType) return;
        
        const loanData = loansByType[loanType];
        const totalLoan = loanData.total || 0;
        const paidAmount = loanData.paid || 0;
        const remainingAmount = totalLoan - paidAmount;
        const percentage = totalLoan > 0 ? (paidAmount / totalLoan) * 100 : 0;
        
        // Mettre à jour le montant remboursé
        const amountElements = card.querySelectorAll('h5.text-info');
        if (amountElements[0]) {
            amountElements[0].textContent = paidAmount.toLocaleString('fr-FR', {maximumFractionDigits: 0}) + ' FCFA';
        }
        
        // Mettre à jour le montant total
        const totalElements = card.querySelectorAll('h6');
        if (totalElements[1]) {
            totalElements[1].textContent = 'sur ' + totalLoan.toLocaleString('fr-FR', {maximumFractionDigits: 0}) + ' FCFA';
        }
        
        // Mettre à jour la barre de progression
        const progressBar = card.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.style.width = percentage + '%';
            progressBar.textContent = Math.round(percentage) + '%';
        }
        
        // Mettre à jour le pourcentage remboursé
        const percentageElements = card.querySelectorAll('.text-success');
        if (percentageElements[1]) {
            percentageElements[1].textContent = 'Remboursé : ' + Math.round(percentage) + '%';
        }
        
        // Mettre à jour le montant restant
        const remainingElements = card.querySelectorAll('.text-warning');
        if (remainingElements[0]) {
            remainingElements[0].textContent = remainingAmount.toLocaleString('fr-FR', {maximumFractionDigits: 0}) + ' FCFA';
        }
        
        // Mettre à jour la mensualité (dernière transaction)
        if (loanData.transactions.length > 0) {
            const lastTransaction = loanData.transactions[loanData.transactions.length - 1];
            const monthlyElements = card.querySelectorAll('h6');
            if (monthlyElements[3]) {
                monthlyElements[3].textContent = lastTransaction.amount.toLocaleString('fr-FR', {maximumFractionDigits: 0}) + ' FCFA';
            }
        }
        
        console.log(`✅ Prêt ${loanType} mis à jour: ${paidAmount}/${totalLoan} FCFA (${Math.round(percentage)}%)`);
    });
}

/**
 * Initialiser au chargement du DOM
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM chargé, initialisation des prêts');
    
    // Attendre que la DB soit prête
    ensureDatabaseReady(function() {
        initLoanPaymentButtons();
        loadLoansInfo();
    });
});
