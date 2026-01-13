# Documentation Technique - Application de Gestion Financière "Control Your Flow"

## Table des matières
1. [Vue d'ensemble](#vue-densemble)
2. [Architecture générale](#architecture-générale)
3. [Fichiers HTML](#fichiers-html)
4. [Fichiers JavaScript](#fichiers-javascript)
5. [Fichiers CSS](#fichiers-css)
6. [Base de données](#base-de-données)
7. [Fonctionnalités principales](#fonctionnalités-principales)

---

## Vue d'ensemble

**Control Your Flow** est une application web de gestion financière personnelle permettant aux utilisateurs de:
- Gérer leurs transactions (revenus, dépenses, épargne)
- Suivre leurs prêts et paiements
- Créer et gérer des cagnottes d'épargne
- Analyser leurs données financières avec des graphiques
- Gérer leurs business et profils
- Recevoir des recommandations IA

**Stack technologique:**
- Frontend: HTML5, CSS3, JavaScript (Vanilla)
- Backend: IndexedDB (stockage local)
- Framework UI: Bootstrap 5
- Librairies: Chart.js, Tesseract.js, Bootstrap Icons

---

## Architecture générale

### Structure des dossiers
```
├── index.html                 # Page d'accueil
├── pageacceuil.html          # Page d'accueil détaillée
├── signup.html               # Page de connexion
├── signin.html               # Page d'inscription
├── dashboard.html            # Tableau de bord principal
├── businessetprofil.html     # Profil et gestion des business
├── historique.html           # Historique et graphiques
├── js/
│   ├── auth.js              # Authentification
│   ├── db.js                # Gestion IndexedDB
│   ├── session.js           # Gestion des sessions
│   ├── navbar.js            # Navigation
│   ├── transactions.js      # Gestion des transactions
│   ├── dashboard-dynamic.js # Contenu dynamique du dashboard
│   ├── sync-data.js         # Synchronisation des données
│   ├── savings-cards.js     # Gestion des cagnottes
│   ├── loans.js             # Gestion des prêts
│   ├── business.js          # Gestion des business
│   ├── charts.js            # Graphiques et analyses
│   ├── ocr.js               # Scanner de reçus
│   ├── ai.js                # Assistant IA
│   └── savings-animation.js # Animations des cagnottes
├── css/
│   └── (dossier vide)
├── style/
│   └── projet1.css          # Styles des pages auth
├── theme.css                # Thème global
├── dashboard.css            # Styles du dashboard
├── businessetprofil.css     # Styles du profil
├── historique.css           # Styles de l'historique
└── pageacceuil.css          # Styles de l'accueil
```

---

## Fichiers HTML

### 1. **index.html**
- Page d'accueil simple
- Point d'entrée de l'application
- Redirection vers pageacceuil.html

### 2. **pageacceuil.html**
**Objectif:** Présenter l'application aux nouveaux utilisateurs

**Sections:**
- Header avec navigation
- Section héros avec CTA (Call To Action)
- Fonctionnalités principales
- Tarification
- Appels à l'action (Connexion/Inscription)

**Boutons:**
- 6 boutons vers `signup.html` (inscription)
- 2 boutons vers `signin.html` (connexion)

### 3. **signup.html**
**Objectif:** Permettre aux utilisateurs de se connecter

**Champs:**
- Nom d'utilisateur
- Mot de passe
- Bouton "Accéder à mon compte"
- Options de connexion sociale (Google, GitHub)

**Fonctionnalités:**
- Validation des champs
- Vérification dans IndexedDB
- Redirection vers dashboard.html
- Affichage/masquage du mot de passe

### 4. **signin.html**
**Objectif:** Permettre aux utilisateurs de créer un compte

**Champs:**
- Prénom
- Nom
- Nom d'utilisateur
- Mot de passe
- Confirmation du mot de passe
- Acceptation des conditions

**Fonctionnalités:**
- Validation complète
- Création d'utilisateur dans IndexedDB
- Vérification des doublons
- Redirection vers signup.html après succès

### 5. **dashboard.html**
**Objectif:** Tableau de bord principal avec toutes les informations financières

**Sections principales:**

#### A. Welcome Card
- Affiche le prénom de l'utilisateur connecté
- Message d'alerte personnalisé

#### B. Balance Banner
- Solde Actuel (Revenus - Dépenses)
- Solde Disponible (Solde Actuel - Épargnes - Budgets Business)
- Épargne Totale

#### C. Cartes de Statistiques
- Solde Actuel avec évolution
- Épargne Totale avec ratio et objectif
- Dépenses Totales avec ratio

#### D. Transactions Récentes
- Affiche les 5 dernières transactions
- Icônes et couleurs selon le type
- Montants formatés

#### E. Cagnottes d'Épargne
- 3 cagnottes prédéfinies:
  - Voyage au Japon (5M FCFA)
  - Nouvelle voiture (10M FCFA)
  - Apport maison (50M FCFA)
- Bocal animé avec liquide coloré
- Pourcentage de remplissage
- Bouton "Ajouter des fonds"

#### F. Mes Prêts
- 3 prêts prédéfinis:
  - Prêt Automobile
  - Prêt Étudiant
  - Prêt Immobilier
- Affichage du montant remboursé
- Montant total du prêt
- Montant restant à payer
- Bouton + pour ajouter un paiement

#### G. Modal Ajouter Transaction
- Onglet Formulaire:
  - Type (Revenu, Salaire, Épargne, Dépense)
  - Catégorie
  - Description
  - Montant
  - Date
- Onglet Scanner:
  - Ouvrir la caméra
  - Choisir une image
  - OCR automatique avec Tesseract.js

#### H. Bouton Flottant
- Bouton + pour ajouter une transaction
- Ouvre le modal de transaction

### 6. **businessetprofil.html**
**Objectif:** Gestion du profil utilisateur et des business

**Sections:**

#### A. Welcome Banner
- Affiche le prénom de l'utilisateur

#### B. Onglet Business
- Affiche les business de l'utilisateur
- Bouton "Nouveau Business"
- Liste des business avec:
  - Nom
  - Description
  - Catégorie
  - Budget
  - Statut
  - Options (Modifier, Supprimer)

#### C. Onglet Profil
- Avatar avec initiales
- Nom complet avec couronne
- Statistiques:
  - Nombre de transactions
  - Épargne totale
  - Solde actuel
  - Revenus totaux
- Informations personnelles:
  - Prénom
  - Nom
  - Nom d'utilisateur
  - Solde actuel
- Achievements (réalisations)
- Zone dangereuse (Déconnexion)

#### D. Modal Ajouter Business
- Nom du business
- Description
- Catégorie (Commerce, Services, Technologie, Agriculture, Artisanat)
- Budget estimé
- Statut (Idée, En cours, Actif, Suspendu)

### 7. **historique.html**
**Objectif:** Afficher l'historique complet et les analyses

**Sections:**

#### A. Header
- Titre "Historique Complet"
- Nombre de transactions

#### B. Statistiques
- Total Revenus
- Total Dépenses
- Solde Net
- Nombre de Transactions

#### C. Informations
- Plus Grande Transaction
- Catégories Actives
- Période Analysée

#### D. Filtres
- 7 derniers jours
- 30 derniers jours
- Cette année
- Tout l'historique

#### E. Graphiques (5 au total)
1. **Revenus vs Dépenses** (Bar Chart)
2. **Évolution du Solde** (Line Chart)
3. **Répartition par Catégorie** (Doughnut Chart)
4. **Types de Transactions** (Radar Chart)
5. **Tendance Mensuelle** (Dual Line Chart)

---

## Fichiers JavaScript

### 1. **js/auth.js**
**Objectif:** Gestion de l'authentification

**Fonctions principales:**
- `addUser(user, callback)` - Ajouter un nouvel utilisateur
- `getUserByUsername(username, callback)` - Récupérer un utilisateur
- `updateUser(username, updates, callback)` - Mettre à jour un utilisateur

**Stockage:**
- IndexedDB avec store "users"
- Index sur "username" pour recherche rapide
- Champs: username, password, prenom, nom, createdAt

### 2. **js/db.js**
**Objectif:** Gestion de la base de données IndexedDB

**Stores créés:**
- `users` - Utilisateurs (index: username)
- `transactions` - Transactions (index: username)
- `businesses` - Business (index: username)

**Fonctions principales:**
- `openDB(callback)` - Initialiser la DB
- `ensureDatabaseReady(callback)` - Attendre que la DB soit prête
- `addTransaction(tx, callback)` - Ajouter une transaction
- `getTransactions(username, callback)` - Récupérer les transactions
- `addBusiness(business, callback)` - Ajouter un business
- `getBusinesses(username, callback)` - Récupérer les business

**Version:** 3 (avec support des business)

### 3. **js/session.js**
**Objectif:** Gestion des sessions utilisateur

**Fonctions principales:**
- `checkSession()` - Vérifier si l'utilisateur est connecté
- `logout()` - Déconnecter l'utilisateur
- `displayUserName()` - Afficher le nom de l'utilisateur

**Pages publiques:** pageacceuil.html, signin.html, signup.html, index.html

### 4. **js/navbar.js**
**Objectif:** Gestion de la navigation

**Fonctionnalités:**
- Génération dynamique de la navbar
- Liens de navigation selon la page actuelle
- Bouton de déconnexion
- Affichage du nom d'utilisateur

### 5. **js/transactions.js**
**Objectif:** Gestion des transactions

**Fonctions principales:**
- `addTransaction(transaction, callback)` - Ajouter une transaction
- `getTransactions(username, callback)` - Récupérer les transactions
- `updateAllBalances(username)` - Mettre à jour tous les soldes
- `getUserBalance(callback)` - Obtenir le solde actuel

**Types de transactions:**
- Revenu
- Salaire
- Épargne
- Dépense

**Catégories:**
- Investissement
- Transport
- Santé
- Logement
- Alimentation
- Prêt
- Autre

### 6. **js/dashboard-dynamic.js**
**Objectif:** Contenu dynamique du dashboard

**Fonctionnalités:**
- Chargement des transactions récentes
- Affichage des 5 dernières transactions
- Gestion des boutons des cagnottes
- Modal pour ajouter des fonds aux cagnottes

### 7. **js/sync-data.js**
**Objectif:** Synchronisation des données entre les pages

**Fonctionnalités:**
- Affichage du nom d'utilisateur partout
- Synchronisation des soldes
- Synchronisation du nombre de transactions
- Synchronisation des revenus et dépenses

**Appelé par:** Toutes les pages principales

### 8. **js/savings-cards.js**
**Objectif:** Gestion des cagnottes d'épargne

**Fonctionnalités:**
- Chargement dynamique des cagnottes
- Calcul du pourcentage de remplissage
- Animation du liquide coloré
- Création de bulles d'animation
- Gestion des boutons "Ajouter des fonds"

**Objectifs par défaut:**
- Voyage au Japon: 5 000 000 FCFA
- Nouvelle voiture: 10 000 000 FCFA
- Apport maison: 50 000 000 FCFA

### 9. **js/loans.js**
**Objectif:** Gestion des prêts

**Fonctionnalités:**
- Initialisation des boutons de paiement
- Modal de paiement de prêt
- Enregistrement des paiements comme transactions
- Calcul du montant remboursé et restant
- Affichage du pourcentage remboursé

**Champs du modal:**
- Montant à payer
- Date d'échéance
- Description
- Montant total du prêt
- Montant déjà remboursé

### 10. **js/business.js**
**Objectif:** Gestion des business

**Fonctionnalités:**
- Chargement des business de l'utilisateur
- Affichage des business avec cartes
- Modal pour créer/éditer un business
- Suppression de business
- Stockage dans IndexedDB

**Champs:**
- Nom
- Description
- Catégorie
- Budget
- Statut

### 11. **js/charts.js**
**Objectif:** Création des graphiques d'analyse

**Graphiques créés:**
1. Revenus vs Dépenses (Bar Chart)
2. Évolution du Solde (Line Chart)
3. Répartition par Catégorie (Doughnut Chart)
4. Types de Transactions (Radar Chart)
5. Tendance Mensuelle (Dual Line Chart)

**Librairie:** Chart.js

### 12. **js/ocr.js**
**Objectif:** Scanner de reçus avec OCR

**Fonctionnalités:**
- Ouverture de la caméra
- Upload d'image
- Extraction de texte avec Tesseract.js
- Détection du montant, description, date
- Auto-remplissage du formulaire

**Librairie:** Tesseract.js

### 13. **js/ai.js**
**Objectif:** Assistant IA pour recommandations

**Fonctionnalités:**
- Analyse des données financières
- Génération de recommandations
- Chat conversationnel
- Widget flottant
- Réponses basées sur les ratios financiers

**Ratios analysés:**
- Ratio d'épargne
- Ratio de dépenses
- Santé du solde

### 14. **js/savings-animation.js**
**Objectif:** Animations des cagnottes (DEPRECATED - remplacé par savings-cards.js)

---

## Fichiers CSS

### 1. **theme.css**
**Objectif:** Thème global de l'application

**Contient:**
- Variables CSS (couleurs, espacements)
- Styles globaux
- Thème sombre cohérent
- Gradients et effets

### 2. **dashboard.css**
**Objectif:** Styles du dashboard

**Sections stylisées:**
- Balance banner
- Cartes de statistiques
- Transactions
- Cagnottes d'épargne
- Prêts
- Animations du liquide
- Notifications

### 3. **businessetprofil.css**
**Objectif:** Styles du profil et business

**Sections stylisées:**
- Profil utilisateur
- Avatar
- Cartes de business
- Achievements
- Modals

### 4. **historique.css**
**Objectif:** Styles de la page historique

**Sections stylisées:**
- Statistiques
- Filtres
- Graphiques
- Cartes d'information

### 5. **style/projet1.css**
**Objectif:** Styles des pages d'authentification

**Sections stylisées:**
- Formulaires
- Inputs
- Boutons
- Animations
- Bulles de fond
- Responsive design

---

## Base de données

### IndexedDB Structure

#### Store: users
```javascript
{
  username: "wabo",
  password: "hashed_password",
  prenom: "Wabo",
  nom: "User",
  createdAt: "2024-01-13T10:00:00Z"
}
```

#### Store: transactions
```javascript
{
  username: "wabo",
  type: "depense", // revenu, salaire, epargne, depense
  category: "alimentation",
  description: "Achat au marché",
  amount: 50000,
  date: "2024-01-13",
  createdAt: "2024-01-13T10:00:00Z",
  loanInfo: { // optionnel pour les prêts
    loanTitle: "Prêt Automobile",
    totalLoan: 5000000,
    alreadyPaid: 1000000,
    newPayment: 500000,
    totalPaid: 1500000,
    remaining: 3500000
  }
}
```

#### Store: businesses
```javascript
{
  username: "wabo",
  name: "Ma Boutique",
  description: "Boutique en ligne",
  category: "commerce",
  budget: 2000000,
  status: "actif", // idee, en-cours, actif, suspendu
  createdAt: "2024-01-13T10:00:00Z",
  updatedAt: "2024-01-13T10:00:00Z"
}
```

---

## Fonctionnalités principales

### 1. Authentification
- Inscription avec validation
- Connexion sécurisée
- Gestion des sessions
- Déconnexion

### 2. Gestion des Transactions
- Ajout de transactions (Revenu, Salaire, Épargne, Dépense)
- Catégorisation
- Dates personnalisées
- Scanner de reçus avec OCR
- Historique complet

### 3. Tableau de Bord
- Vue d'ensemble financière
- Soldes en temps réel
- Transactions récentes
- Statistiques

### 4. Cagnottes d'Épargne
- 3 cagnottes prédéfinies
- Objectifs personnalisables
- Animation du liquide coloré
- Suivi du progrès
- Ajout de fonds

### 5. Gestion des Prêts
- 3 prêts prédéfinis
- Enregistrement des paiements
- Suivi du remboursement
- Calcul du montant restant
- Historique des paiements

### 6. Gestion des Business
- Création de business
- Catégorisation
- Suivi du budget
- Statuts (Idée, En cours, Actif, Suspendu)
- Édition et suppression

### 7. Profil Utilisateur
- Affichage des informations
- Édition du profil
- Avatar avec initiales
- Achievements
- Statistiques personnelles

### 8. Analyses et Graphiques
- 5 graphiques interactifs
- Revenus vs Dépenses
- Évolution du solde
- Répartition par catégorie
- Types de transactions
- Tendance mensuelle

### 9. Assistant IA
- Recommandations financières
- Chat conversationnel
- Analyse des ratios
- Suggestions d'amélioration

### 10. Synchronisation des Données
- Données cohérentes entre les pages
- Mise à jour en temps réel
- Filtrage par utilisateur

---

## Flux d'utilisation

### 1. Inscription
1. Utilisateur accède à pageacceuil.html
2. Clique sur "S'inscrire"
3. Remplit le formulaire signin.html
4. Données enregistrées dans IndexedDB
5. Redirection vers signup.html

### 2. Connexion
1. Utilisateur accède à signup.html
2. Entre ses identifiants
3. Vérification dans IndexedDB
4. Redirection vers dashboard.html
5. Session créée dans localStorage

### 3. Ajout de Transaction
1. Utilisateur clique sur le bouton +
2. Remplit le formulaire ou scanne un reçu
3. Transaction enregistrée dans IndexedDB
4. Soldes mis à jour automatiquement
5. Données synchronisées sur toutes les pages

### 4. Gestion des Cagnottes
1. Utilisateur clique sur "Ajouter des fonds"
2. Remplit le montant et la description
3. Transaction d'épargne créée
4. Cagnotte mise à jour avec animation
5. Pourcentage recalculé

### 5. Paiement de Prêt
1. Utilisateur clique sur le bouton + du prêt
2. Remplit le formulaire de paiement
3. Transaction de dépense créée
4. Montant remboursé mis à jour
5. Pourcentage recalculé

---

## Sécurité et Bonnes Pratiques

### Sécurité
- Stockage local avec IndexedDB
- Pas de transmission de données sensibles
- Validation des entrées
- Gestion des sessions

### Performance
- Chargement asynchrone
- Mise en cache des données
- Animations optimisées
- Requêtes DB minimisées

### UX/UI
- Design responsive
- Animations fluides
- Notifications claires
- Navigation intuitive
- Thème sombre cohérent

---

## Conclusion

Cette application offre une solution complète de gestion financière personnelle avec:
- Interface intuitive et moderne
- Fonctionnalités avancées (OCR, IA, graphiques)
- Données synchronisées en temps réel
- Stockage local sécurisé
- Design responsive et animations fluides

L'architecture modulaire permet une maintenance facile et des extensions futures.
