import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Like from './models/Likes';
import axios from 'axios';
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likeView from './views/likeView';

/** 
 * global state of the app
 * 
 * - search object
 * - current recipe object
 * - shopping list object 
 * - liked recipes
 * 
 * state will be reloaded once app is reloaded
 * we will make some persistant state i.e likes which will be same even if the 
 * app is reloaded
 * 
 * */
const state = { }

/** Search Controller */
const controlSearch = async () => {

    /** Steps to be happened
     * 1. get query // using view module
     * 2. if query then new search object and add it to state
     * 3. Prepare UI for results
     * 4. Search for recipes
     * 5. render results on UI // after we reccive from api ( await promise so this is async func)
     */
    //1
    const query = searchView.getInput();
    //2 
    if(query){
        state.search = new Search(query);
    }
    //3
    //clear search
    searchView.clearInput();
    //clear search bar because it will add new to the old result
    searchView.clearResult();
    //render our loader on UI
    renderLoader(elements.resultParent);
    //4 
    try {
        await state.search.getResult();
        //remove loader
        clearLoader();
        //5 
        //console.log(state.search.result); 
        searchView.renderResults(state.search.result);
    } catch(error) {
        clearLoader();
        alert("something wrong with the search input")
    }

}
//Search controller
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})


/** we need to use event delegation beacuse if button is not present 
 * we cannot get event
 * so we should attach event listener to the parent element instead
 * 
 * here its searchResPages
 */

 elements.searchResPages.addEventListener('click', e=> {
     const btn = e.target.closest('.btn-inline')
     if(btn){
         //clear results
         searchView.clearResult();
         //parse int with base 10
         const goTO = parseInt(btn.dataset.goto,10);
         searchView.renderResults(state.search.result,goTO);
     }
 });


/** Recipe Contoller */
/** hashchange event which will change the url after # as every time we click
 * the a href will redirect to differrent items
 * 
 * this will be applied on window object
 * function will be async as we are awaiting for the results to be fetched from server
 * in getRecipe call
 * */ 

 const controlRecipe = async () => {
     const id = window.location.hash.replace("#","");
     //if there is an ID then
     if(id){
         /**
          * 1. Prepare UI for changes
          * 2. Creating new recipe object
          * 3. get data
          * 4. Calc time and calc servings
          * 5. render recipe
          * 
          */
        //1
        //clear old recipe
        recipeView.clearRecipe();
        //put loader
        renderLoader(elements.recipe);
        //highlight selected
        if(state.search) searchView.highlightedSelected(id);
        //2 
        state.recipe = new Recipe(id);
        //3 using try catch so if promise rejects then we can handle it
        try {
            await state.recipe.getRecipe();
            //4 
            state.recipe.calcTime();
            state.recipe.calcServing();
            state.recipe.parseIng();
            //5
            //console.log(state.recipe);
            clearLoader();
            recipeView.renderRecipe(state.recipe,state.like.isLiked(id));
        } catch (error) {
            alert("error processing recipe")
        } 

     }
 }

// window.addEventListener('hashchange', controlRecipe);
// //nothing happens when loading again if the URL is same
// window.addEventListener('load',controlRecipe);

['hashchange','load'].forEach(e => window.addEventListener(e,controlRecipe));

/** List Controller */
const controlList = () => {
    //if no list then create a list
    if(!state.list) state.list = new List();
    //add each ing to the list
    state.recipe.ingredients.forEach(ele => {
        //add in model
        const item = state.list.addItem(ele.count,ele.unit,ele.ingredient);
        //render on UI
        listView.renderItem(item);
    });

}
/** 
 * Like Controller In recipe events
 * 
 * */

const controlLike = () => {
   
    if(!state.like) state.like = new Like();
    const curId = state.recipe.id;
    //not liked
    if(!state.like.isLiked(curId)) {
        //add like
        const newlike = state.like.addLike(curId, state.recipe.title, state.recipe.author, state.recipe.image)
        //toggle button
        likeView.toggleButton(state.like.isLiked(curId));
        
        //add like to list
        likeView.addLike(curId,state.recipe.title, state.recipe.author, state.recipe.image);
        
    }//already liked
     else {
        
        //remove like
        state.like.deleteLike(curId);
        //toggle button
        likeView.toggleButton(state.like.isLiked(curId));
        //remove like from list
        likeView.removeLike(curId);
        
    }

    likeView.toggleMainButton(state.like.getNumLikes());
}

/** + - Serving Event delegation
 * with new method
 * 
 * cannot use closest
 * recipe event handling 
 */

 elements.recipe.addEventListener('click',event => {
     //if target matches button decrease and all other inside it
     if(event.target.matches('.btn-decrease, .btn-decrease *')){
        //decreased is clicked
        if(state.recipe.servings > 1) {
            state.recipe.updateService('dec');
            recipeView.updateServIng(state.recipe);
        }
     } else if(event.target.matches('.btn-increase, .btn-increase *')) {
        //increase is clicked
        state.recipe.updateService('inc');
        recipeView.updateServIng(state.recipe);
     } 
     // for adding a list
     else if (event.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        //call controllist
        controlList();
     }  else if (event.target.matches('.recipe__love, .recipe__love *')){
         controlLike();
     }
 });


// Handle delete and update item on list
elements.shopping.addEventListener('click', e => {

    //get the id
    const id = e.target.closest('.shopping__item').dataset.itemid
    if(e.target.matches('.shopping__delete, .shopping__delete *')){
        //delete the item
        state.list.deleteItem(id);
        //update UI
        listView.deleteItem(id);
    } else if (e.target.matches('.shopping__count__value')){
        //update value
        if(e.target.value >= 0) state.list.updateCount(id,parseFloat(e.target.value,10));
        //console.log(state.list);
    }


});

//event handler for page load to update the like from local storage
window.addEventListener('load', () => {
    //add like once page is load
    state.like = new Like();
    //add like from local storage 
    state.like.readStorage();
    //button toggle
    likeView.toggleMainButton(state.like.getNumLikes());
    //render existing like
    state.like.likes.forEach(ele => likeView.addLike(ele.id, ele.title, ele.author, ele.image));
}) ;