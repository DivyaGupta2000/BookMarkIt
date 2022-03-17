// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// import { initializeApp } from "firebase/app";
// const firebaseConfig = {
//   apiKey: "AIzaSyB7muMpGMFJ9wwwzUUPmtHz9rLYmyFWFlc",
//   authDomain: "bookmarkapp-32976.firebaseapp.com",
//   projectId: "bookmarkapp-32976",
//   storageBucket: "bookmarkapp-32976.appspot.com",
//   messagingSenderId: "320351344855",
//   appId: "1:320351344855:web:db3eaabbcadae7112ab892",
//   measurementId: "G-FZ7R417CYL",
// };

// initializeApp(firebaseConfig);

const myform = document.getElementById("myform");
myform.addEventListener("submit", saveBookmark);

if (localStorage.getItem("userData") === null) {
  location = "login.html";
}

fetchBookmarks();

const saveGoogleBtn = document.getElementById("saveBtn");
saveGoogleBtn.addEventListener("click", () => {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  //console.log(bookmarks);
  updateData(bookmarks);
  //alert("Bookmarks Updated on Cloud");
});

function saveBookmark(e) {
  const siteName = document.getElementById("sitename").value;
  const siteUrl = document.getElementById("siteurl").value;
  //console.log("checking");
  //checking if forms response is valid or not
  if (!validateForm(siteName, siteUrl)) {
    return false;
  }

  const bookmark = {
    name: siteName,
    url: siteUrl,
  };

  //if bookmarks is empty
  if (localStorage.getItem("bookmarks") === null) {
    let bookmarks = [];
    bookmarks.push(bookmark);
    updateData(bookmarks);
    // adding to localStorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    // we get bookmarks from localStorage
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    // Add current bookmark to array
    bookmarks.push(bookmark);
    // Re-set back to localStorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    updateData(bookmarks);
  }

  // Clearing form
  document.getElementById("myform").reset();

  // Re-fetching bookmarks
  fetchBookmarks();

  // Prevent form from submitting
  e.preventDefault();
}

async function fetchBookmarks() {
  // Get bookmarks from localStorage
  let user = JSON.parse(localStorage.getItem("userData"));
  const bkmarks = JSON.parse(localStorage.getItem("bkmarks"));
  const mailId = document.getElementById("index-emailId");
  mailId.textContent = user.email;
  if (user && !bkmarks) {
    const data = await getData(user);
    localStorage.setItem("bookmarks", JSON.stringify(data));

    let bookmarks = data;

    // Get output id
    let bookmarksResults = document.getElementById("bookmarks-container");

    // Building output
    if (bookmarks.length === 0) {
      bookmarksResults.innerHTML = `<h3 class="bookmarks-container-empty">No Bookmarks added</h3>`;
    } else {
      bookmarksResults.innerHTML = "";
      for (let i = 0; i < bookmarks.length; i++) {
        let name = bookmarks[i].name;
        let url = bookmarks[i].url;

        bookmarksResults.innerHTML += `<div class="bookmarks">
          <div class="bookmark-name">
            <h1>${name}</h1>
          </div>
          <div>
          <a class="visitlink" href="${addhttp(url)}" target="_blank"
          ><button class="button-visit">Visit</button></a
        >
            <button type="button" class="button-del" id="del" onclick="deleteBookmark(${i})">Delete</button>
          </div>
        </div>`;
      }
    }
  } else if (user && bkmarks) {
    let bookmarksResults = document.getElementById("bookmarks-container");

    // Building output
    bookmarksResults.innerHTML = `<h3 class="bookmarks-container-empty">No Bookmarks added</h3>`;
    localStorage.removeItem("bkmarks");
  } else {
    alert("User not logged in ");
    location = "login.html";
  }
}

function deleteBookmark(i) {
  // Getting bookmarks from localStorage
  //console.log(i);
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  // Loop through the bookmarks
  bookmarks.splice(i, 1);
  //   for (let i = 0; i < bookmarks.length; i++) {
  //     if (bookmarks[i].url == url) {
  //       // Remove from array
  //bookmarks.splice(i, 1);
  //     }
  //   }

  // Re-set back to localStorage
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  // Re-fetch bookmarks
  updateData(bookmarks);
  fetchBookmarks();
}

function validateForm(siteName, siteUrl) {
  if (!siteName || !siteUrl) {
    alert("Please fill in the form");
    return false;
  }

  var expression =
    /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert("Please use a valid URL");
    return false;
  }

  return true;
}

function addhttp(url) {
  if (url.includes("http://", 0) || url.includes("https://", 0)) return url;
  return "https://" + url;
}

async function getData(user) {
  let res;

  await db
    .collection("bookmarks")
    .doc(user.uid)
    .get()
    .then((doc) => {
      res = doc.data().data;
    })
    .catch((err) => {
      alert(err.message);
    });

  return res;
}

// add data firestore
const updateData = (bookmarks) => {
  const user = JSON.parse(localStorage.getItem("userData"));
  if (bookmarks.length === 0) {
    let bookmarksResults = document.getElementById("bookmarks-container");
    bookmarksResults.innerHTML = `<h3 class="bookmarks-container-empty">No Bookmarks added</h3>`;
  }

  db.collection("bookmarks")
    .doc(user.uid)
    .set({
      data: bookmarks,
    })
    .then(() => {
      //alert("Bookmarks Updated Successfully");
    })
    .catch((err) => {
      alert("Bookmark added locally and not on cloud due to network error.");
      //console.log(err);
    });
};
