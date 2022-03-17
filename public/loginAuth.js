const form = document.getElementById("form-login");
const email = document.getElementById("email-login");
const password = document.getElementById("password-login");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  //checkInputs(e);
  logInUser(e);
});

// function checkInputs() {
//   // trim to remove the whitespaces

//   const emailValue = email.value.trim();
//   const passwordValue = password.value.trim();

//   if (emailValue === "") {
//     setErrorFor(email, "Email cannot be blank");
//   } else if (!isEmail(emailValue)) {
//     setErrorFor(email, "Not a valid email");
//   } else {
//     setSuccessFor(email);
//   }

//   if (passwordValue === "") {
//     setErrorFor(password, "Password cannot be blank");
//   } else {
//     setSuccessFor(password);
//   }
// }

// function setErrorFor(input, message) {
//   const formControl = input.parentElement;
//   const small = formControl.querySelector("small");
//   formControl.className = "form-control error";
//   small.innerText = message;
// }

// function setSuccessFor(input) {
//   const formControl = input.parentElement;
//   formControl.className = "form-control success";
// }

// function isEmail(email) {
//   return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
//     email
//   );
// }

const logInUser = (e) => {
  e.preventDefault();
  auth
    .signInWithEmailAndPassword(email.value.trim(), password.value.trim())
    .then((res) => {
      //console.log(res.user.uid)

      const data = res.user;
      localStorage.setItem("userData", JSON.stringify(data));
      location = "index.html";
      //alert("User Logged In");
    })
    .catch((error) => alert(error.message));
};
