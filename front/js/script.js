// The "retrieveProducts" function is an asynchronous function that uses the fetch API to retrieve information from a local server at the specified URL. It then uses the "then" method to convert the response into a JSON format.
async function retrieveProducts() {
  return await fetch('http://localhost:3000/api/products') // will return info, but in wrong format
    .then((response) => response.json()) // will return info, in json format
}
// The "displayProducts" function takes in an argument of "products" and uses JavaScript DOM manipulation to create and append HTML elements to a section on the page. It creates and appends elements such as an anchor tag, article, heading, paragraph, and image, and assigns values to them from the "products" argument.
function displayProducts(products) {
  let section = document.getElementById('items');
  for (let elem of products) {
    let a = document.createElement('a');
    let article = document.createElement('article');
    let name = document.createElement('h3');
    let description = document.createElement('p');
    let img = document.createElement('img');

    a.href = `./product.html?id=${elem._id}`
    name.innerHTML = elem.name;
    name.classList.add("productName")
    description.innerHTML = elem.description;
    description.classList.add("productDescription");
    img.src = elem.imageUrl;

    article.appendChild(name);
    article.appendChild(img);
    article.appendChild(description);
    a.appendChild(article);
    section.appendChild(a);
  }
}
// The "main" function is also asynchronous and uses the "await" keyword to wait for the "retrieveProducts" function to complete before assigning the returned value to the "products" variable. It then calls the "displayProducts" function and passes in the "products" variable as an argument.
async function main() {
  let products = await retrieveProducts()
  displayProducts(products)
}

main()