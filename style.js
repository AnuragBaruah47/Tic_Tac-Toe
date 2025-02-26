const items = document.querySelectorAll(".items");
const startButton = document.querySelector(".start");
const resetButton = document.querySelector(".reset");
const surrenderButton = document.querySelector(".surrender");
const mainBox = document.querySelector(".mainbox");
const line = document.querySelector(".line");
const live=document.querySelector(".live")
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
let player = true;

startButton.addEventListener("click", () => {
  startButton.disabled = true;
  console.log("start", player);
  items.forEach((value) => {
    value.addEventListener("click", () => {
      if (player === true) {
        console.log("if", player);
        value.textContent = "X";
        value.style.color = "#FF3131";
        player = false; 
      } else {
        console.log("else", player);
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

resetButton.addEventListener("click", () => {
  items.forEach((value) => {
    value.textContent = "";
    value.style.pointerEvents = "initial";
  });
  setTimeout(() => {
    resetButton.style.backgroundColor = "#7fff00";
  }, 100);
  resetButton.style.backgroundColor = "#FF3131";
});

const checkWinner = () => {
  for (const pattern of winPattern) {
    let pos1Val = items[pattern[0]].innerText;
    let pos2Val = items[pattern[1]].innerText;
    let pos3Val = items[pattern[2]].innerText;
  }}
console.log(player);
