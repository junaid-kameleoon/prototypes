# Typewriter Effect Implementation Guide

This guide provides the standalone code for the synchronized typewriter effect used in the **Guest Mode** input fields. It is designed to be easily integrated into a production landing page.

## 1. HTML Structure
Ensure your input fields have the following IDs (or update the IDs in the JavaScript configuration).

```html
<!-- Target URL Field -->
<input type="text" id="targetUrl" placeholder="https://nike.com">

<!-- Setup Prompt Field -->
<textarea id="setupPrompt" placeholder="Change the button color..."></textarea>
```

## 2. JavaScript Implementation
Add this script to your page. It handles the synchronization, variable typing speeds, and the pause/reset cycle.

```javascript
/**
 * Synchronized Typewriter Effect
 * @param {Array} config - Array of {url, prompt} objects
 * @param {number} urlSpeed - Typing speed for URL field (ms)
 * @param {number} promptSpeed - Typing speed for Prompt field (ms)
 */
function runSyncTypewriter(config, urlSpeed = 30, promptSpeed = 20) {
    const urlEl = document.getElementById('targetUrl');
    const promptEl = document.getElementById('setupPrompt');
    let index = 0;

    function startPair() {
        const current = config[index];
        let urlCharIndex = 0;
        let promptCharIndex = 0;
        let urlDone = false;
        let promptDone = false;

        // Animate the URL placeholder
        function typeUrl() {
            if (urlCharIndex < current.url.length) {
                urlEl.placeholder = current.url.substring(0, ++urlCharIndex);
                setTimeout(typeUrl, urlSpeed);
            } else {
                urlDone = true;
                checkBothDone();
            }
        }

        // Animate the Prompt placeholder
        function typePrompt() {
            if (promptCharIndex < current.prompt.length) {
                promptEl.placeholder = current.prompt.substring(0, ++promptCharIndex);
                setTimeout(typePrompt, promptSpeed);
            } else {
                promptDone = true;
                checkBothDone();
            }
        }

        // Wait for both to finish before pausing and moving to the next pair
        function checkBothDone() {
            if (urlDone && promptDone) {
                setTimeout(() => {
                    index = (index + 1) % config.length;
                    startPair();
                }, 2500); // Pause duration before next pair
            }
        }

        typeUrl();
        typePrompt();
    }

    startPair();
}

// Technical Inspiration Pairs
const inspirations = [
    { url: "https://nike.com", prompt: "Change the 'Buy Now' button color to high-contrast orange..." },
    { url: "https://apple.com", prompt: "Update the hero title to 'Shop Smarter, Run Faster'..." },
    { url: "https://amazon.com", prompt: "Make the main CTA button lime green and more prominent..." },
    { url: "https://sephora.com", prompt: "Replace the background image with a high-resolution lifestyle shot..." },
    { url: "https://toyota.com", prompt: "Add a countdown timer below the headline to create urgency..." }
];

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
    runSyncTypewriter(inspirations);
});
```

## 3. Implementation Notes
- **Variable Speeds**: The `promptSpeed` is set to `20ms` (1.5x faster than the `30ms` URL speed) to ensure longer prompts feel snappy and both fields reach completion closer together.
- **Synchronization**: The logic waits for *both* animations to complete before triggering the 2.5-second pause. This ensures the fields stay perfectly in sync even if their lengths vary significantly.
- **Accessibility**: This effect modifies the `placeholder` attribute. Ensure that required labels are present for screen readers.
