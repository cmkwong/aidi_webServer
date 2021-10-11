function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

///////////////////////////////////
// TIme for overview
function updateTime(el) {
  const timeString =
    new Date().toLocaleDateString() +
    "  " +
    new Date().toLocaleTimeString("en-US", { hour12: false });
  el.innerText = timeString;
}
const timeElement = document.querySelector("#time--text");
setInterval(function () {
  updateTime(timeElement);
}, 1000);

///////////////////////////////////
// add item button (Timesheet)
var addTimesheetItemBtn = document.querySelector(".timesheet-add-item-btn");
addTimesheetItemBtn.addEventListener("click", function () {
  var gridTable = document.querySelector(".timesheet-input-table");
  // appendChild date
  var span = document.createElement("span");
  span.classList.add("table-title");
  span.classList.add("added");
  span.textContent = new Date().toLocaleDateString();
  gridTable.appendChild(span);
  //appendChild start
  var span = document.createElement("span");
  var iEl = document.createElement("input");
  iEl.type = "time";
  span.classList.add("added");
  span.appendChild(iEl);
  gridTable.appendChild(span);
  //appendChild end
  var span = document.createElement("span");
  var iEl = document.createElement("input");
  iEl.type = "time";
  span.classList.add("added");
  span.appendChild(iEl);
  gridTable.appendChild(span);
  //appendChild end
  var span = document.createElement("span");
  var iEl = document.createElement("input");
  iEl.type = "number";
  span.classList.add("added");
  span.appendChild(iEl);
  gridTable.appendChild(span);
  // appendChild working hr
  var span = document.createElement("span");
  span.id = "working-hr";
  span.classList.add("timesheet-value");
  span.classList.add("added");
  gridTable.appendChild(span);
  // appendChild late-leaving
  var span = document.createElement("span");
  span.id = "late-leaving";
  span.classList.add("timesheet-value");
  span.classList.add("added");
  gridTable.appendChild(span);
  // appendChild overtime
  var span = document.createElement("span");
  span.id = "overtime";
  span.classList.add("timesheet-value");
  span.classList.add("added");
  gridTable.appendChild(span);
  // appendChild classification
  var span = document.createElement("span");
  span.id = "classification";
  span.classList.add("timesheet-value");
  span.classList.add("added");
  span.textContent = "NA";
  gridTable.appendChild(span);
});

///////////////////////////////////
// remove item button (Timesheet)
var removeTimesheetItemBtn = document.querySelector(
  ".timesheet-remove-item-btn"
);
removeTimesheetItemBtn.addEventListener("click", function () {
  var countAdded = document.querySelectorAll(
    ".timesheet-input-table .added"
  ).length;
  if (countAdded > 8) {
    var gridTable = document.querySelector(".timesheet-input-table");
    for (var i = 0; i < 8; i++) {
      gridTable.removeChild(gridTable.lastChild);
    }
  }
});
