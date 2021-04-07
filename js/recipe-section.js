//DOM
import {recipesMain} from './dom-elements.js';

//section with results
export const createBlockRec = recipes => {
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
	recipesMain.appendChild(recipeSection);
}