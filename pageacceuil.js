
let currentLanguage = 'fr';

const translations = {
    fr: {  
        heroTitle: "Maîtrisez vos finances comme jamais",
        heroSubtitle: "Une expérience visuelle et intuitive qui transforme la gestion de votre argent en activité engageante. IA, analyses avancées et design immersif.",
        currentBalance: "Solde actuel",
        balanceIncrease: "+12.5% ce mois",
        vacationGoal: "Objectif Vacances",
        completed: "complété",
        startFree: "Commencer gratuitement",
        discoverFeatures: "Découvrir les fonctionnalités",
        secure: "Sécurisé",
        multiCurrency: "Multi-devises",
        responsive: "Responsive",
        
      
        aiAssistantTitle: "Assistant IA personnel",
        aiAssistant: "Assistant IA",
        aiStatus: "En ligne • Analyse en temps réel",
        dailyTip: "Conseil du jour :",
        aiAdvice: "Vous dépensez 15% de plus en transports ce mois. Pensez au covoiturage !",
        askAI: "Posez une question à votre assistant IA...",
        overviewTitle: "Vue d'ensemble complète",
        overviewText: "Notre dashboard intuitif vous donne une vision claire et immédiate de votre santé financière, avec des visualisations interactives et des alertes intelligentes.",
        detailedAnalysis: "Analyses détaillées",
        detailedAnalysisText: "Graphiques interactifs et prédictions pour anticiper votre situation financière.",
        maxSecurity: "Sécurité maximale",
        securityText: "Vos données financières protégées par un chiffrement de niveau bancaire.",
        
      
        featuresTitle: "Des fonctionnalités puissantes",
        featuresSubtitle: "Tout ce dont vous avez besoin pour une gestion financière moderne et efficace",
        feature1Title: "IA Intelligente",
        feature1Desc: "Assistant conversationnel qui analyse vos finances et vous conseille en temps réel.",
        feature2Title: "Scan OCR",
        feature2Desc: "Extrayez automatiquement les données de vos factures et reçus par photo.",
        feature3Title: "Analyses Avancées",
        feature3Desc: "Graphiques interactifs et prédictions pour anticiper votre situation financière.",
        feature4Title: "Gestion Complète",
        feature4Desc: "Suivez revenus, dépenses, prêts et épargnes dans une interface unifiée.",
        feature5Title: "Cagnottes d'épargne",
        feature5Desc: "Visualisez vos objectifs comme des jarres qui se remplissent progressivement.",
        feature6Title: "Sécurité Maximale",
        feature6Desc: "Vos données financières protégées par un chiffrement de niveau bancaire.",
        
        
        pricingTitle: "Des tarifs transparents",
        pricingSubtitle: "Choisissez le plan qui correspond à vos besoins",
        freePlan: "Gratuit",
        freeForever: "Pour toujours",
        freeFeature1: "Jusqu'à 100 transactions/mois",
        freeFeature2: "Analyses basiques",
        freeFeature3: "1 cagnotte d'épargne",
        freeFeature4: "Support communautaire",
        premiumPlan: "Premium",
        perMonth: "FCFA/mois",
        premiumFeature1: "Transactions illimitées",
        premiumFeature2: "IA avancée avec prédictions",
        premiumFeature3: "Cagnottes illimitées",
        premiumFeature4: "Export de données",
        premiumFeature5: "Support prioritaire 24/7",
        premiumFeature6: "Scan OCR illimité",
        choosePremium: "Choisir Premium",
        businessPlan: "Business",
        businessFeature1: "Tout Premium +",
        businessFeature2: "Gestion multi-business",
        businessFeature3: "Analyses de rentabilité",
        businessFeature4: "API d'intégration",
        businessFeature5: "Manager dédié",
        businessFeature6: "Formation personnalisée",
        popular: "Populaire",
        contactTeam: "Contacter l'équipe",
        
       
        testimonialsTitle: "Ce que disent nos utilisateurs",
        testimonialsSubtitle: "Rejoignez des milliers d'utilisateurs satisfaits",
        testimonial1: "\"Control your flow a transformé ma gestion financière. L'IA m'aide à optimiser mes dépenses et j'ai économisé 25% en 3 mois !\"",
        testimonial2: "\"Interface magnifique et fonctionnalités puissantes. Le scan OCR me fait gagner un temps fou pour mes notes de frais.\"",
        testimonial3: "\"Enfin une app qui comprend le contexte africain ! Les montants en FCFA et l'IA adaptée à nos réalités économiques.\"",
        occupation1: "Entrepreneure",
        occupation2: "Freelance Designer",
        occupation3: "Manager",
        
      
        activeUsers: "Utilisateurs actifs",
        fcfaManaged: "FCFA gérés",
        satisfaction: "Satisfaction",
        supportAvailable: "Support disponible",
        platformTitle: "La plateforme de gestion financière intelligente",
        platformDescription: "Conçue pour l'Afrique, par des Africains. Nous comprenons vos défis financiers et avons créé une solution adaptée à vos besoins spécifiques.",
        watchDemo: "Voir la démo",
        downloadApp: "Télécharger l'app",
        
        
        faqTitle: "Questions fréquentes",
        faqSubtitle: "Tout ce que vous devez savoir",
        faq1: "Comment fonctionne l'assistant IA ?",
        faq1Answer: "Notre assistant IA analyse vos transactions et habitudes de dépenses pour vous fournir des conseils personnalisés. Il utilise l'apprentissage automatique pour identifier des modèles et suggérer des optimisations.",
        faq2: "Mes données sont-elles sécurisées ?",
        faq2Answer: "Absolument. Nous utilisons un chiffrement de niveau bancaire (AES-256) pour protéger vos données. Nous ne partageons jamais vos informations financières avec des tiers sans votre consentement explicite.",
        faq3: "Puis-je utiliser l'app hors ligne ?",
        faq3Answer: "Oui, les fonctionnalités de base sont disponibles hors ligne. Vos données seront synchronisées automatiquement dès que vous retrouverez une connexion Internet.",
        faq4: "Comment fonctionne le scan OCR ?",
        faq4Answer: "Notre technologie OCR (Reconnaissance Optique de Caractères) extrait automatiquement les informations des reçus et factures que vous photographiez. Elle reconnaît les montants, dates et commerçants pour les ajouter automatiquement à vos transactions.",
        faq5: "Puis-je annuler mon abonnement à tout moment ?",
        faq5Answer: "Oui, vous pouvez annuler votre abonnement à tout moment depuis votre espace personnel. Aucun frais supplémentaire ne vous sera facturé, et vous conserverez l'accès à votre compte jusqu'à la fin de la période payée.",
        
        
        ctaTitle: "Prêt à reprendre le contrôle ?",
        ctaSubtitle: "Rejoignez des milliers d'utilisateurs qui ont transformé leur gestion financière avec Control your flow",
        createFreeAccount: "Créer mon compte gratuit",
        alreadyMember: "Déjà membre ? Connectez-vous",
        noCard: "Sans carte bancaire",
        cancelAnyTime: "Annulez à tout moment",



        
        
       
        footerDescription: "La plateforme de gestion financière intelligente qui transforme votre relation avec l'argent. Conçue pour l'Afrique, par des Africains.",
        product: "Produit",
        features: "Fonctionnalités",
        pricing: "Tarifs",
        testimonials: "Témoignages",
        documentation: "Documentation",
        support: "Support",
        faq: "FAQ",
        contact: "Contact",
        status: "Statut",
        allRights: "Tous droits réservés.",
        privacyPolicy: "Politique de confidentialité",
        termsOfUse: "Conditions d'utilisation",

         welcome: "Bonjour, Daniella",
        warning: "Attention à vos dépenses ce mois-ci.",
        navDash: "Tableau de Bord",
        navBusiness: "Mes Business",
        navHistory: "Historique",
        navProfil: "Profil",
        bizTitle: "Gérance de Business",
        noBusiness: "Aucun business enregistré",
        spendingTrend: "Tendance des dépenses",
        achievements: "Accomplissements",
        achievements: "Achievements",
        personalInfo: "Informations personnelles",
        logout: "Se déconnecter",
        warningZone: "Zone dangereuse",

        currentBalance: "Solde actuel",
        savingsGoal: "Objectif d’épargne",
        predictionMonthEnd: "Prédiction Fin du mois",
        remaining: "Reste",
        trendBased: "Basé sur vos tendances actuelles",
        previousMonth: "Mois précédent",
        
        scanDocument: "Scanner un document",
        dragDrop: "Glissez-déposez un reçu ou une facture ici",
        browseFiles: "Ou parcourir les fichiers",
        
       
        recentTransactions: "Transactions récentes",
        filter: "Filtrer",
        category: "Catégorie",
        fullHistory: "Historique complet",
        
        investment: "Investissement",
        investmentPay: "Paiement investissement",
        transport: "Transport",
        transportPay: "Paiement Transport",
        health: "Santé",
        healthPay: "Paiement santé",
        salary: "Salaire",
        salaryPay: "Paiement salaire",
        housing: "Logement",
        housingPay: "Paiement logement",
        
       
        tripJapan: "Voyage au Japon",
        newCar: "Nouvelle voiture",
        houseDeposit: "Apport maison",
        leftToSave: "Reste à économiser",
        addFunds: "Ajouter des fonds",
        
        
        carLoan: "Prêt automobile",
        monthsLeft: "mois restants",
        of: "sur",
        timeElapsed: "Temps écoulé",
        repaid: "Remboursé",
        monthlyPayment: "Mensualité",
        amountRemaining: "Montant restant",
        studentLoan: "Prêt Étudiant",
        mortgage: "Prêt immobilier",
        
      
        totalIncome: "Total revenus",
        totalExpenses: "Total dépenses",
        netBalance: "Solde net",
        largestTransaction: "Plus grande transaction",
        activeCategories: "Catégories actives",
        periodAnalyzed: "Période analysée",
        lastDays: "Derniers jours",
        thisYear: "Cette année",
        allHistory: "Tout l'historique",
        export: "Exporter",
        
        today: "Aujourd’hui",
        yesterday: "Hier",
        sunday: "Dimanche",
        thursday: "Jeudi",
        january: "Janvier",
        december: "Décembre"
    },
    en: {heroTitle: "Master Your Finances Like Never Before",
        heroSubtitle: "A visual and intuitive experience that transforms money management into an engaging activity. AI, advanced analytics and immersive design.",
        currentBalance: "Current Balance",
        balanceIncrease: "+12.5% this month",
        vacationGoal: "Vacation Goal",
        completed: "completed",
        startFree: "Start Free",
        discoverFeatures: "Discover Features",
        secure: "Secure",
        multiCurrency: "Multi-currency",
        responsive: "Responsive",
        
       
        aiAssistantTitle: "Personal AI Assistant",
        aiAssistant: "AI Assistant",
        aiStatus: "Online • Real-time analysis",
        dailyTip: "Daily Tip:",
        aiAdvice: "You're spending 15% more on transportation this month. Consider carpooling!",
        askAI: "Ask a question to your AI assistant...",
        overviewTitle: "Complete Overview",
        overviewText: "Our intuitive dashboard gives you a clear and immediate view of your financial health, with interactive visualizations and smart alerts.",
        detailedAnalysis: "Detailed Analysis",
        detailedAnalysisText: "Interactive charts and predictions to anticipate your financial situation.",
        maxSecurity: "Maximum Security",
        securityText: "Your financial data protected by bank-level encryption.",
        
       
        featuresTitle: "Powerful Features",
        featuresSubtitle: "Everything you need for modern and efficient financial management",
        feature1Title: "Smart AI",
        feature1Desc: "Conversational assistant that analyzes your finances and advises you in real time.",
        feature2Title: "OCR Scan",
        feature2Desc: "Automatically extract data from your receipts and invoices by photo.",
        feature3Title: "Advanced Analytics",
        feature3Desc: "Interactive charts and predictions to anticipate your financial situation.",
        feature4Title: "Complete Management",
        feature4Desc: "Track income, expenses, loans and savings in a unified interface.",
        feature5Title: "Savings Jars",
        feature5Desc: "Visualize your goals as jars that gradually fill up.",
        feature6Title: "Maximum Security",
        feature6Desc: "Your financial data protected by bank-level encryption.",
        
      
        pricingTitle: "Transparent Pricing",
        pricingSubtitle: "Choose the plan that fits your needs",
        freePlan: "Free",
        freeForever: "Forever",
        freeFeature1: "Up to 100 transactions/month",
        freeFeature2: "Basic analytics",
        freeFeature3: "1 savings jar",
        freeFeature4: "Community support",
        premiumPlan: "Premium",
        perMonth: "FCFA/month",
        premiumFeature1: "Unlimited transactions",
        premiumFeature2: "Advanced AI with predictions",
        premiumFeature3: "Unlimited savings jars",
        premiumFeature4: "Data export",
        premiumFeature5: "Priority 24/7 support",
        premiumFeature6: "Unlimited OCR scan",
        choosePremium: "Choose Premium",
        businessPlan: "Business",
        businessFeature1: "All Premium +",
        businessFeature2: "Multi-business management",
        businessFeature3: "Profitability analysis",
        businessFeature4: "Integration API",
        businessFeature5: "Dedicated manager",
        businessFeature6: "Personalized training",
        popular: "Popular",
        contactTeam: "Contact Team",
        
        testimonialsTitle: "What Our Users Say",
        testimonialsSubtitle: "Join thousands of satisfied users",
        testimonial1: "\"Control your flow transformed my financial management. The AI helps me optimize my expenses and I saved 25% in 3 months!\"",
        testimonial2: "\"Beautiful interface and powerful features. The OCR scan saves me a lot of time for my expense reports.\"",
        testimonial3: "\"Finally an app that understands the African context! Amounts in FCFA and AI adapted to our economic realities.\"",
        occupation1: "Entrepreneur",
        occupation2: "Freelance Designer",
        occupation3: "Manager",
       
        activeUsers: "Active Users",
        fcfaManaged: "FCFA Managed",
        satisfaction: "Satisfaction",
        supportAvailable: "Support Available",
        platformTitle: "The Intelligent Financial Management Platform",
        platformDescription: "Designed for Africa, by Africans. We understand your financial challenges and have created a solution adapted to your specific needs.",
        watchDemo: "Watch Demo",
        downloadApp: "Download App",
       
        faqTitle: "Frequently Asked Questions",
        faqSubtitle: "Everything you need to know",
        faq1: "How does the AI assistant work?",
        faq1Answer: "Our AI assistant analyzes your transactions and spending habits to provide you with personalized advice. It uses machine learning to identify patterns and suggest optimizations.",
        faq2: "Is my data secure?",
        faq2Answer: "Absolutely. We use bank-level encryption (AES-256) to protect your data. We never share your financial information with third parties without your explicit consent.",
        faq3: "Can I use the app offline?",
        faq3Answer: "Yes, basic features are available offline. Your data will be automatically synchronized as soon as you regain an Internet connection.",
        faq4: "How does the OCR scan work?",
        faq4Answer: "Our OCR (Optical Character Recognition) technology automatically extracts information from receipts and invoices you photograph. It recognizes amounts, dates and merchants to automatically add them to your transactions.",
        faq5: "Can I cancel my subscription at any time?",
        faq5Answer: "Yes, you can cancel your subscription at any time from your personal space. No additional fees will be charged, and you will retain access to your account until the end of the paid period.",
        
       
        ctaTitle: "Ready to Take Control?",
        ctaSubtitle: "Join thousands of users who have transformed their financial management with Control your flow",
        createFreeAccount: "Create my free account",
        alreadyMember: "Already a member? Log in",
        noCard: "No credit card",
        cancelAnyTime: "Cancel anytime",
        
        footerDescription: "The intelligent financial management platform that transforms your relationship with money. Designed for Africa, by Africans.",
        product: "Product",
        features: "Features",
        pricing: "Pricing",
        testimonials: "Testimonials",
        documentation: "Documentation",
        support: "Support",
        faq: "FAQ",
        contact: "Contact",
        status: "Status",
        allRights: "All rights reserved.",
        privacyPolicy: "Privacy Policy",
        termsOfUse: "Terms of Use",

         welcome: "Hello, Daniella",
        warning: "Watch your spending this month.",
        navDash: "Dashboard",
        navBusiness: "My Business",
        navHistory: "History",
        navProfil: "Profile",
        bizTitle: "Business Management",
        noBusiness: "No business registered",
        spendingTrend: "Spending Trend",
        achievements: "Achievements",
         achievements: "Achievements",
        personalInfo: "Personal Information",
        logout: "Logout",
        warningZone: "Danger Zone",
        
        currentBalance: "Current Balance",
        savingsGoal: "Savings Goal",
        predictionMonthEnd: "Month-end Prediction",
        remaining: "Remaining",
        trendBased: "Based on current trends",
        previousMonth: "Previous month",
        
      
        scanDocument: "Scan a document",
        dragDrop: "Drag and drop a receipt or invoice here",
        browseFiles: "Or browse files",
       
        recentTransactions: "Recent Transactions",
        filter: "Filter",
        category: "Category",
        fullHistory: "Full History",
        
       
        investment: "Investment",
        investmentPay: "Investment Payment",
        transport: "Transport",
        transportPay: "Transport Payment",
        health: "Health",
        healthPay: "Health Payment",
        salary: "Salary",
        salaryPay: "Salary Payment",
        housing: "Housing",
        housingPay: "Housing Payment",
       
        tripJapan: "Trip to Japan",
        newCar: "New Car",
        houseDeposit: "House Deposit",
        leftToSave: "Left to save",
        addFunds: "Add funds",
        
      
        carLoan: "Car Loan",
        monthsLeft: "months left",
        of: "of", 
        timeElapsed: "Time elapsed",
        repaid: "Repaid",
        monthlyPayment: "Monthly payment",
        amountRemaining: "Amount remaining",
        studentLoan: "Student Loan",
        mortgage: "Mortgage",
        
        totalIncome: "Total Income",
        totalExpenses: "Total Expenses",
        netBalance: "Net Balance",
        largestTransaction: "Largest Transaction",
        activeCategories: "Active Categories",
        periodAnalyzed: "Analyzed Period",
        lastDays: "Last days",
        thisYear: "This year",
        allHistory: "All history",
        export: "Export",
        
        today: "Today",
        yesterday: "Yesterday",
        sunday: "Sunday",
        thursday: "Thursday",
        january: "January",
        december: "December"

    }
};

function switchLanguage(lang) {
    currentLanguage = lang;
    document.getElementById('currentLang').textContent = lang.toUpperCase();
    
   
    const elements = document.querySelectorAll('[data-fr][data-en]');
    elements.forEach(element => {
        if (lang === 'fr') {
            element.textContent = element.getAttribute('data-fr');
        } else {
            element.textContent = element.getAttribute('data-en');
        }
    });
    
   
    localStorage.setItem('preferredLanguage', lang);
}


document.addEventListener('DOMContentLoaded', function() {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        switchLanguage(savedLang);
    }
});


window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: true
                });
            }
        }
    });
});


function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(0) + 'M+';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K+';
    }
    return num.toString();
}

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            
            if (entry.target.classList.contains('stats-section')) {
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-count'));
                    if (target && !counter.classList.contains('animated')) {
                        counter.classList.add('animated');
                        animateCounter(counter, target);
                    }
                });
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);


document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
    
   
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
   
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(card);
    });
});

window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});


window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroCards = document.querySelector('.hero-cards');
    const shapes = document.querySelectorAll('.shape');
    
    if (heroCards) {
        heroCards.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
    
    shapes.forEach((shape, index) => {
        const speed = 0.05 + (index * 0.02);
        shape.style.transform = `translate(${scrolled * speed}px, ${scrolled * speed}px)`;
    });
});


function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}


document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.feature-card, .pricing-card, .stat-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    ripple.style.top = `${event.clientY - button.offsetTop - radius}px`;
    ripple.classList.add('ripple');
    
    const ripples = button.getElementsByClassName('ripple');
    if (ripples[0]) {
        ripples[0].remove();
    }
    
    button.appendChild(ripple);
}

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button, .btn');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
});


const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    button, .btn {
        position: relative;
        overflow: hidden;
    }
    
    .nav-link.active {
        color: #9B8FF5 !important;
    }
`;
document.head.appendChild(style);


window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});


const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if (isMobile) {
   
    document.querySelectorAll('.shape').forEach(shape => {
        shape.style.animation = 'none';
    });
}


function handleFormSubmit(event) {
    event.preventDefault();
   
    console.log('Form submitted');
}


document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal.show');
        openModals.forEach(modal => {
            const bsModal = bootstrap.Modal.getInstance(modal);
            if (bsModal) {
                bsModal.hide();
            }
        });
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const currentYear = new Date().getFullYear();
    const copyrightElements = document.querySelectorAll('.footer-bottom p');
    copyrightElements.forEach(element => {
        element.innerHTML = element.innerHTML.replace('2026', currentYear);
    });
});

const revealSection = function(entries, observer) {
    const [entry] = entries;
    
    if (!entry.isIntersecting) return;
    
    entry.target.classList.remove('section-hidden');
    observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15
});

document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
    section.classList.add('section-hidden');
});


document.addEventListener('DOMContentLoaded', function() {
    const languageDropdown = document.getElementById('languageDropdown');
    if (languageDropdown) {
        languageDropdown.addEventListener('mouseenter', function() {
            this.classList.add('show');
            this.nextElementSibling.classList.add('show');
        });
    }
});

  

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});


scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});


const a11yStyle = document.createElement('style');
a11yStyle.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid #7C6FEF !important;
        outline-offset: 2px;
    }
`;
document.head.appendChild(a11yStyle);


const preloadImages = [
    
];

preloadImages.forEach(src => {
    const img = new Image();
    img.src = src;
});

