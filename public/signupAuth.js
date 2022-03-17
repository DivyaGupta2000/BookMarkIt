//SignUp Page
const form = document.getElementById("form-signup");
const username = document.getElementById("username-signup");
const email = document.getElementById("email-signup");
const password = document.getElementById("password-signup");
// const password2 = document.getElementById("password2-signup");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  //checkInputs(e);
  SignUpUser(e);
});

// function checkInputs() {
//   // trim to remove the whitespaces
//   const usernameValue = username.value.trim();
//   const emailValue = email.value.trim();
//   const passwordValue = password.value.trim();
//   const password2Value = password2.value.trim();

//   if (usernameValue === "") {
//     setErrorFor(username, "Username cannot be blank");
//   } else {
//     setSuccessFor(username);
//   }

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

//   if (password2Value === "") {
//     setErrorFor(password2, "This field cannot be blank");
//   } else if (passwordValue !== password2Value) {
//     setErrorFor(password2, "Passwords does not match");
//   } else {
//     setSuccessFor(password2);
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

const SignUpUser = (e) => {
  e.preventDefault();
  auth
    .createUserWithEmailAndPassword(email.value.trim(), password.value.trim())
    .then((res) => {
      let bookmarks = [{}];
      const user = res.user;
      //console.log(user.uid);
      // db.collection("bookmarks")
      //   .doc(`${user.uid}`)
      //   .set({
      //     data: bookmarks,
      //   })
      //   .then((doc) => {
      //     alert("BookMark Created");
      //   })
      //   .catch((error) => {
      //     console.error("Error adding document: ", error);
      //   });

      localStorage.setItem("userData", JSON.stringify(res.user));
      localStorage.setItem("bkmarks", JSON.stringify(bookmarks));
      //alert("User Registered");
      location = "index.html";
    })
    .catch((err) => {
      alert(err.message);
    });
};
