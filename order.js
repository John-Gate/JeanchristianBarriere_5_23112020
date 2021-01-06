let cartItems = JSON.parse(localStorage.getItem("cartGet"));
let productsID = [];
let orderId = localStorage.getItem("orderId");
let totalPrice = localStorage.getItem("totalPrice"); 
let invoice = document.getElementsByClassName("invoice")[0];
let invoiceTotalPrice = document.getElementsByClassName("invoiceTotalPrice")[0];

//Actualize the order section
const order = () => {
  //Total Price section:
  let invoicePrice = document.createElement("p");

  invoicePrice.className = "font-weight-bold my-2";
  invoiceTotalPrice.appendChild(invoicePrice);
  invoicePrice.appendChild(document.createTextNode(totalPrice + "$"));
  
  //Invoice number section:
  let invoiceNumber = document.createElement("p");

  invoiceNumber.className = "font-weight-bold font-italic my-2";
  invoice.appendChild(invoiceNumber);
  invoiceNumber.appendChild(document.createTextNode(orderId));

  localStorage.removeItem("cart");
  localStorage.removeItem("orderId");
  localStorage.removeItem("totalPrice");
};
order();
