export default class Likes {
    constructor(){
        this.likes = [];
    }
    //add or delete like >> localstorage
    addLike(id,title,author,image) {
        const like = {
            id,
            title,
            author,
            image
        }
        this.likes.push(like);
        this.persistData();
        return like;
    }
    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
         //splice index and 1 item from that index
        this.likes.splice(index,1);
        this.persistData();
    }
    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1;
    }
    getNumLikes() {
        return this.likes.length
    }

    persistData() {
        /**
         * local storage only accepts string as key and value
         * s
         */
        localStorage.setItem('likes',JSON.stringify(this.likes));
    }

    readStorage() { 
        const storage = JSON.parse(localStorage.getItem('likes'));
        if(storage) {
            //restore like to object from local storage
            this.likes = storage;
        }
    }
}