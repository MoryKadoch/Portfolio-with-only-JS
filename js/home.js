lastProjects();

function lastProjects() {
    //récuperation des projets
    let projects = getData('http://localhost:3000/projects?_limit=100&_sort=name&_order=asc');
    //creation du tableau
    let projectsRow = document.getElementById("projects");
    //creation des cellules
    let i = 0;
    projects.forEach(element => {
        let card = document.createElement("div");
        card.classList.add("card", "col-md-2", "mx-auto", "m-2", "cardProject");
        card.style.cssText = 'margin: 0 auto;margin-left:4px !important;margin-bottom:4px !important;float: none;margin - bottom: 10 px;flex: none ';
        projectsRow.appendChild(card);
        let img = document.createElement("img");
        img.className = "card-img-top";
        let imgSrc = element["image"].split(";");
        img.setAttribute("src", imgSrc[0]);
        card.appendChild(img);
        let cardBody = document.createElement("div");
        cardBody.className = "card-body";
        card.appendChild(cardBody);
        let title = document.createElement("h5");
        title.className = "card-title";
        title.innerText = element['name'];
        cardBody.appendChild(title);
        let p = document.createElement("p");
        p.className = "card-text";
        p.innerText = element['description'];
        cardBody.appendChild(p);
        let a = document.createElement("a");
        a.classList.add("btn", "btn-primary", "btn-lg", "mx-auto", "m-2", "text-white");
        a.innerText = "Voir";
        a.setAttribute("onclick", "modalProject(" + element['id'] + ")");
        a.setAttribute("data-target", "modalProject");
        a.setAttribute("data-toggle", "modal");
        a.setAttribute("target", "_blank");
        cardBody.appendChild(a);

        ++i;
    });
}

//pour voir un projet individuellement
function modalProject(id) {
    let project = getData('http://localhost:3000/projects/' + id);
    document.getElementById("name").innerHTML = project['name'];
    document.getElementById("description").innerHTML = project['description'];
    document.getElementById("url").setAttribute("href", project['url']);
    let allImg = project["image"].split(";");
    //on vide la gallery sinon on aura toute les images cumulées
    document.getElementById("gallery").innerHTML="";
    allImg.forEach(element => {
        if (checkIfImage(element)) {
            let img = document.createElement("img");
            img.setAttribute("src", element);
            img.classList.add("imgProject", "m-2");
            document.getElementById("gallery").appendChild(img);
        }
        if (checkIfYoutube(element)) {
            let player = '<iframe width="560" height="315" src="' + element + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
            document.getElementById("gallery").innerHTML += player;
        }
    });
}

function checkIfImage(url) {
    return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

function checkIfYoutube(url) {
    let p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url.match(p)) {
        return url.match(p)[1];
    }
    return false;
}