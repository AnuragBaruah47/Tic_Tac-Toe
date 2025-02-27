const items = document.querySelectorAll(".items");
const startButton = document.querySelector(".start");
const resetButton = document.querySelector(".reset");
const musicOffButton = document.querySelector(".surrender");
const mainBox = document.querySelector(".mainbox");
const live = document.querySelector(".heading");
const playerXaudio = new Audio("thoing.wav");
const playerOaudio = new Audio("thung.wav");
const beforeStartMusic = new Audio("main.mp3");
const playerXWinsAudio = new Audio("playerX.mp3");
const playerOWinsAudio = new Audio("playerO.mp3");
const drawAudio = new Audio("draw.mp3"); // Added audio for draw condition
const line=document.querySelector(".line")
line.style.height="0px"
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
  beforeStartMusic.play();
  player = true;
  startButton.disabled = true;
  live.innerHTML = "PLAYER X TURN";

  items.forEach((value) => {
    value.addEventListener("click", () => {
      if (player) {
        beforeStartMusic.pause();
        playerXaudio.play();
        live.innerHTML = "PLAYER O TURN";
        value.textContent = "X";
        value.style.color = "#FF3131";
        player = false;
      } else {
        playerOaudio.play();
        live.innerHTML = "PLAYER X TURN";
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
  let isDraw = true;

  for (const pattern of winPattern) {
    let position1Val = items[pattern[0]].innerHTML;
    let position2Val = items[pattern[1]].innerHTML;
    let position3Val = items[pattern[2]].innerHTML;
    if (position1Val !== "" && position2Val !== "" && position3Val !== "") {
      if (position1Val === position2Val && position2Val === position3Val) {
        if(pattern[0]===0 && pattern[1]===3 && pattern[2]===6){
          line.style.transform="translate(758px)"
          line.style.height="600px"
        }
        if(pattern[0]===0 && pattern[1]===1 && pattern[2]===2){
          line.style.transform="translate(964px) translateY(-190px) rotate(90deg)"
          line.style.height="600px"
        }
        if(pattern[0]===0 && pattern[1]===4 && pattern[2]===8){
          line.style.transform="translate(974px) translateY(13px) rotate(134deg)"
          line.style.height="600px"
        }
        if(pattern[0]===1 && pattern[1]===4 && pattern[2]===7){
          line.style.transform="translate(959px)"
          line.style.height="600px"
        }
        if(pattern[0]===2 && pattern[1]===5 && pattern[2]===8){
            line.style.transform="translate(1160px)"
          line.style.height="600px"
        }
        if(pattern[0]===2 && pattern[1]===4 && pattern[2]===6){
          line.style.transform="translate(964px) translateY(0px) rotate(225deg)"
          line.style.height="600px"
        }
        if(pattern[0]===3 && pattern[1]===4 && pattern[2]===5){
         line.style.transform = "translate(964px) translateY(12px) rotate(90deg)"
          line.style.height="600px"
        }
        if(pattern[0]===6 && pattern[1]===7 && pattern[2]===8){
           line.style.transform = "translate(964px) translateY(213px) rotate(90deg)"
          line.style.height="600px"
        }
        items.forEach((value) => {
          value.style.pointerEvents = "none";
        });

        if (position1Val === "X") {
          live.innerHTML = "PLAYER X WINS";
          playerXWinsAudio.play();
        } else if (position1Val === "O") {
          live.innerHTML = "PLAYER O WINS";
          playerOWinsAudio.play();
        }
        return;
      }
    }
  }
  items.forEach((item) => {
    if (item.innerHTML === "") {
      isDraw = false;
    }
  });

  if (isDraw) {
    live.innerHTML = "IT'S A DRAW!";
    drawAudio.play();
  }
};

resetButton.addEventListener("click", () => {
  line.style.height="0px"
  items.forEach((value) => {
    value.textContent = "";
    value.style.pointerEvents = "initial";
  });
  player = true;
  beforeStartMusic.play();
  live.innerHTML = "PLAYER X TURN"; // Reset message

  setTimeout(() => {
    resetButton.style.backgroundColor = "#7fff00";
  }, 100);
  resetButton.style.backgroundColor = "#FF3131";
});

musicOffButton.addEventListener("click",()=>{
  beforeStartMusic.pause();
  setTimeout(() => {
    musicOffButton.style.backgroundColor = "#7fff00";
  }, 100);
  musicOffButton.style.backgroundColor = "#FF3131";
})