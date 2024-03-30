"use strict";

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
ourBeer();

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
