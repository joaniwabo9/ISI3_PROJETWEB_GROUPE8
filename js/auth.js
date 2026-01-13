const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        if (!db) {
            alert("Base de données non prête. Recharge la page.");
            return;
        }

        const prenom = document.getElementById("prenom").value.trim();
        const nom = document.getElementById("nom").value.trim();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!prenom || !nom || !username || !password) {
            alert("Tous les champs sont obligatoires !");
            return;
        }

        // Vérifier si le username existe
        getUserByUsername(username, function(user) {
            if (user) {
                alert("Ce nom d'utilisateur existe déjà !");
                return;
            }

            // Ajouter le user
            addUser({ prenom, nom, username, password }, function(success) {
                if (success) {
                    alert(`Inscription réussie ! Bienvenue ${prenom}`);
                    window.location.href = "signup.html";
                } else {
                    alert("Erreur lors de l'inscription.");
                }
            });
        });
    });
}
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!db) { alert("DB non prête"); return; }

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        getUserByUsername(username, function(user) {
            if(!user || user.password !== password){
                alert("Nom d'utilisateur ou mot de passe incorrect");
                return;
            }
            sessionStorage.setItem("userId", user.id);
            sessionStorage.setItem("prenom", user.prenom);
            window.location.href = "dashboard.html";
        });
    });
}