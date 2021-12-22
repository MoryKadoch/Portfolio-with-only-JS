loadFile('file:///home/mory/ipssi/nav.html');
function httpGet(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

console.log(httpGet('http://localhost:3000/comments'));

//tranformer en fonction add
var xhr = new XMLHttpRequest();
xhr.open("POST", 'http://localhost:3000/posts/1/comments', true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(JSON.stringify({
  value: 'value'
}));


//tranformer en fonction delete
fetch('http://localhost:3000/comments/8', {
    method: 'DELETE',
  })
  .then(res => res.text()) // or res.json()
  .then(res => console.log(res))

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

document.getElementsByClassName("closeNavIcon")[0].addEventListener('click', hideShow);
document.getElementsByClassName("openNavIcon")[0].addEventListener('click', hideShow);


function loadFile(filePath) {
  var result = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", filePath, false);
  xmlhttp.send();
  if (xmlhttp.status==200) {
    result = xmlhttp.responseText;
  }
  return result;
}

