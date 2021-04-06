//API tookens
import {appId, appKey} from './api-tokens.js';
//DOM
import * as imported from './dom-elements.js'; //recipeCount, keywordInput, health, diet, calMin, calMax, searchButton, recipesMain

//get recipes
const getRecipes = (from, to, health, diet, calMin, calMax) => {
	//cleaning recipes section and pages section
	imported.recipesMain.innerHTML="";
	document.querySelector(".pages")!== null ? document.querySelector(".pages").remove():null;
	//checking calories values
	if(calMin!=="" && calMax!==""){
		parseInt(calMin)>parseInt(calMax) ? alert("Max calories value must be greater than min calories value!"):null;
	}

	let url = `https://api.edamam.com/search?q=${imported.keywordInput.value}&app_id=${appId}&app_key=${appKey}&from=${from}
	&to=${to}${diet!=="" ? '&diet='+diet:''}${health!=="" ? '&health='+health : ''}
	&calories=${calMin!==""? calMin:calMin=0}-${calMax!==""? calMax:calMax=10000}`;

	fetch(url)
	.then(data => data.json())
	.then(result => {
		console.log(url);
		console.log(result);
		//displaying recipes count
		imported.recipeCount.textContent = result.count;
		if(result.count===0) {
			imported.recipesMain.innerHTML="X no matching results";
		} else {
			//initial status
			createBlockRec(result.hits);
			//creating list of pages on the end of page
			//problem with api - free version gives only 100 recepies :)
			result.count>100 ? createPages(100):createPages(result.count);

			//selecting active page
			const pages = document.querySelectorAll("main>div>a");
			pages[from/12].classList.add("active");
		}
	})
}

//structure 
//section with results
const createBlockRec = recipes => {
	const recipeSection = document.createElement("section");
	recipeSection.setAttribute("id","recipes");
	for(let i=0; i<recipes.length; i++){
		const recipeArtic = document.createElement("article");
		recipeArtic.classList.add("recipe-element");

		const heading = `<h3>${recipes[i].recipe.label}</h3>`;
		const image = `<img src='${recipes[i].recipe.image}'>`;
		const calPerMeal = `<span class='calories'>${Math.round(recipes[i].recipe.calories/recipes[i].recipe.yield)}</span>`;

		const labels = document.createElement("div");
		labels.classList.add("labels");

		for(let j=0; j<recipes[i].recipe.healthLabels.length; j++) {
			const label = document.createElement("span");
			label.classList.add("label");
			label.textContent = recipes[i].recipe.healthLabels[j];
			labels.appendChild(label);
		}

		recipeArtic.innerHTML=heading+image+calPerMeal;
		recipeArtic.appendChild(labels);

		recipeSection.appendChild(recipeArtic);
	}
	imported.recipesMain.appendChild(recipeSection);
}

//construction of pages-options(1,2,3,4...) on the end of page
const createPages = result => {
	const pages = document.createElement("div");
	pages.classList.add("pages");
	const numberOfPages = Math.ceil(result/12);
	for(let i=1; i<=numberOfPages; i++){
		const page = document.createElement("a");
		page.setAttribute("href","#recipes");
		page.textContent=i;
		//adding event on each page-option to display another group of results when it is clicked
		page.addEventListener("click", () => {
			//removing previous selected page
			notActive();
			if(i===numberOfPages) {
				getRecipes(i*12-12,result, imported.health.value, imported.diet.value, imported.calMin.value, imported.calMax.value);
			} else {
				getRecipes(i*12-12,i*12, imported.health.value, imported.diet.value, imported.calMin.value, imported.calMax.value);
			}
		});
		pages.appendChild(page);
	}
	document.querySelector("main").appendChild(pages);
}

//removing selected page
const notActive = () => {
	const pageList = document.querySelectorAll("main>div>a");
	for(let i=0; i<pageList.length;i++){
		pageList[i].classList.contains("active") ? pageList[i].classList.remove("active"):null;
	}
}

//enabling search button
imported.keywordInput.addEventListener("input", () => (
imported.keywordInput.value==="" ? imported.searchButton.setAttribute("disabled","disabled"):imported.searchButton.removeAttribute("disabled"))
);

//search for recipes
imported.searchButton.addEventListener("click", () => getRecipes(0,12, imported.health.value, imported.diet.value, imported.calMin.value, imported.calMax.value));