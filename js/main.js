//API tookens
var appId = "2fd020ce";
var appKey = "d9f136e83d480ade9525e2c3c9e5b83a";

//DOM
var recipeCount = document.querySelector("header section span:first-child");
var keywordInput = document.querySelector("section input.keyword-input");
var health = document.querySelector("#food-form select:nth-child(2)");
var diet = document.querySelector("#food-form select:nth-child(3)");
var calMin = document.querySelector("#food-form div input:first-child");
var calMax = document.querySelector("#food-form div input:last-child");
var searchButton = document.querySelector(".search-button");
var recipesMain = document.getElementById("recipes");

//enabling search button
keywordInput.addEventListener("input", function(){
	if(keywordInput.value!=="") {
		searchButton.removeAttribute("disabled");
	} else if (keywordInput.value==="") {
		searchButton.setAttribute("disabled","disabled");
	}
});

//search for recipes
searchButton.addEventListener("click", function(){
	getRecipes(0,12);
});

function getRecipes(from, to) {
	//cleaning recipes section and pages section
	recipesMain.innerHTML="";
	if(document.querySelector(".pages")!==null) {
		document.querySelector(".pages").remove();
	}

	var url = "https://api.edamam.com/search?q="+keywordInput.value+"&app_id="+appId+"&app_key="+appKey+"&from="+from+"&to="+to;
	var req = new XMLHttpRequest();
	//checking calories values
	if(calMin.value!=="" && calMax.value!==""){
		if(parseInt(calMin.value)>parseInt(calMax.value)){
			alert("Max calories value must be greater than min calories value!");
		}
	}

	//possible search requests - problem if we pass empty string(for value of input) in url
	// just query word is known
	if (health.value==="" && diet.value==="" && calMin.value==="" && calMax.value==="") {
		req.open("GET", url);
	} else if (health.value==="" && diet.value==="" && calMax.value==="") {
		req.open("GET", url+"&calories="+calMin.value+"-10000");
	} else if (health.value==="" && diet.value==="" && calMin.value==="") {
		req.open("GET", url+"&calories=0-"+calMax.value);
	} else if (health.value==="" && diet.value==="") {
		req.open("GET", url+"&calories="+calMin.value+"-"+calMax.value);
	} //if health is selected 
	else if (diet.value==="" && calMin.value==="" && calMax.value==="") {
		req.open("GET", url+"&health="+health.value);
	} else if (diet.value==="" && calMax.value==="") {
		req.open("GET", url+"&health="+health.value+"&calories="+calMin.value+"-10000");
	} else if (diet.value==="" && calMin.value==="") {
		req.open("GET", url+"&health="+health.value+"&calories=0-"+calMax.value);
	} else if (diet.value==="") {
		req.open("GET", url+"&health="+health.value+"&calories="+calMin.value+"-"+calMax.value);
	} //if diet is selected
	else if (health.value==="" && calMin.value==="" && calMax.value==="") {
		req.open("GET", url+"&diet="+diet.value);
	} else if (health.value==="" && calMax.value==="") {
		req.open("GET", url+"&diet="+diet.value+"&calories="+calMin.value+"-10000");
	} else if (health.value==="" && calMin.value==="") {
		req.open("GET", url+"&diet="+diet.value+"&calories=0-"+calMax.value);
	} else if (health.value==="") {
		req.open("GET", url+"&diet="+diet.value+"&calories="+calMin.value+"-"+calMax.value);
	} //selected both health and diet
	else if (calMin.value==="" && calMax.value==="") {
		req.open("GET", url+"&diet="+diet.value+"&health="+health.value);
	} else if (calMin.value==="") {
		req.open("GET", url+"&diet="+diet.value+"&health="+health.value+"&calories=0-"+calMax.value);
	} else if (calMax.value==="") {
		req.open("GET", url+"&diet="+diet.value+"&health="+health.value+"&calories="+calMin.value+"-10000");
	} else {
		req.open("GET", url+"&diet="+diet.value+"&health="+health.value+"&calories="+calMin.value+"-"+calMax.value);
	}
	
	req.onload = function() {
		result = JSON.parse(req.responseText);
		console.log(result);
		//displaying recipes count
		recipeCount.textContent = result.count;
		if(result.count===0) {
			recipesMain.innerHTML="X no matching results";
		} else {
			//initial status
			createBlockRec(result.hits);
			//creating list of pages on the end of page
			//problem with api - free version gives only 100 recepies :)
			if(result.count>100) {
				createPages(100);
			} else {
				createPages(result.count);
			}
			//selecting active page
			var pages = document.querySelectorAll("main>div>a");
			pages[from/12].classList.add("active");
		}
	}
	req.send();
}

//section with results
function createBlockRec(recipes){
	var recipeSection = document.createElement("section");
	recipeSection.setAttribute("id","recipes");
	for(var i=0; i<recipes.length; i++){
		var recipeArtic = document.createElement("article");
		recipeArtic.classList.add("recipe-element");

		var heading = "<h3>"+recipes[i].recipe.label+"</h3>";
		var image = "<img src='"+recipes[i].recipe.image+"'>";
		var calPerMeal = "<span class='calories'>"+Math.round(recipes[i].recipe.calories/recipes[i].recipe.yield)+"</span>";

		var labels = document.createElement("div");
		labels.classList.add("labels");

		for(var j=0; j<recipes[i].recipe.healthLabels.length; j++) {
			var label = document.createElement("span");
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

//construction of pages-options(1,2,3,4...) on the end of page
function createPages(result) {
	var pages = document.createElement("div");
	pages.classList.add("pages");
	var numberOfPages = Math.ceil(result/12);
	for(var i=1; i<=numberOfPages; i++){
		var page = document.createElement("a");
		page.setAttribute("href","#recipes");
		page.textContent=i;
		//adding event on each page-option to display another group of results when it is clicked
		page.addEventListener("click", function(){
			//removing previous selected page
			notActive();
			if(parseInt(this.textContent)===numberOfPages) {
				getRecipes(parseInt(this.textContent)*12-12,result);
			} else {
				getRecipes(parseInt(this.textContent)*12-12,parseInt(this.textContent)*12);
			}
		});
		pages.appendChild(page);
	}
	document.querySelector("main").appendChild(pages);
}

//removing selected page
function notActive(){
	var pageList = document.querySelectorAll("main>div>a");
	for(var i=0; i<pageList.length;i++){
		if(pageList[i].classList.contains("active")) {
			pageList[i].classList.remove("active");
		}
	}
}