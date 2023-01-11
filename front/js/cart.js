let cart = JSON.parse(localStorage.getItem("cart"));

async function retrieveInfo(cart) {
      let result = new Array()
      for (let product of cart) {
            await fetch(`http://localhost:3000/api/products/${product.id}`)
                  .then((response) => response.json())
                  .then((data) => {
                        data.color = product.color;
                        data.quantity = product.quantity;
                        result.push(data)
                  });
      }
      return result
}

function displayCart(totalInfo) {
      for (let product of totalInfo) {
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
            p2.innerHTML = `${product.price} €`;

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

            let deleteDiv = document.createElement("div");
            deleteDiv.className = "cart__item__content__settings__delete";

            let deleteP = document.createElement("p");
            deleteP.className = "deleteItem";
            deleteP.innerHTML = "Supprimer";

            deleteP.addEventListener("click", deleteProduct);

            quantityInput.addEventListener("input", updateTotals);

            let placeOrderButton = document.getElementById('order');

            placeOrderButton.addEventListener('click', (event) => {
                  event.preventDefault()
                  createOrder()
            });

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
}

function updateQuantity(event) {
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
function updateTotalQuantity(totalInfo) {
      let totalQuantity = 0;
      for (let product of totalInfo) {
            totalQuantity += Number(product.quantity);
      }
      document.getElementById("totalQuantity").innerText = totalQuantity;
}

function updateTotalPrice(totalInfo) {
      let totalPrice = 0;
      for (let product of totalInfo) {
            let productTotal = product.price * product.quantity;
            totalPrice += productTotal;
      }
      document.getElementById("totalPrice").innerHTML = totalPrice;
}

async function updateTotals(totalInfo) {
      if (!Array.isArray(totalInfo)) {
            let productId = totalInfo.target.parentNode.parentNode.parentNode.parentNode.getAttribute("data-id");
            let productColor = totalInfo.target.parentNode.parentNode.parentNode.parentNode.getAttribute("data-color");
            let productQty = totalInfo.target.valueAsNumber;
            for (let i = 0; i < cart.length; i++) {
                  if (cart[i].id === productId && cart[i].color === productColor) {
                        cart[i].quantity = Number(productQty)
                        break;
                  }
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            let newCart = JSON.parse(localStorage.getItem("cart"))
            totalInfo = await retrieveInfo(newCart)
      }
      updateTotalPrice(totalInfo)
      updateTotalQuantity(totalInfo)
}

async function deleteProduct(event) {
      let productId = event.target.closest('article').getAttribute('data-id');
      let productColor = event.target.closest('article').getAttribute('data-color');
      let index = -1;
      for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === productId && cart[i].color === productColor) {
                  index = i;

                  break;
            }

      }

      if (index > -1) {
            cart.splice(index, 1);
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      event.target.closest('article').remove();

      let totalInfo = await retrieveInfo(cart)

      updateTotals(totalInfo);
}

function verifyField(field) {
      if (field.value === "") {
            document.getElementById(`${field.id}ErrorMsg`).innerHTML = `Veuillez entrer votre ${field.id}.`;
            return false;
      } else if (!field.regex.test(field.value)) {
            document.getElementById(`${field.id}ErrorMsg`).innerHTML = field.errorMessage;
            return false;
      } else {
            document.getElementById(`${field.id}ErrorMsg`).innerHTML = "";cart__order__formcart__order__form
            return true;
      }
}

function verifyForm() {
      let fields = [
            {
                  id: "firstName",
                  value: document.getElementById("firstName").value,
                  regex: /^([^0-9]*)$/,
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
      for (let field of fields) {
            if (!verifyField(field)) {
                  return false;
            }
      }
      return true
}

async function createOrder() {
      // verify if user info are well filled
      if (verifyForm() === false) {
            return
      }

      let cart = JSON.parse(localStorage.getItem("cart"));
      let orderDetails = {
            products: cart.map(product => ({
                  id: product.id,
                  color: product.color,
                  quantity: product.quantity
            }))
      };

      try {
            const response = await fetch('http://localhost:3000/api/orders', {
                  method: 'POST',
                  body: JSON.stringify(orderDetails),
                  headers: {
                        'Content-Type': 'application/json'
                  }
            });
            const data = await response.json();
            window.location.href = `confirmation.html?orderId=${data.order._id}`;
      } catch (error) {
            console.error(error);
      }
}

async function main() {
      let totalInfo = await retrieveInfo(cart)
      displayCart(totalInfo);
      updateTotals(totalInfo);
}

main();