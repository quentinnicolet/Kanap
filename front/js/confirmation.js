// This code retrieves the orderId from the URL query string, assigns it to a variable, and then displays it on the page by setting the innerHTML of an element with the id "orderId".
let urlParams = new URLSearchParams(window.location.search);
let orderId = urlParams.get('orderId');

document.getElementById('orderId').innerHTML = orderId;
localStorage.clear()