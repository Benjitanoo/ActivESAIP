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

// Récupère le dossier "Ressources"
const ressourcesFolder = "Ressources/";

// Récupère toutes les images du dossier
const images = document.querySelectorAll(`img[src^="${ressourcesFolder}"]`);

// Met à jour le nombre d'images dans le diaporama
document.querySelector("#slideshow-count").innerHTML = images.length;

// Affiche chaque image dans le diaporama
images.forEach((image, index) => {
  // Crée un élément de diapositive pour l'image
  const slide = document.createElement("div");
  slide.classList.add("slide");

  // Crée l'élément d'image
  const img = document.createElement("img");
  img.src = image.src;

  // Ajoute l'image à la diapositive
  slide.appendChild(img);

  // Ajoute la diapositive au diaporama
  document.querySelector("#slideshow").appendChild(slide);
});

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

/*Message back.html vers index.html*/


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

//Requête API StEloi

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var data = JSON.stringify({
    "API_KEY": "5656FD9CF72B47AFBCCE4917CDDF196B",
    "JOUR": "L",
});

var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: data,
    redirect: 'follow'
};

fetch("https://steloi.ogia.fr/ogia_ateliers_api.php", requestOptions)
    .then(response => response.text())
    .then(result => results(result))
    .catch(error => console.log('error', error));

/* Filtre ateliers */    

function results(data) {
    var reponse = JSON.parse(data);
    const debutPeriode = reponse.debut_periode;
    const finPeriode = reponse.fin_periode;
    const periodeEnCours = reponse.periode_en_cours;

    const ateliersContainer = document.getElementById("messages-container");
    const periodeInfo = document.createElement("p");
    periodeInfo.textContent = `Période en cours : ${periodeEnCours} (${debutPeriode} - ${finPeriode})`;
    ateliersContainer.appendChild(periodeInfo);

    for (let i = 1; i <= Object.keys(reponse.ateliers).length; i++) {
        for (let j = 0; j < reponse.ateliers[i].length; j++) {
            const atelier = reponse.ateliers[i][j];
            const horaire = reponse.horaires_creneau[i];
            const info = `${horaire} - ${atelier.intitule} <br> ${atelier.prof} <br> ${atelier.salle}`;
            const atelierInfo = document.createElement("p");
            atelierInfo.innerHTML = info;
            ateliersContainer.appendChild(atelierInfo);
        }
    }
}