// DOM Elements
const cashInput = document.getElementById("cash");
const customerTotal = document.getElementById("customer-total");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDueDiv = document.getElementById("change-due");

// write customer total to HTML
let price = 3.26;
customerTotal.textContent = String(price);

// tenderWorth: amount each key is worth
const tenderWorth = {
  'PENNY': .01,
  'NICKEL': .05,
  'DIME': .10,
  'QUARTER': .25,
  'ONE': 1,
  'FIVE': 5,
  'TEN': 10,
  'TWENTY': 20,
  'ONE HUNDRED': 100,
}

// cid: total amount of each tender type in the drawer
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];
const totalCash = () => cid.reduce((acc, el) => acc + el[1], 0).toFixed(2);

const createCurrencyObj = cidItem => {
  return {
    "name": cidItem[0],
    "trayValue": cidItem[1],
    "value": tenderWorth[cidItem[0]],
    "cidIndex": cid.findIndex((item) => item[0] === cidItem[0]),
  }
}

const determineChange = (remainingChange, outputStr="") => {
  // works when cash - price > 0
  // set input to 2 decimal places
  remainingChange = remainingChange.toFixed(2);
  const changeList = []
  let counter = 0
  console.log(`change: ${remainingChange}`)
  while (remainingChange > 0 && counter < 50) {
    counter++
    // create array where the largest currency is first
    const sortedCID = cid.sort((a, b) => tenderWorth[b[0]] - tenderWorth[a[0]])

    // Get the largest tender less than change and is available in register
    const largestTender = sortedCID.find(
      (tender) => {
        return tenderWorth[tender[0]] <= remainingChange && tender[1] > 0
      }
    )
    if (!largestTender) {
      console.log("NO EXACT CHANGE")
      return
    }
    const currentTender = createCurrencyObj(largestTender)

    // Determine how much can be removed from tray
    const changeValue = Math.min(
      Math.trunc(remainingChange / currentTender.value) * currentTender.value,
      currentTender.trayValue
    )

    // Update Tray and Remaining Change
    cid[currentTender.cidIndex][1] -= changeValue
    remainingChange = (remainingChange - changeValue).toFixed(2);

    // Update Change List
    changeList.push({
      name: currentTender.name,
      value: changeValue,
    })

    // if logging
    console.log(`${currentTender.name}: ${changeValue}`);
    console.log(`remaining change: ${remainingChange}`)
  }

  // Update change-due
  if (totalCash() === "0.00") {
    changeDueDiv.innerHTML = "<p>Status: CLOSED</p>"
  } else {
    changeDueDiv.innerHTML = "<p>Status: OPEN</p>"
  }

  for (const item of changeList) {
    changeDueDiv.innerHTML += `<p>${item.name}: $${item.value}</p>`
  }
}

const evaluate = () => {
  let cash = Number(cashInput.value);
  const changeDue = cash - price;

  if (cash < price) {
    alert("Customer does not have enough money to purchase the item")

  } else if (changeDue === 0.00) {
    changeDueDiv.innerHTML = "<p>No change due - customer paid with exact cash</p>"

  } else if (totalCash() < changeDue) {
    changeDueDiv.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>"

  } else {
    determineChange(changeDue);
  }
}

// Event Listeners
cashInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    evaluate();
  }
});
purchaseBtn.addEventListener("click", evaluate)
