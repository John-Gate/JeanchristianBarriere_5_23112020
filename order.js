let cartItems = JSON.parse(localStorage.getItem("cartGet"));
let productsID = [];
let orderId = localStorage.getItem("orderId");
let invoice = document.getElementsByClassName("invoice")[0];
let invoiceNumber = document.createElement("p");

invoiceNumber.className="font-weight-bold font-italic my-2";
invoice.appendChild(invoiceNumber);
invoiceNumber.appendChild(document.createTextNode(orderId));

localStorage.removeItem("cart");
localStorage.removeItem("orderId");