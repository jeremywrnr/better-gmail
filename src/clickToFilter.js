// Function to wrap a single image
function wrapImageWithSearchLink(img) {
  const jid = img.getAttribute("jid");
  if (!jid) return;

  const searchUrl = `#search/from%3A${encodeURIComponent(jid)}`;
  console.log("Search URL:", searchUrl);

  // Create anchor element
  const anchor = document.createElement("a");
  anchor.href = searchUrl;
  if (
    img.parentNode.tagName === "A" &&
    img.parentNode.href.includes(searchUrl)
  ) {
    // We've already wrapped this image
    return;
  }
  // Replace profile img with anchor containing img
  img.parentNode.insertBefore(anchor, img);
  anchor.appendChild(img);
}

function getProfileImages() {
  const images = document.querySelectorAll('img[jid]:not([jid=""])');
  return images;
}

function addProfileHover() {
  // Add CSS rule for clickable profile images
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

// Export functions
module.exports = {
  wrapImageWithSearchLink,
  addProfileHover,
  getProfileImages,
};
