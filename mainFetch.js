//Recuperer Ressourse API
let url = "http://localhost:3000/api/cameras";

const mainFetch = () => {
  fetch(url)
  
    .then((response) => response.json())
    .then(function (data) {
      for (i = 0; i < data.length; i++) {
        insertProduct(data[i]);
      }
    })
};
window.onload = mainFetch;

