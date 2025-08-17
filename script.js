let boxes = document.querySelectorAll(".box");
let btn = document.querySelector("#btn");
let msgContainer = document.querySelector(".msgContainer");
let msg = document.querySelector("#msg");

let turnO = true;

const winPatterns = [
  [0, 1, 2], // Row 1
  [3, 4, 5], // Row 2
  [6, 7, 8], // Row 3
  [0, 3, 6], // Col 1
  [1, 4, 7], // Col 2
  [2, 5, 8], // Col 3
  [0, 4, 8], // Diagonal
  [2, 4, 6], // Diagonal
];

// Handle box clicks
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      // Player O
      box.style.cssText = "color: #00FFFF; text-shadow: 0 0 10px #00FFFF, 0 0 20px #00FFFF;";
      box.innerText = "O";
      turnO = false;
    } else {
      // Player X
      box.style.cssText = "color: #FF2E63; text-shadow: 0 0 10px #FF2E63, 0 0 20px #FF2E63;";
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

// Check if someone won
const checkWinner = () => {
  for (const pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
      }
    }
  }
};

// Show winner
const showWinner = (winner) => {
  msg.innerText = `Winner is Player ${winner}!`;

  // Apply glowing text shadow based on winner
  if (winner === "O") {
    msg.style.cssText = "color: #00FFFF; text-shadow: 0 0 15px #00FFFF, 0 0 30px #00FFFF;";
  } else {
    msg.style.cssText = "color: #FF2E63; text-shadow: 0 0 15px #FF2E63, 0 0 30px #FF2E63;";
  }

  msgContainer.classList.remove("hide");
  disableBoxes();
  btn.innerText = "New Game"; // change button to "New Game"
};

// Disable all boxes
const disableBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

// Enable all boxes (reset board)
const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
    box.style.cssText = ""; // reset glow/text colors
  });
  msgContainer.classList.add("hide");
  turnO = true;
};

// Button click → Reset or New Game
btn.addEventListener("click", () => {
  enableBoxes();
  btn.innerText = "Reset"; // back to "Reset" while playing
});
