// $(document).ready(function() {
  const input = $('#screen'),
        numbers = $('.nums'),
        operators = $('.ops'),
        result = $('#result'),
        clear = $('#clear'),
        log = $('#log'),
        reset = $('#reset'),
        error = $('#error'),
        arrow = $('#arrow');

  let   isDisplayed = false;

  numbers.on('click', function() {
    let string = input.text();
    let button = $(this).text();

    app.insert(button);
  });

  operators.on('click', function() {
    let string = input.text();
    let button = $(this).text();
    let lastChar = string[string.length - 1];

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
// });
