let mainCart = document.querySelector("#mainCart");
let mainForm = document.getElementsByClassName("mainForm");
let cartGet = JSON.parse(localStorage.getItem("cart"));
let products = [];
let total = 0;

//Reaching local storage elements, and display them.
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
//Creat Header Tab
const trTitle = (nameRow) => {
  let th = document.createElement("th");
  th.textContent = nameRow;
  th.className = "pr-5";
  return th;
};

//Display table elements
let tbody = document.createElement("tbody");
tbody.className = "cart-items";

const trProduct = (product) => {
  total += product.price / 100;
  totalSum(total);

  let tr2 = document.createElement("tr");
  //Display Products Name/Title
  let productName = document.createElement("td");
  productName.textContent = product.name;
  productName.className = " col-1 mx-auto";
  tr2.appendChild(productName);
  //Price section
  let productPriceUnit = document.createElement("td");
  productPriceUnit.className = "cart-price";
  productPriceUnit.textContent = product.price / 100 + " $";
  tr2.appendChild(productPriceUnit);
  tbody.appendChild(tr2);
};

//Total price
const totalSum = (total) => {
  let sumOfAll = document.getElementById("total");
  sumOfAll.textContent = "Total : " + total + " $";
};

//If cart empty or not
let showCart = () => {
  if (cartGet) {
    //Total items
    let divCountCart = document.createElement("div");
    divCountCart.id = "countCart";
    divCountCart.className = "mx-auto mb-3 text-secondary";
    let itemNumbers = cartGet.length;
    //Singular or plural for "item"
    if (
      itemNumbers == 1
        ? (divCountCart.textContent = "(" + " " + itemNumbers + " " + "item)")
        : (divCountCart.textContent = "(" + itemNumbers + " " + "items)")
    );

    mainCart.appendChild(divCountCart);

    //Set up tab
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
    thead.appendChild(tr);
    //Row 
    table.appendChild(tbody);
    //Generate Items
    let cartFilled = cartGet.forEach((product) => {
      products.push(product.id);
    });
    return cartFilled;
  } else {
    mainForm[0].className = "d-none text-center";
    displayCartTitle = document.createElement("h2");
    displayCartTitle.textContent = "Your cart is empty";
    mainCart.appendChild(displayCartTitle);
  }
};
showCart();

const clickForm = (event) => {
  /////Avoid repeat alerte message
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
    //If a field has been empty:
    if (isAFieldInvalid) return;
    fetchPost(contact, products);
  }
};

document.getElementById("formSubmit").addEventListener("submit", clickForm);

//Check up fields
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
      //Establish and design the alert
      alertMessage(message, fields[i]);
    } else {
      fields[i].classList.add("is-valid");
    }
  }
  return returnField;
};
//Regex checkup
const validateForm = (input, regularFormRegEx) => {
  return input.value.match(regularFormRegEx) !== null;
};
//Alert 
const alertMessage = (message, input) => {
  let alert = document.createElement("div");
  alert.appendChild(document.createTextNode(message));
  input.classList.add("is-invalid");
  alert.classList.add("alertMessages", "invalid-feedback");
  input.parentElement.appendChild(alert);
};
//Fetchpost
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
  .then((response) => console.log(response))
  .then((order) => {
      localStorage.setItem("orderId", order.orderId);
      window.location.href = "order.html";
    })
    .catch((error) => alert("Un des champ du formulaire n'est pas correct !"));
};
