const display = $('#display'),
      history = $('#history')
      symbol = ['+', '-', '÷', '×'];

let first = [],
    second = [],
    value = '',
    result = [],
    data = [],
    operator = '',
    a = 0,
    b = 0;

function calc() {

  // selecting the right element
    $('h3').on('click', (e) => {
      $('#error').html('');
      value = e.target.innerHTML;
      console.log(operator);
      console.log('value is: ', value);

      for(let i = 0; i < symbol.length; i++ ) {
        if(value === symbol[i]) {
          operator = value;
          console.log('operator is: ', operator);
          break;
        }
      }

      if(first[0] === 0 && result === 0 || isNaN(first) && isNaN(result) || first[0] === Infinity && result === Infinity ) {
        clearScreen();
        $('#error').html('Invalid Operation -- Restarting App');
      }

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

      console.log('first array: ', first);
      console.log('result: ', result);
      console.log('second array: ', second);
      console.log('operator is: ', operator);

      // converting arrays into numbers
      a = Number(first.join(''));
      b = Number(second.join(''));

      // choose what to do
      if(value === '=') {
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

      history.html(showHistory(data));

      if(value === 'CE') {
        clearScreen();
      }
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

    // a function which makes a string out of first array, operator, second array, and the result
    function createData() {
      return data.push(`${a} ${operator} ${b} = ${result}`);

    }

    function showHistory(data) {5

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
