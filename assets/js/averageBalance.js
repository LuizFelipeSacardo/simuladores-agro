let averageBalanceSimButton = document.querySelector('#averageBalanceSimButton');
averageBalanceSimButton.addEventListener('click', generateResults);

function daysInEachMonth(){
  let datePicker = document.querySelector('#datePicker').value;
  let date = new Date(datePicker);
  let day = date.getDate()+1;
  let currentMonthDays = 30 - day;
  let nextMonthDays = 30 - currentMonthDays;

  let days = [currentMonthDays, nextMonthDays];
  return days;
}

function averageBalanceEachMonth(){
  let days = daysInEachMonth();
  let averageBalanceInput = document.querySelector('#averageBalance').value;
  let averageBalance = averageBalanceInput.replace(',', '.');

  let currentMonthValue = days[0] / 30 * averageBalance;
  let nextMonthValue = days[1] / 30 * averageBalance;

  let values = [currentMonthValue, nextMonthValue];

  console.log(values);
  return values;
}


function generateResults(){
  let results = document.querySelector('.results');
  event.preventDefault();
  results.classList.remove('hide');
  averageBalanceSimButton.classList.add('hide');

  let errorsList = [];

  let values = averageBalanceEachMonth();  
  errorsList = formValidation();
  
  
  if(errorsList.length<=0){
    results.innerHTML = `O saldo médio no <strong>Mês Atual</strong> será de <span class="results__output--highlight-main">${values[0].toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span> <br><br> O que representa um ganho ou uma perda de <span class="results__output--highlight">${((values[0]+values[1])/30).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span> por dia até o final do mês atual. <br> <br> O saldo médio para o <strong>Próximo Mês</strong> será de <span class="results__output--highlight-main"> ${values[1].toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}.</span> <br> <br><button type="submit" class="form__button" id="redoButton">Refazer</button>`
    
    let redoButton = document.querySelector('#redoButton');
    redoButton.addEventListener('click', redoSimulation); 
    
    window.scrollBy({
      top: 2000,
      behavior: 'smooth'
    })
  } else{
    let outputString = `<span class="results__error-title">Atenção, existem erros de preenchimento:</span> <br> <br>`;

    errorsList.forEach(element => {
      let newElement =  `<span class="results__error-simbol">&#10008</span> <span class="results__error-element"> ${element}</span> <br>`;
      outputString+=newElement;      
    });

    let outputHtml = outputString+`<button type="submit" class="form__button" id="redoButton">Refazer</button>`;

    results.innerHTML = outputHtml;

    let redoButton = document.querySelector('#redoButton');
    redoButton.addEventListener('click', redoSimulation);

    window.scrollBy({
      top: 2000,
      behavior: 'smooth'
    });
  }
}

function redoSimulation(){
  let results = document.querySelector('.results');
  averageBalanceSimButton.classList.remove('hide');
  results.classList.add('hide');

  window.scrollBy({
    top: -100,
    behavior: 'smooth'
  });
}


function formValidation(){
  let errors = [];
  let datePicker = document.querySelector('#datePicker').value;
  let averageBalanceInput = document.querySelector('#averageBalance').value;

  if(datePicker.length < 1){
    let errorDescription = "Selecione uma DATA válida";
    errors.push(errorDescription);
  }

  if(averageBalanceInput.length < 1){
    let errorDescription = "Digite um VALOR válido.";
    errors.push(errorDescription);
  }

  return errors;
}
