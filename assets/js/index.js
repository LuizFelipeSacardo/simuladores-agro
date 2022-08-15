let results = document.querySelector('.results')
let button = document.querySelector('#button')
button.addEventListener('click', generateResults)

function convertPeriodsToDays(
  periods01,
  periods02,
  periodType01,
  periodType02
) {
  let periods = []

  let firstPeriod = periods01 * periodType01
  let secondPeriod = periods02 * periodType02

  periods.push(firstPeriod)
  periods.push(secondPeriod)

  return periods
}

function valuesPercentagesOverTotal(value01, value02) {
  let value1 = value01
  let value2 = value02
  let totalValue = Number(value1) + Number(value2)

  let value1Percentage = value1 / totalValue
  let value2Percentage = value2 / totalValue

  return [value1Percentage, value2Percentage]
}

function ponderateTaxes(tax01, tax02, value01, value02) {
  let ponderatedTax01 = valuesPercentagesOverTotal(value01, value02)[0] * tax01
  let ponderatedTax02 = valuesPercentagesOverTotal(value01, value02)[1] * tax02

  let ponderatedTax = ponderatedTax01 + ponderatedTax02

  return ponderatedTax
}

function periodTotalTax(
  tax01,
  tax02,
  periods01,
  periods02,
  periodType01,
  periodType02,
  value01,
  value02
) {
  let days = convertPeriodsToDays(
    periods01,
    periods02,
    periodType01,
    periodType02
  )
  let days1 = days[0]
  let days2 = days[1]

  let value01Percentage = valuesPercentagesOverTotal(value01, value02)[0]
  let value02Percentage = valuesPercentagesOverTotal(value01, value02)[1]

  let days1Factor = days1 / 360
  let days2Factor = days2 / 360

  let totalTax01 = days1Factor * tax01 * value01Percentage
  let totalTax02 = days2Factor * tax02 * value02Percentage

  let totalPeriodTax = totalTax01 + totalTax02

  return totalPeriodTax
}

function taxOverSelic(tax01, tax02, selic, value01, value02) {
  let efetiveTax = ponderateTaxes(tax01, tax02, value01, value02)
  return efetiveTax / selic
}

function generateResults() {
  event.preventDefault()
  results.classList.remove('hide')
  button.classList.add('hide')

  let errorsList = []

  let selic = 13.75
  let tax01Input = document.querySelector('#tax01').value
  let tax01 = tax01Input.replace(',', '.')
  let tax02Input = document.querySelector('#tax02').value
  let tax02 = tax02Input.replace(',', '.')
  let value01Input = document.querySelector('#value01').value
  let value01 = value01Input.replace(',', '.')
  let value02Input = document.querySelector('#value02').value
  let value02 = value02Input.replace(',', '.')
  let periods01Input = document.querySelector('#periods01').value
  let periods01 = periods01Input.replace(',', '.')
  let periods02Input = document.querySelector('#periods02').value
  let periods02 = periods02Input.replace(',', '.')
  let periodType01 = document.querySelector('#periodType01').value
  let periodType02 = document.querySelector('#periodType02').value

  let ponderateTax = ponderateTaxes(tax01, tax02, value01, value02)
  let totalTax = periodTotalTax(
    tax01,
    tax02,
    periods01,
    periods02,
    periodType01,
    periodType02,
    value01,
    value02
  )
  let valuePercentage01 = valuesPercentagesOverTotal(value01, value02)[0] * 100
  let valuePercentage02 = valuesPercentagesOverTotal(value01, value02)[1] * 100
  let taxOverSelicPercentage =
    taxOverSelic(tax01, tax02, selic, value01, value02) * 100

  errorsList = formValidation(
    tax01,
    tax02,
    periods01,
    periods02,
    value01,
    value02
  )

  if (errorsList.length <= 0) {
    results.innerHTML = `A taxa MIX anual é de <span class="results__output--highlight-main">${ponderateTax.toFixed(
      2
    )}%</span>, o que representa <span class="results__output--highlight">${taxOverSelicPercentage.toFixed(
      0
    )}%</span> da taxa Selic atual.<br> <br> A taxa total do período é de <span class="results__output--highlight"> ${totalTax.toFixed(
      2
    )}%.</span> <br> <br> Esta simulação apresenta: <br> <span class="results__output--highlight"> ${valuePercentage01.toFixed(
      2
    )}% </span> de Recursos Controlados <br> <span class="results__output--highlight"> ${valuePercentage02.toFixed(
      2
    )}% </span> de Recursos Livres <button type="submit" class="form__button" id="redoButton">Refazer</button>`

    let redoButton = document.querySelector('#redoButton')
    redoButton.addEventListener('click', redoSimulation)

    window.scrollBy({
      top: 2000,
      behavior: 'smooth'
    })
  } else {
    let outputString = `<span class="results__error-title">Atenção, existem erros de preenchimento:</span> <br> <br>`

    errorsList.forEach(element => {
      let newElement = `<span class="results__error-simbol">&#10008</span> <span class="results__error-element"> ${element}</span> <br>`
      outputString += newElement
    })

    let outputHtml =
      outputString +
      `<button type="submit" class="form__button" id="redoButton">Refazer</button>`

    results.innerHTML = outputHtml

    let redoButton = document.querySelector('#redoButton')
    redoButton.addEventListener('click', redoSimulation)

    window.scrollBy({
      top: 2000,
      behavior: 'smooth'
    })
  }
}

function redoSimulation() {
  button.classList.remove('hide')
  results.classList.add('hide')

  window.scrollBy({
    top: -100,
    behavior: 'smooth'
  })
}

function formValidation(tax01, tax02, periods01, periods02, value01, value02) {
  let errors = []

  if (tax01.length < 1) {
    let errorDescription = 'Digite uma TAXA VÁLIDA em Resursos Controlados'
    errors.push(errorDescription)
  }

  if (tax02.length < 1) {
    let errorDescription = 'Digite uma TAXA VÁLIDA em Recursos Livres'
    errors.push(errorDescription)
  }

  if (periods01.length < 1) {
    let errorDescription = 'Digite um PRAZO VÁLIDO em Recursos Obrigatorios'
    errors.push(errorDescription)
  }

  if (periods02.length < 1) {
    let errorDescription = 'Digite um PRAZO VÁLIDO em Recursos Livres'
    errors.push(errorDescription)
  }

  if (value01.length < 1) {
    let errorDescription = 'Digite um VALOR VÁLIDO em Recursos Obrigatorios'
    errors.push(errorDescription)
  }

  if (value02.length < 1) {
    let errorDescription = 'Digite um VALOR VÁLIDO em Recursos Livres'
    errors.push(errorDescription)
  }

  return errors
}
