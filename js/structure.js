//DOM
import {recipeCount, recipesMain} from './dom-elements.js';

//result
import {createBlockRec} from './recipe-section.js';
import {createPages} from './pages.js';

export const dispData = (result, from) => {
	//cleaning recipes section and pages section
	recipesMain.innerHTML="";
	document.querySelector(".pages")!== null ? document.querySelector(".pages").remove():null;
	//displaying recipes count
	recipeCount.textContent = result.count;
	if(result.count===0) {
		recipesMain.innerHTML="X no matching results";
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
}