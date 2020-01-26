import {elements} from './base'

/** export function
 * arrow function with one line is implicit return
 *  */ 
export const getInput = () => elements.searchInput.value;


/** to cut recipe title */
export const limitRecipeTitle = (title , limit = 17) => {
    const result = [];
    if(title.length > limit){
        title.split(" ").reduce((acc,current) => {
            if(acc + current.length <= limit){
                result.push(current);
            }
            //return to the reduce method which will update the acc value to this
            return acc + current.length;
        },0);
        //return with new JOIN method
        return `${result.join(' ')} ...`
    }
    return title;
}

//render recipe to get one recipe for internal use
const renderRecipe = recipe => {
    //using template strings
    const markup = ` 
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${limitRecipeTitle(recipe.title)}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li> `;
    //aferend will revverse the list
    elements.searchResultList.insertAdjacentHTML('beforeend',markup);
};

/** Render  pagination button
 * 1. to create button
 * 2. renderButton where the logic exists
 * 
 * here in create button we share an element called data-goto which will be
 * extended to the next page so we should know which page we should move to 
 */
const createButton = (page,type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === "prev" ? page - 1 : page + 1 }>
    <span>Page ${type === "prev" ? page - 1 : page + 1 }</span>
        <svg class="search__icon">
            <use href="./img/icons.svg#icon-triangle-${type === "prev" ? "left" : "right" }"></use>
        </svg>
        
    </button>`

const renderButtons = (page, numResult, resPerPage) => {
    const pages = Math.ceil(numResult / resPerPage);
    let button;
    if(page === 1 && pages > 1){
        //only button to go to next page
        button = createButton(page,"next");
    } else if (page === pages  && pages > 1)  {
        //only button to go to previous page
        button = createButton(page,"prev");
    } else if (page < pages) {
        //button to move forward and backward
        button = `${createButton(page,"prev")} ${createButton(page,"next")}`;
    }

    //insert element to the dom

    elements.searchResPages.insertAdjacentHTML('afterbegin',button);
}

/** render result on UI step 5
 * 
 * for pagination change func and add 2 input arguments
 * 1 page number and 2 results per page
 */
export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    //disply only number of resperpage 
    const start = (page-1)*resPerPage;
    const end = page*resPerPage;

    /**
     * for each directly passing to function
     * here the end number does not included in the array
     * so no need to put page*resperpagr - 1
     * */
    recipes.slice(start,end).forEach(renderRecipe);
    renderButtons(page,recipes.length,resPerPage);
};

/** Clear input once searched */
export const clearInput = () => elements.searchInput.value = "";

/** Clear result on UI */
export const clearResult = () => {
    elements.searchResultList.innerHTML = "";
    elements.searchResPages.innerHTML = "";
};

/** Highlighted selected */
export const highlightedSelected = id => {
    //here using dom manupulation explicitely as the object will not be present initially
    //all href with the #id

    //make all inactive first , collect all first then remove
    const results = Array.from(document.querySelectorAll('.results__link'));
    results.forEach(ele => {
        ele.classList.remove("results__link--active");
    });
    document.querySelector(`.results__link[href="#${id}"]`).classList.add("results__link--active");
}
