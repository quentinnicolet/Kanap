let queryString = window.location.search;
console.log(queryString);
let urlParams = new URLSearchParams(queryString);
let id = urlParams.get('id')
console.log(id);

async function retrieveProducts() {
      return await fetch(`http://localhost:3000/api/products/${id}`) // will return info, but in wrong format
      .then((response) => response.json()) // will return info, in json format
}

function displayProduct(product){
      console.log(product)
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

      for (let color of product.colors){
            let option = document.createElement('option');
            option.innerHTML = color;
            option.value = color;
            select.appendChild(option);
      }
}

function buttonCart(){
      let btn = document.getElementById('addToCart');
      btn.onclick = function () {addToCart()};
}

function addToCart(){
      let choiceColor = colors.value;
      let quantity = document.querySelector('#quantity').value;
      let cart = JSON.parse(localStorage.getItem("cart"));
      if (!cart) cart=[];
      let cartItem = {
            id: id,
            color: choiceColor,
            quantity: quantity
      };
      let isFound = false;
      cart.forEach(item=>{
      if (item.id == id && item.color == choiceColor){
            item.quantity = Number(item.quantity) + Number(quantity);
            isFound = true;
      }
      });
      if (!isFound){
          cart.push(cartItem);
      }
      localStorage.setItem("cart",JSON.stringify(cart));
}

async function main() {
      let product = await retrieveProducts()
      displayProduct(product)
      buttonCart()
}
    
main()