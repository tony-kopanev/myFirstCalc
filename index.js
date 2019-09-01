class Calculator {
  constructor(where){
    const div = document.createElement('div');
    const input = document.createElement('input');
    let sign = null;
    input.value = 0;
      
    const chars = [
        '7', '8', '9', '/',
        '4', '5', '6', '*',
        '1', '2', '3', '-',
        '.', '0', 'c', '+',
        '='
      ];

     const buttons = chars.map(char => {
        const button = document.createElement('button');
        button.textContent = char;
        if(char === 'c') button.className = 'clear';
        if(char === '+' || char === '-' || char === '/' || char === '*')
          button.className = 'sign';
        button.dataset.char = char;

        return button;
      });

      div.className = 'calculator';

      div.addEventListener('click', event => {
        if(event.target.tagName !== 'BUTTON') return;
        const char = event.target.dataset.char;

        const isDouble = !!(this.doubleSign(input.value) && (this.doubleSign(input.value) !== char || this.doubleLastSign(input.value, char)));
        if(this.doubleSign(input.value) === true) input.value = ''; 
        
        switch(char) {
          case '+':
          case '-':
          case '*':
          case '/': if(isDouble) return; sign = char; break;
          case '=': return input.value = this.calculate(input.value, sign);
        }

        if(input.value.includes('.') && char === '.')
          if(!this.doubleDotted(input.value, sign)) return;
        if(char === 'c') {
          input.value = 0;
          return;
        }
        if(input.value === '0' && isFinite(char)) input.value = '';
        input.value += char;
      })

      div.append(input);
      for(const btn of buttons) div.append(btn);

      document.getElementById(where).append(div);
  }

  calculate(str, sign) {
    const [ firstOperand, secondOperand ] = str.split(sign);
    if(!isFinite(firstOperand) || !isFinite(secondOperand)) return 0;
         switch(sign) {
           case '+': return +firstOperand + +secondOperand;
           case '-': return +firstOperand - +secondOperand;
           case '*': return +firstOperand * +secondOperand;
           case '/': return +firstOperand / +secondOperand;
         }
    return 0;
  };

  doubleSign(str) {
    if(!isFinite(str)){
      if(str.includes('+')) return '+';
      if(str.includes('-')) return '-';
      if(str.includes('*')) return '*';
      if(str.includes('/')) return '/';
      return true;
    }
    return false;
  };

  doubleDotted(str, sign) {
    if(!sign) return false;
    if(isFinite(str)) return false;

    const lastOperand = str.split(sign).pop();
    if(lastOperand.includes('.')) return false;
    return true;
  }

  doubleLastSign(str, sign) {
    if(sign !== '+' && sign !== '-' && sign !== '*' && sign !== '/') return false;
    if(str.length < 1) return false;

    if(str.slice(str.length-1) === sign) return true;
    return false;
  }


};

new Calculator('root');