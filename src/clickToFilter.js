const { log } = require("./log.js");

function getProfileImages() {
  const images = document.querySelectorAll('img[jid]:not([jid=""])');
  return images;
}

function wrapImageWithSubjectLink(img) {
  const jid = img.getAttribute("jid");
  const searchUrl = `#search/from%3A${encodeURIComponent(jid)}`;
  wrapImageCommon(img, searchUrl);
}

function wrapImageWithDomainLink(img) {
  const jid = img.getAttribute("jid");
  const domain = jid.split("@")[1];
  const searchUrl = `#search/from%3A${encodeURIComponent(domain)}`;
  wrapImageCommon(img, searchUrl);
}

function wrapImageCommon(img, searchUrl) {
  let anchor, mustInsert;
  if (img.parentNode.tagName === "A") {
    anchor = img.parentNode;
  } else {
    anchor = document.createElement("a");
    mustInsert = true;
  }

  if (anchor.href.includes(searchUrl)) {
    return;
  }

  log("WRAP", searchUrl);
  anchor.href = searchUrl;
  if (mustInsert) {
    img.parentNode.insertBefore(anchor, img);
    anchor.appendChild(img);
  }
}

// Add CSS rule for clickable profile images
function addProfileHover() {
  const style = document.createElement("style");
  style.textContent = `
    img[jid] {
        box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.8);
        transition: box-shadow 0.1s ease;
    }
    img[jid]:hover {
        box-shadow: 0 0 5px 4px rgba(0, 255, 0, 1);
        cursor: pointer;
    }
    `;
  document.head.appendChild(style);
}

module.exports = {
  addProfileHover,
  getProfileImages,
  wrapImageWithSubjectLink,
  wrapImageWithDomainLink,
};
