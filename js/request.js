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

function deleteData(url) {
    fetch(url, {
        method: 'DELETE',
    })
        .then(res => res.text()) // or res.json()
        .then(res => console.log(res))
        .then(showAlert("success", "La supression a bien été effectuée !"));
}

function editData(url, params) {
    var xhr = new XMLHttpRequest();
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

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}