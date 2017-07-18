const display = $('#display'),
      history = $('#history'),
      symbol = ['+', '-', '÷', '×'];

let first = [],
    second = [],
    value = '',
    result = [],
    data = [],
    operator = '',
    a = 0,
    b = 0,
    isClicked;

function calc() {

  // selecting the right element
    $('h3').on('click', (e) => {
      $('#error').html('');

      isClicked = false;
      // get the value of a current element, and store it in variable
      value = e.target.innerHTML;

      //***FOR TESTING PURPOSES***//
      console.log(operator);
      console.log('value is: ', value);
      //***FOR TESTING PURPOSES***//

      // loop through the array(symbol) and assing a value to the particular operator
      loopThroughSymbols();
      //handle possible errors
      errorHandlers();
      // check for a math operator and push a value into an array
      checkAndAssign();

      //***FOR TESTING PURPOSES***//
      console.log('first array: ', first);
      console.log('result: ', result);
      console.log('second array: ', second);
      console.log('operator is: ', operator);
      console.log('isClicked: ', isClicked);
      //***FOR TESTING PURPOSES***//

      // converting arrays into numbers
      a = Number(first.join(''));
      b = Number(second.join(''));

      // you have a value and an operator, choose what math operation to do
      calculate();

      // show data on display
      history.html(showHistory(data));

      // check if CE was clicked  -- if so, set everything to default
      ceClicked();
    });
}

    // set everything to default values
    function clearScreen() {
      display.html('');
      history.html('');
      first = [];
      second = [];
      result = [];
      data = [];
      operator = '';
      value = '';
      a = 0;
      b = 0;
      console.log('-------------');
      console.log(first, second, result, value, operator);
    }

    function setUp() {
      display.html(result);
      first = [result];
      second = [];
    }

    function loopThroughSymbols() {
      for(let i = 0; i < symbol.length; i++ ) {
        if(value === symbol[i]) {
          operator = value;
          isClicked = true;
          console.log('operator is: ', operator);
          break;
        }
      }
    }

    function errorHandlers() {
      if(isNaN(first) && isNaN(result) ||
      first[0] === Infinity && result === Infinity ||
      first[0] === undefined && operator !== ''
      ) {
        clearScreen();
        $('#error').html('Invalid Operation -- Restarting App');
      }

      if(first[0] === '' && result[0] === undefined) {
        first.pop();
      }
    }

    function checkAndAssign() {
      // saving a value into an array
      if(!operator && value !== '=') {
        first.push(value);
        display.html(first);
      } else if(operator && value !== '=') {
          // if you haven't clicked on a math operator, show a number on the display
        if(value !== '+' && value !== '-' && value !== '÷' && value !== '×' ) {
          second.push(value);
          display.html(second);
        } else {
          // else show an operator on the display
          display.html(value);
        }
      }
    }

    function calculate() {
      if(value === '=' || isClicked && second[0] !== undefined) {
        if(operator === '+') {
          result = add(a, b);
          createData();
          setUp();
        }
        else if(operator === '-') {
          result = subtract(a, b);
          createData();
          setUp();
        }
        else if(operator === '÷') {
          result = divide(a, b);
          createData();
          setUp();
        }
        else if(operator === '×') {
          result = multiply(a, b);
          createData();
          setUp();
        }
      }
    }

    function ceClicked() {
      if(value === 'CE') {
        clearScreen();
      }
    }

    // a function which makes a string out of first array, operator, second array, and the result
    function createData() {
      return data.push(`${a} ${operator} ${b} = ${result}`);
    }

    function showHistory(data) {
      let output = '';
      for(let i = 0; i < data.length; i++) {
        output += `${data[i]}<br>`;
      }
      return output;
    }

    // math operations
    function add(a, b) {
      return a + b;
    }

    function subtract(a, b) {
      return a - b;
    }

    function multiply(a, b) {
      return a * b;
    }

    function divide(a, b) {
      return a / b;
    }

    // init app
    calc();
