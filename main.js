const texts = document.querySelector('.texts');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.continuous = true; // Set continuous recognition to true

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

  if (e.results[0].isFinal) {
    const finalText = e.results[0][0].transcript.toLowerCase();
    if (finalText.includes('stop voice recording')) {
      recognition.stop();
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
    'dot': '.',
    'or': '||',
    'I': 'i',
    'J': 'j',
    'K': 'k',
    'Int': 'int',
    // Add more commands and their corresponding code snippets here
  };

  if (text.startsWith('include ')) {
    const library = text.substring('include '.length);
    return `#include<${library}>`;
  }

  return codeSnippets[text] || ''; // Return empty string if command not found
}
