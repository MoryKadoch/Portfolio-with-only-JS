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
  var nav = document.getElementById("nav");
  if (nav.style.display === "none" || nav.style.display === "") {
    nav.style.display = "block";
    document.getElementsByClassName("openNavIconContainer")[0].style.display = "none";
  } else {
    nav.style.display = "none";
    document.getElementsByClassName("openNavIconContainer")[0].style.display = "block";
  }
}

function addEvents() {
  document.getElementsByClassName("closeNavIcon")[0].addEventListener('click', hideShow);
  document.getElementsByClassName("openNavIcon")[0].addEventListener('click', hideShow);
}

window.onload = function () {
  includeHTML();
  setTimeout(function () {
    addEvents();
  }, 200);
}

//utiliser un switch
function showAlert(type, message) {
  if (type === "success") {
    var alert = document.createElement("div");
    alert.classList.add("alert", "alert-success");
    alert.innerText = message;
    document.getElementById('alert').appendChild(alert);
  }
  setTimeout(function() { alert.remove(); }, 3000);  
     
}