const recipeCount = document.querySelector("header section span:first-child");
const keywordInput = document.querySelector("section input.keyword-input");
const health = document.querySelector("#food-form select:nth-child(2)");
const diet = document.querySelector("#food-form select:nth-child(3)");
const calMin = document.querySelector("#food-form div input:first-child");
const calMax = document.querySelector("#food-form div input:last-child");
const searchButton = document.querySelector(".search-button");
const recipesMain = document.getElementById("recipes");

export {recipeCount, keywordInput, health, diet, calMin, calMax, searchButton, recipesMain};