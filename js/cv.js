function getCV() {
    let cv = getData('http://localhost:3000/cv/');
    //récuperation des données et affichage dans la page cv
    document.getElementById("photo").setAttribute("src", cv['photo']);
    document.getElementById("name").innerHTML = cv['first_name'];
    document.getElementById("name").innerHTML += ' ' + cv['last_name'];
    document.getElementById("address").innerHTML = cv['address'];
    document.getElementById("phone").innerHTML = cv['phone'];
    document.getElementById("email").innerHTML = cv['email'];
    document.getElementById("about").innerHTML = cv['about'];
    let experiences = cv["experiences"].split(";");
    let formations = cv["formations"].split(";");
    let skills = cv["skills"].split(";");
    let diplomas = cv["diplomas"].split(";");
    generateLiFromArray(experiences, 'experiences');
    generateLiFromArray(formations, 'formations');
    generateLiFromArray(skills, 'skills');
    generateLiFromArray(diplomas, 'diploma');
    //affichage des données dans le formulaire de modification
    document.getElementById("photoEdit").value = cv['photo'];
    document.getElementById("last_nameEdit").value = cv['last_name'];
    document.getElementById("first_nameEdit").value = cv['first_name'];
    document.getElementById("addressEdit").value = cv['address'];
    document.getElementById("phoneEdit").value = cv['phone'];
    document.getElementById("emailEdit").value = cv['email'];
    document.getElementById("aboutEdit").innerHTML = cv['about'];
    document.getElementById("experiencesEdit").innerHTML = cv['experiences'];
    document.getElementById("formationsEdit").innerHTML = cv['formations'];
    document.getElementById("skillsEdit").innerHTML = cv['skills'];
    document.getElementById("diplomasEdit").innerHTML = cv['diplomas'];
}

//fonction pour générer la liste quand on un champ multiple c'est plus pratique
function generateLiFromArray(array, parent) {
    //on vide le parent pour le pas avoir les anciennes et nouvelles infos à la suite en cas de modification
    document.getElementById(parent).innerHTML = "";
    //si le tableau rempli on ajoute la liste sinon on supprime le conteneur et son titre 
    if (array[0]) {
        array.forEach(element => {
            let li = document.createElement("li");
            li.innerText = element;
            document.getElementById(parent).appendChild(li);
        });
    } else {
        document.getElementById(parent).previousElementSibling.remove();
        document.getElementById(parent).remove();
    }
}

getCV(0);

function editCV() {
    params = {
        "photo": document.getElementById("photoEdit").value,
        "first_name": document.getElementById("first_nameEdit").value,
        "last_name": document.getElementById("last_nameEdit").value,
        "address": document.getElementById("addressEdit").value,
        "phone": document.getElementById("phoneEdit").value,
        "email": document.getElementById("emailEdit").value,
        "about": document.getElementById("aboutEdit").value,
        "experiences": document.getElementById("experiencesEdit").value,
        "formations": document.getElementById("formationsEdit").value,
        "skills": document.getElementById("skillsEdit").value,
        "diplomas": document.getElementById("diplomasEdit").value,
    };
    editData('http://localhost:3000/cv/', params);
    setTimeout(function () {
        generateTable();
    }, 100);
    document.getElementById("modalEdit").classList.remove('open');
    setTimeout(function () {
        getCV();
    }, 100);
}

function modalEdit(id) {
    let project = getData('http://localhost:3000/projects/' + id);
    document.getElementById("idEdit").value = project['id'];
    document.getElementById("nameEdit").value = project['name'];
    document.getElementById("descriptionEdit").value = project['description'];
    document.getElementById("urlEdit").value = project['url'];
    document.getElementById("imageEdit").value = project['image'];
}

function deleteTextarea(id) {
    document.getElementById(id).innerHTML = "";
}

document.getElementById("editCVBtn").addEventListener("click", editCV);