// Get elements
const wordInput = document.getElementById('word-input');
const addWordButton = document.getElementById('add-word');
const wordList = document.getElementById('word-list');

// Load existing words
function loadWords() {
  chrome.storage.sync.get('words', (data) => {
    const words = data.words || [];
    wordList.innerHTML = words.map(word => `
      <li>
        ${word}
        <span class="remove-word" data-word="${word}">Remove</span>
      </li>
    `).join('');
  });
}

// Add a word to the dictionary
function addWord() {
  const word = wordInput.value.trim().toLowerCase();
  if (word) {
    chrome.storage.sync.get('words', (data) => {
      const words = data.words || [];
      if (!words.includes(word)) {
        words.push(word);
        chrome.storage.sync.set({ words }, () => {
          loadWords();
          wordInput.value = '';
        });
      }
    });
  }
}

// Remove a word from the dictionary
function removeWord(word) {
  chrome.storage.sync.get('words', (data) => {
    let words = data.words || [];
    words = words.filter(w => w !== word);
    chrome.storage.sync.set({ words }, () => {
      loadWords();
    });
  });
}

// Event listeners
addWordButton.addEventListener('click', addWord);
wordList.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove-word')) {
    const word = event.target.getAttribute('data-word');
    removeWord(word);
  }
});

// Load words on page load
loadWords();
