


// Données simulées pour la démonstration
const financialData = {
    revenus: [
        { date: '2026-01-01', montant: 150000, categorie: 'Salaire' },
        { date: '2026-01-05', montant: 75000, categorie: 'Freelance' },
        { date: '2026-01-10', montant: 25000, categorie: 'Investissement' },
        { date: '2026-01-15', montant: 50000, categorie: 'Business' }
    ],
    depenses: [
        { date: '2026-01-02', montant: 45000, categorie: 'Logement' },
        { date: '2026-01-03', montant: 15000, categorie: 'Transport' },
        { date: '2026-01-04', montant: 25000, categorie: 'Alimentation' },
        { date: '2026-01-06', montant: 8000, categorie: 'Loisirs' },
        { date: '2026-01-08', montant: 12000, categorie: 'Santé' },
        { date: '2026-01-12', montant: 35000, categorie: 'Shopping' }
    ]
};

// Classe principale de l'IA Financière
class FinancialAI {
    constructor() {
        this.data = financialData;
        this.conversationHistory = [];
        this.userProfile = {
            name: 'Daniella',
            totalRevenus: this.data.revenus.reduce((sum, r) => sum + r.montant, 0),
            totalDepenses: this.data.depenses.reduce((sum, d) => sum + d.montant, 0)
        };
        this.userProfile.soldeActuel = this.userProfile.totalRevenus - this.userProfile.totalDepenses;
        this.userProfile.tauxEpargne = ((this.userProfile.soldeActuel / this.userProfile.totalRevenus) * 100).toFixed(1);
    }

    // Analyser les dépenses par catégorie
    analyzeExpenses() {
        const categories = {};
        let totalDepenses = 0;

        this.data.depenses.forEach(depense => {
            if (!categories[depense.categorie]) {
                categories[depense.categorie] = 0;
            }
            categories[depense.categorie] += depense.montant;
            totalDepenses += depense.montant;
        });

        const analysis = Object.entries(categories).map(([categorie, montant]) => ({
            categorie,
            montant,
            pourcentage: ((montant / totalDepenses) * 100).toFixed(1)
        })).sort((a, b) => b.montant - a.montant);

        return analysis;
    }

    // Détecter les surconsommations
    detectOverspending() {
        const analysis = this.analyzeExpenses();
        const alerts = [];

        analysis.forEach(item => {
            if (item.pourcentage > 30) {
                alerts.push({
                    type: 'danger',
                    categorie: item.categorie,
                    pourcentage: item.pourcentage,
                    montant: item.montant,
                    message: `Attention ! Vous dépensez ${item.pourcentage}% de votre budget en ${item.categorie}`,
                    recommendation: this.getRecommendation(item.categorie)
                });
            } else if (item.pourcentage > 20) {
                alerts.push({
                    type: 'warning',
                    categorie: item.categorie,
                    pourcentage: item.pourcentage,
                    montant: item.montant,
                    message: `${item.categorie} représente ${item.pourcentage}% de vos dépenses`,
                    recommendation: `Surveillez vos dépenses en ${item.categorie}`
                });
            }
        });

        return alerts;
    }

    // Obtenir des recommandations personnalisées
    getRecommendation(categorie) {
        const recommendations = {
            'Transport': 'Considérez le covoiturage, les transports en commun ou le vélo pour réduire ces coûts',
            'Alimentation': 'Planifiez vos repas à l\'avance et cuisinez plus à la maison',
            'Loisirs': 'Recherchez des activités gratuites ou moins chères dans votre région',
            'Shopping': 'Établissez une liste avant d\'acheter et évitez les achats impulsifs',
            'Logement': 'Optimisez votre consommation énergétique et négociez vos factures',
            'Santé': 'Vérifiez votre couverture d\'assurance santé pour optimiser vos remboursements'
        };
        return recommendations[categorie] || 'Surveillez cette catégorie de dépenses et définissez un budget mensuel';
    }

    // Calculer les suggestions d'épargne
    calculateSavingsRecommendations() {
        const tauxEpargneActuel = parseFloat(this.userProfile.tauxEpargne);
        const recommendations = [];

        if (tauxEpargneActuel < 10) {
            recommendations.push({
                type: 'urgent',
                title: 'Épargne d\'urgence nécessaire',
                message: `Votre taux d'épargne actuel de ${tauxEpargneActuel}% est critique`,
                suggestion: 'Visez au minimum 10% de vos revenus en épargne d\'urgence',
                montant: Math.round(this.userProfile.totalRevenus * 0.1),
                priority: 'high'
            });
        } else if (tauxEpargneActuel < 20) {
            recommendations.push({
                type: 'improvement',
                title: 'Optimisation possible',
                message: `Bon début avec ${tauxEpargneActuel}% d'épargne`,
                suggestion: 'Essayez d\'atteindre 20% pour une meilleure sécurité financière',
                montant: Math.round(this.userProfile.totalRevenus * 0.2),
                priority: 'medium'
            });
        } else {
            recommendations.push({
                type: 'excellent',
                title: 'Excellent travail !',
                message: `Votre taux d'épargne de ${tauxEpargneActuel}% est exemplaire`,
                suggestion: 'Continuez ainsi et envisagez des investissements diversifiés',
                montant: Math.round(this.userProfile.totalRevenus * 0.25),
                priority: 'low'
            });
        }

        return recommendations;
    }

    // Générer des idées de business selon le budget
    generateBusinessIdeas(budget) {
        const ideas = [
            {
                title: 'E-commerce de produits locaux',
                investment: 'Faible',
                minBudget: 50000,
                description: 'Vendez des produits artisanaux locaux en ligne via les réseaux sociaux',
                roi: '15-25%',
                timeframe: '3-6 mois',
                difficulty: 'Facile',
                details: 'Commencez avec Facebook et Instagram, puis créez votre site web'
            },
            {
                title: 'Service de livraison à domicile',
                investment: 'Moyen',
                minBudget: 150000,
                description: 'Service de livraison pour restaurants et commerces locaux',
                roi: '20-35%',
                timeframe: '2-4 mois',
                difficulty: 'Moyen',
                details: 'Nécessite un véhicule et des partenariats avec les commerçants'
            },
            {
                title: 'Formation en ligne',
                investment: 'Faible',
                minBudget: 25000,
                description: 'Créez et vendez des cours en ligne dans votre domaine d\'expertise',
                roi: '30-50%',
                timeframe: '1-3 mois',
                difficulty: 'Facile',
                details: 'Utilisez des plateformes comme Udemy ou créez votre propre contenu'
            },
            {
                title: 'Élevage de volailles',
                investment: 'Élevé',
                minBudget: 500000,
                description: 'Élevage de poulets ou autres volailles pour la vente',
                roi: '25-40%',
                timeframe: '6-12 mois',
                difficulty: 'Difficile',
                details: 'Nécessite un terrain, des installations et des connaissances techniques'
            },
            {
                title: 'Salon de coiffure mobile',
                investment: 'Moyen',
                minBudget: 200000,
                description: 'Services de coiffure à domicile pour particuliers',
                roi: '20-30%',
                timeframe: '1-2 mois',
                difficulty: 'Moyen',
                details: 'Équipement professionnel et clientèle à développer'
            },
            {
                title: 'Vente de produits cosmétiques',
                investment: 'Faible',
                minBudget: 75000,
                description: 'Distribution de produits de beauté et cosmétiques',
                roi: '18-28%',
                timeframe: '2-4 mois',
                difficulty: 'Facile',
                details: 'Partenariat avec des marques ou création de vos propres produits'
            }
        ];

        return ideas.filter(idea => idea.minBudget <= budget);
    }

    // Traiter les messages du chat IA avec conversation naturelle
    processAIMessage(message) {
        const lowerMessage = message.toLowerCase();
        this.conversationHistory.push({ type: 'user', message: message, timestamp: new Date() });
        
        let response = '';
        
        // Salutations et politesse
        if (lowerMessage.includes('bonjour') || lowerMessage.includes('salut') || lowerMessage.includes('hello')) {
            response = `Bonjour ${this.userProfile.name} ! 😊 Ravi de vous revoir. Comment puis-je vous aider avec vos finances aujourd'hui ?`;
        }
        else if (lowerMessage.includes('merci') || lowerMessage.includes('remercie')) {
            response = `De rien ${this.userProfile.name} ! 😊 Je suis là pour vous aider. Avez-vous d'autres questions sur vos finances ?`;
        }
        else if (lowerMessage.includes('au revoir') || lowerMessage.includes('bye')) {
            response = `Au revoir ${this.userProfile.name} ! 👋 N'hésitez pas à revenir si vous avez des questions financières. Bonne journée !`;
        }
        
        // Questions sur les dépenses
        else if (lowerMessage.includes('dépense') || lowerMessage.includes('analyse') || lowerMessage.includes('catégorie')) {
            const analysis = this.analyzeExpenses();
            const topCategories = analysis.slice(0, 3);
            const overspending = this.detectOverspending();
            
            response = `📊 **Analyse de vos dépenses :**\n\n`;
            response += `Vos principales catégories de dépenses sont :\n`;
            topCategories.forEach((cat, index) => {
                response += `${index + 1}. **${cat.categorie}** : ${cat.montant.toLocaleString()} FCFA (${cat.pourcentage}%)\n`;
            });
            
            if (overspending.length > 0) {
                response += `\n⚠️ **Points d'attention :**\n`;
                overspending.forEach(alert => {
                    response += `• ${alert.message}\n`;
                    response += `  💡 *Conseil : ${alert.recommendation}*\n`;
                });
            } else {
                response += `\n✅ Excellente répartition ! Vos dépenses sont bien équilibrées.`;
            }
            
            response += `\n\nSouhaitez-vous des conseils spécifiques pour une catégorie ?`;
        }
        
        // Questions sur l'épargne
        else if (lowerMessage.includes('épargne') || lowerMessage.includes('économie') || lowerMessage.includes('épargner')) {
            const recommendations = this.calculateSavingsRecommendations();
            const rec = recommendations[0];
            
            response = `💰 **Analyse de votre épargne :**\n\n`;
            response += `Actuellement, vous épargnez **${this.userProfile.tauxEpargne}%** de vos revenus, soit **${this.userProfile.soldeActuel.toLocaleString()} FCFA** par mois.\n\n`;
            
            response += `📈 **${rec.title}**\n`;
            response += `${rec.message}\n\n`;
            response += `💡 **Ma recommandation :** ${rec.suggestion}\n`;
            response += `🎯 **Objectif suggéré :** ${rec.montant.toLocaleString()} FCFA/mois\n\n`;
            
            if (rec.type === 'excellent') {
                response += `Avec votre excellent niveau d'épargne, vous pourriez envisager des investissements. Voulez-vous des idées ?`;
            } else {
                response += `Voulez-vous que je vous aide à identifier des postes de dépenses à optimiser ?`;
            }
        }
        
        // Questions sur le business et investissements
        else if (lowerMessage.includes('business') || lowerMessage.includes('investissement') || lowerMessage.includes('entreprise') || lowerMessage.includes('idée')) {
            const budget = this.userProfile.soldeActuel;
            const ideas = this.generateBusinessIdeas(budget);
            
            response = `💡 **Idées business adaptées à votre budget :**\n\n`;
            response += `Avec votre capital disponible de **${budget.toLocaleString()} FCFA**, voici mes recommandations :\n\n`;
            
            if (ideas.length === 0) {
                response += `⚠️ Votre budget actuel est limité pour les opportunités business disponibles.\n`;
                response += `💡 **Mon conseil :** Concentrez-vous d'abord sur l'épargne pour atteindre au moins 50,000 FCFA.\n\n`;
                response += `En attendant, vous pourriez commencer par :\n`;
                response += `• Vendre des services (consultation, formation)\n`;
                response += `• Créer du contenu en ligne\n`;
                response += `• Faire du freelance dans votre domaine`;
            } else {
                ideas.slice(0, 3).forEach((idea, index) => {
                    response += `**${index + 1}. ${idea.title}**\n`;
                    response += `💰 Investissement : ${idea.minBudget.toLocaleString()} FCFA (${idea.investment})\n`;
                    response += `📈 ROI estimé : ${idea.roi}\n`;
                    response += `⏱️ Délai : ${idea.timeframe}\n`;
                    response += `📝 ${idea.description}\n`;
                    response += `ℹ️ *${idea.details}*\n\n`;
                });
                
                response += `Quelle idée vous intéresse le plus ? Je peux vous donner plus de détails !`;
            }
        }
        
        // Questions sur les risques et alertes
        else if (lowerMessage.includes('alerte') || lowerMessage.includes('risque') || lowerMessage.includes('danger') || lowerMessage.includes('problème')) {
            const overspending = this.detectOverspending();
            const tauxEpargne = parseFloat(this.userProfile.tauxEpargne);
            
            response = `🚨 **Analyse des risques financiers :**\n\n`;
            
            if (overspending.length === 0 && tauxEpargne >= 20) {
                response += `✅ **Excellente nouvelle !** Aucun risque majeur détecté.\n\n`;
                response += `Votre situation financière est stable :\n`;
                response += `• Dépenses bien réparties\n`;
                response += `• Taux d'épargne excellent (${tauxEpargne}%)\n`;
                response += `• Solde positif de ${this.userProfile.soldeActuel.toLocaleString()} FCFA\n\n`;
                response += `Continuez sur cette lancée ! 🎉`;
            } else {
                if (overspending.length > 0) {
                    response += `⚠️ **${overspending.length} alerte(s) détectée(s) :**\n`;
                    overspending.forEach(alert => {
                        response += `• ${alert.message}\n`;
                    });
                    response += `\n`;
                }
                
                if (tauxEpargne < 10) {
                    response += `🚨 **Risque critique :** Taux d'épargne trop faible (${tauxEpargne}%)\n`;
                    response += `Vous pourriez avoir des difficultés en cas d'imprévu.\n\n`;
                } else if (tauxEpargne < 20) {
                    response += `⚠️ **Attention :** Taux d'épargne à améliorer (${tauxEpargne}%)\n\n`;
                }
                
                response += `💡 **Actions recommandées :**\n`;
                response += `1. Réduire les dépenses dans les catégories en surconsommation\n`;
                response += `2. Définir un budget mensuel strict\n`;
                response += `3. Augmenter progressivement votre épargne\n\n`;
                response += `Voulez-vous que je vous aide à créer un plan d'action ?`;
            }
        }
        
        // Questions sur des montants spécifiques
        else if (lowerMessage.match(/\d+/)) {
            const montant = lowerMessage.match(/\d+/)[0];
            const budget = parseInt(montant);
            
            if (lowerMessage.includes('business') || lowerMessage.includes('investir')) {
                const ideas = this.generateBusinessIdeas(budget);
                response = `💡 **Avec ${budget.toLocaleString()} FCFA, vous pouvez :**\n\n`;
                
                if (ideas.length === 0) {
                    response += `Ce budget est encore limité pour les business traditionnels.\n`;
                    response += `💡 **Suggestions :**\n`;
                    response += `• Formation en ligne (25k FCFA minimum)\n`;
                    response += `• Vente sur réseaux sociaux\n`;
                    response += `• Services de consultation\n`;
                } else {
                    ideas.slice(0, 2).forEach(idea => {
                        response += `• **${idea.title}** (${idea.minBudget.toLocaleString()} FCFA)\n`;
                        response += `  ${idea.description}\n`;
                    });
                }
                
                response += `\nVoulez-vous plus de détails sur une option ?`;
            } else {
                response = `Pour ${budget.toLocaleString()} FCFA, je peux vous donner des conseils spécifiques. Voulez-vous des idées d'investissement, d'épargne ou de business ?`;
            }
        }
        
        // Questions générales ou non comprises
        else {
            const suggestions = [
                "analyser vos dépenses par catégorie",
                "optimiser votre épargne",
                "trouver des idées de business adaptées",
                "identifier les risques financiers",
                "créer un budget personnalisé"
            ];
            
            response = `Je peux vous aider avec de nombreux aspects de vos finances ! 😊\n\n`;
            response += `**Voici ce que je peux faire pour vous :**\n`;
            suggestions.forEach((suggestion, index) => {
                response += `${index + 1}. ${suggestion.charAt(0).toUpperCase() + suggestion.slice(1)}\n`;
            });
            response += `\n💬 **Exemples de questions :**\n`;
            response += `• "Analyse mes dépenses"\n`;
            response += `• "Comment épargner plus ?"\n`;
            response += `• "Idées de business pour 100k FCFA"\n`;
            response += `• "Y a-t-il des risques ?"\n\n`;
            response += `Que souhaitez-vous savoir ?`;
        }
        
        this.conversationHistory.push({ type: 'ai', message: response, timestamp: new Date() });
        return response;
    }
}

// Instance globale de l'IA
let financialAI;

// Fonctions globales
function openAIAssistant() {
    const modal = new bootstrap.Modal(document.getElementById('aiAssistantModal'));
    modal.show();
    
    // Initialiser l'IA si pas encore fait
    if (!financialAI) {
        financialAI = new FinancialAI();
        loadAnalysisData();
        loadSavingsData();
        loadBusinessIdeas();
        loadAlertsData();
    }
}

function loadAnalysisData() {
    const overspendingAlerts = financialAI.detectOverspending();
    const categoryAnalysis = financialAI.analyzeExpenses();
    
    // Charger les alertes de surconsommation
    const alertsContainer = document.getElementById('overspending-alerts');
    if (overspendingAlerts.length === 0) {
        alertsContainer.innerHTML = '<p class="text-success"><i class="fas fa-check-circle me-2"></i>Aucune surconsommation détectée</p>';
    } else {
        alertsContainer.innerHTML = overspendingAlerts.map(alert => `
            <div class="alert-item ${alert.type}">
                <strong>${alert.message}</strong><br>
                <small>${alert.recommendation}</small>
            </div>
        `).join('');
    }
    
    // Charger l'analyse par catégorie
    const analysisContainer = document.getElementById('category-analysis');
    analysisContainer.innerHTML = categoryAnalysis.map(item => `
        <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="text-white">${item.categorie}</span>
            <div>
                <span class="text-muted">${item.pourcentage}%</span>
                <span class="text-white ms-2">${item.montant.toLocaleString()} FCFA</span>
            </div>
        </div>
    `).join('');
}

function loadSavingsData() {
    const recommendations = financialAI.calculateSavingsRecommendations();
    const container = document.getElementById('savings-recommendations');
    
    container.innerHTML = recommendations.map(rec => `
        <div class="alert-item ${rec.type === 'urgent' ? 'danger' : rec.type === 'excellent' ? 'success' : ''}">
            <h6 class="text-white">${rec.title}</h6>
            <p class="mb-2">${rec.message}</p>
            <p class="mb-0"><strong>Suggestion:</strong> ${rec.suggestion}</p>
            <p class="mb-0"><strong>Montant recommandé:</strong> ${rec.montant.toLocaleString()} FCFA/mois</p>
        </div>
    `).join('');
}

function loadBusinessIdeas() {
    const totalRevenus = financialAI.data.revenus.reduce((sum, r) => sum + r.montant, 0);
    const totalDepenses = financialAI.data.depenses.reduce((sum, d) => sum + d.montant, 0);
    const budget = totalRevenus - totalDepenses;
    const ideas = financialAI.generateBusinessIdeas(budget);
    
    document.getElementById('available-capital').textContent = budget.toLocaleString() + ' FCFA';
    
    const container = document.getElementById('business-ideas');
    if (ideas.length === 0) {
        container.innerHTML = `
            <div class="card bg-dark-card border-0 p-4">
                <div class="text-center">
                    <i class="fas fa-exclamation-triangle text-warning fa-3x mb-3"></i>
                    <h5 class="text-white">Budget insuffisant</h5>
                    <p class="text-muted">Votre capital actuel de ${budget.toLocaleString()} FCFA est insuffisant pour les opportunités business disponibles. Concentrez-vous d'abord sur l'épargne.</p>
                </div>
            </div>
        `;
    } else {
        container.innerHTML = ideas.map(idea => `
            <div class="business-idea-card">
                <div class="d-flex justify-content-between align-items-start mb-3">
                    <h6 class="text-white mb-0">${idea.title}</h6>
                    <span class="investment-badge investment-${idea.investment.toLowerCase()}">${idea.investment}</span>
                </div>
                <p class="text-muted mb-3">${idea.description}</p>
                <div class="row g-3">
                    <div class="col-md-3">
                        <small class="text-muted">Investissement min.</small>
                        <div class="text-white">${idea.minBudget.toLocaleString()} FCFA</div>
                    </div>
                    <div class="col-md-3">
                        <small class="text-muted">ROI estimé</small>
                        <div class="text-success">${idea.roi}</div>
                    </div>
                    <div class="col-md-3">
                        <small class="text-muted">Délai</small>
                        <div class="text-info">${idea.timeframe}</div>
                    </div>
                    <div class="col-md-3">
                        <small class="text-muted">Difficulté</small>
                        <div class="text-warning">${idea.difficulty}</div>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function loadAlertsData() {
    const alerts = financialAI.generateSmartAlerts();
    const container = document.getElementById('active-alerts');
    
    if (alerts.length === 0) {
        container.innerHTML = '<p class="text-success"><i class="fas fa-check-circle me-2"></i>Aucune alerte active</p>';
    } else {
        container.innerHTML = alerts.map(alert => `
            <div class="alert-item ${alert.type}">
                <div class="d-flex align-items-start">
                    <i class="${alert.icon} me-3 mt-1"></i>
                    <div>
                        <strong>${alert.title}</strong><br>
                        <span>${alert.message}</span><br>
                        <small class="text-muted">${alert.action}</small>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function updateAnalysis() {
    // Recharger l'analyse avec les nouvelles dates
    loadAnalysisData();
}

function calculateSavings() {
    const monthlyIncome = parseFloat(document.getElementById('monthly-income').value) || 0;
    const savingsTarget = parseFloat(document.getElementById('savings-target').value) || 20;
    
    if (monthlyIncome > 0) {
        const savingsAmount = (monthlyIncome * savingsTarget) / 100;
        alert(`Avec un revenu de ${monthlyIncome.toLocaleString()} FCFA et un objectif de ${savingsTarget}%, vous devriez épargner ${savingsAmount.toLocaleString()} FCFA par mois.`);
    }
}

function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (message) {
        const messagesContainer = document.getElementById('chat-messages');
        
        // Ajouter le message de l'utilisateur
        messagesContainer.innerHTML += `
            <div class="user-message mb-3">
                <div class="d-flex align-items-start justify-content-end">
                    <div class="flex-grow-1 text-end">
                        <div class="bg-info bg-opacity-20 p-3 rounded d-inline-block" style="max-width: 80%;">
                            <p class="text-white mb-0">${message}</p>
                        </div>
                        <small class="text-muted d-block mt-1">${new Date().toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'})}</small>
                    </div>
                    <div class="stat-icon-wrapper stat-icon-blue ms-3 flex-shrink-0">
                        <i class="fas fa-user"></i>
                    </div>
                </div>
            </div>
        `;
        
        // Vider l'input immédiatement
        input.value = '';
        
        // Faire défiler vers le bas
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Simuler que l'IA "réfléchit"
        messagesContainer.innerHTML += `
            <div class="ai-message mb-3" id="typing-indicator">
                <div class="d-flex align-items-start">
                    <div class="stat-icon-wrapper stat-icon-purple me-3 flex-shrink-0">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div class="flex-grow-1">
                        <div class="bg-primary bg-opacity-20 p-3 rounded">
                            <p class="text-white mb-0">
                                <i class="fas fa-circle-notch fa-spin me-2"></i>Je réfléchis...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Générer la réponse de l'IA après un délai réaliste
        setTimeout(() => {
            // Supprimer l'indicateur de frappe
            const typingIndicator = document.getElementById('typing-indicator');
            if (typingIndicator) {
                typingIndicator.remove();
            }
            
            const aiResponse = financialAI.processAIMessage(message);
            
            // Ajouter la réponse de l'IA avec formatage
            messagesContainer.innerHTML += `
                <div class="ai-message mb-3">
                    <div class="d-flex align-items-start">
                        <div class="stat-icon-wrapper stat-icon-purple me-3 flex-shrink-0">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div class="flex-grow-1">
                            <div class="bg-primary bg-opacity-20 p-3 rounded">
                                <div class="text-white mb-0" style="white-space: pre-line;">${aiResponse}</div>
                            </div>
                            <small class="text-muted d-block mt-1">${new Date().toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'})}</small>
                        </div>
                    </div>
                </div>
            `;
            
            // Faire défiler vers le bas
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, Math.random() * 1500 + 1000); // Délai entre 1 et 2.5 secondes
    }
}

function sendMessageSecondary() {
    const input = document.getElementById('chat-input-secondary');
    const message = input.value.trim();
    
    if (message) {
        const messagesContainer = document.getElementById('chat-messages-secondary');
        
        // Ajouter le message de l'utilisateur
        messagesContainer.innerHTML += `
            <div class="user-message mb-3">
                <div class="d-flex align-items-start justify-content-end">
                    <div class="flex-grow-1 text-end">
                        <div class="bg-info bg-opacity-20 p-3 rounded d-inline-block" style="max-width: 80%;">
                            <p class="text-white mb-0">${message}</p>
                        </div>
                        <small class="text-muted d-block mt-1">${new Date().toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'})}</small>
                    </div>
                    <div class="stat-icon-wrapper stat-icon-blue ms-3 flex-shrink-0">
                        <i class="fas fa-user"></i>
                    </div>
                </div>
            </div>
        `;
        
        input.value = '';
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Simuler réflexion IA
        messagesContainer.innerHTML += `
            <div class="ai-message mb-3" id="typing-indicator-secondary">
                <div class="d-flex align-items-start">
                    <div class="stat-icon-wrapper stat-icon-purple me-3 flex-shrink-0">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div class="flex-grow-1">
                        <div class="bg-primary bg-opacity-20 p-3 rounded">
                            <p class="text-white mb-0">
                                <i class="fas fa-circle-notch fa-spin me-2"></i>Je réfléchis...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        setTimeout(() => {
            const typingIndicator = document.getElementById('typing-indicator-secondary');
            if (typingIndicator) {
                typingIndicator.remove();
            }
            
            const aiResponse = financialAI.processAIMessage(message);
            
            messagesContainer.innerHTML += `
                <div class="ai-message mb-3">
                    <div class="d-flex align-items-start">
                        <div class="stat-icon-wrapper stat-icon-purple me-3 flex-shrink-0">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div class="flex-grow-1">
                            <div class="bg-primary bg-opacity-20 p-3 rounded">
                                <div class="text-white mb-0" style="white-space: pre-line;">${aiResponse}</div>
                            </div>
                            <small class="text-muted d-block mt-1">${new Date().toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'})}</small>
                        </div>
                    </div>
                </div>
            `;
            
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, Math.random() * 1500 + 1000);
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Slider pour le pourcentage d'épargne
    const savingsSlider = document.getElementById('savings-target');
    const savingsPercentage = document.getElementById('savings-percentage');
    
    if (savingsSlider && savingsPercentage) {
        savingsSlider.addEventListener('input', function() {
            savingsPercentage.textContent = this.value + '%';
        });
    }
    
    // Enter pour envoyer un message dans le chat principal
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Enter pour envoyer un message dans le chat secondaire
    const chatInputSecondary = document.getElementById('chat-input-secondary');
    if (chatInputSecondary) {
        chatInputSecondary.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessageSecondary();
            }
        });
    }
});

function logout() {
    if(confirm("Voulez-vous vraiment vous déconnecter ?")) {
        window.location.reload();
    }
}
