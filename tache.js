// Récupérer la liste des tâches depuis le HTML
let listTache = document.getElementById('listtache');

// Appeler la fonction de chargement des tâches au chargement de la page
window.onload = function() {
    loadTasks();
    mettreAJourCompteurs(); // Mettre à jour les compteurs au chargement de la page
};

// Fonction pour ajouter une tâche
function ajoutetest() {
    let taskText = document.getElementById('entre').value;
    let dateValue = document.getElementById('date').value;
    let isPriority = document.getElementById('priority').checked;

    if (taskText === '') {
        return;
    }

    let li = document.createElement('li');
    li.innerHTML =
        `<input class="checkbox" type="checkbox">
        <span> ${taskText} </span>
        <span class="due-date"> Date d'échéance: ${dateValue} </span>`;

    let deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<ion-icon name="trash-outline" class="delete"></ion-icon>';
    deleteButton.onclick = function() {
        deleteTask(li);
    };
    li.appendChild(deleteButton);

    if (isPriority) {
        // Si la tâche est prioritaire, l'ajouter en haut de la liste
        listTache.insertBefore(li, listTache.firstChild);
    } else {
        // Sinon, l'ajouter en bas de la liste
        listTache.appendChild(li);
    }

    // Effacer le contenu de la zone de saisie après l'ajout de la tâche
    document.getElementById('entre').value = '';

    // Mettre à jour les compteurs après chaque ajout de tâche
    mettreAJourCompteurs();

    // Sauvegarder les tâches après chaque ajout
    saveTasks();
}

// Fonction pour supprimer une tâche
function deleteTask(task) {
    listTache.removeChild(task);
    // Mettre à jour les compteurs après chaque suppression de tâche
    mettreAJourCompteurs();
    // Sauvegarder les tâches après chaque suppression
    saveTasks();
}

// Fonction pour mettre à jour les compteurs de tâches achevées et non complétées
function mettreAJourCompteurs() {
    let nombreAchevees = 0;
    let nombreNonCompletes = 0;

    // Parcourir toutes les tâches
    let taches = document.querySelectorAll('#listtache li');
    taches.forEach(function(tache) {
        // Vérifier l'état de la case à cocher de la tâche
        let checkbox = tache.querySelector('.checkbox');
        if (checkbox.checked) {
            // Si la case à cocher est cochée, incrémenter le compteur des tâches achevées
            nombreAchevees++;
        } else {
            // Sinon, incrémenter le compteur des tâches non complétées
            nombreNonCompletes++;
        }

        // Ajouter un gestionnaire d'événements pour le changement d'état de la case à cocher
        checkbox.addEventListener('change', function() {
            mettreAJourCompteurs();
        });
    });

    // Mettre à jour les valeurs des compteurs dans le HTML
    document.getElementById('nombreAchevees').textContent = nombreAchevees;
    document.getElementById('nombreNonCompletes').textContent = nombreNonCompletes;
}

// Fonction pour sauvegarder les tâches dans le stockage local
function saveTasks() {
    let tasksHTML = listTache.innerHTML;
    localStorage.setItem('tasks', tasksHTML);
}

// Fonction pour charger les tâches depuis le stockage local
function loadTasks() {
    let tasksHTML = localStorage.getItem('tasks');
    if (tasksHTML) {
        listTache.innerHTML = tasksHTML;
        // Mettre à jour les compteurs après le chargement des tâches
        mettreAJourCompteurs();
    }
}
