var a = "hello";
first();

function first(){
    var b = "hi";
    second();
    function second(){
        var c = "lol";
        third();
    }
}

function third(){
    var d = " ho ";
    //console.log(c)
}

//this isnt assigned until and unless the method
//actually called
//in case of function, this points to the same window object
//f1()
//function f1(){ console.log(this) -- will give window object in return}
// for method in a object, this provides the object
//if a regular function called in the method of a 
//object then it points to window object
//when you borrow a method as variable
// mike.calculateAge  =john.calculateAge 
//no () is required 
//


var ob = function(name,age){
    this.name = name;
    this.age = age;
}
//adding method using prototype but it
//is not present in object, it gets added to propeorty OBJECT

ob.prototype.calC = function calC(){
    console.log(2018 - this.age);
}

ob.prototype.last = "bhup"

var shyam = new ob("shyam",26);
shyam.calC();
console.log(shyam.last);

console.log(shyam.hasOwnProperty('name'));
console.log(shyam instanceof ob)