//DOM
import {health, diet, calMin, calMax} from './dom-elements.js';

//recipes
import {getRecipes} from './results.js';

//construction of pages-options(1,2,3,4...) on the end of page
export const createPages = result => {
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
				getRecipes(i*12-12,result, health.value, diet.value, calMin.value, calMax.value);
			} else {
				getRecipes(i*12-12,i*12, health.value, diet.value, calMin.value, calMax.value);
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