function getAverage(scores) {
  let numerator = 0;
  for (const score of scores) {
    numerator += score
  }
  const denominator = scores.length
  return numerator / denominator
}

console.log(getAverage([92, 88, 12, 77, 57, 100, 67, 38, 97, 89]));
console.log(getAverage([45, 87, 98, 100, 86, 94, 67, 88, 94, 95]));

function getGrade(score) {
  if (score === 100) {
    return "A++"
  } else if (score >= 90) {
    return "A"
  } else if (score >= 80) {
    return "B"
  } else if (score >= 70) {
    return "C"
  } else if (score >= 60) {
    return "D"
  } else {
    return "F"
  }
}

console.log(getGrade(96));
console.log(getGrade(82));
console.log(getGrade(56));

function hasPassingGrade(score) {
  if (score >= 60) {
    return true
  } else {
    return false
  }
}


console.log(hasPassingGrade(100));
console.log(hasPassingGrade(53));
console.log(hasPassingGrade(87));

function studentMsg(totalScores, studentScore) {
  const classAverage = getAverage(totalScores)
  const studentGrade = getGrade(studentScore)
  const passStatus = hasPassingGrade(studentScore)
  let passFail;
  
  if (passStatus) {
    console.log("pass")
    passFail = "passed"
  } else {
    console.log("fail")
    passFail = "failed"
  }
    
  return "Class average: " + classAverage + ". Your grade: " + studentGrade + ". You " + passFail + " the course."
}
console.log(studentMsg([92, 88, 12, 77, 57, 100, 67, 38, 97, 89], 37));