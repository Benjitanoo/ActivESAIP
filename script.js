

/* Diaporama */




/* Diaporama */


// Variables globales
let compteur = 0 // Compteur qui permettra de savoir sur quelle slide nous sommes
let timer, elements, slides, slideWidth

window.onload = () => {
    // On récupère le conteneur principal du diaporama
    const diapo = document.querySelector(".diapo")

    // On récupère le conteneur de tous les éléments
    elements = document.querySelector(".elements")

    // On récupère un tableau contenant la liste des diapos
    slides = Array.from(elements.children)

    // On calcule la largeur visible du diaporama
    slideWidth = diapo.getBoundingClientRect().width

    // Automatiser le diaporama
    timer = setInterval(slideNext, 4500)

    // Mise en oeuvre du "responsive"
    window.addEventListener("resize", () => {
        slideWidth = diapo.getBoundingClientRect().width
        slideNext()
    })
}

/**
 * Cette fonction fait défiler le diaporama vers la droite
 */
function slideNext() {
    // On incrémente le compteur
    compteur++
    // Si on dépasse la fin du diaporama, on "rembobine"
    if (compteur == slides.length) {
        compteur = 0
    }

    // On calcule la valeur du décalage
    let decal = -slideWidth * compteur
    elements.style.transform = `translateX(${decal}px)`
}

/**
 * Cette fonction fait défiler le diaporama vers la gauche
 */
function slidePrev() {
    // On décrémente le compteur
    compteur--

    // Si on dépasse le début du diaporama, on repart à la fin
    if (compteur < 0) {
        compteur = slides.length - 1
    }

    // On calcule la valeur du décalage
    let decal = -slideWidth * compteur
    elements.style.transform = `translateX(${decal}px)`
}

/**
 * On stoppe le défilement
 */
function stopTimer() {
    clearInterval(timer)
}

/**
 * On redémarre le défilement
 */
function startTimer() {
    timer = setInterval(slideNext, 3500)
}


/*Requête API météo */



/*Requête API météo */


// Récupération des données météo depuis l'API OpenWeatherMap
const apiKey = '1e348b815215aac837e817503347beed'
const city = 'Aix-en-Provence'

fetch(`https://api.openweathermap.org/data/2.5/weather?q=Aix-en-Provence&units=metric&appid=1e348b815215aac837e817503347beed&lang=fr`)
    .then(response => response.json())
    .then(data => {
        // Récupération des informations météo
        const temp = data.main.temp.toFixed(1) + '°C'
        const desc = data.weather[0].description

        // Affichage des informations météo dans le widget
        document.querySelector('#weather-temp').textContent = temp
        document.querySelector('#weather-desc').textContent = desc
    })
    .catch(error => console.log(error))

/*Message index.html*/


function envoyerMessage() {
    // Récupérer la valeur de la zone de texte
    var message = document.getElementById("message").value;
    console.log("Message à envoyer : " + message);

    // Rediriger vers index.html en passant la valeur du message en paramètre de l'URL
    window.location.href = "index.html?message=" + encodeURIComponent(message);
}

document.addEventListener("DOMContentLoaded", function (event) {
    var message = decodeURIComponent(window.location.search.replace("?message=", ""));
    console.log("Message reçu : " + message);
    document.getElementById("message").innerHTML = message;
});

var jourActuel = new Date().toLocaleDateString('fr-FR', { weekday: 'long' });

//MENU

//API ST ELOI
fetch("https://steloi.ogia.fr/ogia_ateliers_api.php", requestOptions)
    .then(response => response.text())
    .then(result => results(result))
    .catch(error => console.log('error', error));

function results(data) {
    var reponse = JSON.parse(data);
    console.log("Objet reponse :");
    console.log(reponse);

    for (var key in reponse.ateliers) {
        var ateliers = reponse.ateliers[key];
        for (var i = 0; i < ateliers.length; i++) {
            var creneau = reponse.horaires_creneau[key][i];
            console.log("Matière: " + ateliers[i].intitule);
            console.log("Horaire début: " + creneau[0]);
            console.log("Horaire fin: " + creneau[1]);
            console.log("Salle de cours: " + ateliers[i].salle);
            console.log("Professeur: " + ateliers[i].prof);
            console.log("");
        }
    }
}



