var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var API = "https://rickandmortyapi.com/api/character/";
var xhttp = new XMLHttpRequest();

function fetchData(url_api, callback) {
  xhttp.onreadystatechange = event => {
    if (xhttp.readyState == "4") {
      if (xhttp.status == 200) callback(null, xhttp.responseText);
      else return callback(url_api);
    }
  };
  xhttp.open("GET", url_api, false);
  xhttp.send();
}

console.log("\n>>>\tSegundo problema\n\n");

fetchData(API, (error1, data1) => {
  if (error1) return console.error("Error" + " " + error1);
  console.log("Primer Llamado...");
  data1 = JSON.parse(data1);
  fetchData(API + data1.results[0].id, (error2, data2) => {
    if (error2) return console.error(error1);
    console.log("Segundo Llamado...");
    data2 = JSON.parse(data2);
    fetchData(data2.origin.url, (error3, data3) => {
      if (error3) return console.error(error3);
      data3 = JSON.parse(data3);
      console.log("Tercero Llamado...");
      console.log(`Personajes: ${data1.info.count}`);
      console.log(`Primer Personaje: ${data2.name}`);
      console.log(`Dimensión: ${data3.dimension}`);
    });
  });
});
