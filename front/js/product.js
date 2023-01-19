// The first line of code retrieves the query string from the current URL and assigns it to the variable "queryString". The second line uses the URLSearchParams method to parse the query string, and assigns it to the variable "urlParams". The third line uses the get method to retrieve the value of the "id" parameter in the query string and assigns it to the variable "id".
let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let id = urlParams.get('id')
// The "retrieveProducts" function is an asynchronous function that uses the fetch API to retrieve information from a local server at the specified URL, and passes in the "id" variable to retrieve a specific product. It then uses the "then" method to convert the response into a JSON format.
async function retrieveProducts() {
      return await fetch(`http://localhost:3000/api/products/${id}`)
            .then((response) => response.json())
}
// The "displayProduct" function takes in an argument of "product" and uses JavaScript DOM manipulation to display the product information on the page. It assigns values from the "product" argument to elements such as a heading, paragraph, and span. It also creates an image element and assigns its "src" and "alt" attributes from the "product" argument. Additionally, it loops through the product's available colors and creates options for a select element.
function displayProduct(product) {
      let h1 = document.getElementById('title');
      let p = document.getElementById('description');
      let span = document.getElementById('price');
      let div = document.getElementsByClassName('item__img')[0];
      let img = document.createElement('img');
      let select = document.getElementById('colors')

      h1.innerHTML = product.name;
      p.innerHTML = product.description;
      span.innerHTML = product.price;

      img.src = product.imageUrl;
      img.alt = product.altTxt;
      div.appendChild(img);

      for (let color of product.colors) {
            let option = document.createElement('option');
            option.innerHTML = color;
            option.value = color;
            select.appendChild(option);
      }
}
// The "buttonCart" function adds an onclick event listener to a button element, which calls the "addToCart" function when clicked.
function buttonCart() {
      let btn = document.getElementById('addToCart');
      btn.onclick = function () { addToCart() };
}
// The "addToCart" function retrieves the user's selected color and quantity from the page, and creates an object with that information, as well as the product's id. It then checks if the product and color already exist in the cart stored in local storage. If they do, it increments the quantity, and if not, it pushes the object to the cart. It then updates the cart in local storage.
function addToCart() {
      let choiceColor = colors.value;
      let quantity = document.querySelector('#quantity').value;
      let cart = JSON.parse(localStorage.getItem("cart"));
      if (!cart) cart = [];
      let cartItem = {
            id: id,
            color: choiceColor,
            quantity: quantity
      };
// rajouter deux if, si la color est égal à vide =False. Et seulement si quantity est compris entre 1 et 100 =True, sinon =False
      let isFound = false;
      cart.forEach(item => {
            if (item.id == id && item.color == choiceColor) {
                  item.quantity = Number(item.quantity) + Number(quantity);
                  //Si elle est comprise entre 1 et 100 isFound = true
                  isFound = true;
            }
      });
      if (!isFound) {
            cart.push(cartItem);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
}
// The "main" function is also asynchronous and uses the "await" keyword to wait for the "retrieveProducts" function to complete before assigning the returned value to the "product" variable. It then calls the "displayProduct" and "buttonCart" functions and passes in the "product" variable as an argument.
async function main() {
      let product = await retrieveProducts()
      displayProduct(product)
      buttonCart()
}

main()