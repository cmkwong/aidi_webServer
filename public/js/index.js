import "@babel/polyfill";
import { updateTime } from "./script";
import { login, logout } from "./login";
import { getPrjStatus, initPrjStatus } from "./prjStatus";

// DOM ELEMENTS
const removeTimesheetItemBtn = document.querySelector(
  ".timesheet-remove-item-btn"
);
const timeElement = document.querySelector("#time--text");
const loginBtn = document.querySelector(".btn--login");
const logOutBtn = document.querySelector(".nav__el--logout");
const projectStatusRefresh = document.querySelector(".refreshPrjStatus");
const projectStatusGo = document.querySelector(".goProject");
var addTimesheetItemBtn = document.querySelector(".timesheet-add-item-btn");

// run timeer
if (timeElement) {
  setInterval(function () {
    updateTime(timeElement);
  }, 1000);
}

///////////////////////////////////
// add item button (Timesheet)
if (addTimesheetItemBtn) {
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
}

///////////////////////////////////
// remove item button (Timesheet)
if (removeTimesheetItemBtn) {
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
}

if (loginBtn) {
  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const user_name = document.getElementById("user-name").value;
    const password = document.getElementById("user-pw").value;
    login(user_name, password);
  });
}

if (logOutBtn) logOutBtn.addEventListener("click", logout);

if (projectStatusRefresh) {
  projectStatusRefresh.addEventListener("click", async (e) => {
    e.preventDefault();
    // init status
    initPrjStatus();

    const all_projects = document.querySelectorAll(".project");
    const index = document.querySelector("#project-select").value;
    if (index) {
      const locale = all_projects[index].dataset.locale;
      const project_id = all_projects[index].dataset.project_id;
      const prjStatus = await getPrjStatus(project_id, locale);
      if (prjStatus) {
        prjStatus.forEach((ps) => {
          let row = document.querySelector(`[data-grader=${ps.name}]`);
          if (row) {
            row.querySelectorAll("p")[0].innerText = ps.mins.toFixed(2);
            row.querySelectorAll("p")[1].innerText = ps.count;
            row.querySelectorAll("p")[2].innerText =
              String.fromCodePoint(0x2705); // https://www.kirupa.com/html5/emoji.htm
            row.querySelectorAll("p")[3].innerText =
              String.fromCodePoint(0x2705); // https://unicode-table.com/en/2705/
            row.querySelectorAll("p")[4].innerText =
              String.fromCodePoint(0x2705);
          }
        });
      }
    }
  });
}

if (projectStatusGo) {
  projectStatusGo.addEventListener("click", (e) => {
    const all_projects = document.querySelectorAll(".project");
    const index = document.querySelector("#project-select").value;
    if (index) {
      const link = all_projects[index].dataset.link.replace(
        "overview",
        "stats/ungradedByLocale"
      );
      window.open(link);
    }
  });
}
