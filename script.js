"use strict";

//Our Beer Section
function ourBeer() {
  let beer = new XMLHttpRequest();
  beer.open("GET", "./beers.json");
  beer.send();
  beer.addEventListener("load", function () {
    let beerData = JSON.parse(this.responseText);
    console.log(beerData);

    let divs = "";

    for (const keys of Object.keys(beerData)) {
      divs += `   <div class="col-md-6 col-lg-3">
                <div class="card">
                    
                    <div class="img-resize" data-bs-toggle="modal" data-bs-target="#beerSection-${keys}">
                    <img src="${beerData[keys].photo}" class="card-img-top" />
                    </div>
                    <div class="card-body">
                    <p class="card-title">${beerData[keys].name}</p>
                    </div>
                </div>
            </div>`;
    }
    document.querySelector(".beer-section").innerHTML = divs;
    modalBeer(beerData);
  });
}
ourBeer();

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
                  <div class="img-resize">
                  <img src="${data[keys].photo}" />
                </div>
                <p class="fw-bold">Price :<span class="fw-normal"> ${data[keys].price}</span> </p>
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
modalBeer();
