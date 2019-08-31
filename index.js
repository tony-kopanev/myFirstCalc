class Calculator {
  constructor(where){
    const div = document.createElement('div');
    const input = document.createElement('input');
      
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

        button.onclick = function() {
          //if(isFinite(char))

         console.log('[char]', char);

         switch(char) {
           case '+':
           case '-':
           case '*':
           case '/':
         }

          if(input.value.includes('.') && char === '.') return;
          if(char === 'c') {
            input.value = '';
            return;
          }

          input.value += char;
        };

        return button;
      });

      div.className = 'calculator';

      div.append(input);
      for(const btn of buttons) div.append(btn);

      document.getElementById(where).append(div);
  }
};

new Calculator('root');