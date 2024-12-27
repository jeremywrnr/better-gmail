const {
  wrapImageWithSearchLink,
  getProfileImages,
  addProfileHover,
} = require("./clickToFilter.js");

// Immediately log to show the extension script is loaded
console.log("Better Gmail Extension Loading...", window.location.href);

function handleDOMChanges() {
  const images = getProfileImages();
  images.forEach(wrapImageWithSearchLink);
  console.debug("Images updated!");
}

// Wait for the page to be ready
function waitForElement(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        resolve(document.querySelector(selector));
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

async function init() {
  console.log("Initializing Gmail extension...");
  await waitForElement('div[role="main"]');
  console.log("Gmail interface detected!");

  addProfileHover();

  const observer = new MutationObserver((mutations) => {
    console.debug("Page changed at:", new Date().toISOString());
    handleDOMChanges();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
  });
}

// Start the extension
init().catch(console.error);
