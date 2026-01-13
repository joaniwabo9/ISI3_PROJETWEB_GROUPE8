// db.js
let db = null;

/**
 * OUVERTURE DE LA BASE
 */
const openRequest = indexedDB.open("NIVELO", 3);

openRequest.onupgradeneeded = function (event) {
    db = event.target.result;

    if (!db.objectStoreNames.contains("users")) {
        const store = db.createObjectStore("users", {
            keyPath: "id",
            autoIncrement: true
        });

        store.createIndex("username", "username", { unique: true });
    }

    if (!db.objectStoreNames.contains("transactions")) {
        const transactionStore = db.createObjectStore("transactions", {
            keyPath: "id",
            autoIncrement: true
        });

        transactionStore.createIndex("username", "username", { unique: false });
        transactionStore.createIndex("date", "date", { unique: false });
    }

    if (!db.objectStoreNames.contains("businesses")) {
        const businessStore = db.createObjectStore("businesses", {
            keyPath: "id",
            autoIncrement: true
        });

        businessStore.createIndex("username", "username", { unique: false });
        businessStore.createIndex("createdAt", "createdAt", { unique: false });
    }
};

openRequest.onsuccess = function (event) {
    db = event.target.result;
    console.log("✅ IndexedDB prête");
};

openRequest.onerror = function () {
    console.error("❌ Impossible d’ouvrir IndexedDB");
};

/**
 * AJOUT UTILISATEUR
 */
function addUser(user, callback) {
    if (!db) {
        console.error("DB non prête");
        return;
    }

    const tx = db.transaction("users", "readwrite");
    const store = tx.objectStore("users");
    const req = store.add(user);

    req.onsuccess = () => callback(true);
    req.onerror = () => callback(false);
}

/**
 * RÉCUPÉRER UN UTILISATEUR PAR USERNAME
 */
function getUserByUsername(username, callback) {
    if (!db) {
        console.error("DB non prête");
        return;
    }

    const tx = db.transaction("users", "readonly");
    const store = tx.objectStore("users");
    const index = store.index("username");

    const req = index.get(username);

    req.onsuccess = () => callback(req.result || null);
    req.onerror = () => callback(null);
}
// Ajouter une transaction
function addTransaction(transactionObj, callback) {
    if (!db) {
        console.error("DB non prête");
        callback(false);
        return;
    }
    
    const transaction = db.transaction("transactions", "readwrite");
    const store = transaction.objectStore("transactions");
    const request = store.add(transactionObj);

    request.onsuccess = function() { 
        console.log("✅ Transaction ajoutée");
        callback(true); 
    };
    request.onerror = function() { 
        console.error("❌ Erreur lors de l'ajout de la transaction:", request.error);
        callback(false); 
    };
}

// Récupérer toutes les transactions d'un utilisateur
function getTransactions(username, callback) {
    if (!db) {
        console.error("❌ DB non prête pour getTransactions");
        callback([]);
        return;
    }
    
    const transaction = db.transaction("transactions", "readonly");
    const store = transaction.objectStore("transactions");
    const index = store.index("username");

    const request = index.getAll(IDBKeyRange.only(username));
    request.onsuccess = function() { callback(request.result); };
    request.onerror = function() { callback([]); };
}

// Calculer le solde d'un utilisateur
function calculateBalance(username, callback) {
    getTransactions(username, function(transactions) {
        let balance = 0;
        transactions.forEach(tx => {
            if (tx.type === "revenu" || tx.type === "epargne") balance += tx.amount;
            else if (tx.type === "depense") balance -= tx.amount;
        });
        callback(balance);
    });
}



// Fonction pour réinitialiser la base de données
function resetDatabase() {
    const deleteRequest = indexedDB.deleteDatabase("NIVELO");
    deleteRequest.onsuccess = function() {
        console.log("✅ Base de données supprimée");
        // Ne pas recharger la page, laisser le navigateur recréer la DB
        location.reload();
    };
    deleteRequest.onerror = function() {
        console.error("❌ Erreur lors de la suppression de la base de données");
    };
}

// Vérifier si la DB existe et la créer si nécessaire
function ensureDatabaseReady(callback) {
    if (db) {
        callback();
        return;
    }
    
    // Attendre que la DB soit prête
    const checkInterval = setInterval(() => {
        if (db) {
            clearInterval(checkInterval);
            callback();
        }
    }, 50);
    
    // Timeout après 5 secondes
    setTimeout(() => {
        clearInterval(checkInterval);
        if (!db) {
            console.error("❌ DB n'a pas pu être initialisée");
        }
    }, 5000);
}

// Ajouter un business
function addBusiness(businessObj, callback) {
    if (!db) {
        console.error("DB non prête");
        callback(false);
        return;
    }
    
    const transaction = db.transaction("businesses", "readwrite");
    const store = transaction.objectStore("businesses");
    const request = store.add(businessObj);

    request.onsuccess = function() { 
        console.log("✅ Business ajouté");
        callback(true); 
    };
    request.onerror = function() { 
        console.error("❌ Erreur lors de l'ajout du business:", request.error);
        callback(false); 
    };
}

// Récupérer tous les businesses d'un utilisateur
function getBusinesses(username, callback) {
    if (!db) {
        console.error("❌ DB non prête pour getBusinesses");
        callback([]);
        return;
    }
    
    const transaction = db.transaction("businesses", "readonly");
    const store = transaction.objectStore("businesses");
    const index = store.index("username");

    const request = index.getAll(IDBKeyRange.only(username));
    request.onsuccess = function() { callback(request.result); };
    request.onerror = function() { callback([]); };
}

// Mettre à jour un business
function updateBusiness(businessId, businessObj, callback) {
    if (!db) {
        console.error("DB non prête");
        callback(false);
        return;
    }
    
    const transaction = db.transaction("businesses", "readwrite");
    const store = transaction.objectStore("businesses");
    businessObj.id = businessId;
    const request = store.put(businessObj);

    request.onsuccess = function() { 
        console.log("✅ Business mis à jour");
        callback(true); 
    };
    request.onerror = function() { 
        console.error("❌ Erreur lors de la mise à jour du business:", request.error);
        callback(false); 
    };
}

// Supprimer un business
function deleteBusiness(businessId, callback) {
    if (!db) {
        console.error("DB non prête");
        callback(false);
        return;
    }
    
    const transaction = db.transaction("businesses", "readwrite");
    const store = transaction.objectStore("businesses");
    const request = store.delete(businessId);

    request.onsuccess = function() { 
        console.log("✅ Business supprimé");
        callback(true); 
    };
    request.onerror = function() { 
        console.error("❌ Erreur lors de la suppression du business:", request.error);
        callback(false); 
    };
}
