"use strict";
const searchInput = document.getElementsByClassName("search-input")[0];
const btnSearch = document.getElementsByClassName("search-button")[0];

const APP_ID = "33ac3df6";
const APP_key = "fd85b16f030b7c05afea6cd25c81cdc3";

//bắt sự kiện
btnSearch.addEventListener("click", function () {
  if (searchInput.value === "") {
    alert("Vui lòng nhập từ khoá");
  } else {
    searchRecipes();
  }
});
//hàm lấy dữ liệu
function searchRecipes() {
  const url = `https://api.edamam.com/search?q=${searchInput.value}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=20`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let resultsContainer = document.getElementById("resultsContainer");
      resultsContainer.innerHTML = "";

      data.hits.forEach((hit) => {
        let recipe = hit.recipe;
        let recipeElement = document.createElement("div");
        recipeElement.innerHTML += `<div class="item">
        <img src="${recipe.image}" alt="img">
        <div class="flex-container">
          <h1 class="title">${recipe.label}</h1>
          <a class="view-btn" target="_blank" href="${
            recipe.url
          }">View Recipe</a>
        </div>
        <p class="item-data">Calories: ${recipe.calories.toFixed(2)}</p>
        <p class="item-data">Diet label: ${
          recipe.dietLabels.length > 0 ? recipe.dietLabels : "No Data Found"
        }</p>
        <p class="item-data">Health labels: ${recipe.healthLabels}</p>
      </div>`;
        resultsContainer.appendChild(recipeElement);
      });
    })
    .catch((error) => console.log(error));
}
