const userInput = document.getElementById("user-input")
const checkBtn = document.getElementById("check-btn")
const clearBtn = document.getElementById("clear-btn")
const resultsDiv = document.getElementById("results-div")

const isValidSeparator = str => {
  return false
}


const isInputValid = (inputValue) => {
  // returns: 
  let arr = inputValue.split("")
  
  // country code
  if (arr[0] === "1") {
    console.log("country code found and 1 was removed")
    arr.shift()
    // check separator
    if (/(\s|-)/.test(arr[0])) {
      // valid seperator
      arr.shift()
    } else if (/\d||\(/.test(arr[0])) {
      // no seperator
    } else {
      // invalid seperator
      return false
    }
  }

  // area code
  const areaCodeRegex = /(^\(\d{3}\))|(^\d{3})/

  const areaCodeStr = arr[0] ==="(" 
    ? arr.splice(0, 5).join("")
    : arr.splice(0, 3).join("")
  
  if (areaCodeRegex.test(areaCodeStr)) {
    console.log("area code valid")
  } else {
    return false
  }

  // area code & first 3 separator
  if (/(\s|-)/.test(arr[0])) {
    // valid seperator
    arr.shift()
  } else if (/\d/.test(arr[0])) {
    // no seperator
  } else {
    // invalid seperator
    return false
  }

  // main seven
  const mainSevenRegex = /^\d{3}(\s|-)?\d{4}$/

  if (mainSevenRegex.test(arr.join(""))) {
    return true
  } else {
    return false
  }
}

console.log(isInputValid("1(555)555-5555"))


checkBtn.addEventListener("click", () => {
  userInput.value = ""
  if (!userInput.value) {
    console.log("Please provide a phone number")
    alert("Please provide a phone number")
    return
  } 
  resultsDiv.textContent += `${isInputValid(userInput.value)? "Valid" : "Invalid"} US number: ${userInput.value}\n`
})

clearBtn.addEventListener("click", () => {
  resultsDiv.innerText = ""
})