const URLSParams = new URLSearchParams(window.location.search);
let objectId = URLSParams.get('id');
let idParams;
if (objectId === null) {
    idParams = "";
} else {
    idParams = objectId;
}

//
function getCamera(id) {
  fetch("http://localhost:3000/api/cameras/" + id)
    .then(response => response.json())
    .then(produit => {
      selectedProduct(produit);
      // Ecouter les clics sur le bouton addToBasket
      let addItemToBasket = document.querySelector("#addToBasket");
      addItemToBasket.addEventListener("click", function () {addToBasket(produit)}, false);
  })
}

unction addToBasket(produit) {
  //Création du panier dans le localStorage s'il n'existe pas déjà
  if (typeof localStorage.getItem("basket") !== "string") {
    let basket = [];
    localStorage.setItem("basket", JSON.stringify(basket));
  }
  //Récupérer les informations de la caméra
  produit.selectedLense = document.querySelector("option:checked").innerText;
  produit.selectedQuantity = document.querySelector("input").value;
  delete produit.lenses;
  //création d'une variable pour manipuler le panier
  let basket = JSON.parse(localStorage.getItem("basket"));
  //Vérification que l'item n'existe pas déjà dans le panier
  let isThisItemExist = false;
  let existingItem;
  for (let i = 0; i < basket.length; i++) {
    if (produit._id === basket[i]._id && produit.price === basket[i].price && produit.selectedLense === basket[i].selectedLense) {
      isThisItemExist = true;
      existingItem = basket[i];
    }
  }
  //Ajouter la caméra au panier
  if (isThisItemExist === false) {
    basket.push(produit);
    localStorage.setItem("basket", JSON.stringify(basket));
  } else {
    existingItem.selectedQuantity = parseInt(existingItem.selectedQuantity, 10) + parseInt(produit.selectedQuantity, 10);
    localStorage.setItem("basket", JSON.stringify(basket));
  }
  manageBasketDisplay();
}

const selectedProduct = (produit) => {
  let mainArticle = document.querySelector("#main");
  let sectionCont = document.createElement("section");
  sectionCont.className = "card shadow col-4 mx-1 my-1";
  mainArticle.appendChild(sectionCont);

  let titleMain = document.createElement("h2");
  let titleproduit = document.createTextNode(produit.name);
  titleMain.className='text-center';
  titleMain.appendChild(titleproduit);
  sectionCont.appendChild(titleMain);

  let image = document.createElement("img");
  image.className = "card-img-top w-100";
  image.src = produit.imageUrl;
  sectionCont.appendChild(image);

  let div = document.createElement("div");
  div.className = "card-body";

  let descrip = document.createElement("p");
  descrip.className = "card-text";
  let descproduit = document.createTextNode(produit.description);
  descrip.appendChild(descproduit)
  div.appendChild(descrip);

  let price = document.createElement("p");
  price.className = "card-text";
  let priceproduit = document.createTextNode(produit.price / 100 + "$" );
  price.appendChild(priceproduit)
  div.appendChild(price);

  let idProduct = document.createElement("a");
  idProduct.className="text-decoration-none stretched-link";
  idProduct.href='product.html?id=' + produit._id;
  idProduct.innerHTML="Voir la fiche produit";
  div.appendChild(idProduct);
  
  for(i=0;i<produit.options.length;i++){
  let optionProduct = document.createElement("option");
  optionProduct.innerHTML= produit.options[i];
  div.appendChild(optionProduct);
  }

  sectionCont.appendChild(div);
};      

manageBasketDisplay();
getCamera(id);