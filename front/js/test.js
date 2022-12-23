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