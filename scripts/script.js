const input = $('#screen'),
      numbers = $('.nums'),
      operators = $('.ops'),
      result = $('#result'),
      clear = $('#clear'),
      log = $('#log'),
      reset = $('#reset'),
      error = $('#error'),
      arrow = $('#arrow'),
      dot = $('#dot');

let   isDisplayed = false;

numbers.on('click', function() {
  if(isDisplayed) {
    input.text('');
    isDisplayed = false;
  }
  let string = input.text();
  let button = $(this).text();

  app.insert(button);
});

operators.on('click', function() {
  let string = input.text();
  let button = $(this).text();
  let lastChar = string[string.length - 1];
  let isDot = false;

  if(lastChar === '×' || lastChar === '÷' || lastChar === '+' || lastChar === '-' || lastChar === '.') {
      let newString = string.substring(0, string.length - 1) + button;
      input.text(newString);
      isDisplayed = false;
    } else {
      app.insert(button);
      isDisplayed = false;
      console.log(button);
    }
});

dot.on('click', function() {
  input.append('.');
  let string = input.text();
  let counter = 0;

  let lastChar = string[string.length - 2];
  console.log('last char is: ', lastChar);
  if(lastChar === '×' || lastChar === '÷' || lastChar === '+' || lastChar === '-') {
    // check if the previous char was an operator and if so, replace it
      let newString = string.substring(0, string.length - 1);
      input.text(newString);
    }

  for(let i = 0; i < string.length; i++) {
    if(string[i] === '.') counter++;
    if(string[i] === '+') counter = 0;
    if(string[i] === '*') counter = 0;
    if(string[i] === '÷') counter = 0;
    if(string[i] === '×') counter = 0;
  }
  if(counter === 1 || counter === 0) {
    // check if there is a dot
  } else {
    let newString = string.substring(0, string.length - 1);
    input.text(newString);
  }
});

result.on('click', function() {
  if(!isDisplayed) {
    let text = input.text();
    let result = app.calculate(text);

    if(result !== undefined) {
    app.printResult(result);
    app.save(text, result);
    }
  }
  isDisplayed = true;
});

arrow.on('click', function() {
  let string = input.text();
  let newString = string.slice(0, string.length - 1);

  input.text(newString);
});

reset.on('click', function() {
  app.reset();
});

clear.on('click', function() {
  app.clear();
});

const app = {
  insert(string) {
    input.append(string);
  },
  reset() {
    isDisplayed = false;
    input.text('');
    log.text('');
  },
  clear() {
    isDisplayed = false;
    input.text('');
  },
  calculate(result) {
    let clean = result.replace(/\×/g, '*');
        clean = clean.replace(/\÷/g, '/');
        clean = clean.replace(/^\./g, '0.');
    if(result === '' || clean === '*' || clean === '/' || result === '+' || result === '-') {
      log.prepend('<p class="inside-box">Invalid Syntax</p>');
      this.clear();
    } else {
        try {
        clean = eval(clean);
        let floored = Math.floor(clean * 1000000000) / 1000000000;
        return floored;
      } catch (e) {
        log.prepend('<p class="inside-box">Invalid Syntax</p>');
        this.clear();
      }
  }
  },
  printResult(result) {
    input.text(result);
  },
  save(info, result) {
    log.prepend(`<p class="inside-box">${info} = ${result}</p>`);
  }
}
