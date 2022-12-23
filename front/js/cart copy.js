let cart = JSON.parse(localStorage.getItem("cart"));

async function retriveInfo(product) {
      try {
            const response = await fetch(`http://localhost:3000/api/products/${product.id}`);
            const data = await response.json();

            data.color = product.color;
            data.quantity = product.quantity;
            displayCart(data);
            updateTotalQuantity();
            updateTotalPrice();
      } catch (error) {
            console.error(error);
      }
}

function displayCart(product) {
      let cartItems = document.getElementById("cart__items");
      let article = document.createElement("article");
      article.className = "cart__item";
      article.setAttribute("data-id", product.id);
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
      quantityInput.addEventListener("input", updateTotalQuantity);
      quantityInput.addEventListener("input", updateTotalPrice);


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

function updateTotalQuantity() {
      let totalQuantity = 0;
      let itemQuantities = document.getElementsByClassName("itemQuantity");

      for (let i = 0; i < itemQuantities.length; i++) {
            totalQuantity += parseInt(itemQuantities[i].value);
      }

      document.getElementById("totalQuantity").innerHTML = totalQuantity;
}

async function updateTotalPrice() {
      try {
            let totalPrice = 0;
            let itemPrices = document.getElementsByClassName("itemPrice");

            for (let i = 0; i < itemPrices.length; i++) {
                  totalPrice += parseInt(itemPrices[i].innerHTML);
            }

            document.getElementById("totalPrice").innerHTML = `${totalPrice / 100} €`;
      } catch (error) {
            console.error(error);
      }
}

function deleteProduct(event) {
      let itemId = event.target.parentElement.parentElement.parentElement.parentElement.getAttribute("data-id");
      let itemColor = event.target.parentElement.parentElement.parentElement.parentElement.getAttribute("data-color");

      for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === itemId && cart[i].color === itemColor) {
                  cart.splice(i, 1);
            }
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      event.target.parentElement.parentElement.parentElement.parentElement.remove();
      updateTotalQuantity();
      updateTotalPrice();
}

function updateQuantity(event) {
      let itemId = event.target.parentElement.parentElement.parentElement.parentElement.getAttribute("data-id");
      let itemColor = event.target.parentElement.parentElement.parentElement.parentElement.getAttribute("data-color");
      let newQuantity = event.target.value;

      for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === itemId && cart[i].color === itemColor) {
                  cart[i].quantity = newQuantity;
            }
      }

      localStorage.setItem("cart", JSON.stringify(cart));
}

function verifyForm() {
      let firstName = document.getElementById("firstName").value;
      let lastName = document.getElementById("lastName").value;
      let address = document.getElementById("address").value;
      let city = document.getElementById("city").value;
      let email = document.getElementById("email").value;
      let formValid = true;

      if (firstName == "") {
            formValid = false;
            document.getElementById("firstNameErrorMsg").innerHTML = "Veuillez entrer votre prénom.";
      } else {
            document.getElementById("firstNameErrorMsg").innerHTML = "";
      }

      if (lastName == "") {
            formValid = false;
            document.getElementById("lastNameErrorMsg").innerHTML = "Veuillez entrer votre nom.";
      } else {
            document.getElementById("lastNameErrorMsg").innerHTML = "";
      }

      if (address == "") {
            formValid = false;
            document.getElementById("addressErrorMsg").innerHTML = "Veuillez entrer votre adresse.";
      } else {
            document.getElementById("addressErrorMsg").innerHTML = "";
      }

      if (city == "") {
            formValid = false;
            document.getElementById("cityErrorMsg").innerHTML = "Veuillez entrer votre ville.";
      } else {
            document.getElementById("cityErrorMsg").innerHTML = "";
      }

      if (email == "") {
            formValid = false;
            document.getElementById("emailErrorMsg").innerHTML = "Veuillez entrer votre email.";
      } else {
            let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            let emailValid = emailRegex.test(String(email).toLowerCase());
            if (!emailValid) {
                  formValid = false;
                  document.getElementById("emailErrorMsg").innerHTML = "Veuillez entrer un email valide.";
            } else {
                  document.getElementById("emailErrorMsg").innerHTML = "";
            }
      }

      return formValid;
}

let letterRegex = /[a-zA-Z]/;

if (!letterRegex.test(firstName)) {
      formValid = false;
      document.getElementById("firstNameErrorMsg").innerHTML = "Veuillez entrer un prénom valide.";
}

if (!letterRegex.test(lastName)) {
      formValid = false;
      document.getElementById("lastNameErrorMsg").innerHTML = "Veuillez entrer un nom valide.";
}

if (!letterRegex.test(city)) {
      formValid = false;
      document.getElementById("cityErrorMsg").innerHTML = "Veuillez entrer une ville valide.";
}

let addressRegex = /^[a-zA-Z0-9\s,'-]*$/;

if (!addressRegex.test(address)) {
      formValid = false;
      document.getElementById("addressErrorMsg").innerHTML = "Veuillez entrer une adresse valide.";
}

document.getElementsByClassName("cart__order__form").addEventListener("submit", verifyForm);