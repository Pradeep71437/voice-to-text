const texts = document.querySelector('.texts');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement('p');

startButton.addEventListener('click', () => {
  recognition.start();
});

stopButton.addEventListener('click', () => {
  recognition.stop();
});

recognition.addEventListener('result', (e) => {
  texts.appendChild(p);
  const text = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript.toLowerCase())
    .join('');

  p.innerText = text;
  if (e.results[0].isFinal) {
    if (text.includes('stop voice coding')) {
      recognition.stop();
      return;
    }

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

    for (const [command, snippet] of Object.entries(codeSnippets)) {
      if (text.includes(command)) {
        const codeP = document.createElement('p');
        codeP.classList.add('code');
        codeP.innerText = snippet;
        texts.appendChild(codeP);
        break;
      }
    }

    p = document.createElement('p');
  }
});

recognition.addEventListener('end', () => {
  recognition.start();
});

recognition.start();
