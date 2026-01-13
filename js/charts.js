// Gestion des diagrammes dynamiques
let charts = {
    revenueExpense: null,
    balanceEvolution: null,
    category: null,
    transactionType: null,
    monthlyTrend: null
};

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔄 Initialisation des diagrammes...');
    
    // Attendre que la DB soit prête
    ensureDatabaseReady(function() {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            const user = JSON.parse(loggedInUser);
            loadAllCharts(user.username);
        }
    });
});

// Charger tous les diagrammes
function loadAllCharts(username) {
    console.log('📊 Chargement de tous les diagrammes pour:', username);
    
    getTransactions(username, function(transactions) {
        console.log('📋 Transactions trouvées:', transactions.length);
        
        if (transactions.length === 0) {
            console.log('⚠️ Aucune transaction');
            return;
        }
        
        // Créer tous les diagrammes
        createRevenueExpenseChart(transactions);
        createBalanceEvolutionChart(transactions);
        createCategoryChart(transactions);
        createTransactionTypeChart(transactions);
        createMonthlyTrendChart(transactions);
        
        console.log('✅ Tous les diagrammes créés');
    });
}

// Diagramme Revenus vs Dépenses
function createRevenueExpenseChart(transactions) {
    console.log('📈 Création du diagramme Revenus vs Dépenses...');
    
    const ctx = document.getElementById('revenueExpenseChart');
    if (!ctx) {
        console.error('❌ Canvas revenueExpenseChart non trouvé');
        return;
    }
    
    // Calculer les totaux
    let totalRevenue = 0;
    let totalExpense = 0;
    
    transactions.forEach(tx => {
        if (tx.type === 'revenu' || tx.type === 'salaire') {
            totalRevenue += tx.amount;
        } else if (tx.type === 'depense') {
            totalExpense += tx.amount;
        }
    });
    
    // Détruire le graphique existant
    if (charts.revenueExpense) {
        charts.revenueExpense.destroy();
    }
    
    // Créer le graphique
    charts.revenueExpense = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Revenus', 'Dépenses'],
            datasets: [
                {
                    label: 'Montant (FCFA)',
                    data: [totalRevenue, totalExpense],
                    backgroundColor: [
                        'rgba(52, 211, 153, 0.8)',
                        'rgba(239, 68, 68, 0.8)'
                    ],
                    borderColor: [
                        'rgba(52, 211, 153, 1)',
                        'rgba(239, 68, 68, 1)'
                    ],
                    borderWidth: 2,
                    borderRadius: 8
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#cbd5e1',
                        font: { size: 12 }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#cbd5e1',
                        callback: function(value) {
                            return value.toLocaleString('fr-FR') + ' FCFA';
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#cbd5e1'
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
    
    console.log('✅ Diagramme Revenus vs Dépenses créé');
}

// Diagramme Évolution du Solde
function createBalanceEvolutionChart(transactions) {
    console.log('📈 Création du diagramme Évolution du Solde...');
    
    const ctx = document.getElementById('balanceEvolutionChart');
    if (!ctx) {
        console.error('❌ Canvas balanceEvolutionChart non trouvé');
        return;
    }
    
    // Trier les transactions par date
    const sortedTransactions = [...transactions].sort((a, b) => 
        new Date(a.date) - new Date(b.date)
    );
    
    // Calculer l'évolution du solde
    let balance = 0;
    const dates = [];
    const balances = [];
    
    sortedTransactions.forEach(tx => {
        const date = new Date(tx.date);
        const dateStr = date.toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' });
        
        if (tx.type === 'revenu' || tx.type === 'salaire') {
            balance += tx.amount;
        } else if (tx.type === 'depense') {
            balance -= tx.amount;
        }
        
        dates.push(dateStr);
        balances.push(balance);
    });
    
    // Détruire le graphique existant
    if (charts.balanceEvolution) {
        charts.balanceEvolution.destroy();
    }
    
    // Créer le graphique
    charts.balanceEvolution = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [
                {
                    label: 'Solde (FCFA)',
                    data: balances,
                    borderColor: 'rgba(59, 130, 246, 1)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointBackgroundColor: 'rgba(59, 130, 246, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#cbd5e1',
                        font: { size: 12 }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#cbd5e1',
                        callback: function(value) {
                            return value.toLocaleString('fr-FR') + ' FCFA';
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#cbd5e1'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });
    
    console.log('✅ Diagramme Évolution du Solde créé');
}

// Diagramme Répartition par Catégorie
function createCategoryChart(transactions) {
    console.log('📈 Création du diagramme Répartition par Catégorie...');
    
    const ctx = document.getElementById('categoryChart');
    if (!ctx) {
        console.error('❌ Canvas categoryChart non trouvé');
        return;
    }
    
    // Compter les transactions par catégorie
    const categories = {};
    transactions.forEach(tx => {
        if (!categories[tx.category]) {
            categories[tx.category] = 0;
        }
        categories[tx.category] += tx.amount;
    });
    
    const labels = Object.keys(categories);
    const data = Object.values(categories);
    
    // Couleurs
    const colors = [
        'rgba(59, 130, 246, 0.8)',
        'rgba(52, 211, 153, 0.8)',
        'rgba(249, 115, 22, 0.8)',
        'rgba(168, 85, 247, 0.8)',
        'rgba(236, 72, 153, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(14, 165, 233, 0.8)',
        'rgba(251, 146, 60, 0.8)',
        'rgba(139, 92, 246, 0.8)'
    ];
    
    // Détruire le graphique existant
    if (charts.category) {
        charts.category.destroy();
    }
    
    // Créer le graphique
    charts.category = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [
                {
                    data: data,
                    backgroundColor: colors.slice(0, labels.length),
                    borderColor: '#0f172a',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#cbd5e1',
                        font: { size: 11 },
                        padding: 15
                    }
                }
            }
        }
    });
    
    console.log('✅ Diagramme Répartition par Catégorie créé');
}

// Diagramme Types de Transactions
function createTransactionTypeChart(transactions) {
    console.log('📈 Création du diagramme Types de Transactions...');
    
    const ctx = document.getElementById('transactionTypeChart');
    if (!ctx) {
        console.error('❌ Canvas transactionTypeChart non trouvé');
        return;
    }
    
    // Compter les transactions par type
    const types = {
        'Revenu': 0,
        'Salaire': 0,
        'Épargne': 0,
        'Dépense': 0
    };
    
    transactions.forEach(tx => {
        if (tx.type === 'revenu') types['Revenu'] += tx.amount;
        else if (tx.type === 'salaire') types['Salaire'] += tx.amount;
        else if (tx.type === 'epargne') types['Épargne'] += tx.amount;
        else if (tx.type === 'depense') types['Dépense'] += tx.amount;
    });
    
    const labels = Object.keys(types).filter(key => types[key] > 0);
    const data = labels.map(key => types[key]);
    
    // Détruire le graphique existant
    if (charts.transactionType) {
        charts.transactionType.destroy();
    }
    
    // Créer le graphique
    charts.transactionType = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Montant (FCFA)',
                    data: data,
                    borderColor: 'rgba(59, 130, 246, 1)',
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    borderWidth: 2,
                    pointRadius: 5,
                    pointBackgroundColor: 'rgba(59, 130, 246, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#cbd5e1',
                        font: { size: 12 }
                    }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    ticks: {
                        color: '#cbd5e1',
                        callback: function(value) {
                            return value.toLocaleString('fr-FR');
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });
    
    console.log('✅ Diagramme Types de Transactions créé');
}

// Diagramme Tendance Mensuelle
function createMonthlyTrendChart(transactions) {
    console.log('📈 Création du diagramme Tendance Mensuelle...');
    
    const ctx = document.getElementById('monthlyTrendChart');
    if (!ctx) {
        console.error('❌ Canvas monthlyTrendChart non trouvé');
        return;
    }
    
    // Grouper par mois
    const monthlyData = {};
    
    transactions.forEach(tx => {
        const date = new Date(tx.date);
        const monthKey = date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' });
        
        if (!monthlyData[monthKey]) {
            monthlyData[monthKey] = {
                revenue: 0,
                expense: 0
            };
        }
        
        if (tx.type === 'revenu' || tx.type === 'salaire') {
            monthlyData[monthKey].revenue += tx.amount;
        } else if (tx.type === 'depense') {
            monthlyData[monthKey].expense += tx.amount;
        }
    });
    
    const months = Object.keys(monthlyData);
    const revenues = months.map(m => monthlyData[m].revenue);
    const expenses = months.map(m => monthlyData[m].expense);
    
    // Détruire le graphique existant
    if (charts.monthlyTrend) {
        charts.monthlyTrend.destroy();
    }
    
    // Créer le graphique
    charts.monthlyTrend = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Revenus',
                    data: revenues,
                    borderColor: 'rgba(52, 211, 153, 1)',
                    backgroundColor: 'rgba(52, 211, 153, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointBackgroundColor: 'rgba(52, 211, 153, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                },
                {
                    label: 'Dépenses',
                    data: expenses,
                    borderColor: 'rgba(239, 68, 68, 1)',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointBackgroundColor: 'rgba(239, 68, 68, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#cbd5e1',
                        font: { size: 12 }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#cbd5e1',
                        callback: function(value) {
                            return value.toLocaleString('fr-FR') + ' FCFA';
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#cbd5e1'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });
    
    console.log('✅ Diagramme Tendance Mensuelle créé');
}

// Fonction pour rafraîchir les diagrammes (appelée après une nouvelle transaction)
function refreshAllCharts() {
    console.log('🔄 Rafraîchissement des diagrammes...');
    
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        const user = JSON.parse(loggedInUser);
        loadAllCharts(user.username);
    }
}
