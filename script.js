"use strict";

document.addEventListener("DOMContentLoaded", function () {
  let allBeers = document.querySelector(".beer-function");
  let home = document.querySelector(".home-function");

  home.addEventListener("click", homeSection);
  allBeers.addEventListener("click", beerSection);
});

function homeSection(e) {
  e.preventDefault();
  toggleClass(".home-container");
  toggleClass(".ourBeers", true);
  toggleClass(".beer-fluid", true);
}

function beerSection(e) {
  e.preventDefault();
  carouselBeer();
  ourBeer();
  ourBrew();
  toggleClass(".ourBeers");
  toggleClass(".beer-fluid");
  toggleClass(".home-container", true);
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

function carouselBeer() {
  const div = `<div class="col-md-12">
  <div id="carouselExampleIndicators" class="carousel slide carousel-fade" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner ">
      <div class="carousel-item active ourbeer-carousel-1 " data-bs-interval="3000">
        <div class="comment-text">
         <div class="row">
          <div class="col">
            <h1>
              Where Every Pour Tells a Tale of Passion.
            </h1>
          </div>
         </div>
        </div>
      </div>
      <div class="carousel-item ourbeer-carousel-2" data-bs-interval="2000">
     
        <div class="comment-text">
          <div class="row">
            <div class="col">
              <h1>
                The Man Behind the Brew: <br> Crafting Excellence, One Batch at a Time.
              </h1>
            </div>
           </div>
        </div>
      </div>
      <div class="carousel-item ourbeer-carousel-3">
        <div class="comment-text">
          <div class="row">
            <div class="col">
              <h1>
                Where Every Sip Tells a Story.
              </h1>
            </div>
           </div>
        </div>
      </div>
    </div>
  </div>
</div>`;

  document.querySelector(".beer-fluid").innerHTML = div;
}
// carouselBeer();

function ourBrew() {
  let div = `
  <div class="container-fluid pt-5">
  <div class="container beer-featured">
    <div class="row text-center">
      <div class="col mb-5">
        <div class="text-design">
          <h2 class="beer-text">Our Brews</h2>
          <p>Savor the Essence of Our Crafted Brews.</p>
        </div>
        
      </div>
    </div>
    <div class="row mt-4">
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
      <!-- <div class="col-md-6 col-lg-3">
        <div class="card"> 
          <div class="img-resize"  data-bs-toggle="modal" data-bs-target="#beerSection">
          <img src="./images/beerCover/dragon.png" class="card-img-top" />
          </div>
          <div class="card-body">
            <p class="card-title">Dragon's Draught</p>
          </div>
        </div>
    </div> -->
    </div>
  </div>
</div>`;
  document.querySelector(".ourBeers").innerHTML = div;
}

// ourBrew();
