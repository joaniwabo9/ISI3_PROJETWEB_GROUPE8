// Synchronisation des données utilisateur et statistiques sur toutes les pages
// Ce fichier centralise l'affichage des informations communes

/**
 * Mettre à jour les informations utilisateur sur la page
 * Affiche: Nom d'utilisateur, Soldes, Nombre de transactions
 */
function syncUserData() {
    console.log('🔄 Synchronisation des données utilisateur...');
    
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        console.error('❌ Aucun utilisateur connecté');
        return;
    }
    
    try {
        const user = JSON.parse(loggedInUser);
        console.log('👤 Utilisateur:', user.username);
        
        // Mettre à jour le nom d'utilisateur partout
        updateUserNameDisplay(user);
        
        // Attendre que la DB soit prête
        ensureDatabaseReady(function() {
            // Charger les statistiques
            loadUserStatistics(user.username);
        });
    } catch (e) {
        console.error('❌ Erreur lors de la lecture de l\'utilisateur:', e);
    }
}

/**
 * Mettre à jour l'affichage du nom d'utilisateur
 */
function updateUserNameDisplay(user) {
    console.log('📝 Mise à jour du nom d\'utilisateur...');
    
    const userName = user.prenom || user.username || 'Utilisateur';
    
    // Mettre à jour tous les éléments avec data-user-name
    document.querySelectorAll('[data-user-name]').forEach(el => {
        el.textContent = userName;
    });
    
    // Mettre à jour les spans dans les headers
    document.querySelectorAll('.welcome-card span, .welcome-banner h2 span, .header-card span').forEach(el => {
        if (el.textContent === 'Daniella' || el.textContent === 'Utilisateur' || el.textContent === '') {
            el.textContent = userName;
        }
    });
    
    // Mettre à jour les h2 et h4 avec le nom
    document.querySelectorAll('.welcome-card h4, .welcome-banner h2, .header-card h4').forEach(el => {
        if (el.textContent.includes('Bonjour')) {
            el.innerHTML = `Bonjour, <span>${userName}</span>`;
        }
    });
    
    console.log('✅ Nom d\'utilisateur mis à jour:', userName);
}

/**
 * Charger et afficher les statistiques utilisateur
 */
function loadUserStatistics(username) {
    console.log('📊 Chargement des statistiques pour:', username);
    
    // Charger les transactions
    getTransactions(username, function(transactions) {
        console.log('📋 Transactions trouvées:', transactions.length);
        
        // Calculer les statistiques
        let totalIncome = 0;
        let totalExpense = 0;
        let totalSavings = 0;
        
        transactions.forEach(tx => {
            if (tx.type === 'revenu' || tx.type === 'salaire') {
                totalIncome += tx.amount;
            } else if (tx.type === 'depense') {
                totalExpense += tx.amount;
            } else if (tx.type === 'epargne') {
                totalSavings += tx.amount;
            }
        });
        
        // Charger aussi les business pour calculer les budgets
        getBusinesses(username, function(businesses) {
            let totalBusinessBudget = 0;
            
            businesses.forEach(business => {
                totalBusinessBudget += business.budget || 0;
            });
            
            // Solde actuel = Revenus - Dépenses
            const currentBalance = totalIncome - totalExpense;
            
            // Solde disponible = Solde actuel - Épargnes - Budgets des business
            const availableBalance = currentBalance - totalSavings - totalBusinessBudget;
            
            // Créer l'objet statistiques
            const stats = {
                transactionCount: transactions.length,
                totalIncome: totalIncome,
                totalExpense: totalExpense,
                totalSavings: totalSavings,
                totalBusinessBudget: totalBusinessBudget,
                currentBalance: currentBalance,
                availableBalance: availableBalance
            };
            
            console.log('💰 Statistiques calculées:', stats);
            
            // Afficher les statistiques partout
            displayStatistics(stats);
        });
    });
}

/**
 * Afficher les statistiques sur la page
 */
function displayStatistics(stats) {
    console.log('🎨 Affichage des statistiques...');
    
    // Mettre à jour les soldes
    updateBalanceDisplay(stats);
    
    // Mettre à jour le nombre de transactions
    updateTransactionCountDisplay(stats.transactionCount);
    
    // Mettre à jour les cartes de statistiques
    updateStatisticsCards(stats);
    
    console.log('✅ Statistiques affichées');
}

/**
 * Mettre à jour l'affichage des soldes
 */
function updateBalanceDisplay(stats) {
    console.log('💰 Mise à jour des soldes...');
    
    // Bannière des soldes
    const currentBalanceEl = document.querySelector('[data-balance-current]');
    if (currentBalanceEl) {
        currentBalanceEl.textContent = stats.currentBalance.toLocaleString('fr-FR', {maximumFractionDigits: 0});
    }
    
    const availableBalanceEl = document.querySelector('[data-balance-available]');
    if (availableBalanceEl) {
        availableBalanceEl.textContent = stats.availableBalance.toLocaleString('fr-FR', {maximumFractionDigits: 0});
    }
    
    const savingsEl = document.querySelector('[data-balance-savings]');
    if (savingsEl) {
        savingsEl.textContent = stats.totalSavings.toLocaleString('fr-FR', {maximumFractionDigits: 0});
    }
    
    // Cartes de statistiques
    const currentStatEl = document.querySelector('[data-stat-current]');
    if (currentStatEl) {
        currentStatEl.textContent = stats.currentBalance.toLocaleString('fr-FR', {maximumFractionDigits: 0});
    }
    
    const savingsStatEl = document.querySelector('[data-stat-savings]');
    if (savingsStatEl) {
        savingsStatEl.textContent = stats.totalSavings.toLocaleString('fr-FR', {maximumFractionDigits: 0});
    }
    
    const expensesEl = document.querySelector('[data-stat-expenses]');
    if (expensesEl) {
        expensesEl.textContent = stats.totalExpense.toLocaleString('fr-FR', {maximumFractionDigits: 0});
    }
    
    // Historique
    const incomeCard = document.querySelector('[data-stat-income]');
    if (incomeCard) {
        incomeCard.innerHTML = `${stats.totalIncome.toLocaleString('fr-FR', {maximumFractionDigits: 0})} <span>FCFA</span>`;
    }
    
    const expenseCard = document.querySelector('[data-stat-expense]');
    if (expenseCard) {
        expenseCard.innerHTML = `${stats.totalExpense.toLocaleString('fr-FR', {maximumFractionDigits: 0})} <span>FCFA</span>`;
    }
    
    const balanceCard = document.querySelector('[data-stat-balance]');
    if (balanceCard) {
        const sign = stats.currentBalance >= 0 ? '+' : '';
        balanceCard.innerHTML = `${sign}${stats.currentBalance.toLocaleString('fr-FR', {maximumFractionDigits: 0})} <span>FCFA</span>`;
    }
    
    console.log('✅ Soldes mis à jour');
}

/**
 * Mettre à jour l'affichage du nombre de transactions
 */
function updateTransactionCountDisplay(count) {
    console.log('📊 Mise à jour du nombre de transactions:', count);
    
    // Cartes de statistiques
    const countCard = document.querySelector('[data-stat-count]');
    if (countCard) {
        countCard.textContent = count;
    }
    
    // Section titre
    const countElement = document.querySelector('.section-title + small');
    if (countElement) {
        countElement.textContent = `${count} transaction${count > 1 ? 's' : ''}`;
    }
    
    // Header
    const headerSmall = document.querySelector('.d-flex.justify-content-between.align-items-center.mb-4 small');
    if (headerSmall) {
        headerSmall.textContent = `${count} transaction${count > 1 ? 's' : ''}`;
    }
    
    console.log('✅ Nombre de transactions mis à jour');
}

/**
 * Mettre à jour les cartes de statistiques
 */
function updateStatisticsCards(stats) {
    console.log('🎨 Mise à jour des cartes de statistiques...');
    
    // Calculer les ratios
    const savingsRatio = stats.totalIncome > 0 ? (stats.totalSavings / stats.totalIncome) * 100 : 0;
    const expenseRatio = stats.totalIncome > 0 ? (stats.totalExpense / stats.totalIncome) * 100 : 0;
    
    // Mettre à jour les ratios
    const savingsRatioEl = document.getElementById('savings-ratio');
    if (savingsRatioEl) {
        savingsRatioEl.textContent = savingsRatio.toFixed(1) + '%';
    }
    
    const savingsPercentageEl = document.getElementById('savings-percentage');
    if (savingsPercentageEl) {
        savingsPercentageEl.textContent = savingsRatio.toFixed(0) + '%';
    }
    
    const expenseRatioEl = document.getElementById('expense-ratio');
    if (expenseRatioEl) {
        expenseRatioEl.textContent = expenseRatio.toFixed(1) + '%';
    }
    
    console.log('✅ Cartes de statistiques mises à jour');
}

/**
 * Initialiser la synchronisation au chargement de la page
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔄 Initialisation de la synchronisation des données...');
    syncUserData();
});

/**
 * Rafraîchir les données quand une nouvelle transaction est ajoutée
 */
function refreshUserData() {
    console.log('🔄 Rafraîchissement des données utilisateur...');
    syncUserData();
}
