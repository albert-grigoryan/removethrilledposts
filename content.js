// Function to remove posts based on a list of words (case-insensitive and with word boundaries) and log the removed posts
function removePosts() {
  chrome.storage.sync.get(['words', 'enabled'], (data) => {
    if (data.enabled === false) return; // Do nothing if disabled

    const words = data.words || [];
    if (words.length === 0) return;

    // Create regex patterns for each word
    const patterns = words.map(word => new RegExp(`\\b${word}\\b`, 'i'));

    // Select all post elements (this may need to be adjusted depending on LinkedIn's current HTML structure)
    const posts = document.querySelectorAll('div.feed-shared-update-v2');

    posts.forEach(post => {
      const textContent = post.textContent || '';
      if (patterns.some(pattern => pattern.test(textContent))) {
        // Log the removed post's content to the console
        console.log('Removed post:', textContent);

        // Remove the post from the DOM
        post.remove();
      }
    });
  });
}

// Set up Mutation Observer to detect new posts
const observer = new MutationObserver((mutations) => {
  mutations.forEach(() => {
    removePosts();
  });
});

// Observe changes in the body for new posts
observer.observe(document.body, { childList: true, subtree: true });

// Initial call
removePosts();
