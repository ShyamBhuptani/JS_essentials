/** Cannot access below as the domain is different
 * to do the same cross origin 
 * proxy which will change origin
 * 
 * https://cors-anywhere.herokuapp.com/
 */
//fetch('https://www.metaweather.com/api/location/2487956/');

//fetch returns a promise without consuming it
function getWeather(id){
    fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${id}/`, {mode: 'cors'})
    //so use then 
    .then(result => {
        //result is json
        console.log(result);
        return result.json(); // which is another promise
    })
    .then(data => {
        const today = data.consolidated_weather[0];
        console.log(`temp in ${data.title} stay bween ${today.max_temp} and ${today.min_temp}`);
    })
    .catch(error => {
        console.log(error);
    });
}

//getWeather(2487956); //running func

////////////////////////////////////////////////////////////
////// ASYNC function of the same
////////////////////////////////////////////////////////////

//catch does nto work with async await
//so use try catch manually
async function getWeatherAsync(id){
    try {
        const result = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${id}/`, {mode: 'cors'});
        console.log(result);
        const data = await result.json();
        console.log(data);
        const today = data.consolidated_weather[0];
        console.log(`temp in ${data.title} stay bween ${today.max_temp} and ${today.min_temp}`);
        return data; // return in terms of promise
    } catch(error) {
        console.log(error)
    }
}

getWeatherAsync(2487956)
.then(res => console.log(res)) // to use the return of async function
//getWeatherAsync(1212); // using try catch