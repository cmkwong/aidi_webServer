export const insertAfter = (newNode, referenceNode) => {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
};

///////////////////////////////////
// TIme for overview
export const updateTime = (el) => {
  const timeString =
    new Date().toLocaleDateString() +
    "  " +
    new Date().toLocaleTimeString("en-US", { hour12: false });
  el.innerText = timeString;
};
