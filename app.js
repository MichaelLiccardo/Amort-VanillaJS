const submitButton = document.getElementsByClassName("submit-btn")[0]
const principal = document.getElementsByClassName("dollar-amount-input")[0]
const years = document.getElementsByClassName("years-input")[0]
const rate = document.getElementsByClassName("rate-input")[0]
let inputs = [principal, years, rate]


for (let i = 0; i < inputs.length; i++){
    const input = inputs[i]
    input.addEventListener('change', quantityChanged)
}

submitButton.addEventListener('click', amortize)

function amortize() {
    const monthlyRate = rate.value / 100 / 12
    const numPayments = years.value * 12
    let startingBal = parseFloat(principal.value)
    let endingBal = startingBal
    let payment = 0
    let cumulativeInterest = 0
    let interestPayment = 0
    let principalPayment = 0
    let table = document.querySelector('table')
    let data = []
    let totalPayment = 0
    let totalPrinciple = 0
    let totalInterest = 0
    document.getElementById('table').innerHTML = ""
    
    
    for (let i = 1; i <= numPayments; i++) {
        data = []
        startingBal = endingBal
        payment = (i == numPayments) ? payment = endingBal : paymentCalc(monthlyRate, numPayments, principal.value)
        interestPayment = monthlyRate * startingBal
        principalPayment = payment - interestPayment
        endingBal = (i == numPayments) ? 0 : startingBal - principalPayment
        cumulativeInterest += interestPayment
        totalPayment += payment
        totalPrinciple += principalPayment
        totalInterest += interestPayment

        data.push(i,
                  new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(startingBal),
                  new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(payment),
                  new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(principalPayment),
                  new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(interestPayment),
                  new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(endingBal),
                  new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(cumulativeInterest)
                  )

        createTable(table, data)
    }
    createTableHead(table)
    totalPayment = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(totalPayment)
    totalPrinciple = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(totalPrinciple)
    totalInterest = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(totalInterest)
    createTableFoot(table, totalPayment, totalPrinciple, totalInterest)
}


function createTable(table, data) {
    table.border = 1
    for (let i=0; i < 1; i++) {
        let row = table.insertRow()
        for (let j = 0; j < data.length; j++) {
            let cell = row.insertCell()
            let text = document.createTextNode(data[j])
            cell.appendChild(text)
        }
    }
}

function createTableHead(table) {

    let thead = table.createTHead()
    let row = thead.insertRow()
    let cols = ['Payment #', 'Starting Bal', 'Payment', 'Principal Payment', 'Interest Payment', 'Ending Bal', 'Cumulative Interest']
    for (let col of cols) {
        let th = document.createElement('th')
        let text = document.createTextNode(col)
        th.appendChild(text)
        row.appendChild(th)
    }
}

function createTableFoot(table, totalPayment, totalPrinciple, totalInterest) {
    let row = table.insertRow()
    let cell = row.insertCell()
    let text = document.createTextNode("")
    cell.appendChild(text)
    cell = row.insertCell()
    text = document.createTextNode("")
    cell.appendChild(text)
    cell = row.insertCell()
    text = document.createTextNode(totalPayment)
    cell.appendChild(text)
    cell = row.insertCell()
    text = document.createTextNode(totalPrinciple)
    cell.appendChild(text)
    cell = row.insertCell()
    text = document.createTextNode(totalInterest)
    cell.appendChild(text)
    cell = row.insertCell()
    text = document.createTextNode("")
    cell.appendChild(text)
    cell = row.insertCell()
    text = document.createTextNode("")
    cell.appendChild(text)
}

function paymentCalc(monthlyRate, numPayments, principalValue) {

    return Math.round(((monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1) * principalValue) * 100) / 100

}

function quantityChanged(event) {

    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
}
var currencyInput = document.querySelector('input[type"currency"]')
currencyInput.addEventListener('focus', onFocus)
currencyInput.addEventListener('blur', onBlur)
var currency = 'GBP' // https://www.currency-iso.org/dam/downloads/lists/list_one.xml

function localStringToNumber( s ){
  return Number(String(s).replace(/[^0-9.-]+/g,""))
}

function onFocus(e){
  var value = e.target.value;
  e.target.value = value ? localStringToNumber(value) : ''
}

function onBlur(e){
  var value = e.target.value

  var options = {
      maximumFractionDigits : 2,
      currency              : currency,
      style                 : "currency",
      currencyDisplay       : "symbol"
  }
  
  e.target.value = (value || value === 0) 
    ? localStringToNumber(value).toLocaleString(undefined, options)
    : ''
}