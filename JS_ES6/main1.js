class Details {
    constructor(name, buildYear){
        this.name  = name;
        this.buildYear = buildYear;
    }
}

class Park extends Details{
    constructor(name,buildYear,area, numofTree){
        super(name,buildYear);
        this.area = area;
        this.numofTree = numofTree;
    }
    TreeDens(){
        console.log(`the park ${this.name} has the density is ${this.numofTree / this.area}`)
    }
}

class Streets extends Details{
    constructor(name,buildYear,length,size = 3){
        super(name,buildYear);
        this.length = length;
        this.size = size;
    }
    classifyStreet() {
        const classfication = new Map();
        classfication.set(1,'tiny');
        classfication.set(2,'small');
        classfication.set(3,'normal');
        classfication.set(4,'big');
        classfication.set(5,'huge');
        console.log(`${this.name} is a street name and the size is ${classfication.get(this.size)}`);
    }

}

const allParks = [new Park('Green',1987,0.2,215), new Park('national',1894,2.9,3541), 
new Park("Oak",1953,0.4,979)];

const allSteets = [
    new Streets("Meadowlands",1999,1.1,4),
    new Streets("Carling",1990,2.7,2),
    new Streets("fifth ave",2010,0.8),
    new Streets("prince of wales",2002,2.5,5)
];

function calc(arr){
    //initial val is 0 for prev
    // prev and cur
    const sum = arr.reduce((prev,cur,index)  => prev + cur , 0);
    return [sum, sum/arr.length];
}

function ReportPark(p){
    console.log("----------PARKS REPORT---------------------");
    //DEnsity
    p.forEach(element =>  element.TreeDens());
    //average age
    const arr = p.map(el => 2020 - el.buildYear);
    const [totalage,avgAge] = calc(arr);
    console.log(`${arr.length}  parkss has average of ${avgAge} years`)
    //which has more streets 
    const i = p.map(el => el.numofTree).findIndex(el => el >= 1000);
    console.log(`${p[i].name} park has more number of trees which is ${p[i].numofTree}`)


};

function ReportStreets(s){
    console.log("---------- Street REPORT---------------------");
    //total and avg length of streets
    const [total,avg] = calc(s.map(ele => ele.length));
    console.log(`${total}  is total street length and ${avg} is average`)
    //classify
    s.forEach(ele => ele.classifyStreet())

    
};

ReportPark(allParks);
ReportStreets(allSteets);