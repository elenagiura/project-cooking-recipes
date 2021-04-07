//api-tokens
import {appId, appKey} from './api-tokens.js';

//DOM
import {keywordInput} from './dom-elements.js';

//structure
import {dispData} from './structure.js';

//get recipes
export const getRecipes = (from, to, health, diet, calMin, calMax) => {
	//checking calories values
	if(calMin!=="" && calMax!==""){
		parseInt(calMin)>parseInt(calMax) ? alert("Max calories value must be greater than min calories value!"):null;
	}

	let url = `https://api.edamam.com/search?q=${keywordInput.value}&app_id=${appId}&app_key=${appKey}&from=${from}
	&to=${to}${diet!=="" ? '&diet='+diet:''}${health!=="" ? '&health='+health : ''}
	&calories=${calMin!==""? calMin:calMin=0}-${calMax!==""? calMax:calMax=10000}`;

	fetch(url)
	.then(data => data.json())
	.then(result => {
		console.log(url);
		console.log(result);
		dispData(result, from);
		
	})
}