// Read Relevant DOM Elements
const textInput = document.getElementById("text-input")
const checkBtn = document.getElementById("check-btn")
const result = document.getElementById("result")


checkBtn.addEventListener("click", () => {
  // DOM Data
  const input = textInput.value
  if (input.length === 0) { 
    alert("Please input a value") 
    return
  }


  const isPalindrome = (str) => {
    const reversedStr = str.split("").reverse().join("")
    return str.toLowerCase() == reversedStr.toLowerCase()
  }


  const cleanInput = (str) => {
    return str.match(/[a-z0-9]+/gi).join("")
  }
  
  if ( isPalindrome(cleanInput(input)) ) {
    result.textContent = `${input} is a palindrome`
  } else {
    result.textContent = `${input} is not a palindrome`
  }
});