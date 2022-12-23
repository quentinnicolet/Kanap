let cart = JSON.parse(localStorage.getItem("cart"));

function retriveInfo(product) {
      fetch(`http://localhost:3000/api/products/${product.id}`)
            .then((response) => response.json())
            .then((data) => {
                  data.color = product.color;
                  data.quantity = product.quantity;
                  displayCart(data);
                  updateTotalQuantity();
                  updateTotalPrice();
            });
}

function displayCart(product) {
      let cartItems = document.getElementById("cart__items");
      let article = document.createElement("article");
      article.className = "cart__item";
      article.setAttribute("data-id", product._id);
      article.setAttribute("data-color", product.color);

      let imgDiv = document.createElement("div");
      imgDiv.className = "cart__item__img";

      let img = document.createElement("img");
      img.src = product.imageUrl;
      img.alt = product.altTxt;

      let contentDiv = document.createElement("div");
      contentDiv.className = "cart__item__content";

      let descriptionDiv = document.createElement("div");
      descriptionDiv.className = "cart__item__content__description";

      let h2 = document.createElement("h2");
      h2.innerHTML = product.name;

      let p1 = document.createElement("p");
      p1.innerHTML = product.color;

      let p2 = document.createElement("p");
      p2.innerHTML = `${product.price / 100} €`;

      let settingsDiv = document.createElement("div");
      settingsDiv.className = "cart__item__content__settings";

      let quantityDiv = document.createElement("div");
      quantityDiv.className = "cart__item__content__settings__quantity";

      let quantityP = document.createElement("p");
      quantityP.innerHTML = "Qté : ";

      let quantityInput = document.createElement("input");
      quantityInput.type = "number";
      quantityInput.className = "itemQuantity";
      quantityInput.name = "itemQuantity";
      quantityInput.min = "1";
      quantityInput.max = "100";
      quantityInput.value = product.quantity;
      // quantityInput.addEventListener("input", updateTotalQuantity);
      // quantityInput.addEventListener("input", updateTotalPrice);


      let deleteDiv = document.createElement("div");
      deleteDiv.className = "cart__item__content__settings__delete";

      let deleteP = document.createElement("p");
      deleteP.className = "deleteItem";
      deleteP.innerHTML = "Supprimer";

      deleteP.addEventListener("click", deleteProduct);

      quantityInput.addEventListener("input", updateQuantity);

      cartItems.appendChild(article);
      article.appendChild(imgDiv);
      imgDiv.appendChild(img);
      article.appendChild(contentDiv);
      contentDiv.appendChild(descriptionDiv);
      descriptionDiv.appendChild(h2);
      descriptionDiv.appendChild(p1);
      descriptionDiv.appendChild(p2);
      contentDiv.appendChild(settingsDiv);
      settingsDiv.appendChild(quantityDiv);
      quantityDiv.appendChild(quantityP);
      quantityDiv.appendChild(quantityInput);
      settingsDiv.appendChild(deleteDiv);
      deleteDiv.appendChild(deleteP);
}

function updateQuantity(event) {
      console.log(event.target.parentNode.parentNode.parentNode.parentNode)
      let productId = event.target.parentNode.parentNode.parentNode.parentNode.getAttribute("data-id");
      let productColor = event.target.parentNode.parentNode.parentNode.parentNode.getAttribute("data-color");
      let newQuantity = event.target.value;

      for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === productId && cart[i].color === productColor) {
                  console.log('Product has been found')
                  cart[i].quantity = newQuantity;
                  localStorage.setItem("cart", JSON.stringify(cart));
                  updateTotalQuantity();
                  updateTotalPrice();
                  break;
            }
      }
}
function updateTotalQuantity() {
      let totalQuantity = 0;
      let itemQuantities = document.getElementsByClassName("itemQuantity");

      for (let i = 0; i < itemQuantities.length; i++) {
            totalQuantity += parseInt(itemQuantities[i].value);
      }

      document.getElementById("totalQuantity").innerText = totalQuantity;
}

async function updateTotalPrice() {
      let totalPrice = 0;
      for (let product of cart) {
            try {
                  let response = await fetch(`http://localhost:3000/api/products/${product.id}`);
                  let data = await response.json();

                  let productPrice = data.price;
                  let productTotal = productPrice * product.quantity;

                  totalPrice += productTotal;
            } catch (error) {
                  console.error(error);
            }
      }
      document.getElementById("totalPrice").innerHTML = totalPrice;
}

function deleteProduct(event) {
      let productId = event.target.parentNode.parentNode.parentNode.parentNode.getAttribute("data-id");
      let productColor = event.target.parentNode.parentNode.parentNode.parentNode.getAttribute("data-color");

      event.target.parentNode.parentNode.parentNode.parentNode.remove();

      for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === productId && cart[i].color === productColor) {
                  cart.splice(i, 1);
                  break;
            }
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      updateTotalQuantity();
      updateTotalPrice();
}



let fields = [
      {
            id: "firstName",
            value: document.getElementById("firstName").value,
            regex: /[a-zA-Z]/,
            errorMessage: "Veuillez entrer un prénom valide."
      },
      {
            id: "lastName",
            value: document.getElementById("lastName").value,
            regex: /[a-zA-Z]/,
            errorMessage: "Veuillez entrer un nom valide."
      },
      {
            id: "address",
            value: document.getElementById("address").value,
            regex: /^[a-zA-Z0-9\s,'-]*$/,
            errorMessage: "Veuillez entrer une adresse valide."
      },
      {
            id: "city",
            value: document.getElementById("city").value,
            regex: /[a-zA-Z]/,
            errorMessage: "Veuillez entrer une ville valide."
      },
      {
            id: "email",
            value: document.getElementById("email").value,
            regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            errorMessage: "Veuillez entrer un email valide."
      }
];

function verifyField(field) {
      if (field.value === "") {
            document.getElementById(`${field.id}ErrorMsg`).innerHTML = `Veuillez entrer votre ${field.id}.`;
            return false;
      } else if (!field.regex.test(field.value)) {
            document.getElementById(`${field.id}ErrorMsg`).innerHTML = field.errorMessage;
            return false;
      } else {
            document.getElementById(`${field.id}ErrorMsg`).innerHTML = "";
            return true;
      }
}

function verifyForm() {
      let formValid = true;
      for (let field of fields) {
            if (!verifyField(field)) {
                  formValid = false;
            }
      }
}

function main() {
      for (productInCart of cart) {
            retriveInfo(productInCart)
      }
}

main();