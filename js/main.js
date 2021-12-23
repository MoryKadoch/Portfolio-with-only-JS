//function récupérée d'internet pour include les éléments de type nav ou footer
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("include");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /* Remove the attribute, and call this function once more: */
          elmnt.replaceWith(...elmnt.childNodes);
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}

//function pour afficher ou masquer le menu
function hideShow() {
  let nav = document.getElementById("nav");
  if (nav.style.display === "none" || nav.style.display === "") {
    nav.style.display = "block";
    document.getElementsByClassName("openNavIconContainer")[0].style.display = "none";
  } else {
    nav.style.display = "none";
    document.getElementsByClassName("openNavIconContainer")[0].style.display = "block";
  }
}

//ajout des evenements qui doivent être ajoutés en décalé pour executer le js sur les vues qui sont chargées avec la function includeHTML
function addEvents() {
  document.getElementsByClassName("closeNavIcon")[0].addEventListener('click', hideShow);
  document.getElementsByClassName("openNavIcon")[0].addEventListener('click', hideShow);
}

//chargement des vues + ajout des evenements click
window.onload = function () {
  includeHTML();
  setTimeout(function () {
    addEvents();
  }, 200);
}

//function pour gérer les alertes l'idée serait d'alimenter le switch pour gérer les autres erreurs danger, info, etc...
function showAlert(type, message) {
  switch (type) {
    case 'success':
      var alert = document.createElement("div");
      alert.classList.add("alert", "alert-success");
      alert.innerText = message;
      document.getElementById('alert').appendChild(alert);
      break;
    default:
      console.log("Erreur inconnue");
  }
  //suppression de la notif au bout de 3 secondes
  setTimeout(function () {
    alert.remove();
  }, 3000);
}