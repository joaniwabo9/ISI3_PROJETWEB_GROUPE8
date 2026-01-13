// Gestion du scanner de reçu avec OCR
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔄 Initialisation du scanner OCR...');
    
    // Éléments du scanner
    const openCameraBtn = document.getElementById('openCameraBtn');
    const uploadImageBtn = document.getElementById('uploadImageBtn');
    const receiptImageInput = document.getElementById('receiptImageInput');
    const receiptPreview = document.getElementById('receiptPreview');
    const previewImage = document.getElementById('previewImage');
    const clearImageBtn = document.getElementById('clearImageBtn');
    const ocrResults = document.getElementById('ocrResults');
    const useOcrDataBtn = document.getElementById('useOcrDataBtn');
    
    if (!openCameraBtn) {
        console.log('⚠️ Éléments du scanner non trouvés');
        return;
    }
    
    // Ouvrir la caméra
    if (openCameraBtn) {
        openCameraBtn.addEventListener('click', function() {
            console.log('📷 Ouverture de la caméra...');
            receiptImageInput.setAttribute('capture', 'environment');
            receiptImageInput.click();
        });
    }
    
    // Uploader une image
    if (uploadImageBtn) {
        uploadImageBtn.addEventListener('click', function() {
            console.log('🖼️ Sélection d\'une image...');
            receiptImageInput.removeAttribute('capture');
            receiptImageInput.click();
        });
    }
    
    // Traiter l'image sélectionnée
    if (receiptImageInput) {
        receiptImageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (!file) return;
            
            console.log('📸 Image sélectionnée:', file.name);
            
            // Afficher l'aperçu
            const reader = new FileReader();
            reader.onload = function(event) {
                previewImage.src = event.target.result;
                receiptPreview.style.display = 'block';
                
                // Lancer l'OCR
                console.log('🔍 Lancement de l\'OCR...');
                performOCR(event.target.result);
            };
            reader.readAsDataURL(file);
        });
    }
    
    // Effacer l'image
    if (clearImageBtn) {
        clearImageBtn.addEventListener('click', function() {
            console.log('🗑️ Effacement de l\'image');
            previewImage.src = '';
            receiptPreview.style.display = 'none';
            ocrResults.style.display = 'none';
            receiptImageInput.value = '';
        });
    }
    
    // Utiliser les données OCR
    if (useOcrDataBtn) {
        useOcrDataBtn.addEventListener('click', function() {
            console.log('✅ Utilisation des données OCR');
            
            const amount = document.getElementById('ocrAmount').textContent;
            const description = document.getElementById('ocrDescription').textContent;
            const date = document.getElementById('ocrDate').textContent;
            
            // Remplir le formulaire
            if (amount && amount !== '-') {
                document.getElementById('transactionAmount').value = parseFloat(amount.replace(/[^\d.]/g, ''));
            }
            
            if (description && description !== '-') {
                document.getElementById('transactionDescription').value = description;
            }
            
            if (date && date !== '-') {
                document.getElementById('transactionDate').value = formatDateForInput(date);
            }
            
            // Basculer vers l'onglet formulaire
            const formTab = document.getElementById('form-tab');
            if (formTab) {
                formTab.click();
            }
            
            console.log('✅ Formulaire rempli avec les données OCR');
        });
    }
});

// Effectuer l'OCR sur l'image
function performOCR(imageData) {
    console.log('🔍 Traitement de l\'image avec OCR...');
    
    // Utiliser Tesseract.js pour l'OCR
    if (typeof Tesseract === 'undefined') {
        console.warn('⚠️ Tesseract.js non chargé, utilisation de la reconnaissance simple');
        performSimpleOCR(imageData);
        return;
    }
    
    Tesseract.recognize(imageData, 'fra')
        .then(result => {
            console.log('✅ OCR complété');
            console.log('📝 Texte extrait:', result.data.text);
            
            // Analyser le texte
            analyzeReceiptText(result.data.text);
        })
        .catch(err => {
            console.error('❌ Erreur OCR:', err);
            performSimpleOCR(imageData);
        });
}

// OCR simple basée sur des patterns
function performSimpleOCR(imageData) {
    console.log('🔍 Utilisation de la reconnaissance simple...');
    
    // Créer une image pour l'analyse
    const img = new Image();
    img.onload = function() {
        // Extraire les données de base
        const extractedData = {
            amount: extractAmount(imageData),
            description: 'Reçu scanné',
            date: new Date().toISOString().split('T')[0]
        };
        
        displayOCRResults(extractedData);
    };
    img.src = imageData;
}

// Analyser le texte du reçu
function analyzeReceiptText(text) {
    console.log('📊 Analyse du texte du reçu...');
    
    const extractedData = {
        amount: extractAmountFromText(text),
        description: extractDescription(text),
        date: extractDate(text)
    };
    
    console.log('📋 Données extraites:', extractedData);
    displayOCRResults(extractedData);
}

// Extraire le montant du texte
function extractAmountFromText(text) {
    console.log('💰 Extraction du montant...');
    
    // Patterns pour les montants
    const patterns = [
        /total\s*:?\s*(\d+[.,]\d{2})/gi,
        /montant\s*:?\s*(\d+[.,]\d{2})/gi,
        /prix\s*:?\s*(\d+[.,]\d{2})/gi,
        /(\d+[.,]\d{2})\s*fcfa/gi,
        /(\d+[.,]\d{2})\s*f/gi,
        /(\d{1,6}[.,]\d{2})/g
    ];
    
    for (let pattern of patterns) {
        const match = text.match(pattern);
        if (match) {
            const amount = match[match.length - 1].replace(',', '.');
            console.log('✅ Montant trouvé:', amount);
            return amount;
        }
    }
    
    console.log('⚠️ Aucun montant trouvé');
    return '';
}

// Extraire la description
function extractDescription(text) {
    console.log('📝 Extraction de la description...');
    
    // Prendre les premières lignes significatives
    const lines = text.split('\n').filter(line => line.trim().length > 0);
    
    for (let line of lines) {
        if (line.length > 5 && line.length < 100 && !line.match(/^\d+/)) {
            console.log('✅ Description trouvée:', line);
            return line.substring(0, 50);
        }
    }
    
    return 'Reçu scanné';
}

// Extraire la date
function extractDate(text) {
    console.log('📅 Extraction de la date...');
    
    // Patterns pour les dates
    const patterns = [
        /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/,
        /(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/,
        /(\d{1,2})\s+(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)\s+(\d{4})/i
    ];
    
    for (let pattern of patterns) {
        const match = text.match(pattern);
        if (match) {
            console.log('✅ Date trouvée:', match[0]);
            return formatDateForInput(match[0]);
        }
    }
    
    console.log('⚠️ Aucune date trouvée');
    return new Date().toISOString().split('T')[0];
}

// Extraire le montant de l'image (fallback)
function extractAmount(imageData) {
    console.log('💰 Extraction du montant (fallback)...');
    return '';
}

// Afficher les résultats OCR
function displayOCRResults(data) {
    console.log('🎨 Affichage des résultats OCR...');
    
    const ocrResults = document.getElementById('ocrResults');
    const ocrAmount = document.getElementById('ocrAmount');
    const ocrDescription = document.getElementById('ocrDescription');
    const ocrDate = document.getElementById('ocrDate');
    
    if (ocrAmount) {
        ocrAmount.textContent = data.amount || '-';
    }
    
    if (ocrDescription) {
        ocrDescription.textContent = data.description || '-';
    }
    
    if (ocrDate) {
        ocrDate.textContent = data.date || '-';
    }
    
    if (ocrResults) {
        ocrResults.style.display = 'block';
    }
    
    console.log('✅ Résultats affichés');
}

// Formater la date pour l'input
function formatDateForInput(dateString) {
    console.log('📅 Formatage de la date:', dateString);
    
    try {
        // Essayer différents formats
        let date;
        
        // Format DD/MM/YYYY ou DD-MM-YYYY
        if (dateString.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/)) {
            const parts = dateString.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
            date = new Date(parts[3], parts[2] - 1, parts[1]);
        }
        // Format YYYY/MM/DD ou YYYY-MM-DD
        else if (dateString.match(/(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/)) {
            const parts = dateString.match(/(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/);
            date = new Date(parts[1], parts[2] - 1, parts[3]);
        }
        // Format texte (jour mois année)
        else if (dateString.match(/(\d{1,2})\s+(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)\s+(\d{4})/i)) {
            const months = {
                'janvier': 0, 'février': 1, 'mars': 2, 'avril': 3, 'mai': 4, 'juin': 5,
                'juillet': 6, 'août': 7, 'septembre': 8, 'octobre': 9, 'novembre': 10, 'décembre': 11
            };
            const parts = dateString.match(/(\d{1,2})\s+(\w+)\s+(\d{4})/i);
            const month = months[parts[2].toLowerCase()];
            date = new Date(parts[3], month, parts[1]);
        }
        else {
            date = new Date();
        }
        
        // Formater en YYYY-MM-DD
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        const formatted = `${year}-${month}-${day}`;
        console.log('✅ Date formatée:', formatted);
        return formatted;
    } catch (e) {
        console.error('❌ Erreur lors du formatage de la date:', e);
        return new Date().toISOString().split('T')[0];
    }
}
