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

