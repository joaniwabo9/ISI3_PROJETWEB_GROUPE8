// Gestion des business
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔄 Initialisation de la gestion des business...');
    
    // Attendre que la DB soit prête
    ensureDatabaseReady(function() {
        console.log('✅ DB prête pour les business');
        
        // Charger les businesses
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            const user = JSON.parse(loggedInUser);
            loadBusinesses(user.username);
        }
        
        // Ajouter les event listeners aux boutons
        setupBusinessButtons();
    });
});

// Configurer les boutons des business
function setupBusinessButtons() {
    console.log('🎯 Configuration des boutons des business...');
    
    // Bouton "Nouveau Business"
    const newBusinessBtn = document.querySelector('.btn-primary-gradient');
    if (newBusinessBtn) {
        newBusinessBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('📝 Bouton Nouveau Business cliqué');
            showBusinessFormModal('new');
        });
    }
    
    // Bouton "Ajouter mon premier business"
    const addFirstBusinessBtn = document.querySelectorAll('.btn-primary-gradient');
    if (addFirstBusinessBtn.length > 1) {
        addFirstBusinessBtn[1].addEventListener('click', function(e) {
            e.preventDefault();
            console.log('📝 Bouton Ajouter mon premier business cliqué');
            showBusinessFormModal('new');
        });
    }
    
    console.log('✅ Boutons des business configurés');
}

// Charger et afficher les businesses
function loadBusinesses(username) {
    console.log('📋 Chargement des businesses pour:', username);
    
    getBusinesses(username, function(businesses) {
        console.log('📊 Businesses trouvés:', businesses.length);
        
        const contentBusiness = document.getElementById('content-business');
        if (!contentBusiness) {
            console.error('❌ Container content-business non trouvé');
            return;
        }
        
        if (businesses.length === 0) {
            console.log('⚠️ Aucun business');
            return;
        }
        
        // Afficher les businesses
        displayBusinesses(businesses, contentBusiness);
        
        // Mettre à jour le nombre de businesses
        const businessCount = contentBusiness.querySelector('small');
        if (businessCount) {
            businessCount.textContent = `${businesses.length} business${businesses.length > 1 ? 's' : ''} en gestion`;
        }
    });
}

// Afficher les businesses
function displayBusinesses(businesses, container) {
    console.log('🎨 Affichage des businesses...');
    
    // Trouver la section vide et la remplacer
    const emptySection = container.querySelector('.text-center.py-5.mt-4');
    if (emptySection) {
        emptySection.remove();
    }
    
    // Créer le container pour les cartes
    let businessCardsContainer = container.querySelector('.business-cards-container');
    if (!businessCardsContainer) {
        businessCardsContainer = document.createElement('div');
        businessCardsContainer.className = 'business-cards-container row g-4';
        container.appendChild(businessCardsContainer);
    }
    
    // Ajouter les cartes
    businesses.forEach(business => {
        const card = document.createElement('div');
        card.className = 'col-md-6 col-lg-4';
        
        const statusColor = {
            'idee': 'warning',
            'en-cours': 'info',
            'actif': 'success',
            'suspendu': 'danger'
        }[business.status] || 'secondary';
        
        card.innerHTML = `
            <div class="card bg-dark-card border-light h-100 shadow-sm">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start mb-3">
                        <div>
                            <h5 class="card-title text-white mb-1">${business.name}</h5>
                            <span class="badge bg-${statusColor}">${business.status}</span>
                        </div>
                        <div class="dropdown">
                            <button class="btn btn-sm btn-dark-nav" type="button" data-bs-toggle="dropdown">
                                <i class="bi bi-three-dots-vertical"></i>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-dark">
                                <li><a class="dropdown-item edit-business-btn" href="#" data-business-id="${business.id}">
                                    <i class="bi bi-pencil me-2"></i>Modifier
                                </a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item text-danger delete-business-btn" href="#" data-business-id="${business.id}">
                                    <i class="bi bi-trash me-2"></i>Supprimer
                                </a></li>
                            </ul>
                        </div>
                    </div>
                    
                    <p class="card-text text-muted small mb-3">${business.description}</p>
                    
                    <div class="row g-2 mb-3">
                        <div class="col-6">
                            <small class="text-muted d-block">Catégorie</small>
                            <span class="text-white">${business.category}</span>
                        </div>
                        <div class="col-6">
                            <small class="text-muted d-block">Budget</small>
                            <span class="text-white">${business.budget.toLocaleString('fr-FR', {maximumFractionDigits: 0})} FCFA</span>
                        </div>
                    </div>
                    
                    <small class="text-muted">
                        <i class="bi bi-calendar-alt me-1"></i>
                        ${new Date(business.createdAt).toLocaleDateString('fr-FR')}
                    </small>
                </div>
            </div>
        `;
        
        businessCardsContainer.appendChild(card);
        
        // Ajouter les event listeners
        const editBtn = card.querySelector('.edit-business-btn');
        const deleteBtn = card.querySelector('.delete-business-btn');
        
        if (editBtn) {
            editBtn.addEventListener('click', function(e) {
                e.preventDefault();
                showBusinessFormModal('edit', business.id, business);
            });
        }
        
        if (deleteBtn) {
            deleteBtn.addEventListener('click', function(e) {
                e.preventDefault();
                if (confirm('Êtes-vous sûr de vouloir supprimer ce business ?')) {
                    deleteBusiness(business.id, function(success) {
                        if (success) {
                            console.log('✅ Business supprimé');
                            location.reload();
                        } else {
                            alert('Erreur lors de la suppression du business');
                        }
                    });
                }
            });
        }
    });
    
    console.log('✅ Businesses affichés');
}

// Afficher le modal du formulaire business
function showBusinessFormModal(mode, businessId = null, businessData = null) {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        alert('Vous devez être connecté');
        return;
    }
    
    const user = JSON.parse(loggedInUser);
    const title = mode === 'new' ? 'Créer un nouveau business' : 'Éditer le business';
    const icon = mode === 'new' ? 'bi-plus-circle' : 'bi-pencil-square';
    
    let modalHTML = `
        <div class="modal fade" id="businessFormModal" tabindex="-1" aria-labelledby="businessFormLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content bg-dark-card border-light">
                    <div class="modal-header border-light bg-gradient-header">
                        <div class="d-flex align-items-center">
                            <div class="modal-icon-wrapper">
                                <i class="bi ${icon}"></i>
                            </div>
                            <div class="ms-3">
                                <h5 class="modal-title text-white mb-0" id="businessFormLabel">${title}</h5>
                                <small class="text-muted">Gérez votre portefeuille d'affaires</small>
                            </div>
                        </div>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="businessForm">
                            <!-- Nom du business -->
                            <div class="mb-4">
                                <label for="businessName" class="form-label text-white fw-600">
                                    <i class="bi bi-briefcase me-2 text-primary"></i>Nom du business
                                </label>
                                <input type="text" class="form-control form-control-lg bg-input border-light text-white" id="businessName" placeholder="Ex: Boutique en ligne" required>
                                <small class="text-muted d-block mt-2">Donnez un nom unique et mémorable</small>
                            </div>

                            <!-- Description -->
                            <div class="mb-4">
                                <label for="businessDescription" class="form-label text-white fw-600">
                                    <i class="bi bi-file-text me-2 text-info"></i>Description
                                </label>
                                <textarea class="form-control form-control-lg bg-input border-light text-white" id="businessDescription" placeholder="Décrivez votre idée de business en détail..." rows="4" required></textarea>
                                <small class="text-muted d-block mt-2">Soyez précis et détaillé</small>
                            </div>

                            <div class="row">
                                <!-- Catégorie -->
                                <div class="col-md-6 mb-4">
                                    <label for="businessCategory" class="form-label text-white fw-600">
                                        <i class="bi bi-tag me-2 text-success"></i>Catégorie
                                    </label>
                                    <select class="form-select form-select-lg bg-input border-light text-white" id="businessCategory" required>
                                        <option value="">Sélectionner une catégorie</option>
                                        <option value="commerce">🛍️ Commerce</option>
                                        <option value="services">🔧 Services</option>
                                        <option value="technologie">💻 Technologie</option>
                                        <option value="agriculture">🌾 Agriculture</option>
                                        <option value="artisanat">🎨 Artisanat</option>
                                        <option value="autre">📌 Autre</option>
                                    </select>
                                </div>

                                <!-- Budget estimé -->
                                <div class="col-md-6 mb-4">
                                    <label for="businessBudget" class="form-label text-white fw-600">
                                        <i class="bi bi-cash-coin me-2 text-warning"></i>Budget estimé (FCFA)
                                    </label>
                                    <input type="number" class="form-control form-control-lg bg-input border-light text-white" id="businessBudget" placeholder="0" min="0" step="1000" required>
                                    <small class="text-muted d-block mt-2">Budget initial estimé</small>
                                </div>
                            </div>

                            <!-- Statut -->
                            <div class="mb-4">
                                <label for="businessStatus" class="form-label text-white fw-600">
                                    <i class="bi bi-circle-fill me-2 text-danger"></i>Statut
                                </label>
                                <select class="form-select form-select-lg bg-input border-light text-white" id="businessStatus" required>
                                    <option value="idee">💡 Idée</option>
                                    <option value="en-cours">⚙️ En cours</option>
                                    <option value="actif">✅ Actif</option>
                                    <option value="suspendu">⏸️ Suspendu</option>
                                </select>
                                <small class="text-muted d-block mt-2">État actuel de votre business</small>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer border-light bg-light-footer">
                        <button type="button" class="btn btn-secondary btn-lg" data-bs-dismiss="modal">
                            <i class="bi bi-x-circle me-2"></i>Annuler
                        </button>
                        <button type="button" class="btn btn-primary-gradient btn-lg" id="saveBusinessBtn">
                            <i class="bi bi-check-circle me-2"></i>${mode === 'new' ? 'Créer' : 'Mettre à jour'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Supprimer l'ancien modal s'il existe
    const oldModal = document.getElementById('businessFormModal');
    if (oldModal) {
        oldModal.remove();
    }
    
    // Ajouter le nouveau modal au DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Pré-remplir le formulaire en mode édition
    if (mode === 'edit' && businessData) {
        document.getElementById('businessName').value = businessData.name;
        document.getElementById('businessDescription').value = businessData.description;
        document.getElementById('businessCategory').value = businessData.category;
        document.getElementById('businessBudget').value = businessData.budget;
        document.getElementById('businessStatus').value = businessData.status;
    }
    
    // Afficher le modal
    const modal = new bootstrap.Modal(document.getElementById('businessFormModal'));
    modal.show();
    
    // Ajouter l'event listener au bouton de sauvegarde
    setTimeout(() => {
        const saveBtn = document.getElementById('saveBusinessBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', function() {
                const name = document.getElementById('businessName').value;
                const description = document.getElementById('businessDescription').value;
                const category = document.getElementById('businessCategory').value;
                const budget = parseFloat(document.getElementById('businessBudget').value);
                const status = document.getElementById('businessStatus').value;
                
                if (!name || !description || !category || !budget || !status) {
                    alert('Veuillez remplir tous les champs');
                    return;
                }
                
                const business = {
                    username: user.username,
                    name: name,
                    description: description,
                    category: category,
                    budget: budget,
                    status: status,
                    createdAt: mode === 'new' ? new Date().toISOString() : businessData.createdAt,
                    updatedAt: new Date().toISOString()
                };
                
                console.log('💾 Enregistrement du business:', business);
                
                if (mode === 'new') {
                    addBusiness(business, function(success) {
                        if (success) {
                            alert('Business créé avec succès !');
                            modal.hide();
                            setTimeout(() => location.reload(), 500);
                        } else {
                            alert('Erreur lors de la création du business');
                        }
                    });
                } else {
                    updateBusiness(businessId, business, function(success) {
                        if (success) {
                            alert('Business mis à jour avec succès !');
                            modal.hide();
                            setTimeout(() => location.reload(), 500);
                        } else {
                            alert('Erreur lors de la mise à jour du business');
                        }
                    });
                }
            });
        }
    }, 300);
}
