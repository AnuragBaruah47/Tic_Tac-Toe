const items = document.querySelectorAll(".items");
const startButton = document.querySelector(".start");
const resetButton = document.querySelector(".reset");
const surrenderButton = document.querySelector(".surrender");
const mainBox = document.querySelector(".mainbox");
const live=document.querySelector(".heading")
const playerXaudio=new Audio('thoing.wav')
const playerOaudio=new Audio('thung.wav')
const beforeStartMusic=new Audio("main.mp3")
const playerXWinsAudio=new Audio("playerX.mp3")
const playerOWinsAudio=new Audio("playerO.mp3")
const winPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
let player = false;
startButton.addEventListener("click", () => {
  beforeStartMusic.play()
  player=true
  startButton.disabled = true;
  live.innerHTML="PLAYER X TURN"
  // console.log("start", player);
  items.forEach((value) => {
    value.addEventListener("click", () => {
      if (player) {
        beforeStartMusic.pause()
        playerXaudio.play()
        live.innerHTML="PLAYER O TURN" 
        // console.log("if", player);
        value.textContent = "X";
        value.style.color = "#FF3131";
        player = false;
      } else {
        playerOaudio.play()
        live.innerHTML="PLAYER X TURN" 
        // console.log("else", player);
        value.textContent = "O";
        value.style.color = "#1F51FF";
        player = true;
      }
      value.style.pointerEvents = "none";
      checkWinner();
    });
    setTimeout(() => {
      startButton.style.backgroundColor = "#7fff00";
    }, 100);
    startButton.style.backgroundColor = "#FF3131";
  });
});

const checkWinner = () => {
  for (const pattern of winPattern) {
      console.log(pattern[0],pattern[1],pattern[2]);
      let position1Val=items[pattern[0]].innerHTML
      let position2Val=items[pattern[1]].innerHTML
      let position3Val=items[pattern[2]].innerHTML
      if(position1Val!=="" && position2Val!=="" && position3Val!==""){
        if(position1Val===position2Val && position2Val===position3Val){
          items.forEach((value) => {
            value.style.pointerEvents = "none";
          });
          if (position1Val==="X") {
            live.innerHTML="PLAYER X WINS" 
            playerXWinsAudio.play()
          }
          if(position1Val==="O"){
            live.innerHTML="PLAYER O WINS" 
            playerOWinsAudio.play()
          }
          if (!pattern) {
            live.innerHTML="DRAW" 
          }
        }
      }
      
  }}

resetButton.addEventListener("click", () => {
  items.forEach((value) => {
    value.textContent = "";
    value.style.pointerEvents = "initial";
  });
  player=true
  beforeStartMusic.play()
  setTimeout(() => {
    resetButton.style.backgroundColor = "#7fff00";
  }, 100);
  resetButton.style.backgroundColor = "#FF3131";
});

