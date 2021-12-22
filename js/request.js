function getData(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false); // false for synchronous request
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.responseText);
}

function addData(url, params) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(params));
    showAlert("success", "L'ajout a bien été effectué !");
}

params = {
    "id": getRandomInt(1000),
    "name": "name",
    "description": "descri",
    "url": "https://mory.fr",
    "image": "lien"
};

function deleteData(url) {
    fetch(url, {
            method: 'DELETE',
        })
        .then(res => res.text()) // or res.json()
        .then(res => console.log(res))
        .then(showAlert("success", "La supression a bien été effectuée !"));
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}