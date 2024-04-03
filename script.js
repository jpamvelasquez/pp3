"use strict";

document.addEventListener("DOMContentLoaded", function () {
  let allBeers = document.querySelector(".beer-function");
  let home = document.querySelector(".home-function");
  let search = document.querySelector(".search-function");
  let menu = document.querySelector(".menu-function");
  let contact = document.querySelector(".contact-function");
  let keyEnter = document.querySelector(".state-form");

  //footer
  let footerHome = document.querySelector(".footer-home");
  let footerBeer = document.querySelector(".footer-beer");
  let footerMenu = document.querySelector(".footer-menu");
  let footerContact = document.querySelector(".footer-contact");
  console.log("DOMContentLoaded event");

  footerHome.addEventListener("click", homeSection);
  footerBeer.addEventListener("click", beerSection);
  footerMenu.addEventListener("click", menuSection);
  footerContact.addEventListener("click", contactSection);

  home.addEventListener("click", homeSection);
  allBeers.addEventListener("click", beerSection);
  menu.addEventListener("click", menuSection);
  search.addEventListener("click", searchSection);
  contact.addEventListener("click", contactSection);
  keyEnter.addEventListener("keypress", handleKeyEnter);

  console.log("Event listeners attached");
});

function homeSection(e) {
  e.preventDefault();
  toggleNavLinks(this);
  toggleClass(".home-container");
  toggleClass(".ourBeers", true);
  toggleClass(".beer-fluid", true);
  toggleClass(".menu-container", true);
  toggleClass(".search-section", true);
  toggleClass(".contact-container", true);
}

function beerSection(e) {
  e.preventDefault();
  ourBeer();
  ourBrew();
  toggleNavLinks(this);
  toggleClass(".ourBeers");
  toggleClass(".beer-fluid");
  toggleClass(".home-container", true);
  toggleClass(".menu-container", true);
  toggleClass(".search-section", true);
  toggleClass(".contact-container", true);
}

function menuSection(e) {
  e.preventDefault();
  toggleNavLinks(this);
  toggleClass(".menu-container");

  menuHeading();
  // menuContainer();
  // mainCourseOnly();

  toggleClass(".home-container", true);
  toggleClass(".ourBeers", true);
  toggleClass(".beer-fluid", true);
  toggleClass(".search-section", true);
  toggleClass("spinner-container", true);
  toggleClass(".contact-container", true);
}

function searchSection(e) {
  toggleNavLinks(this);
  e.preventDefault();
  onlineBeerApi();
  // searchContainer();

  toggleClass(".search-section");
  toggleClass(".menu-container", true);
  toggleClass(".home-container", true);
  toggleClass(".ourBeers", true);
  toggleClass(".beer-fluid", true);
  toggleClass(".contact-container", true);
}

function handleKeyEnter(e) {
  if (e.key === "Enter") {
    e.preventDefault();

    onlineBeerApi();

    toggleClass(".search-section");
    toggleClass(".menu-container", true);
    toggleClass(".home-container", true);
    toggleClass(".ourBeers", true);
    toggleClass(".beer-fluid", true);
    toggleClass(".contact-container", true);
  }
}

function contactSection(e) {
  e.preventDefault();
  toggleNavLinks(this);
  toggleClass(".contact-container");
  toggleClass(".search-section", true);
  toggleClass(".menu-container", true);
  toggleClass(".home-container", true);
  toggleClass(".ourBeers", true);
  toggleClass(".beer-fluid", true);
}
//Function to toggle
function toggleClass(classSelector, show = false) {
  const classes = document.querySelector(classSelector);
  if (classes) {
    classes.style.display = show ? "none" : "block";
  }
}

//Our Beer Section
function ourBeer() {
  toggleClass(".beer-spinner-container");

  let beer = new XMLHttpRequest();
  beer.open("GET", "./beers.json");
  beer.send();

  beer.addEventListener("load", function () {
    let beerData = JSON.parse(this.responseText);
    console.log(beerData);
    toggleClass(".beer-spinner-container", true);
    displayBeer(beerData);
    modalBeer(beerData);
    document
      .querySelector(".sort-form")
      .addEventListener("change", function () {
        sortedBeer(beerData);
      });
  });
}
// ourBeer();

//Displaying beer
function displayBeer(data) {
  let divs = "";

  for (const keys of Object.keys(data)) {
    divs += `   <div class="col-md-6 col-lg-3">
              <div class="card">
                  
                  <div class="img-resize" data-bs-toggle="modal" data-bs-target="#beerSection-${keys}">
                  <img src="${data[keys].photo}" class="card-img-top" />
                  </div>
                  <div class="card-body">
                  <p class="card-title">${data[keys].name}</p>
                  </div>
              </div>
          </div>`;
  }
  document.querySelector(".beer-section").innerHTML = divs;
}

// Modal
function modalBeer(data) {
  let divs = "";
  for (const keys of Object.keys(data)) {
    divs += ` <div class="modal fade " id="beerSection-${keys}" tabindex="-1" class="beer-modal"  aria-hidden="true">
       <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header d-flex pe-4 ">
              <img src="./images/modal-logo.png" class="logo" />
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close"><i class="bi bi-x-lg m-close"></i></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-5 text-center">
                  <div class="img-resizes">
                  <img src="${data[keys].photo}" />
                </div>
                <p class="fw-bold">Price :<span class="fw-normal"> ${data[keys].price} USD </span> </p>
                </div>
                <div class="col-md-7 beer-description mt-4">
                  <p class="text-center fs-1">${data[keys].name}</p>
                  <p>ABV : <span>${data[keys].abv}</span></p>
                  <p>Color: <span>${data[keys].color}</span></p>
                  <p>Aromatics : <span>${data[keys].aromatics}</span> </p>
                  <p>Flavor : <span>${data[keys].flavor}</span></p>
                  <p>Pairing Suggestion : <span>${data[keys].bestwith} </span> </p>
                  <p> Description : <span>${data[keys].description} </span> </p>
                </div>
              </div>
            </div>
         </div>
        </div>
    </div>`;
  }
  document.querySelector(".beer-modal").innerHTML = divs;
}

//Sort by
function sortedBeer(data) {
  const sorted = document.querySelector(".sort-form").value;
  console.log(data);
  let sortedData;
  if (sorted === "high") {
    sortedData = Object.values(data).sort((a, b) => b.price - a.price);
  } else if (sorted === "low") {
    sortedData = Object.values(data).sort((a, b) => a.price - b.price);
  } else if (sorted === "bestselling") {
    // sortedData = Object.values(data).sort((a, b) => b.ratings - a.ratings);
    sortedData = Object.values(data)
      .filter((item) => item.ratings >= 4.2)
      .sort((a, b) => b.ratings - a.ratings);
  }
  displayBeer(sortedData);
  modalBeer(sortedData);
}

function ourBrew() {
  let div = `
  <div class="container-fluid beer-fluid">
  <div class='hero-beer'>
  <h1>Where Every Sip Unfolds a Story</h1>
  </div>
  <div class="container beer-featured">
    <div class="row text-center">
      <div class="col mb-5">
        <div class="text-design">
          <h2 class="beer-text">Our Brews</h2>
          <p>Savor the Essence of Our Crafted Brews.</p>
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col d-flex selection">
        <div class="sort-beer d-flex">
          <h2  class="beer-tagline">Sort By</h2>
          <select class="form-select sort-form" aria-label="Default select example">
            <option selected>Open this select menu</option>
            <option value="high">Price : High - Low </option>
            <option value="low">Price : Low - High</option>
            <option value="bestselling">Highly rated brews</option>
          </select>
        </div>
      </div>
      <div class="beer-spinner-container">
      <div class="loader-div">
        <div>
          <div>
            <span class="loader"></span>
          </div>
         <div class="mt-5">
          <span class="loaders"></span>
         </div>
        </div>
      </div>
    </div> 
  
    </div>
    
    <div class="row row-cols-1 row-cols-md-4 g-5 pb-4 text-center beer-section">
    
    </div>
  </div>
  <h2 class="text-advice">Experience our brews firsthand and savor the taste of excellence</h2>
</div>`;
  document.querySelector(".ourBeers").innerHTML = div;
}

// ourBrew();

// //State abbreviations if user input abbreviations
// const stateAbbreviations = {
//   AL: "Alabama",
//   AK: "Alaska",
//   AZ: "Arizona",
//   AR: "Arkansas",
//   CA: "California",
//   CO: "Colorado",
//   CT: "Connecticut",
//   DE: "Delaware",
//   FL: "Florida",
//   GA: "Georgia",
//   HI: "Hawaii",
//   ID: "Idaho",
//   IL: "Illinois",
//   IN: "Indiana",
//   IA: "Iowa",
//   KS: "Kansas",
//   KY: "Kentucky",
//   LA: "Louisiana",
//   ME: "Maine",
//   MD: "Maryland",
//   MA: "Massachusetts",
//   MI: "Michigan",
//   MN: "Minnesota",
//   MS: "Mississippi",
//   MO: "Missouri",
//   MT: "Montana",
//   NE: "Nebraska",
//   NV: "Nevada",
//   NH: "New Hampshire",
//   NJ: "New Jersey",
//   NM: "New Mexico",
//   NY: "New York",
//   NC: "North Carolina",
//   ND: "North Dakota",
//   OH: "Ohio",
//   OK: "Oklahoma",
//   OR: "Oregon",
//   PA: "Pennsylvania",
//   RI: "Rhode Island",
//   SC: "South Carolina",
//   SD: "South Dakota",
//   TN: "Tennessee",
//   TX: "Texas",
//   UT: "Utah",
//   VT: "Vermont",
//   VA: "Virginia",
//   WA: "Washington",
//   WV: "West Virginia",
//   WI: "Wisconsin",
//   WY: "Wyoming",
// };

//Online API Calling
function onlineBeerApi() {
  let state = document.querySelector(".state-form").value.trim().toLowerCase();

  if (state === "" || !isNaN(state) || state.length <= 3) {
    alert("Invalid Input. Please enter a state.");
    toggleClass(".footer-section", true);
    window.location.href = "index.html";
    return;
  }
  let beerApi = new XMLHttpRequest();

  beerApi.open(
    "GET",
    `https://api.openbrewerydb.org/v1/breweries?by_state=${state}&per_page=12`
  );
  beerApi.send();

  beerApi.addEventListener("load", function () {
    const beerOnlineApi = JSON.parse(this.responseText);
    console.log(beerOnlineApi);

    if (beerOnlineApi.length === 0) {
      // No breweries found for the provided state
      alert("No breweries found for the provided state.");
      toggleClass(".footer-section", true);
      window.location.href = "index.html";
      return;
    }

    let divs = "";

    for (const keys of Object.keys(beerOnlineApi)) {
      const websiteUrl = beerOnlineApi[keys].website_url;
      const domainOnly =
        websiteUrl &&
        (websiteUrl.startsWith("https://") ||
          websiteUrl.startsWith("http://") ||
          websiteUrl.startsWith("www."))
          ? websiteUrl.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")
          : websiteUrl;

      divs += `
      <div class="col-md-6 col-lg-3 card-directories">
        <div class="card" style="width: 30rem; height :20rem">
          <div class="card-body">
          <div class='card-state-text'>
            <h5 class="card-title">${beerOnlineApi[keys].name}</h5>
            </div>
            <hr class="hrs">
            <p class="card-text">City : ${
              beerOnlineApi[keys].city
                ? beerOnlineApi[keys].city
                : "<span class='not-avail'>Not Available</span>"
            }</p>
            <p class="card-text">Street : ${
              beerOnlineApi[keys].street
                ? beerOnlineApi[keys].street
                : "<span class='not-avail'>Not Available</span>"
            }</p>
            <p class="card-text">Phone : ${
              beerOnlineApi[keys].phone
                ? beerOnlineApi[keys].phone
                : "<span class='not-avail>Not Available</span>"
            }</p>
            <a href="${
              beerOnlineApi[keys].website_url || "#"
            }" target="_blank" class="card-link"> Website : ${
        beerOnlineApi[keys].website_url
          ? `<span class='link-site'>${domainOnly}</span>`
          : "<span class='not-avail'>Not Available </span>"
      }</a>
            </div>
          </div>
        </div>
    </div>`;
    }
    toggleClass(".online-api-spinner-container", true);
    searchContainer();

    let stateText = state.split(" ");
    let textSplit = [];
    for (const name of stateText) {
      textSplit.push(name.replace(name[0], name[0].toUpperCase()));
    }
    let stateName = textSplit.join(" ");
    console.log(stateText);
    document.querySelector(
      ".brew-text"
    ).innerText = `${stateName} Brewery Guide`;
    document.querySelector(".directories").innerHTML = divs;
    document.querySelector(".state-form").value = "";

    console.log("working api");
  });
}

function searchContainer() {
  let div = `

    
  <div class="container">
  <div class="search-by-state">
    <h2 class="text-center brew-text">Texas Brewery Guide</h2>
    <div class="online-api-spinner-container">
    <div class="loader-div">
      <div>
        <div>
          <span class="loader"></span>
        </div>
      <div class="mt-5">
        <span class="loaders"></span>
      </div>
      </div>
    </div>
  </div>
    <div class="display-directories">
    <div class="row row-cols-1 row-cols-md-4 g-4 pb-4 directories">
    </div>
    </div>
    <hr>    
  </div>
</div> `;
  document.querySelector(".search-section").innerHTML = div;
}

//MENU FUNCTIONS
function menuContainer() {
  //spinner

  const menu = new XMLHttpRequest();
  menu.open("GET", "./menu.json");
  menu.send();

  menu.addEventListener("load", function () {
    const menuList = JSON.parse(this.responseText);
    // console.log(menuList);
    toggleClass(".spinner-container", true);
    let mainCourse = document.querySelector(".btn-main-course");
    let breadTacos = document.querySelector(".btn-bread");
    let pastaPizza = document.querySelector(".btn-pasta");
    let salad = document.querySelector(".btn-salad");
    const spinner = document.querySelector(".spinner-container");

    mainCourse.addEventListener("click", function () {
      displayListMenu(menuList, "Main Course");
      console.log("this is main course menu");
      toggleButtonClasses(this);
    });

    breadTacos.addEventListener("click", function () {
      displayListMenu(menuList, "Appetizer");
      console.log("this is bread and tacos menu");
      toggleButtonClasses(this);
    });

    pastaPizza.addEventListener("click", function () {
      displayListMenu(menuList, "Entrees");
      console.log("this is pasta pizaa menu");
      toggleButtonClasses(this);
    });

    salad.addEventListener("click", function () {
      displayListMenu(menuList, "Side dish");
      console.log("this is salad");
      toggleButtonClasses(this);
    });

    toggleClass(".spinner-container", true);
  });
  console.log("this is menu container");
}

function displayListMenu(data, menuName) {
  // console.log(data);
  // alert("hello-bread");
  console.log("this is displaylistmenu");
  let div = "";

  const menuEntry = data.filter((item) => item.categories === menuName);

  for (const key of Object.keys(menuEntry)) {
    // console.log(menuEntry[key].name);
    div += `  <div class=" col-sm-12 col-md-12 col-lg-6 menu-style">
    <div class="row d-flex">
      <img src="${menuEntry[key].photo}" class="col-md-5 col-lg-5">
      <div class=" col-md-7 col-lg-7 menu-text">
        <h3 class="menu-name">${menuEntry[key].name}</h3>
        <p class='mt-1'>${menuEntry[key].description}</p>
        <p class='ingredients'>${menuEntry[key].ingredients}</p>
        <p>Price : ${menuEntry[key].price} USD</p>
      </div>
    </div>
  </div>`;
  }

  document.querySelector(".show-menu").innerHTML = div;
}

function mainCourseOnly() {
  const menu = new XMLHttpRequest();
  menu.open("GET", "./menu.json");
  menu.send();

  menu.addEventListener("load", function () {
    const menuList = JSON.parse(this.responseText);

    let div = "";

    const mainCourseItems = menuList.filter(
      (item) => item.categories === "Main Course"
    );
    toggleClass(".spinner-container", true);
    for (const menuItem of mainCourseItems) {
      div += `
        <div class="col-sm-12 col-md-12 col-lg-6 menu-style">
          <div class="row d-flex">
            <img src="${menuItem.photo}" class="col-md-5 col-lg-5">
            <div class="col-md-7 col-lg-7 menu-text">
              <h3 class="menu-name">${menuItem.name}</h3>
              <p class='mt-1'>${menuItem.description}</p>
              <p class='ingredients'>${menuItem.ingredients}</p>
              <p>Price : ${menuItem.price} USD</p>
            </div>
          </div>
        </div>`;
    }

    document.querySelector(".show-menu").innerHTML = div;
    console.log("this is main course");
  });
}

function menuHeading() {
  let div = ` <div class="container">
  <div class="row">
    <div class="col text-design">
      <h2 class="text-center beer-text mt-4" >Our Menus</h2>
      <p>Satisfy Every Plate</p>
    </div>
  </div>
  <div class="row text-center mt-5">
   <div class="col ">
    <button  class="btn btn-lg  btn-main-course btn-warning btn-active me-2 mb-1"">Main Course</button>
    <button class="btn btn-lg me-2  mb-1 btn-warning btn-bread">Bread & Tacos</button>
    <button class="btn mb-1 btn-lg  me-2 btn-warning btn-pasta ">Pasta & Pizza</button>
    <button class="btn btn-lg  me-2  mb-1 btn-warning btn-salad">Salad</button>
   </div>
  </div>
  <div class="spinner-container">
  <div class="loader-div">
    <div>
      <div>
        <span class="loader"></span>
      </div>
     <div class="mt-5">
      <span class="loaders"></span>
     </div>
    </div>
  </div>
</div>
  <div class="row  row-cols-1 row-cols-lg-6 g-5 pb-4 mt-5 show-menu">
  
  </div>
  <div class="row">
      <div class="col">
        <h2 class="text-advice">Kindly be advised that our menus are subject to regular updates based on seasonal availability.<br> For the latest information on our offerings, feel free to reach out to us via phone or email.</h2>
      </div>
    </div>`;
  toggleClass(".spinner-container", true);
  document.querySelector(".menu-container").innerHTML = div;
  mainCourseOnly();
  menuContainer();
  console.log("this is menu heading");
}

//button toggle

function toggleButtonClasses(clickedButton) {
  const buttons = document.querySelectorAll(".btn-lg");

  buttons.forEach((button) => button.classList.remove("btn-active"));
  clickedButton.classList.add("btn-active");
}

//nav-link toggle

function toggleNavLinks(clickedButton) {
  const links = document.querySelectorAll(".nav-links");

  links.forEach((link) => link.classList.remove("active"));
  clickedButton.classList.add("active");
}

//Contact

function displayContact() {
  let div = `   <div class="row contact-details">
  <div class="text-design">
    <h2 class="beer-text text-center">Reach out to us</h2>
    <p> Get in Touch for Brews & Bookings!</p>
  </div>
  
  <div class="row info">
    <div class="col-sm-12 col-md-4 col-lg-4 location">
      <div class="d-flex justify-content-center mb-4">
      <div class="contact-icon">
        <i class="bi bi-geo-alt"></i>
      </div>
      </div>
      <h3 class="contact-section">Hours & Location</h3>
      <div class="bar-address">
        <h4 class="days">Address</h4>
        <p>196 Co Road 110</p>
        <p>Comanche Texas, 742</p>
        <p>United States</p>
      </div>
      <h3 class="days">Monday - Thursday</h3>
      <p> 10:00 am to 10:00 pm</p>
      <h3 class="days"> Friday & Saturday </h3>
      <p>10:00 am to 11:00 pm</p>
      <h3 class="days"> Sunday</h3>
      <p>CLOSED</p>
     
    </div>
    <div class="col-sm-12 col-md-4 col-lg-4 phone">
      <div class="d-flex justify-content-center  mb-4">
      <div class="contact-icon">
        <i class="bi bi-telephone"></i>
      </div>
      </div>
      <h3  class="contact-section">Phone</h3>
      <h4 class="days">Customer Support</h4>
      <p> Our dedicated customer support team is available to assist you with any issues or concerns you may have. Please don't hesitate to reach out to us for assistance.</p>
      <p>Tel : +1 (555) 987-6543 </p>
      <h4 class="days">Booking & Reservations</h4>
      <p> Planning to visit us for a brewery tour, tasting event, or private function? Contact our booking team to reserve your spot or inquire about availability.</p>
      <p>
        Tel : (Booking): +1 (555) 234-5678
      </p>
    </div>
    <div class="col-sm-12 col-md-4 col-lg-4 email">
      <div class="d-flex justify-content-center  mb-4">
        <div class="contact-icon">
          <i class="bi bi-chat-square-dots"></i>
        </div>
      </div>
      
      <h3  class="contact-section">Email</h3>
      <h4 class="days">General Inquiries</h4>
      <p>
        If you have any general questions or feedback, please don't hesitate to get in touch with us. We're here to assist you.
      </p>
      <p>
        Email : brews.co@gmail.com
      </p>
    </div>
    <div class="row">
      <p class="text-advices">We strictly prohibit the consumption of alcoholic beverages brought from outside.<br> Our establishment exclusively offers beer, and we adhere to this policy by only serving beer.</p>
    </div>
  </div>
</div>
<div class="container-md">
  <div class="row">
    <div class="col-sm-12 col-md-6 col-lg-6">
      <h2>Message</h2>
      <p> Send Us Your Thoughts and Queries! We're Here to Listen.<br> Got a Question? We've Got Answers! <br>Connect with Us Today. Your Feedback Matters to Us!</p>
    </div>
    <div class= " col-sm-12 col-md-6 col-lg-6">
      <h2>Message Us</h2>
   
    </div>
  </div>
</div>`;

  document.querySelector(".contact-container").innerHTML = div;
}
