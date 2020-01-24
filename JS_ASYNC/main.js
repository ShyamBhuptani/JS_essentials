// const second = () => {
//     setTimeout(() => {
//         console.log("Hola");
//     }, 2000); // 2000 millisecond means 2 second
        // time out ==> callback and wait time
// }

// const first = () => {
//     console.log("hi");
//     second();
//     console.log("End")
// }
// first();

//SYNC way : all code is processed line by line , one after the other
//ASYNC way : 
//callback in callback in callback .. is callback hell


// function getRecipe(){
//     setTimeout(() => {
//         const ids = [1,2,3,4];
//         console.log(ids);
//         setTimeout(id => {
//             const recipe = { title : "pizza" , chef : "shyam"}
//             console.log(`${id} ${recipe.title} ${recipe.chef}`);
//             setTimeout(chef => {
//                 console.log(`${chef} is cooking another recipe`)
//             },1500,recipe.chef);
//         },1000,ids[2]); // set time out with 3 rs param as argument
//     }, 1500);
// };

// getRecipe();

//to remove this es6 has introduced new feature promises

//state of promise
//pending --> settled/resolved --> fulfilled / rejected

const getidS = new Promise((resolve , reject) => {
    setTimeout(() => {
        //AS SOON AS IT GETS FIRST RESOLVE/REJECT IT QUITS
        //reject("hi")
        resolve([1,2,3]);
        //if resolved then will not go for reject 
        reject([1,2,3,4]);
    },1500);
});

//2 methods to consume promise
//1st one then
// getidS
// .then(IDs => {
//     console.log(IDs);
// })
// //2nd one Catch
// .catch(err => {
//     console.log("error "+err);
// });

//resolve -- then
//reject -- catch

///////////////////////////////////////
//           DEMO
//////////////////////////////////////

//function which recieves above id and returns promise
const getRecipe = RecID => {
    return new Promise((resolve,reject) => {
        setTimeout(ID => {
            const recipe = { title : "pizza" , chef : "shyam"}
            resolve(`${ID} ${recipe.title} ${recipe.chef}`);
        },1500,RecID);
    })
};
////////////////////////////////////////////////////////////
//get related 3rd step
const getRelated = publisher => {
    return new Promise((resolve,reject) => {
        setTimeout(pub => {
            resolve(`${pub} is cooking another recipe`);
        },1500,publisher);
    })
}
//////////////////////////////////////////////////////////////////
//output using 1st way
// getidS
// .then(IDs => {
//     console.log(IDs);
//     getRecipe(IDs[2]).then(recipe => {
//         console.log(recipe);})
// })
// //2nd one Catch
// .catch(err => {
//     console.log("error "+err);
// })
//////////////////////////////////////////////////////////////////
//another way of doing the same where promise returns promise
// getidS
// .then(ID => {
//     console.log(ID);
//     return getRecipe(ID[2]); // return new promise with ID passing
// })
// .then(recipe => {
//     console.log(recipe); // new promise's then to log the output
//     return getRelated("Shyam");
// })
// .then(final => {
//     console.log(final);
// })
// .catch(err => {
//     console.log("error "+err);
// })
//////////////////////////////////////////////////////////////////
/// USING ASYNC / AWAIT Lecture 124
// VERY easier ES2017 features
//async will be called in background and will run alwayss
//await can only be used inside async function

async function getRecipesAW(){
    const ids = await getidS;
    console.log(ids);
    const recipe = await getRecipe(ids[2]);
    console.log(recipe);
    const another = await getRelated("Shyam");
    console.log(another);
    // return   
    return recipe;
}
/** to get the recipe returned by the func,
 * we cannot assign and log the o/p as the code produces
 * o/p synchronously so to get it we can use then function
 */
getRecipesAW().then(result => console.log(result));


//AJAX Async JS and XML




