//DOM
import {keywordInput, health, diet, calMin, calMax, searchButton} from './dom-elements.js';

//structure
import {getRecipes} from './results.js';

//enabling search button
keywordInput.addEventListener("input", () => (
keywordInput.value==="" ? searchButton.setAttribute("disabled","disabled"):searchButton.removeAttribute("disabled"))
);

//search for recipes
searchButton.addEventListener("click", () => getRecipes(0,12, health.value, diet.value, calMin.value, calMax.value));