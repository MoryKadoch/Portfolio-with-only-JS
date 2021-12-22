lastProjects();

function lastProjects() {
    //récuperation des projets
    let projects = getData('http://localhost:3000/projects?_limit=100&_sort=id&_order=desc');

    //creation du tableau
    let projectsRow = document.getElementById("projects");
    //creation des cellules
    let i = 0;
    projects.forEach(element => {
        let card = document.createElement("div");
        card.classList.add("card", "col-md-2", "mx-auto", "m-2");
        card.style.flex = "none";
        projectsRow.appendChild(card);
        let img = document.createElement("img");
        img.className = "card-img-top";
        img.setAttribute("src", element['image']);
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
        a.classList.add("btn", "btn-primary", "btn-lg", "mx-auto", "m-2");
        a.innerText = "Voir";
        a.setAttribute("href",element['url']);
        a.setAttribute("target","_blank");
        cardBody.appendChild(a);

        ++i;
    });
}