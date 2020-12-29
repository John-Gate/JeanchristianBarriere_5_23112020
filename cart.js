let mainCart = document.querySelector("#mainCart");
let mainForm = document.getElementsByClassName("mainForm");
let cartGet = JSON.parse(localStorage.getItem("cart"));
let products = [];
let total = 0;

const cartList = () => {
  if (cartGet != null) {
    for (i = cartGet.length - 1; i >= 0; i--) {
      fetch(url + cartGet[i])
        .then((response) => response.json())
        .then((response) => trProduct(response));
    }
  }
};
cartList();
//function pour faire apparaitre row Header du table
const trTitle = (nameRow) => {
  let th = document.createElement("th");
  th.textContent = nameRow;
  th.className = "pr-5";
  return th;
};

//function pour faire apparaitre elements du table
let tbody = document.createElement("tbody");
tbody.className = "cart-items";

const trProduct = (product) => {
  total += product.price / 100;
  totalSum(total);

  let tr2 = document.createElement("tr");
  //Name + photo Section    RAJOUTER PHOTO AUSSI
  let productName = document.createElement("td");
  productName.textContent = product.name;
  productName.className = " col-1 mx-auto";
  tr2.appendChild(productName);
  //Price section
  let productPriceUnit = document.createElement("td");
  productPriceUnit.className = "cart-price";
  productPriceUnit.textContent = product.price / 100 + " $";
  tr2.appendChild(productPriceUnit);
  //Quantity section
  let productQuantity = document.createElement("input");
  productQuantity.className = "quantity-input col-7";
  productQuantity.type = "number";
  productQuantity.value = "1";
  tr2.appendChild(productQuantity);
  //Remove Button
  let removeBtn = document.createElement("button");
  removeBtn.className = "btn-danger  mx-4 my-1";
  removeBtn.textContent = "Remove";
  tr2.appendChild(removeBtn);

  tbody.appendChild(tr2);
};
//Creation des boutons de quantites

//function total price
const totalSum = (total) => {
  let sumOfAll = document.getElementById("total");
  sumOfAll.textContent = "Total : " + total + " $";
};

//--Reponse si panier vide ou non
let showCart = () => {
  if (cartGet) {
    //Nombre d'article total:
    let divCountCart = document.createElement("div");
    divCountCart.id = "countCart";
    divCountCart.className = "mx-auto mb-3 text-secondary";
    let x = cartGet.length;
    //En fonction du nombre d item:
    if (
      cartGet.length == 1
        ? (divCountCart.textContent = "(" + " " + x + " " + "item)")
        : (divCountCart.textContent = "(" + x + " " + "items)")
    );

    mainCart.appendChild(divCountCart);

    //Creation tableau
    //table
    let table = document.createElement("table");
    table.id = "table";
    table.className = "table col-3 mx-auto";
    mainCart.appendChild(table);
    //thead
    let thead = document.createElement("thead");
    table.appendChild(thead);
    //tr
    let tr = document.createElement("tr");
    tr.className = "cart-row";
    //th
    tr.appendChild(trTitle("Item"));
    tr.appendChild(trTitle("Price"));
    tr.appendChild(trTitle("Quantity"));
    thead.appendChild(tr);
    //Row des elements

    table.appendChild(tbody);
    //fonction de creation des elements
    let cartFilled = cartGet.forEach((product) => {
      products.push(product.id);
    });
    return cartFilled;
  } else {
    //CENTRER LE TEXTE EN HTML
    mainForm[0].className = "d-none text-center";
    displayCartTitle = document.createElement("h2");
    displayCartTitle.textContent = "Your cart is empty";
    mainCart.appendChild(displayCartTitle);
  }
};

showCart();

/////////////////////////////////////RETRAVAILLER QUANTITE////////////////////////
//Function Remove Button Listener
const btnRemoveListener = () => {
  let btnRemoveItem = document.getElementsByClassName("btn-danger");
  for (let i = 0; i < btnRemoveItem.length; i++) {
    let btnR = btnRemoveItem[i];
    btnR.addEventListener("click", function (event) {
      let btnRemoveClicked = event.target;
      btnRemoveClicked.parentElement.remove();
      updateCartTotal();
    });
  }
};
btnRemoveListener();

const updateCartTotal = () => {
  console.log("clicked");
  let cartItemContainer = document.getElementsByClassName("cart-items")[0];
  let cartRows = cartItemContainer.getElementsByClassName("cart-row");
  for (i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let priceElement = cartRow.getElementsByClassName("cart-price")[0];
    let quantityElement = cartRow.getElementsByClassName("quantity-input")[0];
    console.log(priceElement, quantityElement);
  }
};

//Function principale anonyme sortir la fonction///////////////////////////////////////////////

document.getElementById("formSubmit").addEventListener("submit", (event) => {
  /////Avoid repeat aler message
  let inputs = document.querySelectorAll("input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].classList.remove("is-invalid");
    inputs[i].classList.remove("is-valid");
  }

  let alertMessages = document.querySelectorAll(".alertMessages");
  for (let i = 0; i < alertMessages.length; i++) {
    alertMessages[i].remove();
  }

  if (cartGet !== null || cartGet != " ") {
    event.preventDefault();
    let regularFormRegEx = /([A-Za-z0-9'\.\-\s\,]+)/;
    let emailFormRegEx = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/i;

    let firstNameId = document.getElementById("formFirstName");
    let firstName = firstNameId.value;
    let validateFirstName = validateForm(firstNameId, regularFormRegEx);
    let lastNameId = document.getElementById("formLastName");
    let lastName = lastNameId.value;
    let validateLastName = validateForm(lastNameId, regularFormRegEx);
    let addressId = document.getElementById("formAddress");
    let address = addressId.value;
    let validateAddress = validateForm(addressId, regularFormRegEx);
    let cityId = document.getElementById("formCity");
    let city = cityId.value;
    let validateCity = validateForm(cityId, regularFormRegEx);
    let emailId = document.getElementById("formEmail");
    let email = emailId.value;
    let validateEmail = validateForm(emailId, emailFormRegEx);
    let contact = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email,
    };
    let products = cartGet;
    let objectPost = { contact, products };

    let fields = [firstNameId, lastNameId, addressId, cityId, emailId],
      fieldsValidity = [
        validateFirstName,
        validateLastName,
        validateAddress,
        validateCity,
        validateEmail,
      ],
      isAFieldInvalid = formValidation(fields, fieldsValidity);

    //Si l'un des champs a été vidé ...
    if (isAFieldInvalid) return;

    fetchPost(contact, products);
  }
});

//function validation
const formValidation = (fields, fieldsValidity) => {
  let returnField = false;
  for (let i = 0; i < fields.length; i++) {
    if (!fieldsValidity[i]) {
      returnField = true;
      let message;
      switch (i) {
        case 0:
          message = "First Name cannot be empty";
          break;
        case 1:
          message = "Last Name cannot be empty";
          break;
        case 2:
          message = "Address cannot be empty";
          break;
        case 3:
          message = "City cannot be empty";
          break;
        default:
          message = "Email cannot be empty";
      }

      //Création et stylisation de l'alerte
      alertMessage(message, fields[i]);
    } else {
      fields[i].classList.add("is-valid");
    }
  }
  return returnField;
};

function validateForm(input, regularFormRegEx) {
  return input.value.match(regularFormRegEx) !== null;
}
//function alert
const alertMessage = (message, input) => {
  let alert = document.createElement("div");
  alert.appendChild(document.createTextNode(message));
  input.classList.add("is-invalid");
  alert.classList.add("alertMessages", "invalid-feedback");
  input.parentElement.appendChild(alert);
};

//function fetchpost
const fetchPost = (contact, products) => {
  fetch("http://localhost:3000/api/cameras/order", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contact: contact,
      products: products,
    }),
  })
    .then((response) => response.json())
    .then((order) => {
      localStorage.setItem("orderId", order.orderId);
      window.location.href = "order.html";
    })
    .catch((error) => alert("Un des champ du formulaire n'est pas correct !"));
};
