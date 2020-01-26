//https://forkify-api.herokuapp.com/api/search

import axios from 'axios';

export default class Search {
    constructor(query){
        this.query = query;
    }
    //to import from dependancies we can use as below
    //every async func returns a promise
    async getResult() {
        // old way
        //const recipe = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${query}`)
        //using axios we dont need to convert the o/p to json using json()
        //better error handling in axios
        try {
            const recipe = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
            this.result = recipe.data.recipes;
            //console.log(this.result);
        } catch {
            alert("wrong name");
        }

    };


}