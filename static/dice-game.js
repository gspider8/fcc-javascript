const listOfAllDice = document.querySelectorAll(".die");
const scoreInputs = document.querySelectorAll("#score-options input");
const scoreSpans = document.querySelectorAll("#score-options span");
const roundElement = document.getElementById("current-round");
const rollsElement = document.getElementById("current-round-rolls");
const totalScoreElement = document.getElementById("total-score");
const scoreHistory = document.getElementById("score-history");
const rollDiceBtn = document.getElementById("roll-dice-btn");
const keepScoreBtn = document.getElementById("keep-score-btn");
const rulesContainer = document.querySelector(".rules-container");
const rulesBtn = document.getElementById("rules-btn");

let diceValuesArr = [];
let isModalShowing = false;
let score = 0;
let round = 1;
let rolls = 0;

const rollDice = () => {
  diceValuesArr = [];

  for (let i = 0; i < 5; i++) {
    const randomDice = Math.floor(Math.random() * 6) + 1;
    diceValuesArr.push(randomDice);
  };

  listOfAllDice.forEach((dice, index) => {
    dice.textContent = diceValuesArr[index];
  });
};

const updateStats = () => {
  rollsElement.textContent = rolls;
  roundElement.textContent = round;
};

const updateRadioOption = (index, score) => {
  scoreInputs[index].disabled = false;
  scoreInputs[index].value = score;
  scoreSpans[index].textContent = `, score = ${score}`;
};

const updateScore = (selectedValue, achieved) => {
  score += parseInt(selectedValue);
  totalScoreElement.textContent = score;

  scoreHistory.innerHTML += `<li>${achieved} : ${selectedValue}</li>`;
};

const getHighestDuplicates = (arr) => {
  let maxCount = 0

  // determine highest duplicate
  const countsObj = {}
  arr.sort().forEach((val) => {
    countsObj[val] = countsObj[val] + 1 || 1
  })

  for (const val in countsObj) {
    maxCount = countsObj[val] > maxCount ? countsObj[val] : maxCount
  }

  // calculate score
  const sumOfDice = arr.reduce((acc, el) => acc + el, 0)

  // update radios
  switch (maxCount) {
    case 4:
      // update 4 of a kind
      updateRadioOption(1, sumOfDice)
    case 3:
      // update 3 of a kind
      console.log("3")
      updateRadioOption(0, sumOfDice)
    default:
      // update None
      updateRadioOption(5, 0)
  }
}

const detectFullHouse = (arr) => {
  // Determine counts of each die value
  const counts = {};
  arr.forEach(el => counts[el] = (counts[el] || 0) + 1)
  const countsArr = Object.values(counts)

  // Check to see if there is a full house
  if (countsArr.includes(2) && countsArr.includes(3)) {
    updateRadioOption(2, 25)
  }
  // Update none option
  updateRadioOption(5, 0);
}

const checkForStraights = (arr) => {
  // Determine Straight Length
  let straightLength = 1;
  const determineStraightLength = (mySet) => {
    let prev
    for (const el of mySet) {
      if (prev + 1 === el) {
        straightLength++
      } else {
        straightLength = 1
      }
      prev = el
    }
    return straightLength
  }
  determineStraightLength(new Set(arr.sort()));

  console.log("total straight length: ", straightLength, arr.sort())
  // Update score selections
  switch (straightLength) {
    case 5:
      // update large straight
      updateRadioOption(4, 40)
    case 4:
      // update small straight
      updateRadioOption(3, 30)
    default:
      // update None
      updateRadioOption(5, 0)
  }
}

const resetRadioOptions = () => {
  scoreInputs.forEach((input) => {
    input.disabled = true;
    input.checked = false;
  });

  scoreSpans.forEach((span) => {
    span.textContent = "";
  });
};

const resetGame = () => {
  diceValuesArr = [0, 0, 0, 0, 0];
  score = 0;
  round = 1;
  rolls = 0;

  listOfAllDice.forEach((dice, index) => {
    dice.textContent = diceValuesArr[index];
  });

  totalScoreElement.textContent = score;
  scoreHistory.innerHTML = "";

  rollsElement.textContent = rolls;
  roundElement.textContent = round;

  resetRadioOptions();
};

rollDiceBtn.addEventListener("click", () => {
  if (rolls === 3) {
    alert("You have made three rolls this round. Please select a score.");
  } else {
    rolls++;
    resetRadioOptions();
    rollDice();
    updateStats();
    // diceValuesArr = [3,3,3,3,1]
    getHighestDuplicates(diceValuesArr);
    detectFullHouse(diceValuesArr);
    checkForStraights(diceValuesArr);
  }
});

rulesBtn.addEventListener("click", () => {
  isModalShowing = !isModalShowing;

  if (isModalShowing) {
    rulesBtn.textContent = "Hide rules";
    rulesContainer.style.display = "block";
  } else {
    rulesBtn.textContent = "Show rules";
    rulesContainer.style.display = "none";
  }
});

keepScoreBtn.addEventListener("click", () => {
  let selectedValue;
  let achieved;

  for (const radioButton of scoreInputs) {
    if (radioButton.checked) {
      selectedValue = radioButton.value;
      achieved = radioButton.id;
      break;
    }
  }

  if (selectedValue) {
    rolls = 0;
    round++;
    updateStats();
    resetRadioOptions();
    updateScore(selectedValue, achieved);
    if (round > 6) {
      setTimeout(() => {
        alert(`Game Over! Your total score is ${score}`);
        resetGame();
      }, 500);
    }
  } else {
    alert("Please select an option or roll the dice");
  }
});