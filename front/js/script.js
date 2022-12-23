async function retrieveProducts() {
      return await fetch('http://localhost:3000/api/products') // will return info, but in wrong format
      .then((response) => response.json()) // will return info, in json format
    }
    
    function afficherLesProduits(products){
      console.log (products)
      let section = document.getElementById('items');
      for (let elem of products){
        let a = document.createElement('a');
        let article = document.createElement('article');
        let name = document.createElement('h3');
        let description = document.createElement('p');
        let img = document.createElement('img');
        
        a.href =`./product.html?id=${elem._id}`
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
    
    async function main() {
      let products = await retrieveProducts()
      afficherLesProduits(products)
    }
    
    main()