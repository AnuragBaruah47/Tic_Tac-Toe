const items = document.querySelectorAll(".items");
const startButton = document.querySelector(".start");
const resetButton = document.querySelector(".reset");
const musicOffButton = document.querySelector(".surrender");
const live = document.querySelector(".heading");

const playerXaudio = new Audio("thoing.wav");
const playerOaudio = new Audio("thung.wav");
const beforeStartMusic = new Audio("main.mp3");
const playerXWinsAudio = new Audio("playerX.mp3");
const playerOWinsAudio = new Audio("playerO.mp3");
const drawAudio = new Audio("draw.mp3");

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

// Start Button
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

    // Small start button glow animation
    setTimeout(() => {
      startButton.style.backgroundColor = "#7fff00";
    }, 100);
    startButton.style.backgroundColor = "#FF3131";
  });
});

// Winner & Draw Check
const checkWinner = () => {
  let isDraw = true;

  for (const pattern of winPattern) {
    let [a, b, c] = pattern;
    let val1 = items[a].innerHTML;
    let val2 = items[b].innerHTML;
    let val3 = items[c].innerHTML;

    if (val1 && val1 === val2 && val2 === val3) {
      items.forEach((box) => (box.style.pointerEvents = "none"));

      if (val1 === "X") {
        live.innerHTML = "PLAYER X WINS 🎉";
        playerXWinsAudio.play();
      } else {
        live.innerHTML = "PLAYER O WINS 🎉";
        playerOWinsAudio.play();
      }
      return;
    }
  }

  // Check for draw
  items.forEach((item) => {
    if (item.innerHTML === "") {
      isDraw = false;
    }
  });

  if (isDraw) {
    live.innerHTML = "IT'S A DRAW 🤝";
    drawAudio.play();
  }
};

// Reset Button
resetButton.addEventListener("click", () => {
  items.forEach((value) => {
    value.textContent = "";
    value.style.pointerEvents = "initial";
  });
  player = true;
  beforeStartMusic.play();
  live.innerHTML = "PLAYER X TURN";

  setTimeout(() => {
    resetButton.style.backgroundColor = "#7fff00";
  }, 100);
  resetButton.style.backgroundColor = "#FF3131";
});

// Music Toggle Button
musicOffButton.addEventListener("click", () => {
  beforeStartMusic.pause();
  setTimeout(() => {
    musicOffButton.style.backgroundColor = "#7fff00";
  }, 100);
  musicOffButton.style.backgroundColor = "#FF3131";
});
