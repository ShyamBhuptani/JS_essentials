import uniqid from 'uniqid';

export default class list {
    constructor(){
        this.items = []
    }

    addItem(count, unit, ing){
        const item = {
            id : uniqid(),
            count,
            unit,
            ing  
        }
        this.items.push(item);
        return item;
    }

    deleteItem(id){ 
        /** slice start  and end index
         * splice start and count of number from starting
         * [2,4,8] - splice(1,1) - return [4] original array is [2,8]
         * [2,4,8] - slice(1,1) - return [4] original array is still same  [2,4,8]
         * [1,2,3,4,5] - splice(1,2) = [2,3] - slice(1,2) = [2] as end is not included
        */
       const index = this.items.findIndex(el => {
           //check if id is same
           el.id === id});
        //splice index and 1 item from that index
        this.items.splice(id,1);
    }

    updateCount(id,newCount) {
        /**
         * we cannot use find(id) as id is a part of individual item
         * this.items.find(id) is incorrect
         * 
         * find will find the entire element
         */
        this.items.find(ele => ele.id === id).count = newCount;
    }

}