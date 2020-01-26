import { elements } from './base';

export const renderItem = item => {
    //using data-itemid to pass id on UI which can be helpful while deletion
    const markup = `
    <li class="shopping__item" data-itemid=${item.id}>
        <div class="shopping__count">
            <input type="number" value="${item.count}" step="${item.count}" min=0 class="shopping__count__value">
            <p>${item.unit}</p>
        </div>
        <p class="shopping__description">${item.ing}</p>
        <button class="shopping__delete btn-tiny">
            <svg>
                <use href="./img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        </button>
    </li>
    `
    elements.shopping.insertAdjacentHTML('beforeend',markup);

};

export const deleteItem = id => {
    //css queryselector in  `` quotes and id must go in ""
    const item = document.querySelector(`[data-itemid="${id}"]`)
    if(item) item.parentElement.removeChild(item);    
};