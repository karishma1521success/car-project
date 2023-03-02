// 1. when user click on the startDiv, the startDiv display gone and the game should start
//2. As soon game start UI show car, score board and white lines
//3. Make a car position object which tells the position of car
//4. Make a player object which tells that which key user has pressed



const scoreDiv = document.getElementById('score');
const startDiv = document.getElementById('start');
const gameDiv = document.getElementById('game');

// position of car in the UI
let carPosition = {
    x:0,
    y:0,
    speed:10
}

// player / user press which key
var player = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
} // so initailly use doesn't press any key

 function moveLine(){
    const lines = document.querySelectorAll('.line');
   
    console.log(typeof lines);
    console.log(lines);
    lines.forEach( (line) => {
        var top = line.offsetTop;
         const gameContainerDetails = gameDiv.getBoundingClientRect();
        if (line.offsetTop > gameContainerDetails.bottom) {
          top = 0;
        }
        // update the top value;
        line.style.top = top + carPosition.speed + 'px';
    });
 }


//animation function (so we want that animation in loop so we can make this function a recursive function)
function playGame(){
    // code for making car moving
    moveLine();
    const car = document.getElementById('car');
    const gameDiv = document.getElementById('game');
    const gameDivDetails = gameDiv.getBoundingClientRect();
    console.log(gameDivDetails);
    if(player.ArrowUp && carPosition.y > gameDivDetails.top ){  // it enters in if block when player.Arrowup:true
       // car should move to the upward (so we have to decrease the top value)
       carPosition.y -= carPosition.speed;   // top ki taraf jaayegaa
    }

    if(player.ArrowDown && carPosition.y < gameDivDetails.bottom -170){
        carPosition.y += carPosition.speed;   // bottom ki taraf aayegaa
    }

    if(player.ArrowRight && carPosition.x < gameDivDetails.right - 225 ){
        carPosition.x += carPosition.speed;
    }

    if(player.ArrowLeft && carPosition.x > 5){
        carPosition.x -= carPosition.speed;
    }


    score++;
    scoreDiv.textContent = score;
    car.style.top = carPosition.y + "px";
    car.style.left = carPosition.x + "px";
    // this code will make car moving but the problem is it will go out the game section so for that
    

    window.requestAnimationFrame(playGame);
}



function gameStart(){
    //1. To remove the display of startdiv we can make their display none
    startDiv.classList.add('displayNone');
    //2. create one user car and add to the game section- [create div and give background image of car]
    const carDiv = document.createElement('div');   // div element created dynamically using dom
    carDiv.setAttribute('id' , 'car');    //<div id = "car"> </div>
    gameDiv.appendChild(carDiv);
    const carTop = carDiv.offsetTop;     // distance from top to car  here it is 504
    const carLeft = carDiv.offsetLeft;   // here is 0;
    carPosition.y = carTop;
    carPosition.x = carLeft; 

    //3.whiteLines -  [ so we want 4 lines to show at particular game div]
    let top = 5;
    for(let i=1; i<=4; i++){
        let line = document.createElement('div');
        line.setAttribute("class" , "line");
        line.style.top = top + "px";
        gameDiv.appendChild(line);
        top  = top + 150;
    }// this will create a 4 lines

    const enemyDiv = document.createElement('div');
     enemyDiv.classList.add("enemy");
     enemyDiv.style.top = Math.floor(Math.random() * 400) + "px";
     enemyDiv.style.left = Math.floor(Math.random() * 350) + "px";

     gameDiv.appendChild(enemyDiv);

    // for creating animation by using dom we have function
    window.requestAnimationFrame(playGame);


}


//function for arrow key up press event listener
function handleKeyUp(event){  // here event is showing who calls this function
    event.preventDefault();  // here event is the object and event.key has a value of ArrowUp
    // console.log(event.key);    // this return "ArrowUp"
    // that why we make a key of player object as same as key name
    player[event.key] = false;  // means user press ArrowUp key

}

function handleKeyDown(event){  // here event is showing who calls this function
    event.preventDefault();     // here event is the object and event.key has a value of ArrowDown
    // console.log(event.key);   // this conoles "ArrowDown"
    player[event.key] = true;    // Making true means user leaves ArrowUp  
    // console.log(player);
}





// event listener for arrow key (whenver user presses arrow key this event listener will call)
document.addEventListener('keyup' , handleKeyUp);  // here keyup event means that user pressing the key
document.addEventListener('keydown' , handleKeyDown);  // keydown event means that user release the key
// as soon we press key both will function will excetue

//click event listener to start the game.
startDiv.addEventListener('click' , gameStart);





