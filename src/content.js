const { log } = require("./log.js");
const {
  wrapImageWithSubjectLink,
  wrapImageWithDomainLink,
  getProfileImages,
  addProfileHover,
} = require("./clickToFilter.js");

// Immediately log to show the extension script is loaded
log("Extension Loading...", window.location.href);

BETTER_GMAIL_TIMEOUT = 250

function wrapImagesSubject() {
  const images = getProfileImages();
  images.forEach(wrapImageWithSubjectLink);
}

function wrapImagesDomain() {
  const images = getProfileImages();
  images.forEach(wrapImageWithDomainLink);
}

let clickToFilterInterval;
async function init() {
  addProfileHover();
  clickToFilterInterval = setInterval(wrapImagesSubject, BETTER_GMAIL_TIMEOUT);
}

// When cmd/option is pressed, show the base domain
// (e.g., from:hello@domain.com -> from:domain.com)
document.addEventListener("keydown", (event) => {
  if (event.key === "Alt" || event.key === "Meta") {
    clearInterval(clickToFilterInterval);
    log("WRAP DOMAIN");
    wrapImagesDomain();
    clickToFilterInterval = setInterval(wrapImagesDomain, BETTER_GMAIL_TIMEOUT);
  }
});
document.addEventListener("keyup", (event) => {
  if (event.key === "Alt" || event.key === "Meta") {
    clearInterval(clickToFilterInterval);
    log("WRAP SUBJECT");
    wrapImagesSubject();
    clickToFilterInterval = setInterval(wrapImagesSubject, BETTER_GMAIL_TIMEOUT);
  }
});

init();
