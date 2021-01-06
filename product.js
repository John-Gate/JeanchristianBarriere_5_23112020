let url = "http://localhost:3000/api/cameras/";
const URLSParams = new URLSearchParams(window.location.search);//return object instance to use "get"
let objectId = URLSParams.get("id");


//Fetch Function
const fetchCall = () => {
  

   if (window.location.search)
 

     fetch(url + objectId)
      .then((response) => response.json())
      .then((response) => selectedProduct(response))
      .catch((err) => console.error(err));
};
fetchCall();


//HTML display
const selectedProduct = (product) => {
  if(product != ""){
  let mainArticle = document.querySelector("#main");
  let sectionCont = document.createElement("section");
  sectionCont.className = "card shadow col-4 mx-1 my-1";
  mainArticle.appendChild(sectionCont);

  let titleMain = document.createElement("h2");
  let titleproduct = document.createTextNode(product.name);
  titleMain.className = "text-center";
  titleMain.appendChild(titleproduct);
  sectionCont.appendChild(titleMain);

  let image = document.createElement("img");
  image.className = "card-img-top w-100";
  image.src = product.imageUrl;
  sectionCont.appendChild(image);

  let div = document.createElement("div");
  div.className = "card-body";

  let descrip = document.createElement("p");
  descrip.className = "card-text";
  let descProduct = document.createTextNode(product.description);
  descrip.appendChild(descProduct);
  div.appendChild(descrip);

  let price = document.createElement("p");
  price.className = "card-text";
  let priceproduct = document.createTextNode(product.price / 100 + "$");
  price.appendChild(priceproduct);
  div.appendChild(price);

  let idProduct = document.createElement("button");
  idProduct.className = " col-12 button text-decoration-none btn-primary mb-2";
  idProduct.innerHTML = "Add to cart";
  div.appendChild(idProduct);

  let select = document.createElement("select");
  select.className = "selectProd";
  let chooseProd = document.getElementsByClassName("selectProd");

  //Loop over different product options
  for (i = 0; i < product.lenses.length; i++) {
    let optionProduct = document.createElement("option");
    optionProduct.className = "option";
    optionProduct.innerHTML = product.lenses[i];
    select.appendChild(optionProduct);
  }
  div.appendChild(select);
  sectionCont.appendChild(div);
  storageProduct();
}else{
  console.error("No items selected")
}
};
//Add to the cart
const storageProduct = () => {
  let cartButton = document.getElementsByClassName("button");
  cartButton[0].addEventListener("click", function () {
    let cartGet = JSON.parse(localStorage.getItem("cart")); //Parse the data with JSON.parse(), and the data becomes a JavaScript object.
    if (cartGet === null) {
      cartGet = [];
    }
    cartGet.push(objectId);
    localStorage.setItem("cart", JSON.stringify(cartGet));//localStorage allow string only(parse inverse)
    document.location.replace("http://127.0.0.1:5500/cart.html");//redirection
  });
  //let cartGet = JSON.parse(localStorage.getItem("cart"));
};
