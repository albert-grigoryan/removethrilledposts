// Default words to be removed
const defaultWords = ['thrilled'];

// Set default words on extension installation
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get('words', (data) => {
    if (!data.words || data.words.length === 0) {
      chrome.storage.sync.set({ words: defaultWords });
    }
  });
});
