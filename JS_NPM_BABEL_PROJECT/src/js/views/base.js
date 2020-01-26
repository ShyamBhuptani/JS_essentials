//reusable stuff across the views

//object with all ements in the DOM 

export const elements = {
    searchInput : document.querySelector('.search__field'),
    searchForm: document.querySelector('.search'),
    searchResultList: document.querySelector('.results__list'),
    resultParent: document.querySelector('.results'),
    searchResPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe'),
    shopping: document.querySelector('.shopping__list'),
    likes: document.querySelector('.likes__list'),
    likesIcon: document.querySelector('.likes__icon'),
};

export const elementString = {
    loader : "loader"
}
/** Spinner for reusability  */

export const renderLoader = parentEle => {
    const loader = `
        <div class="${elementString.loader}"> 
        <svg>
            <use href = "img/icons.svg#icon-cw"> </use>
        </svg>
        <div>
    `;
    parentEle.insertAdjacentHTML('afterbegin',loader);
};

//clear loader

export const clearLoader = () => {
    /**
     * here loader cannot be put into elements because we add it lateron in the code
     * using JS
     * */
    const loader = document.querySelector(`.${elementString.loader}`);
    if(loader) {
        //deleting is cumbersome as we need to move up to parent then remove child
        loader.parentElement.removeChild(loader);
    }
}