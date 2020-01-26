import axios from 'axios';


export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe(){
        try {
            const result = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            const res = result.data.recipe;
            this.title = res.title;
            this.author = res.publisher;
            this.image = res.image_url;
            this.url = res.source_url;
            this.ingredients = res.ingredients;
        } catch(error) {
            console.log(error);
            alert("No such recipe")
        }
    }
    
    calcTime() {
        //time  = num of ing * 15 / 3
        this.time = Math.ceil(this.ingredients.length / 3) * 15;
    }

    calcServing() {
        this.servings = 4;
    }
    //parse ingridients
    parseIng() {
        const units = {
            'tablespoons' : 'tbps',
            'tablespoon' : 'tbps',
            'ounces' : 'oz',
            'ounce' : 'oz',
            'teaspoons' : 'tsp',
            'teaspoon' : 'tsp',
            'cups' : 'cup',
            'pounds' : 'pound',
            'kilogram' : 'kg',
            'gram' : 'g'
        }
        const newIng = this.ingredients.map(ele => {
            //1) Uniform Units
            let ingredient = ele.toLowerCase();
            //converting object keys into array and run foreach which is different than video
            Object.keys(units).forEach((unit , i) => {
                ingredient = ingredient.replace(unit , units[unit]);
            });

            //2) remove parantheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');
            //3) parse ing into count unit and ing
            //case 1 num unit text // case 2 only num // no num
            //hardest part
            const ingArr = ingredient.split(" ");
            //return  index where it turns out to be true
            const unitIndex = ingArr.findIndex(ele => 
                Object.values(units).includes(ele)); 
            let objIng;
            //in case of unit
            if(unitIndex > -1) {
                const arCount = ingArr.slice(0,unitIndex);
                let firstVal;
                if (arCount.length === 1){
                    //there are some 1st with 1-1/3 so for them to replace
                    //- into + and eval
                    firstVal = eval(ingArr[0].replace("-","+"));
                } else {
                    //using eval calulates js string as a expression
                    firstVal = eval(ingArr.slice(0,unitIndex).join("+"));
                }

                objIng = {
                    count : firstVal,
                    unit : ingArr[unitIndex],
                    ingredient : ingArr.slice(unitIndex+1).join(" ")
                }

            } else if (parseInt(ingArr,10)){
                //if 1st ele can parse as num and not having a unit then
                objIng = {
                    count : parseInt(ingArr,10),
                    unit : '',
                    ingredient : ingArr.slice(1).join(" ")
                }

            } else if (unitIndex === -1) {
                //no unit no number
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient // same as ingredient
                }

            }
            //returning object created here in a map
            return objIng;
        });
        this.ingredients = newIng;
    }
    updateService(type){
        //update servings
        const newServings = type === "dec" ? this.servings - 1 : this.servings + 1;
        //update ingredients
        this.ingredients.forEach(ing => {
            //count is basically an int , on UI we used fraction to display it in a different manner
            ing.count *= (newServings / this.servings);
        });
        //CANnot do it immidietly as it will miss 2nd upper step
        this.servings = newServings;

    }
}