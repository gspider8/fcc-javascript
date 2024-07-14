// DOM
const convertBtn = document.getElementById("convert-btn")
const numberInput = document.getElementById("number")
const output = document.getElementById("output")

// Data
const numerals = [
  {
    roman: "M",
    arabic: 1000
  },
  {
    roman: "CM",
    arabic: 900
  },
  {
    roman: "D",
    arabic: 500
  },
  {
    roman: "CD",
    arabic: 400
  },
  {
    roman: "C",
    arabic: 100
  },
  {
    roman: "XC",
    arabic: 90
  },
  {
    roman: "L",
    arabic: 50
  },
  {
    roman: "XL",
    arabic: 40
  },
  {
    roman: "X",
    arabic: 10
  },
  {
    roman: "IX",
    arabic: 9
  },
  {
    roman: "V",
    arabic: 5
  },
  {
    roman: "IV",
    arabic: 4
  },
  {
    roman: "I",
    arabic: 1
  }
]


// Core Logic
const checkUserInput = () => {
  const inputInt = parseInt(numberInput.value)

  if (!numberInput.value || isNaN(inputInt)) {
    display("Please enter a valid number")
  } else if (inputInt <= 0 ) {
    display("Please enter a number greater than or equal to 1")
  } else if (inputInt >= 4000) {
    display("Please enter a number less than or equal to 3999")
  } else {
    display(convertToRoman(inputInt))
  }
}

const convertToRoman = (inputVal) => {
  // recursive converter
  if (inputVal === 0) {
    // base case
    return ""
  } else {
    // determine largest roman numeral that could be used to account for the input value
    const greatestNumeral = numerals.find((numeral) => (inputVal >= numeral.arabic))
    const remainder = inputVal - greatestNumeral.arabic
    return greatestNumeral.roman + convertToRoman(remainder)
  }  
}

const display = (str) => {
  // clear inputs, display values, display output div
  numberInput.value = ""
  output.textContent = str;
  output.classList.remove("hidden")
}


// Event Listeners
convertBtn.addEventListener("click", checkUserInput)

numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput()
  }
})