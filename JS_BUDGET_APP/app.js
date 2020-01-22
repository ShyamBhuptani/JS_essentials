//Module
/** We will create 3 modules for the solution
 * 1. Data
 * 2. budget
 * 3. App
 * 
 * There will be some private and public method so
 * the controllers remain private
 * 
 */
var budgetController = (function(){
    var id = 0;
    //Expense constructor
    var Expense = function(id,desc,val){
        this.id = id;
        this.desc = desc;
        this.val = val;
        this.percentage = -1;
    }

    //Incode constructor
    var Income = function(id,desc,val){
        this.id = id;
        this.desc = desc;
        this.val = val;
    }
    Expense.prototype.percentageCal = function(total){
        if (total > 0){
            this.percentage = Math.floor(( this.val / total ) * 100);
        }
    };
    Expense.prototype.getPerc = function(){
        return this.percentage;
    };

    //all data will be stored here
    var data = {
        allItems: {
            exp : [],
            inc : []
        },
        Total: {
            exp: 0,
            inc: 0
        },
        budget : 0,
        percentage : -1
    }

    //cal total 
    var calTotal = function(type){
        var sum = 0;
        data.allItems[type].forEach(element => {
            sum = sum + element.val;
        });
        data.Total[type] = sum;
    }

    //public methods
    return{
        // to add item using input
        addItem : function(type,desc,val){
            var newItem;
            if(type === 'exp'){
                newItem = new Expense(id,desc,val);
            } else {
                newItem = new Income(id,desc,val);
            }
            data.allItems[type].push(newItem);
            id++;
            return newItem;
        },
        //on click delete, deleting from data structure
        deleteItem : function(type,id){
            var index,ids;
            /**we cant do like data.allitem[type][id], we need to
             * identify the index of the element whose value is ID
            */
           ids = data.allItems[type].map(function(current){
                return current.id;
           });
           index = ids.indexOf(id);
           if(index !== -1){
                data.allItems[type].splice(index,1);
           }
           

        },
        //testing function
        testing: function(){
            return data;
        },
        //calculate the budget
        calculateBudget: function(){
            //cal total in and exp
            calTotal('exp');
            calTotal('inc');
            //cal budget income and exp
            data.budget = data.Total.inc - data.Total.exp;
            //cal percentage which we spent
            data.percentage = data.Total.exp > data.Total.inc ? 0 : Math.round((data.Total.exp / data.Total.inc) * 100);
        },
        //get budget for update purpose/ get data
        getBudget: function(){
            return {
                budget : data.budget,
                totalInc : data.Total.inc,
                totalExp : data.Total.exp,
                per : data.percentage
            }
        },
        //percentage calculation
        calculatePerc: function(){
            data.allItems.exp.forEach(element => {
                element.percentageCal(data.Total.inc);
            });
        },
        //send perc to UI in terms of list
        getPercentage: function(){
            var dataPerc = data.allItems.exp.map(element => {
                return element.getPerc();
            });
            return dataPerc;
        }

    }


})();

var UIcontroller = (function(){
    //all class vals
    var DOMstrings = {
        inputType:".add__type",
        desc: ".add__description",
        val: ".add__value",
        btn: ".add__btn",
        incContainer: ".income__list",
        expContainer: ".expenses__list",
        budVal: ".budget__value",
        totalInc: ".budget__income--value",
        totalExp: ".budget__expenses--value",
        perc: ".budget__expenses--percentage",
        container: ".container",
        expPerc: ".item__percentage",
        month: ".budget__title--month"
    };
    //format string using methods
    var formatnum = function(num,type){
        var numSplit,int,newInt;
        /**
         * + - before num
         * exat 2 decimal
         * comma separated
         * 
         */
        //console.log(num)
        num = Math.abs(num);
        num = num.toFixed(2);//string with 2 decimal number
        numSplit = num.split('.');
        int = numSplit[0];
        dec = numSplit[1];
        var len = int.length;
        //for num morethn lenth 3
        if(len > 3){
            mod = len % 3;
            //if num is 3 digit
            if(mod == 0){
                newInt = int.substr(0,3) ;
                mod = 3;
            } else {
                newInt = int.substr(0,mod) ;
            }
            //commas at each 3 digits
            for(let y = 0; y < (len - mod)/3 ; y++){
                newInt += ',';
                newInt += int.substr(mod+3*y,3);
            }

        } else { newInt = int }
        return (type === 'exp' ? '-' : '+') + " " + newInt +'.'+dec;
    };
    //method to convert nodelist to a list and call it using func
    var nodelistForeach = function(list,callback){
        for(var i = 0; i < list.length ; i++){
            callback(list[i],i);
        }
    }
    //public func so can be used somwhere else
    return {
        //to get valss
        getVals: function(){
            return {
                //it will return val of select childs so inc/exp
                type : document.querySelector(DOMstrings.inputType).value,
                desc : document.querySelector(DOMstrings.desc).value,
                val : parseFloat(document.querySelector(DOMstrings.val).value)
            }
        },
        //testing
        getDOMStrings: function(){
            return DOMstrings;
        },
        //to add list item in UI
        addListItem: function(obj,type){
            var html, newhtml,ele;
            if(type === 'inc'){
                ele = DOMstrings.incContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%val%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            } else {       
                ele = DOMstrings.expContainer;        
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%val%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            //replace it with actual data
            newhtml = html.replace('%id%',obj.id);
            newhtml = newhtml.replace('%desc%',obj.desc);
            newhtml = newhtml.replace('%val%',formatnum(obj.val,type));
            //insert html to0 DOM
            document.querySelector(ele).insertAdjacentHTML('beforeend',newhtml);
        },
        //deletion of item on UI
        deleteListItem: function(Fullid){
            var ele = document.getElementById(Fullid);
            ele.parentNode.removeChild(ele);
        },
        //clearing values at beggining 
        clearVals : function(){
            var fields;
            //selector all provides a list
            fields = document.querySelectorAll(DOMstrings.desc+','+DOMstrings.val);
            //convert list to array using call 
            var fieldsArray = Array.prototype.slice.call(fields);
            fieldsArray.forEach(element => {
                element.value = "";
            });
            //focus
            fieldsArray[0].focus();
        },
        //display budget on UI 
        displayBudget: function(data){
            
            document.querySelector(DOMstrings.budVal).textContent = formatnum(data.budget,data.budget >= 0 ? 'inc' : 'exp');
            document.querySelector(DOMstrings.totalExp).textContent = formatnum(data.totalExp,'exp');
            document.querySelector(DOMstrings.totalInc).textContent = formatnum(data.totalInc,'inc');
            if(data.per > 0 ){
                document.querySelector(DOMstrings.perc).textContent = data.per + '%';
            } else {
                document.querySelector(DOMstrings.perc).textContent = '--';
            }
        },
        //eprcenttage display for expenses
        displayPerc: function(percentages){
            //produces a nodelist
            var fields = document.querySelectorAll(DOMstrings.expPerc);
            //creating a own foreach function
            //using callback VERY IMP , study thoroughly */
            
            nodelistForeach(fields,function(current,index){
                //console.log(current , percentages[index]);
                if(percentages[index] > 0){
                    current.textContent = percentages[index] + '%';
                } else {    
                    current.textContent = '---';
                }
            })
        },
        //month in the header
        displayMonth : function(){
            var now,year,month;
            now = new Date();
            year = now.getFullYear();
            months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
            month = now.getMonth();
            document.querySelector(DOMstrings.month).textContent = months[month] + " "+ year;
        },
        //type change so focus can vary
        changedType: function(){
            var fields = document.querySelectorAll(
                DOMstrings.inputType +','+ DOMstrings.desc +','+ DOMstrings.val
            );
            nodelistForeach(fields,function(cur){
                cur.classList.toggle('red-focus');
                document.querySelector(DOMstrings.btn).classList.toggle('red');
            });

        }
    };

});

var AppController = (function(budgetCTRL,UICTRL){
    

    //all events
    var setupEVENTS = function(){
        var DOM = UICTRL().getDOMStrings();
        //click
        document.querySelector(DOM.btn).addEventListener('click',function(){ 
            ControlADDItem();
        });
        //enter
        document.addEventListener('keypress', function(event){
            //13 is keycode for enter and for older browser "WHICH" is used
            if(event.keyCode === 13 || event.which == 13){
                ControlADDItem();
            }
        });
        //delete button
        document.querySelector(DOM.container).addEventListener('click',ctrlDELETEItem);
        //type change for color
        document.querySelector(DOM.inputType).addEventListener('change',UICTRL().changedType);
    };
    /** TODO
         * Get input
         * add item to budget controller
         * add nesw item to UI
         * calculate  and displaye budget
         */
    var updateBudget = function(){
        //calc budget
       budgetCTRL.calculateBudget();
       //get data to update in UI
        //return budget
        var data = budgetCTRL.getBudget();
        //display budget
        //console.log(data);
        UICTRL().displayBudget(data);
    };

    var updatePerc = function(){
        //cal per
        budgetCTRL.calculatePerc();
        //read them from controller
        var perc_exp = budgetCTRL.getPercentage();
        // console.log(perc_exp);
        //update UI
        UICTRL().displayPerc(perc_exp);
    }

    var ControlADDItem = function(){
        var input, newItem;
        
        //UICTRL is UIcontroller which is a function
        //get input

        input = UICTRL().getVals();
        //not a number returns true so not is used
        if(input.desc !== "" && !(isNaN(input.val)) && input.val > 0 ){
            //add item
            newItem = budgetCTRL.addItem(input.type,input.desc,input.val);
            //add item to UI
            UICTRL().addListItem(newItem,input.type);
            //clear fields
            UICTRL().clearVals();
            //cal and update budget
            updateBudget();
            //update perc
            updatePerc();
        }
    };
   
    var ctrlDELETEItem = function(event){
        var itemId,splitId,type,id;
        //find element 

        // target to get the tag
        //parentnode to check parent
        //id to get the id
        //console.log(event.target.parentNode.parentNode.parentNode.parentNode.id)
        itemId = event.target.parentNode.parentNode.parentNode.parentNode.id
        
        
        if(itemId){
            splitId = itemId.split('-');
            type = splitId[0];
            id = parseInt(splitId[1]);
        }
        //console.log(type+" "+id);
        //remove element from DS
        budgetCTRL.deleteItem(type,id);
        //remove element from UI
        //passs entire ID
        UICTRL().deleteListItem(itemId);
        //update budget
        //its already present
        updateBudget();
        //update perc
        updatePerc();

    }
    return {
        init: function(){
            setupEVENTS();
            //init using same method resetting to 0
            UICTRL().displayBudget({
                budget : 0,
                totalInc : 0,
                totalExp : 0,
                per : 0
            });
            UICTRL().displayMonth();
        }

    }
    
})(budgetController,UIcontroller);

AppController.init();