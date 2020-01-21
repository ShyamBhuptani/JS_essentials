var scores,roundScore,gameState,storelocal;
var dice_image = document.querySelectorAll('.dice');
init();

//textContent is for string output only but for inserting html its innerhtml

//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = "<h1>Hi</h1>";

//queryselector only works for first element

//document.querySelector('.dice').style.display = 'none';

//using queryselectorall it will pick all elements

// document.querySelector('.btn-roll').addEventListener('click',roll_clicked);

//here simply writing fn name without () because it is a callback function
//means function calling anoter function, here eventlistner calling callback function

// function roll_clicked(){
//     console.log("hola");
// } // it is external function

//we can also define function in eventlister which will be anonymous function
//addEvent('click', function(){
//})


document.querySelector('.btn-roll').addEventListener('click',function(){
    if(gameState){
        var dice = Math.floor(Math.random() * 6) + 1;
        //console.log(dice_image);
        storelocal = dice;
        for(let i = 0; i < dice_image.length;i++){
            dice_image[i].style.display = 'block';
            dice_image[i].src = "dice-" + dice + ".png";
        }
        if(storelocal == dice && dice == 6) {
            scores[activePlayer] = 0;
            document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];
            nextplayer(dice_image);
            storelocal = 0;
        } else if(dice !== 1){
            //add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

        } else {
            nextplayer(dice_image);
        }
        storelocal = dice;
}
});

document.querySelector('.btn-hold').addEventListener('click',function(){
    if(gameState){
    scores[activePlayer] += roundScore;
    document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];
    // var threshold = document.querySelector('.final-score').value
    var threshold = document.getElementsByClassName('final-score');
    threshold = threshold > 0 ? threshold : 100;
    if(scores[activePlayer] >= threshold[0].value){
        document.getElementById('name-'+activePlayer).textContent = "Winner";
        dice_hide(dice_image);
        document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
        document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
        gameState = false;
    } else {
        nextplayer(dice_image);
    }
}
});

function nextplayer(dice_image){
    //next player
    document.querySelector('#current-' + activePlayer).textContent = 0;
    // core logic
    //var deactivate = 'player-'+activePlayer+'-panel'
    // document.querySelector('.player-'+activePlayer+'-panel').className = deactivate;

    //using classlist add remove
    document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
    activePlayer = 1- activePlayer;
    // var activate = 'player-'+activePlayer+'-panel' + ' active'
    // document.querySelector('.player-'+activePlayer+'-panel').className = activate;
    //document.querySelector('.player-'+activePlayer+'-panel').classList.add('active');
    
    //also we can use toggle which will toggle classname if not present then add otherwise remove
    document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active');
    roundScore = 0;

    //hide dices
    dice_hide(dice_image);
}


function dice_hide(dice_image){
    for(let i = 0; i < dice_image.length;i++){
        dice_image[i].style.display = 'none';
    }
};

document.querySelector('.btn-new').addEventListener('click', init);


function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    //faster than query selector
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    dice_hide(dice_image);
    document.getElementById('name-0').textContent = "Player 1";
    document.getElementById('name-1').textContent = "Player 2";
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('winner');
    gameState = true;
}


/*
class = constructor in JS


*/









