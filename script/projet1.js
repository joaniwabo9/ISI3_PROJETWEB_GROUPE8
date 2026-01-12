function Password() {


    if (!pEl || !cEl || !vEl) return false;

    const p = pEl.value;
    const c = cEl.value;

    if (p.length < 8) {
        alert("Le mot de passe doit contenir au moins 8 caractères.");
        return false;
    }

    if (p !== c) {
        alert("Les mots de passe ne correspondent pas.");
        return false;
    }

    alert("Compte créé avec succès !");
    return true;
}

const validateBtn = document.getElementById("validate");
if (validateBtn) {
    validateBtn.addEventListener("click", function(event) {
        event.preventDefault();
        if (Password()) {
            const form = this.form;
            if (form) form.submit();
        }
    });
}