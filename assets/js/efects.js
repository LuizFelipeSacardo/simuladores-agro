
function numberToCurrency(){
  console.log('chamou!')
  let inputNumber = document.querySelector('#value01').value;
  console.log(inputNumber);

  let outputNumber = '';
  if(inputNumber.length == 1){
    outputNumber = `0,0${inputNumber}`
  }
  
  console.log(outputNumber);
  inputNumber.innerText = outputNumber;
}