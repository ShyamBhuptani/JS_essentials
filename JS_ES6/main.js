 
//let const are blocked scope
//var is function scoped
//data privacy using let and const

//es5
function f5(){
    if(true){
        var name= "shyam"
    }
    console.log(name);
}

//es6
function f6(){
    if(true){
        let name11= "shyam"
    }
    //console.log(name11); // not defined error for both let and const
}
f5();
f6();

/**var is "undefined" if logged first before declared
whereas in case of let it says explicitely " not defined "

*/

console.log(asa) // undefined
var asa = "lol"
//console.log(lala) // Cannot access 'lala' before initialization
let lala = "lol"

/** Scope of let is blocked so tthe example
 * to show how result works out
 */
let i = 23;

for(let i=0; i <5 ; i++){
    //console.log(i)
}
console.log(i) // 0 1 2 3 4 23
console.log("******************")
/** Var is func scoped so above result with var both produces result 0 1 2 3 4 5 
 * so here var will be overrided
*/
var j = 23;

for(var j=0; j <5 ; j++){
    //console.log(j)
}
console.log(j) // 0 1 2 3 4 5
console.log("******************")



////////////////////////////////////////////////
//// IIFE & BLOCK

{
    const a = 23;
    let sse = 2322;
    var c = 23;
}
//console.log(a + sse) // not defined
console.log(c) // produces a result

//es5 iife
xor = (function(){
    var c=3;
})();
//console.log(c) // not defined

///////////////////////////////////////////////
/////STRINGS

let newname = "shyam"
//es5
console.log("new name is "+newname);
//es6 using  `` and ${var name of func calling}
console.log(`the new name is es6 is ${newname}`)

const n = `${newname} bhuptani`
/** start end include repeat */
console.log(n.startsWith("s")) //case sensitive
console.log(n.endsWith("ni")) //case sensitive
console.log(n.includes("m B")) //case sensitive
console.log(n.repeat(2))

//////////////////////////////////////////
// ARRROW FUNCTION

const year =  [1990,1995,1937,2000]

//es5
var ages5 = year.map(function(cur){
    return 2020 - cur;
});
console.log("using es5 "+ages5)
// es6
//argument, arrow, return
var ages6 = year.map((cur) =>2020-cur);
console.log("using es6 "+ages6)

ages6 = year.map((cur,index) => `age ele index ${index+1} : ${2020 - cur}\n`)
console.log("using es6 2 param "+ages6)
//more thanone line then {}
ages6 = year.map((cur,index) => {
    const now = new Date().getFullYear();
    const age = now - cur;
    return age
});
console.log("using es6 2 param and {} in funct "+ages6)

////////////////////////////////////////////////
//////////// ARROW with this

//es5
/** only in method call, this refers to an object
 * but in regular function call, this refers to a window object
 */
var box5 = {
    color:'green',
    position:1,
    clickme: function(){
        //here the color and position is accessible
        var self = this;
        document.querySelector('.green').addEventListener('click',function(){
            //this is a function call explicit which cant access the params
            var str = "this is box number " + this.position  //does not work//self.position works
            + " color "+ this.color; // self.color works
            alert(str); 
        })
    }
}
//box5.clickme(); // this is box number "undefined" color "undefined"

//arrow func to avoid this
//es6

var box6 = {
    color:'green',
    position:1,
    clickme: function(){
    
        document.querySelector('.green').addEventListener('click', () => {
            //using arrow func the object is passed
            var str = "this is box number " + this.position 
            + " color "+ this.color; 
            alert(str); 
        })
    }
}
box6.clickme(); // this works fine //res : this is box number 1 color green
//arrow preserves this from object
// var box66 = {
//     color:'green',
//     position:1,
//     clickme: () => {
//         // here this points to global, means upper level object , here it is MAIN OBJECT
//         document.querySelector('.green').addEventListener('click', () => {
//             //using arrow func the object is passed
//             var str = "this is box number " + this.position 
//             + " color "+ this.color; 
//             //here it will be undefined
//             alert(str); 
//         })
//     }
// }
// box66.clickme(); 


//constructor
function Person(name){
    this.name = name;
}
//es5
Person.prototype.mfri5 = function(friends){
    var arr = friends.map(function(cur){
        return this.name + " is friend of " + cur;
    });
    console.log("es5 version \n" + arr)
}

var fss = ["f1","f2","f3"];
new Person("shyam").mfri5(fss); // was not working in video but works locally

console.log("*******************")
Person.prototype.mfri6 = function(friends){
    var arr = friends.map(function(cur){
        return this.name + " is friend of " + cur;
    }.bind(this)); // trick to bind means copy the func and pass this to it
    console.log("es5 hack with bind \n" +arr)
}
new Person("shyam").mfri6(fss); // worked bind and passs this
console.log("*******************")
//es6 
Person.prototype.mfri7 = (friends) => {
    var arr = friends.map((cur) => `${this.name} is friend of ${cur}`);
    console.log("es6 version without anything \n"+arr)
}
new Person("shyam").mfri7(fss); 
console.log("*******************")

/////////////////////////////////////////////////////
/////////// DESTRUCTURING
/////////////////////////////////////////

//es5
var ar = ['shyam',26];
//var name = ar[0];
//var age = ar[1];

//es6
const [name1,year1] = ['shyam',26];// for list []
console.log(name1)
console.log(year1)
console.log("*******************")

const obj = {
    name: "Shyam",
    yearofB: 1995
}
//for obj {}
const {name,yearofB} = obj // here the keys should be same as object keys
console.log(`${name} and birth year ${yearofB}`);

console.log("*******************")
const {name : na ,yearofB : y} = obj // if we wanna change keyname then use :
console.log(`${na} and birth year ${y}`);

console.log("*******************")

function calAge(age){ return [age,65-age]}
const[agg,retire] = calAge(21)
console.log(agg+ " "+ retire)
console.log("*******************")

////////////////////////////////////////////
//////////// ARRAY
///////////////
///// FINDINDEX , FIND , FOROF

const boxes = document.querySelectorAll('.box');
//console.log(boxes) // nodelist

//es5 
/**hack usinng arrays prototype slice and slice the boxes and then
 * foreach to update it
 */
var boxarr5 = Array.prototype.slice.call(boxes);
boxarr5.forEach(element => {
    element.style.backgroundColor = 'dodgerblue';
});


//es6 // USing "from"
// Array.from(boxes).forEach(element => {
//     element.style.backgroundColor = 'dodgerblue';
// });
// console.log("*******************")


/////////////// break and continue in for loop //////////

//es5 
// for(var x = 0 ; x < boxarr5.length ; x ++ ){
//     if( boxarr5[x].className === "box blue" ){
//         continue;
//         //break;
//     }
//     boxarr5[x].textContent = 'I changed to dogerblue';
// }

/** IMPORTANT */
//es6
//forOf new LOOP 
for(const cur of boxarr5){
    if(cur.className.includes('blue')){
        continue;
    }
    cur.textContent = 'I changed to dogerblue';
}

//indexOf old method to find element in array

//es5 
var agees = [12,17,8,21,14,11];
var isG18 = agees.map(function(cur){
    return cur > 18;
})
console.log(isG18+ " \n"+ isG18.indexOf(true)+" \n"+agees[isG18.indexOf(true)])
console.log("*******************")
//es6
//can pass callback and returns when call back is true
//provides the index number
console.log(agees.findIndex(cur => cur >= 18));
console.log("*******************")
//find 
console.log(agees.find(cur => cur >= 18));
console.log("*******************")

//////////////////////////////////////////
//// SPREAD operator
///////////////////////////////////////

function add4ages (a,b,c,d){ return a+b+c+d ; }
var sum1 = add4ages(18,20,22,12)
console.log(sum1)
console.log("*******************")
//es5 
var ages = [ 18, 23, 20, 42]
var sum2 = add4ages.apply(null,ages);
console.log("es5 using apply " +sum2)
console.log("*******************")
//es6
//spread operator ...
const max3 = add4ages(...ages);
console.log("using spread ",max3)
console.log("*******************")

//to join array
const x1 = [1,2,3]
const x2 = [4,5,6]
console.log([...x1,7,...x2])
console.log("*******************")

//SPREAD works with nodelist 
const h = document.querySelector('h1');
const boxes11 = document.querySelectorAll('.box');
const all = [h,...boxes11];
//nodelist as h1 is node and so does other 3
console.log(all)
//using from to convert nodelist to an array
Array.from(all).forEach(ele => ele.style.color = 'Purple');
console.log("*******************")

///////////////////////////////////////////
///////////// REST parameters 
/////////////////////////////////// 
/////// exact opposite to spread
/**
//es5
function isFullage5(){
    var args = Array.prototype.slice.call(arguments);
    args.forEach(function(cur){
        console.log((2019 - cur) > 26 ? cur : 0 );
    });
}
isFullage5(1990,1992,1994);
console.log("*******************")
//es6 
//here we can directly get the array 
function isFullage6(...years){
    years.forEach((cur) => {
        console.log((2019 - cur) > 26 ? cur : 0 );
    });
}
isFullage6(1990,1992,1994);
console.log("*******************")
*/


//es5
function isFullage5(limit){
    //argument has all params
    //console.log(arguments)
    //first is assigned to limit
    //so cutting the first and starting from second
    //call (arg, 1)
    var args = Array.prototype.slice.call(arguments,1);
    //console.log(args) now arg has only 3 params
    args.forEach(function(cur){
        console.log((2019 - cur) > limit ? cur : 0 );
    });
}
isFullage5(26,1990,1992,1994);
console.log("*******************")
//es6 
//here we can directly get the array 
//so whatsoever is passed as arg will be divided
//1st element as limit and all other as years
function isFullage6(limit,...years){
    years.forEach((cur) => {
        console.log((2019 - cur) > limit ? cur : 0 );
    });
}
isFullage6(26,1990,1992,1994);
console.log("*******************")

//////////////////////////////////////////////
////// DEFAULT params
////////////////////////////////////////

//es5
function BhuptaniPer(firstname,lastname,bday){
    this.firstname = firstname;
    this.lastname = lastname;
    this.bday = bday === undefined ? 1995 : bday; // loading default vals
}

var shyam = new BhuptaniPer("Shyam","Bhuptani")
console.log(shyam) //undefined bday

//es6 
//like python
function BhuptaniPer1(firstname,lastname,bday=1995){
    this.firstname = firstname;
    this.lastname = lastname;
    this.bday = bday; // loading default vals
}

var shyam = new BhuptaniPer1("Shyam","Bhuptani")
console.log(shyam) //undefined bday
console.log("*******************")

////////////////////////////////////
////// MAPS a new DS in JS
/////////////////////////////////////
//hashmap stringkey to arbitary value

const que = new Map();
//using set to assign a val
que.set('que',"Whats lastest js version");
que.set(1,"Es5");
que.set(2,"Es6");
que.set(3,"Es8");
que.set('correct',3);
que.set(true," you are intelligent ");
que.set(false," you are bodu ");
console.log(que.get('que')) // to get 
console.log(que.size) // like length
//has method
/**
if(que.has(2)){
    //remove
    que.delete(2)
}
console.log(que)
//clear all
que.clear()
console.log(que)
 */
//maps are iterable
//foreach works with map
//first is always value in foreach map
que.forEach((value,key) =>
    console.log(`${key}  is que and ans is ${value}`));
console.log("*******************")
//FOROF for map
for(let [x,y] of que.entries()){
    //typeof to check the type if it is number
    if(typeof(x) === 'number' ){
        console.log(`used destructuring and ${x} is key and ${y} is val`) // producing result like ["que", "Whats lastest js version"]  
    }
}

console.log("*******************")
//prompts load first then other js applies
//const ans = parseInt(prompt("write a correct answer ","num" ))
//const results = que.get((ans === que.get('correct')))
//console.log(results)


//////////////////////////////////////////////////
//////////// CLASS 
///////////////////////////////////////////////
console.log("******USING ES5 CLASS *******")
//es5
var Person5 = function(name,yearofB,job){
    this.name = name;
    this.yearofB = yearofB;
    this.job = job;
}

Person5.prototype.calage5 = function(){
    var age = new Date().getFullYear() - this.yearofB;
    console.log(age);
};

var sshhyam = new Person5("shyam",1995,"student");
sshhyam.calage5();

//es6
//classs
//constructor
//method
//static method
//no , required
// they are not hoisted so first define then use
//no properoties
console.log("******USING ES6 CLASS *******")
class Person6 {
    constructor(name,yearofB,job){
        this.name = name;
        this.yearofB = yearofB;
        this.job = job;
    }
    calage6() {
        var age = new Date().getFullYear() - this.yearofB;
        console.log(age);
    }
    static greeting() {
        console.log("I am static ")
    }
}

var sshhyam1 = new Person6("shyam",1995,"student");
sshhyam1.calage6();
//sshhyam1.greeting(); // error is not a function

Person6.greeting(); // can only work with class name



///////////////////////////////////////
/////////// CLass with subclass 
//////////////////////
console.log("******USING ES5 SUBCLASS *******")
//es5
//subclass example
var Athelete5 = function(name,yearofB,job,sports){
    //while calling pass this
    Person5.call(this,name,yearofB,job);
    this.sports = sports;
}
// TO link the prototype
//object.create to allow us set manually the prototype
Athelete5.prototype = Object.create(Person5.prototype);
////////////////////////
//Specific method 
//it should be after the so need to fist set the prototype as person5
//and then add
Athelete5.prototype.sportname = function(){
    console.log(`I am playing ${this.sports}`)
}

var sshhyam2 = new Athelete5("shyam",1995,"student","poker");
sshhyam2.calage5();
sshhyam2.sportname();

console.log("******USING ES6 SUBCLASS *******")
//es6

class Athelete6 extends Person6 {
    constructor(name,yearofB,job,sports){
        super(name,yearofB,job);
        this.sports = sports;
    }
    sportname(){
        console.log(`I am playing ${this.sports}`)
    }
}

const sshhyam3 = new Athelete6("shyam",1995,"student","poker");
sshhyam3.calage6();
sshhyam3.sportname();

console.log("*******************");