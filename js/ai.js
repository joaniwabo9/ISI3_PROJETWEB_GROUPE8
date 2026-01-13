// Intégration API IA pour les recommandations et chat
document.addEventListener('DOMContentLoaded', function() {
    const botButton = document.querySelector('.bot-button');
    
    if (botButton) {
        botButton.addEventListener('click', function() {
            showAIChat();
        });
    }
});

// Afficher le chat IA
function showAIChat() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        alert('Vous devez être connecté');
        return;
    }
    
    const user = JSON.parse(loggedInUser);
    
    // Récupérer les données financières
    getAvailableBalance(user.username, function(balances) {
        // Afficher le chat widget
        showChatWidget(balances, user);
    });
}

// Afficher le widget de chat
function showChatWidget(balances, user) {
    // Supprimer l'ancien widget s'il existe
    const oldWidget = document.getElementById('aiChatWidget');
    if (oldWidget) {
        oldWidget.remove();
    }
    
    let widgetHTML = `
        <div id="aiChatWidget" style="position: fixed; bottom: 20px; right: 20px; width: 400px; height: 600px; background: linear-gradient(145deg, rgba(10, 22, 40, 0.95), rgba(15, 23, 42, 0.85)); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; display: flex; flex-direction: column; z-index: 10000; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);">
            <!-- Header -->
            <div style="padding: 15px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); display: flex; justify-content: space-between; align-items: center;">
                <h5 style="margin: 0; color: white; font-size: 16px; font-weight: 600;">
                    <i class="bi bi-robot" style="color: #3b82f6; margin-right: 8px;"></i>Assistant IA
                </h5>
                <button id="closeChatBtn" style="background: none; border: none; color: #cbd5e1; cursor: pointer; font-size: 20px; padding: 0; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;">
                    ✕
                </button>
            </div>
            
            <!-- Messages -->
            <div id="chatMessages" style="flex: 1; overflow-y: auto; padding: 15px; display: flex; flex-direction: column; gap: 12px;">
                <div class="message bot-message">
                    <div class="message-content">
                        <p>Bonjour ${user.prenom || 'utilisateur'} 👋</p>
                        <p>Je suis votre assistant financier IA. Posez-moi une question!</p>
                    </div>
                </div>
            </div>
            
            <!-- Input -->
            <div style="padding: 12px; border-top: 1px solid rgba(255, 255, 255, 0.1); display: flex; gap: 8px; background: rgba(10, 22, 40, 0.8);">
                <input type="text" id="chatInput" placeholder="Votre question..." style="flex: 1; background: rgba(30, 41, 59, 0.9); border: 1px solid rgba(255, 255, 255, 0.2); color: white; padding: 10px 12px; border-radius: 6px; font-size: 13px; outline: none; font-family: inherit;">
                <button type="button" id="sendChatBtn" style="background: linear-gradient(135deg, #3b82f6, #06b6d4); border: none; color: white; padding: 10px 16px; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 13px;">
                    Envoyer
                </button>
            </div>
        </div>
    `;
    
    // Ajouter le widget au DOM
    document.body.insertAdjacentHTML('beforeend', widgetHTML);
    
    // Ajouter les event listeners
    setTimeout(() => {
        const chatInput = document.getElementById('chatInput');
        const sendChatBtn = document.getElementById('sendChatBtn');
        const closeBtn = document.getElementById('closeChatBtn');
        
        console.log('✅ Widget créé avec éléments:', {
            chatInput: !!chatInput,
            sendChatBtn: !!sendChatBtn,
            closeBtn: !!closeBtn
        });
        
        if (chatInput) {
            // Focus sur l'input
            chatInput.focus();
            
            // Événement keypress
            chatInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    console.log('📤 Entrée pressée');
                    sendChatMessage(chatInput, balances, user);
                }
            });
        }
        
        if (sendChatBtn) {
            // Événement click
            sendChatBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('📤 Bouton envoi cliqué');
                sendChatMessage(chatInput, balances, user);
            });
        }
        
        if (closeBtn) {
            // Fermer le widget
            closeBtn.addEventListener('click', function() {
                const widget = document.getElementById('aiChatWidget');
                if (widget) {
                    widget.remove();
                }
            });
        }
    }, 100);
}

// Envoyer un message de chat
function sendChatMessage(chatInput, balances, user) {
    if (!chatInput) {
        console.error('❌ chatInput non trouvé');
        return;
    }
    
    const message = chatInput.value.trim();
    console.log('📝 Message à envoyer:', message);
    
    if (!message) {
        console.warn('⚠️ Message vide');
        return;
    }
    
    // Ajouter le message de l'utilisateur
    addChatMessage(message, 'user');
    chatInput.value = '';
    
    // Générer une réponse du bot
    const response = generateBotResponse(message, balances, user);
    console.log('🤖 Réponse du bot:', response);
    
    // Ajouter la réponse du bot après un délai
    setTimeout(() => {
        addChatMessage(response, 'bot');
    }, 500);
}

// Ajouter un message au chat
function addChatMessage(message, sender) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) {
        console.error('❌ chatMessages non trouvé');
        return;
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    // Utiliser innerHTML pour les messages du bot (qui contiennent du HTML)
    // et textContent pour les messages de l'utilisateur (pour la sécurité)
    if (sender === 'bot') {
        messageDiv.innerHTML = `<div class="message-content"><p>${message}</p></div>`;
    } else {
        messageDiv.innerHTML = `<div class="message-content"><p>${escapeHtml(message)}</p></div>`;
    }
    
    chatMessages.appendChild(messageDiv);
    
    // Scroller vers le bas
    setTimeout(() => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 50);
    
    console.log(`✅ Message ${sender} ajouté`);
}

// Fonction pour échapper le HTML (sécurité)
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Générer une réponse du bot basée sur le message de l'utilisateur
function generateBotResponse(userMessage, balances, user) {
    const message = userMessage.toLowerCase();
    
    // Réponses basées sur les mots-clés
    if (message.includes('solde') || message.includes('argent')) {
        return `Votre solde actuel est de <strong>${balances.currentBalance.toLocaleString('fr-FR', {maximumFractionDigits: 0})} FCFA</strong>. Votre solde disponible (après épargne) est de <strong>${balances.availableBalance.toLocaleString('fr-FR', {maximumFractionDigits: 0})} FCFA</strong>.`;
    }
    
    if (message.includes('épargne') || message.includes('economie')) {
        const savingsRatio = balances.totalIncome > 0 ? (balances.totalSavings / balances.totalIncome) * 100 : 0;
        return `Vous avez épargné <strong>${balances.totalSavings.toLocaleString('fr-FR', {maximumFractionDigits: 0})} FCFA</strong>, ce qui représente <strong>${savingsRatio.toFixed(1)}%</strong> de vos revenus. L'objectif recommandé est de <strong>20%</strong>. ${savingsRatio < 20 ? 'Essayez d\'augmenter votre épargne!' : 'Excellent travail!'}`;
    }
    
    if (message.includes('dépense') || message.includes('depense')) {
        const expenseRatio = balances.totalIncome > 0 ? (balances.totalExpense / balances.totalIncome) * 100 : 0;
        return `Vos dépenses totales sont de <strong>${balances.totalExpense.toLocaleString('fr-FR', {maximumFractionDigits: 0})} FCFA</strong>, soit <strong>${expenseRatio.toFixed(1)}%</strong> de vos revenus. L'objectif recommandé est de rester en dessous de <strong>70%</strong>. ${expenseRatio > 70 ? 'Vous devriez réduire vos dépenses.' : 'Vous êtes dans une bonne position!'}`;
    }
    
    if (message.includes('revenu') || message.includes('salaire')) {
        return `Vos revenus totaux sont de <strong>${balances.totalIncome.toLocaleString('fr-FR', {maximumFractionDigits: 0})} FCFA</strong>. Cela inclut les salaires et autres revenus enregistrés.`;
    }
    
    if (message.includes('conseil') || message.includes('recommandation')) {
        const recommendations = generateRecommendations(balances);
        let response = 'Voici mes recommandations pour vous:<br>';
        recommendations.slice(0, 2).forEach(rec => {
            response += `<br>• <strong>${rec.title}</strong>: ${rec.message}`;
        });
        return response;
    }
    
    if (message.includes('budget') || message.includes('planifier')) {
        return `Pour un budget sain, je recommande:<br>• <strong>Revenus</strong>: 100%<br>• <strong>Dépenses</strong>: 50-70%<br>• <strong>Épargne</strong>: 20-30%<br>• <strong>Investissements</strong>: 10-20%<br><br>Adaptez ces pourcentages selon votre situation personnelle.`;
    }
    
    if (message.includes('objectif') || message.includes('but')) {
        return `Pour atteindre vos objectifs financiers:<br>1. Définissez des objectifs clairs et mesurables<br>2. Créez un plan d'épargne régulier<br>3. Suivez vos progrès mensuellement<br>4. Ajustez votre budget si nécessaire<br><br>Quel objectif souhaitez-vous atteindre?`;
    }
    
    if (message.includes('aide') || message.includes('help')) {
        return `Je peux vous aider avec:<br>• Analyse de vos finances<br>• Conseils budgétaires<br>• Stratégies d\'épargne<br>• Questions sur vos transactions<br>• Recommandations personnalisées<br><br>Posez-moi une question!`;
    }
    
    // Réponse par défaut
    return `Je comprends votre question sur "${userMessage}". Basé sur vos données financières actuelles, voici ce que je peux vous dire:<br><br>Vos revenus: <strong>${balances.totalIncome.toLocaleString('fr-FR', {maximumFractionDigits: 0})} FCFA</strong><br>Vos dépenses: <strong>${balances.totalExpense.toLocaleString('fr-FR', {maximumFractionDigits: 0})} FCFA</strong><br>Votre épargne: <strong>${balances.totalSavings.toLocaleString('fr-FR', {maximumFractionDigits: 0})} FCFA</strong><br><br>Posez-moi une question plus spécifique pour obtenir des conseils adaptés!`;
}

// Générer les recommandations basées sur les données
function generateRecommendations(balances) {
    const recommendations = [];
    
    // Calcul des ratios
    const savingsRatio = balances.totalIncome > 0 ? (balances.totalSavings / balances.totalIncome) * 100 : 0;
    const expenseRatio = balances.totalIncome > 0 ? (balances.totalExpense / balances.totalIncome) * 100 : 0;
    
    // Recommandations sur l'épargne
    if (savingsRatio < 10) {
        recommendations.push({
            type: 'warning',
            title: 'Épargne insuffisante',
            message: `Vous n'épargnez que ${savingsRatio.toFixed(1)}% de vos revenus. Essayez d'atteindre au moins 20% pour une meilleure sécurité financière.`,
            icon: 'bi-piggy-bank'
        });
    } else if (savingsRatio >= 20 && savingsRatio <= 30) {
        recommendations.push({
            type: 'success',
            title: 'Épargne équilibrée',
            message: `Excellent ! Vous épargnez ${savingsRatio.toFixed(1)}% de vos revenus. Continuez ainsi pour atteindre vos objectifs.`,
            icon: 'bi-check-circle'
        });
    } else if (savingsRatio > 30) {
        recommendations.push({
            type: 'info',
            title: 'Épargne élevée',
            message: `Vous épargnez ${savingsRatio.toFixed(1)}% de vos revenus. C'est excellent, mais assurez-vous de profiter aussi de la vie !`,
            icon: 'bi-star'
        });
    }
    
    // Recommandations sur les dépenses
    if (expenseRatio > 70) {
        recommendations.push({
            type: 'danger',
            title: 'Dépenses trop élevées',
            message: `Vos dépenses représentent ${expenseRatio.toFixed(1)}% de vos revenus. Réduisez-les à moins de 70% pour améliorer votre situation.`,
            icon: 'bi-exclamation-triangle'
        });
    } else if (expenseRatio >= 50 && expenseRatio <= 70) {
        recommendations.push({
            type: 'warning',
            title: 'Dépenses modérées',
            message: `Vos dépenses sont à ${expenseRatio.toFixed(1)}% de vos revenus. C'est acceptable, mais cherchez à les réduire.`,
            icon: 'bi-info-circle'
        });
    } else if (expenseRatio < 50) {
        recommendations.push({
            type: 'success',
            title: 'Dépenses bien maîtrisées',
            message: `Vos dépenses ne représentent que ${expenseRatio.toFixed(1)}% de vos revenus. Excellent contrôle budgétaire !`,
            icon: 'bi-check-circle'
        });
    }
    
    // Recommandations sur le solde disponible
    if (balances.availableBalance < 0) {
        recommendations.push({
            type: 'danger',
            title: 'Solde négatif',
            message: 'Votre solde disponible est négatif. Vous dépensez plus que vous ne gagnez. Réduisez vos dépenses immédiatement.',
            icon: 'bi-exclamation-circle'
        });
    } else if (balances.availableBalance < balances.totalIncome * 0.1) {
        recommendations.push({
            type: 'warning',
            title: 'Solde faible',
            message: 'Votre solde disponible est très faible. Augmentez vos revenus ou réduisez vos dépenses.',
            icon: 'bi-exclamation-triangle'
        });
    } else {
        recommendations.push({
            type: 'success',
            title: 'Solde sain',
            message: 'Votre solde disponible est en bonne santé. Continuez à maintenir cet équilibre.',
            icon: 'bi-check-circle'
        });
    }
    
    // Recommandations générales
    if (balances.totalIncome === 0) {
        recommendations.push({
            type: 'info',
            title: 'Commencez à enregistrer',
            message: 'Vous n\'avez pas encore enregistré de revenus. Commencez par ajouter vos revenus pour obtenir des recommandations personnalisées.',
            icon: 'bi-plus-circle'
        });
    }
    
    return recommendations;
}
