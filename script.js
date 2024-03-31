"use strict";

document.addEventListener("DOMContentLoaded", function () {
  let allBeers = document.querySelector(".beer-function");
  let home = document.querySelector(".home-function");
  let search = document.querySelector(".search-function");
  let menu = document.querySelector(".menu-function");
  let contact = document.querySelector(".contact-function");
  let keyEnter = document.querySelector(".state-form");

  console.log("DOMContentLoaded event fired");

  home.addEventListener("click", homeSection);
  allBeers.addEventListener("click", beerSection);
  menu.addEventListener("click", menuSection);
  search.addEventListener("click", searchSection);
  keyEnter.addEventListener("keypress", handleKeyEnter);

  console.log("Event listeners attached");
});

function homeSection(e) {
  e.preventDefault();

  toggleClass(".home-container");
  toggleClass(".ourBeers", true);
  toggleClass(".beer-fluid", true);
  toggleClass(".menu-container", true);
  toggleClass(".search-section", true);
}

function beerSection(e) {
  e.preventDefault();
  ourBeer();
  ourBrew();
  toggleClass(".ourBeers");
  toggleClass(".beer-fluid");
  toggleClass(".home-container", true);
  toggleClass(".menu-container", true);
  toggleClass(".search-section", true);
}

function menuSection(e) {
  e.preventDefault();

  toggleClass(".menu-container");
  toggleClass(".home-container", true);
  toggleClass(".ourBeers", true);
  toggleClass(".beer-fluid", true);
  toggleClass(".search-section", true);
}

function searchSection(e) {
  e.preventDefault();
  onlineBeerApi();
  // searchContainer();

  toggleClass(".search-section");
  toggleClass(".menu-container", true);
  toggleClass(".home-container", true);
  toggleClass(".ourBeers", true);
  toggleClass(".beer-fluid", true);
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
  }
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
  let beer = new XMLHttpRequest();
  beer.open("GET", "./beers.json");
  beer.send();
  beer.addEventListener("load", function () {
    let beerData = JSON.parse(this.responseText);
    console.log(beerData);

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
    sortedData = Object.values(data).sort((a, b) => b.ratings - a.ratings);
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
            <option value="bestselling">Bestselling</option>
          </select>
        </div>
      </div>
    </div>
    <div class="row row-cols-1 row-cols-md-4 g-4 pb-4 text-center beer-section">
    
    </div>
  </div>
</div>`;
  document.querySelector(".ourBeers").innerHTML = div;
}

// ourBrew();

//Online API Calling

function onlineBeerApi() {
  let state = document.querySelector(".state-form").value.trim();

  if (state === "" || !isNaN(state)) {
    alert("Invalid Input. Please enter a state");
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

    let html = "";

    for (const keys of Object.keys(beerOnlineApi)) {
      html += `
      <div class="col-md-6 col-lg-3 card-directories">
        <div class="card" style="width: 30rem; height :20rem">
          <div class="card-body">
          <div class='card-state-text'>
            <h5 class="card-title">${beerOnlineApi[keys].name}</h5>
            </div>
            <hr class="hrs">
            <p class="card-text">City : ${beerOnlineApi[keys].city}</p>
            <p class="card-text">Street : ${beerOnlineApi[keys].street}</p>
            <p class="card-text">Phone : ${beerOnlineApi[keys].phone}</p>
            <a href="${
              beerOnlineApi[keys].website_url || "#"
            }" target="_blank" class="card-link">${
        beerOnlineApi[keys].website_url ? "Website" : "Website"
      } : <span class='link-site'>${
        beerOnlineApi[keys].website_url || "Not Available"
      }</span></a>
            </div>
          </div>
        </div>
    </div>`;
    }

    searchContainer();
    let stateText = state[0].toUpperCase() + state.slice(1).toLowerCase();

    document.querySelector(
      ".brew-text"
    ).innerText = `${stateText} Brewery Guide`;
    document.querySelector(".directories").innerHTML = html;
    document.querySelector(".state-form").value = "";
    console.log("working api");
  });
}

function searchContainer() {
  let div = `<div class="container">
  <div class="search-by-state">
    <h2 class="text-center brew-text">Texas Brewery Guide</h2>
    <div class="display-directories">
    <div class="row row-cols-1 row-cols-md-4 g-4 pb-4 directories">
    </div>
    </div>
    <hr>    
  </div>
</div> `;
  document.querySelector(".search-section").innerHTML = div;
}
