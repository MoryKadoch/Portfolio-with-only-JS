generateTable();

function generateTable() {
  //récuperation des projets
  let projects = getData('http://localhost:3000/projects');

  //creation du tableau
  var tbody = document.getElementsByTagName("tbody")[0];

  //vider le tableau au cas ou c'est un refresh ou autre action qui ferait un changement
  tbody.innerHTML = "";
  //creation des cellules
  let i = 0;
  projects.forEach(element => {

    var tr = document.createElement("tr");
    tbody.appendChild(tr);

    for (const [key, value] of Object.entries(element)) {
      var td = document.createElement("td");
      td.innerText = value;
      tr.appendChild(td);


    }
    var td = document.createElement("td");

    //suppression
    var a = document.createElement("a");
    a.innerText = "🗑️";
    a.setAttribute("onclick", "deleteData('http://localhost:3000/projects/" + projects[i]['id'] + "');setTimeout(function() { generateTable(); }, 100); ");
    td.appendChild(a);
    tr.appendChild(td);

    //modification
    var a1 = document.createElement("a");
    a1.className = "ml-3";
    a1.innerText = "✏️";
    a1.setAttribute("data-target", "modalEdit");
    a1.setAttribute("data-toggle", "modal");
    a1.setAttribute("onclick", "modalEdit(" + element['id'] + ");");
    td.appendChild(a1);
    tr.appendChild(td);

    ++i;
  });
}

function addProject() {
  params = {
    "id": getRandomInt(1000),
    "name": document.getElementById("name").value,
    "description": document.getElementById("description").value,
    "url": document.getElementById("url").value,
    "image": document.getElementById("image").value,
  };
  addData('http://localhost:3000/projects', params);
  setTimeout(function () { generateTable(); }, 100)
}

function editProject() {
  params = {
    "id": document.getElementById("idEdit").value,
    "name": document.getElementById("nameEdit").value,
    "description": document.getElementById("descriptionEdit").value,
    "url": document.getElementById("urlEdit").value,
    "image": document.getElementById("imageEdit").value,
  };
  console.log(params);
  editData('http://localhost:3000/projects/' + document.getElementById("idEdit").value, params);
  setTimeout(function () { generateTable(); }, 100);
  document.getElementById("modalEdit").classList.remove('open');
}

function modalEdit(id) {
  let project = getData('http://localhost:3000/projects/' + id);
  document.getElementById("idEdit").value = project['id'];
  document.getElementById("nameEdit").value = project['name'];
  document.getElementById("descriptionEdit").value = project['description'];
  document.getElementById("urlEdit").value = project['url'];
  document.getElementById("imageEdit").value = project['image'];
}

document.getElementById("addProjectBtn").addEventListener("click", addProject);
document.getElementById("editProjectBtn").addEventListener("click", editProject);