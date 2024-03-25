const texts = document.querySelector('.texts');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;

startButton.addEventListener('click', () => {
  recognition.start();
});

stopButton.addEventListener('click', () => {
  recognition.stop();
});

recognition.addEventListener('result', (e) => {
  texts.innerHTML = ''; // Clear previous text

  for (let i = 0; i < e.results.length; i++) {
    const result = e.results[i][0].transcript.toLowerCase();
    const codeSnippet = getCodeSnippet(result);
    if (codeSnippet) {
      const codeP = document.createElement('p');
      codeP.classList.add('code');
      codeP.innerText = codeSnippet;
      texts.appendChild(codeP);
    }
  }
});

function getCodeSnippet(text) {
  const codeSnippets = {
    'semicolon': ';',
    'colon': ':',
    'comma': ',',
    'open parenthesis': '(',
    'close parenthesis': ')',
    'open curly brace': '{',
    'close curly brace': '}',
    'open square bracket': '[',
    'close square bracket': ']',
    'plus': '+',
    'minus': '-',
    'multiply': '*',
    'divide': '/',
    'equals': '=',
    'greater than': '>',
    'less than': '<',
    'and': '&&',
    'or': '||',
    // Add more commands and their corresponding code snippets here
  };

  // return codeSnippets[text];
  
  return codeSnippets[text] || '';
}
