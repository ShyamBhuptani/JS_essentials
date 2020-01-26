import { elements } from './base';
import { limitRecipeTitle } from './searchView'

export const addLike = (id,title,author,image) => {
    const markup = `
            <li>
                <a class="likes__link" href="#${id}">
                    <figure class="likes__fig">
                        <img src="${image}" alt="${limitRecipeTitle(title)}">
                    </figure>
                    <div class="likes__data">
                        <h4 class="likes__name">${limitRecipeTitle(title)}</h4>
                        <p class="likes__author">${author}</p>
                    </div>
                </a>
            </li>
    `;
    elements.likes.insertAdjacentHTML('beforeend',markup);
    
};

export const toggleButton = isLiked => { 
    const image = isLiked ? 'icon-heart' : 'icon-heart-outlined' ;
    //set atttrib
    document.querySelector('.recipe__love use').setAttribute('href',`./img/icons.svg#${image}`)
};

export const removeLike = id => {
    //all anchor with likes_link
    const el = document.querySelector(`.likes__link[href="#${id}"]`).parentElement;
    if(el) el.parentElement.removeChild(el);
}

export const toggleMainButton = numlike => {
    elements.likesIcon.style.visibility = numlike > 0 ? 'visible' : 'hidden';
}