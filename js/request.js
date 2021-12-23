//récupérer les données de la base
function getData(url) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.responseText);
}

//ajouter dans la base
function addData(url, params) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(params));
    showAlert("success", "L'ajout a bien été effectué !");
}

//supprimer de la base
function deleteData(url) {
    fetch(url, {
            method: 'DELETE',
        })
        .then(res => res.text()) // or res.json()
        .then(res => console.log(res))
        .then(showAlert("success", "La supression a bien été effectuée !"));
}

//modifier une entrée de la base
function editData(url, params) {
    let xhr = new XMLHttpRequest();
    xhr.open("PATCH", url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log(xhr.status);
            console.log(xhr.responseText);
            showAlert("success", "La modification a bien été effectuée !");
        }
    };
    xhr.send(JSON.stringify(params));
}

//génération d'un int alétoire comme identifiant pour les ajouts dans la base
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}