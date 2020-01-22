/*
JS is prototypes based language
inheritance works through prototype properties

If a method needs to be imported using inheritance then it needs to be defined
in prototype 

So in other words, the Person's prototype property
is the prototype of John.
And that's not even all,
because the Person object itself
is an instance of an even bigger constructor,
which is the Object object.


prototype chain
null is final change and by default undefault 

*/
var john = {
    name : "john",
    year: "1990",
    job: " teacher "

}
//defining using constructor
//constructor with capital starting

var Person = function(name,year,job){
    this.name = name,
    this.year = year,
    this.job = job
}
//instantiations
//here new creates new object and it is not referring to main
//object but instead it is pointing to new one

// var shyam = new Person("shyam",1990,"student");
// shyam.age();
/**
 * Creating an object everytimee makes code bulky 
 * so to reuse it inheritance is applied where we ca
 * directly call the method instead of creating the object
 * 
 * To use inheritance, methods shu=ould be addded to construcors 
 * prototype property<<<-- IMPORTANT
 * 
 * The below method will not be mounted in the object itself
 * 
 * 
 * So the difference is, if we add method simpy in object
 * it will be created every time for each and every instances
 * whereas if we use prototype
 * all replicas can use it without even loading the same method in
 * every instance
 */
Person.prototype.age = function(){
    console.log(2019-this.year);
}

var shyam = new Person("shyam",1990,"student");

/**
 * Here the SHYAM object has only 3 propoerties
 * as the main objetc has method stored as prototype
 * we can use it.
 * shyam
    Person {name: "shyam", year: 1990, job: "student"}
    job: "student"
    name: "shyam"
    year: 1990
    __proto__:
        age: ƒ ()
        lastname: "Bhuptani"            
 *
 */
shyam.age();
Person.prototype.lastname = "Bhuptani";
console.log(shyam.lastname);

/** shyam.__proto__ === Person.prototype
 * True
 * proto --> proto is objects prototype 
 * functions proto is object og OBJECTS proto
 * we can use it
 */
// console.log(shyam.hasOwnProperty('job'));
// true beacuse shyam has property job
// console.log(shyam.hasOwnProperty('lastname'));
// FALSE beacuse lastname is prototype not property
// console.log(shyam instanceof Person);
// True
// console.log(Person instanceof Object);
//True as every cosntructor is object of main OBJECT

/**
 * Everything is object in js
 * method suing in array is stored in prototype of array
 */
var x = [2,4,6]
console.log(x.length)


//OBJECT CREATE

var perProto = {
    calAge : function(){
        console.log(2019 - this.year);
    }
}
/**  
 * shyam1 has nothing but proto
 */

var shyam1 = Object.create(perProto);
// Now filling it with data METHOD1
shyam1.name = "Shyam";
shyam1.job = "Loblaws";
shyam1.year = 1996;
shyam1.calAge();

/** Creating new object with new way to pass data
 * METHOD2
 * property: {value:  }
*/

var dhruvil = Object.create(perProto, {
    name: {value :"Dhruvil"},
    job:{value :"Amazon"},
    year:{value :1998},
    height:{value :510}
});

/**
 * The difference between object.create
and the function constructor pattern in
that object.create builds an object that inherits directly
from the one that we passed into the first argument.
While, on the other hand, the function constructor
the newly created object inherits
from the constructor's prototype property, right,
so that's the big difference,
and I hope this makes sense to you.
Actually, one of the biggest benefits of object.create is
that it allows us to implement
a really complex inheritant structures in an easier way
than function constructors because it allows us
to directly specify which object should be a prototype.
 */

// PREMITIVE VS OBJECT
/**Premitives store values differently
 * They do not reference anything
 */
var a = 23;
var b = a;
a = 46;
// console.log(a);
// console.log(b);

/** In case of object it refers
 * the same reference
 * 
*/
var ob1 = {
    name: "asa"
}
var ob2 = ob1;
ob1.name = "sksk";
//both will be same
// console.log(ob1.name);
// console.log(ob2.name);

var age = 20;
var o1 = {
    name: "lol"
}
function n1(a,b){
    a = 200;
    b.name ="lola1";
}

n1(age,o1);
//age will not be changed but object will be ultered
// console.log(age); 
// console.log(o1.name);


/** Functions
 * - its an instance of object
 * - behaves like object
 * - store the func in a var
 * - pass function as an argument of anoter func
 * - return func from func
 */

var years = [1990,1965,1937,2005,1998];
//passing func in argument
function arrayCal(arr,fn,fn1){
    var res= [];
    arr.forEach(element => {
        res.push(fn1(fn(element)));
    });
    return res;
}

function calAge1(el){
    return 2019 - el;
}

function isFull(el){
    return el >= 18;
}

var ress = arrayCal(years,calAge1,isFull);

/** Function returning Function */

function interQue(job){
    if ( job === "Student"){
        return function(name){
            console.log(name+" what ux desing is?");
        }
    }
    else if ( job === "Teacher"){
        return function(name){
            console.log(name+" what are you teaching?");
        }
    }
    else {
        return function(name){
            console.log(name+" what r u doing");
        }
    }
}

//function returning function which is stored in a var
var TeachQue = interQue("Teacher");
//now the var became function having one parameter
//TeachQue("Shyam");

// Using both at a time
//Strange
//calling function and then its inner function
//interQue("Student")("Shyam");

//IIFE , immidietly invoked function expressions
// old method
// function game(){
//     var score = Math.random()*10;
//     console.log(score>3 ? score : 0)
// }
// game();
//IIFE 
//anonymous function with direct invocation
// can no longer access score variable
(function(){
    var score = Math.random()*10;
    console.log(score>3 ? score : 0)
})();
//console.log(score) // score is not defined
(
    function(goodluck){
        console.log(goodluck+" goodluck");
    }
)("hi");

/** CLOSURES
 * advance and tough topic
 */

function retirement(retireage){
    var  a = " years left until retirement."
    return function(yearOFB){ 
        var age = 2019 - yearOFB;
        console.log((retireage - age) + a);
    }
}

var retireInd = retirement(65)
/**here the retirement is completed
 * still we can use the variables used in the fnction
 * in the output function, i.e retireInd
 * which is closure
 * 
 * Inner func has always access to the var and param of outer
 * func even after the outer func has returned/completed
 * 
 * scope chain always stays intact
 * */
// retireInd(1995);
// retirement(66)(1997);

//Closure Example 2

function interQue(job){
    var hola = "hola "
    return function(name){
        if(job === "Teacher"){
            console.log(hola+name+" WHat are you teaching");
        } else {
            console.log(hola+name+" WHat are you doing");
        }
    }
}
var clo2 = interQue("eacher");
//clo2("Shyam");
//interQue("design")("picaso");

/** BIND CALL APPLY
 * Special method for function
 */
//CALL
var jex = {
    name : "jex",
    age : 26,
    presentation : function (style, time){
        if (style === "formal"){
            console.log("time "+time+" attire is "+style+
            " i am " + this.name + " having age "+this.age);
        } else {
            console.log("time "+time+" attire is "+style+
            " i am " + this.name + " having age "+this.age);
        }
    }
}

//jex.presentation("normal","morning");

var emily = {
    name : "emily",
    age : 29
}
//call jex using this variables of emily
//First argument is object
//other is the param of func
shyam.age = 22;
//jex.presentation.call(shyam,"normal","morning");

//APPLY
//jex.presentation.apply(emily,['family','afternoon']);

//BIND
//bind does not immideatly call the function but it
//creates the copy of function so we can store it somewhere

//bind allows us to preset some arguments
var jexFri = jex.presentation.bind(jex,"formal")
//jexFri(); // time undefined in replica
//jexFri("morning"); // remaining arg

//BIND example 2

var years = [1990,1965,1937,2005,1998];
//passing func in argument
function arrayCal(arr,fn,fn1){
    var res= [];
    arr.forEach(element => {
        res.push(fn1(fn(element)));
    });
    return res;
}

function calAge1(el){
    return 2019 - el;
}

function isFull(limit,el){
    return el >= limit;
}
//use bind for limit
var isFullJapan = isFull.bind(this,20);
/** The original method has no limit present
 * this isFullJapan methos is copied using bind 
 * having preset value of 20
 * using which new ageee is calculated as below
 */
var ageee = arrayCal(years,calAge1,isFullJapan);
console.log(ageee);


//////////////////////////////////////////////////////
// CODING CHALLANGE
/////////////////////////////////////////////////////


/** MAri Method 
var queans = {
    que1 : "how are you today",
    answer1 : {
        0 : "Fine",
        1 : "Not Fine"
    },
    que2 : "hows is ur mom dad", 
    answer2 : {
        0 : "mast",
        1 : "mom ne taav ayo"
    },
    que3 : "Internship mali?",
    answer3 : {
        0 : "Ha",
        1 : "Na"
    }
}
var que = ["que1","que2","que3"]
var ans = ["answer1","answer2","answer3"]
let ran = Math.floor(Math.random()*3)
var ranqu = que[ran]
var ranans = ans[ran]
console.log(queans[ranqu]);
console.log(queans[ranans]);
var doc = prompt("Question " + queans[ranqu], 
                "Write your answer");
if(queans[ranans][0] === doc){
    alert("sacho answer")
}
else {
    alert("locha marya")
}

*/


/** According to reqirements  */
//Normal method
/**
var game = true;
var QueAns = function(question,answer,correctans){
    this.question = question,
    this.answer = answer,
    this.correctans = correctans
}

QueAns.prototype.displyQue = function() {
    console.log(this.question);
    console.log("0 : "+ this.answer[0]);
    console.log("1 : "+ this.answer[1]);

}

var first1 = new QueAns("How are you today",{
    0 : "Fine",
    1 : "Not Fine"
}, 0);

var second2 = new QueAns("how is your momdad",{
    0 : "Mast",
    1 : "Tammu nu tofan"
}, 0);

var third3 = new QueAns("Internship mali?",{
    0 : "Ha",
    1 : "Na"
}, 0);

var quelist = [first1,second2,third3]
while(game){
    var ran = Math.floor(Math.random()*3);
    quelist[ran].displyQue();
    var doc = prompt("Question " + quelist[ran].question, 
                "...");
    //console.log(doc , " ", quelist[ran].answer[quelist[ran].correctans])
    if(doc == "exit"){
        game = false;
    } else if(doc === quelist[ran].answer[quelist[ran].correctans]){
        console.log("Correctomundo");
        console.log("*****************");
    } else {
        console.log("Not Corrrect");
        console.log("*****************");
    }
 }
 */

//If it should not affect another code then use IIFE

(function(){
    var game = true;
    var QueAns = function(question,answer,correctans){
        this.question = question,
        this.answer = answer,
        this.correctans = correctans
    }
    /** TO display the que and ans using prototype */
    QueAns.prototype.displyQue = function() {
        console.log(this.question);
        console.log("0 : "+ this.answer[0]);
        console.log("1 : "+ this.answer[1]);
    }
    /** To check answer using function
     * here value of input is passed along with a function which returns current score
     * using closure
     * initally the val will be 0
     */
    QueAns.prototype.checkans = function(doc,keepscore){
        var sc;
        if(doc == "exit"){
            game = false;
        } else if(doc === quelist[ran].answer[quelist[ran].correctans]){
            console.log("Correctomundo");
            sc = keepscore(true);
            game = true;
            console.log("*****************");
        } else {
            console.log("Not Corrrect");
            sc = keepscore(false);
            game = true;
            console.log("*****************");
        }
        //calling prototype based function to display score
        this.displayscore(sc);
        return game;
    }
    
    QueAns.prototype.displayscore = function(score){
        console.log("your current score is "+ score );
        console.log("------------------")
    }

    // Different que and answer in terms of object
    var first1 = new QueAns("How are you today",{
        0 : "Fine",
        1 : "Not Fine"
    }, 0);
    
    var second2 = new QueAns("how is your momdad",{
        0 : "Mast",
        1 : "Tammu nu tofan"
    }, 0);
    
    var third3 = new QueAns("Internship mali?",{
        0 : "Ha",
        1 : "Na"
    }, 0);
    // Score function which returns function
    function score(){
        var sc = 0;
        return function(correct){
            if(correct){
                sc++;
            } 
            return sc;
        }
    }
    var keepscore = score();
    //que list 
    var quelist = [first1,second2,third3]
    while(game){
        var ran = Math.floor(Math.random()*3);
        quelist[ran].displyQue();
        var doc = prompt("Question " + quelist[ran].question, 
                    "...");
        //console.log(doc , " ", quelist[ran].answer[quelist[ran].correctans])
        //updating game which is returned by checkans as if to continue or close
        game = quelist[ran].checkans(doc,keepscore);
     }
})();

