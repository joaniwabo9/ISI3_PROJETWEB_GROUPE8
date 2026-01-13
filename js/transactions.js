// Gestion des transactions
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔄 Initialisation des transactions...');
    
    const saveTransactionBtn = document.getElementById('saveTransactionBtn');
    const addTransactionForm = document.getElementById('addTransactionForm');
    const transactionDateInput = document.getElementById('transactionDate');
    
    console.log('✅ Éléments trouvés:', {
        saveTransactionBtn: !!saveTransactionBtn,
        addTransactionForm: !!addTransactionForm,
        transactionDateInput: !!transactionDateInput
    });
    
    // Définir la date d'aujourd'hui par défaut
    const today = new Date().toISOString().split('T')[0];
    if (transactionDateInput) {
        transactionDateInput.value = today;
    }
    
    // Enregistrer la transaction
    if (saveTransactionBtn) {
        saveTransactionBtn.addEventListener('click', function() {
            console.log('📝 Tentative d\'enregistrement de la transaction...');
            
            const type = document.getElementById('transactionType').value;
            const category = document.getElementById('transactionCategory').value;
            const description = document.getElementById('transactionDescription').value;
            const amount = parseFloat(document.getElementById('transactionAmount').value);
            const date = document.getElementById('transactionDate').value;
            
            console.log('📋 Données du formulaire:', { type, category, description, amount, date });
            
            // Validation
            if (!type || !category || !description || !amount || !date) {
                console.error('❌ Champs manquants');
                alert('Veuillez remplir tous les champs');
                return;
            }
            
            if (amount <= 0) {
                console.error('❌ Montant invalide');
                alert('Le montant doit être supérieur à 0');
                return;
            }
            
            // Récupérer l'utilisateur connecté
            const loggedInUser = localStorage.getItem('loggedInUser');
            if (!loggedInUser) {
                console.error('❌ Utilisateur non connecté');
                alert('Vous devez être connecté');
                return;
            }
            
            const user = JSON.parse(loggedInUser);
            console.log('👤 Utilisateur:', user.username);
            
            // Vérifier que db est prêt
            if (!db) {
                console.error('❌ Base de données non prête');
                alert('La base de données n\'est pas prête. Veuillez recharger la page.');
                return;
            }
            
            console.log('✅ Base de données prête');
            
            // Créer l'objet transaction
            const transaction = {
                username: user.username,
                type: type,
                category: category,
                description: description,
                amount: amount,
                date: date,
                timestamp: new Date().toISOString()
            };
            
            console.log('💾 Enregistrement de la transaction:', transaction);
            
            // Enregistrer dans la base de données
            addTransaction(transaction, function(success) {
                if (success) {
                    console.log('✅ Transaction enregistrée avec succès');
                    alert('Transaction enregistrée avec succès !');
                    
                    // Réinitialiser le formulaire
                    addTransactionForm.reset();
                    transactionDateInput.value = today;
                    
                    // Mettre à jour les soldes immédiatement
                    console.log('🔄 Mise à jour des soldes...');
                    updateAllBalances(user.username);
                    
                    // Rafraîchir les diagrammes si la fonction existe
                    if (typeof refreshAllCharts === 'function') {
                        console.log('📊 Rafraîchissement des diagrammes...');
                        refreshAllCharts();
                    }
                    
                    // Rafraîchir les données synchronisées si la fonction existe
                    if (typeof refreshUserData === 'function') {
                        console.log('🔄 Rafraîchissement des données utilisateur...');
                        refreshUserData();
                    }
                    
                    // Fermer le modal
                    const modalElement = document.getElementById('addTransactionModal');
                    if (modalElement) {
                        const modal = bootstrap.Modal.getInstance(modalElement);
                        if (modal) {
                            modal.hide();
                        }
                    }
                } else {
                    console.error('❌ Erreur lors de l\'enregistrement');
                    alert('Erreur lors de l\'enregistrement de la transaction');
                }
            });
        });
    }
});

// Mettre à jour tous les soldes
function updateAllBalances(username) {
    console.log('📊 Mise à jour des soldes pour:', username);
    
    getAvailableBalance(username, function(balances) {
        console.log('💰 Soldes calculés:', balances);
        
        // Vérifier que les éléments existent
        console.log('🔍 Recherche des éléments DOM...');
        
        // Mettre à jour la bannière des soldes
        const currentBalanceElement = document.querySelector('[data-balance-current]');
        console.log('✓ data-balance-current trouvé:', !!currentBalanceElement);
        if (currentBalanceElement) {
            const newValue = balances.currentBalance.toLocaleString('fr-FR', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            });
            currentBalanceElement.textContent = newValue;
            console.log('✅ Solde actuel mis à jour:', newValue);
        }
        
        const availableBalanceElement = document.querySelector('[data-balance-available]');
        console.log('✓ data-balance-available trouvé:', !!availableBalanceElement);
        if (availableBalanceElement) {
            const newValue = balances.availableBalance.toLocaleString('fr-FR', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            });
            availableBalanceElement.textContent = newValue;
            console.log('✅ Solde disponible mis à jour:', newValue);
        }
        
        const savingsElement = document.querySelector('[data-balance-savings]');
        console.log('✓ data-balance-savings trouvé:', !!savingsElement);
        if (savingsElement) {
            const newValue = balances.totalSavings.toLocaleString('fr-FR', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            });
            savingsElement.textContent = newValue;
            console.log('✅ Épargne totale mise à jour:', newValue);
        }
        
        // Mettre à jour les cartes de statistiques
        const currentElement = document.querySelector('[data-stat-current]');
        console.log('✓ data-stat-current trouvé:', !!currentElement);
        if (currentElement) {
            currentElement.textContent = balances.currentBalance.toLocaleString('fr-FR', {maximumFractionDigits: 0});
        }
        
        const savingsStatElement = document.querySelector('[data-stat-savings]');
        console.log('✓ data-stat-savings trouvé:', !!savingsStatElement);
        if (savingsStatElement) {
            savingsStatElement.textContent = balances.totalSavings.toLocaleString('fr-FR', {maximumFractionDigits: 0});
        }
        
        const expensesElement = document.querySelector('[data-stat-expenses]');
        console.log('✓ data-stat-expenses trouvé:', !!expensesElement);
        if (expensesElement) {
            expensesElement.textContent = balances.totalExpense.toLocaleString('fr-FR', {maximumFractionDigits: 0});
        }
        
        // Mettre à jour les ratios
        const savingsRatio = balances.totalIncome > 0 ? (balances.totalSavings / balances.totalIncome) * 100 : 0;
        const savingsRatioElement = document.getElementById('savings-ratio');
        if (savingsRatioElement) {
            savingsRatioElement.textContent = savingsRatio.toFixed(1) + '%';
        }
        
        const savingsPercentageElement = document.getElementById('savings-percentage');
        if (savingsPercentageElement) {
            savingsPercentageElement.textContent = savingsRatio.toFixed(0) + '%';
        }
        
        const expenseRatio = balances.totalIncome > 0 ? (balances.totalExpense / balances.totalIncome) * 100 : 0;
        const expenseRatioElement = document.getElementById('expense-ratio');
        if (expenseRatioElement) {
            expenseRatioElement.textContent = expenseRatio.toFixed(1) + '%';
        }
        
        console.log('✅ Tous les soldes ont été mis à jour');
    });
}

// Calculer le solde disponible (argent actuel - épargne)
function getAvailableBalance(username, callback) {
    console.log('🔍 Récupération des transactions pour:', username);
    getTransactions(username, function(transactions) {
        console.log('📋 Transactions trouvées:', transactions.length);
        
        let totalIncome = 0;
        let totalExpense = 0;
        let totalSavings = 0;
        
        transactions.forEach(tx => {
            console.log('📌 Transaction:', tx.type, tx.amount);
            if (tx.type === "revenu" || tx.type === "salaire") {
                totalIncome += tx.amount;
            } else if (tx.type === "epargne") {
                totalSavings += tx.amount;
            } else if (tx.type === "depense") {
                totalExpense += tx.amount;
            }
        });
        
        const currentBalance = totalIncome - totalExpense;
        const availableBalance = currentBalance - totalSavings;
        
        console.log('💰 Calcul final:', {
            totalIncome,
            totalExpense,
            totalSavings,
            currentBalance,
            availableBalance
        });
        
        callback({
            currentBalance: currentBalance,
            availableBalance: availableBalance,
            totalSavings: totalSavings,
            totalIncome: totalIncome,
            totalExpense: totalExpense
        });
    });
}

// Afficher les soldes sur le dashboard
function displayBalances() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        console.log('❌ Aucun utilisateur connecté');
        return;
    }
    
    const user = JSON.parse(loggedInUser);
    
    // Attendre que la DB soit prête
    ensureDatabaseReady(function() {
        console.log('📊 Affichage des soldes pour:', user.username);
        updateAllBalances(user.username);
    });
}

// Afficher les balances au chargement
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔄 DOMContentLoaded - Affichage des soldes');
    displayBalances();
});
