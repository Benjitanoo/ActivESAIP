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

let horairesCreneauIndex = 0;
let ateliersIndex = 0;
const horairesContainer = document.querySelector(".horaires");
const ateliersContainer = document.querySelector(".ateliers");

function afficherHorairesEtAteliers(data) {
  const reponse = JSON.parse(data);
  const horairesCreneau = reponse.horaires_creneau;
  const ateliers = reponse.ateliers;
  const horaires = horairesCreneau[horairesCreneauIndex];
  const ateliersDuCreneau = ateliers[horairesCreneauIndex];

  // Affichage des horaires
  horairesContainer.textContent = horaires.join(" - ");

  // Affichage des ateliers
  ateliersContainer.innerHTML = "";
  for (let i = ateliersIndex; i < ateliersDuCreneau.length; i++) {
    const atelier = ateliersDuCreneau[i];
    const info = `<div class="atelier-info">${atelier.intitule} <br> ${atelier.prof} <br> ${atelier.salle}</div>`;
    const atelierDiv = document.createElement("div");
    atelierDiv.classList.add("atelier");
    atelierDiv.innerHTML = info;
    ateliersContainer.appendChild(atelierDiv);
  }

  // Animation de défilement des ateliers
  const ateliersContainerHeight = ateliersContainer.clientHeight;
  const ateliersHeight = ateliersContainer.querySelector(".atelier").clientHeight;
  const ateliersDuration = ateliersDuCreneau.length * (ateliersHeight + 10) * 20; // Durée de l'animation en ms
  ateliersContainer.style.animationDuration = ateliersDuration + "ms";

  // Passage au prochain créneau horaire et à la première liste d'ateliers si on a fini de parcourir la liste actuelle
  if (ateliersIndex === ateliersDuCreneau.length - 1) {
    horairesCreneauIndex = (horairesCreneauIndex + 1) % horairesCreneau.length;
    ateliersIndex = 0;
  } else {
    ateliersIndex++;
  }

  // Si on a parcouru tous les ateliers de tous les créneaux, on recommence depuis le début
  if (horairesCreneauIndex === 0 && ateliersIndex === 0) {
    setTimeout(() => {
      afficherHorairesEtAteliers(data);
    }, ateliersDuration);
  }
}

// Appel initial de la fonction
fetch("https://example.com/data.json")
  .then(response => response.text())
  .then(data => {
    afficherHorairesEtAteliers(data);
  })
  .catch(error => console.log(error));
