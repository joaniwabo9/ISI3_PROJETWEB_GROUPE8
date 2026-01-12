document.getElementById("filtre").addEventListener("input", function(){
    const value = this.value.toLowerCase();
    const filtered = transactions.filter(t =>
        t.desc.toLowerCase().includes(value)
    );
    afficherTransactions(filtered);
});

function exportCSV(){
    let csv = "Date,Description,Type,Montant\n";
    transactions.forEach(t=>{
        csv += `${t.date},${t.desc},${t.type},${t.montant}\n`;
    });

    const blob = new Blob([csv], {type:"text/csv"});
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "historique_transactions.csv";
    link.click();
}
// Activation des boutons de filtre
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// Vérification JS
console.log("Dashboard chargé avec succès");

afficherTransactions(transactions);