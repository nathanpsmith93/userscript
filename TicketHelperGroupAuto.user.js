// ==UserScript==
// @name         TicketHelper - Group Autofill
// @description  Add our Group Data onto the Registration Form
// @version      1.1
// @updateURL    https://raw.githubusercontent.com/nathanpsmith93/userscript/main/TicketHelperGroupA.user.js
// @downloadURL  https://raw.githubusercontent.com/nathanpsmith93/userscript/main/TicketHelperGroupA.user.js
// @match        *://glastonbury.seetickets.com/*
// @match        *://advance.byethost17.com/*
// @run-at       document-end
// ==/UserScript==


// Set Ticket Group Data
const GroupList = ["Group_RS1"];

const Group_RS1Reg = ["1584477547","3370852160","448888428","1994525126"];
const Group_RS1PC = ["TR109FN","YO233SH","BS247FZ","PL126NJ"];


// Group Initialisation & Population
const RegForm = document.getElementById("mainRegForm");
if (RegForm) {
  const FieldReg = ["registrations_0__RegistrationId","registrations_1__RegistrationId","registrations_2__RegistrationId","registrations_3__RegistrationId","registrations_4__RegistrationId","registrations_5__RegistrationId"];
  const FieldPC = ["registrations_0__PostCode","registrations_1__PostCode","registrations_2__PostCode","registrations_3__PostCode","registrations_4__PostCode","registrations_5__PostCode"];

  // Group Button Creation
  for (const CurrentGroup of GroupList) {
    let createGroupButton = document.createElement("button");
    createGroupButton.appendChild(document.createTextNode(CurrentGroup));
    RegForm.parentNode.insertBefore(createGroupButton, RegForm);
    createGroupButton.addEventListener("click", function() { populateForm(CurrentGroup); }, false);
  }

  // Add a "Clear Form" button
  let createClearButton = document.createElement("button");
  createClearButton.appendChild(document.createTextNode("Clear Form"));
  createClearButton.style.background='#bbbbbb';
  RegForm.parentNode.insertBefore(createClearButton, RegForm);
  createClearButton.addEventListener("click", function() { clearRegForm(); }, false);

  createRemoveRegistrationButtons();

  // Clear Reg Form Function
  async function clearRegForm() {
    let FieldCount = 0;
    while (FieldCount < FieldReg.length) {
      document.getElementById(FieldReg[FieldCount]).value = "";
      document.getElementById(FieldPC[FieldCount]).value = "";
      FieldCount++;
    };
  };

  // Form Population Function
  function populateForm(selectedGroup) {
    clearRegForm();
    // Should find a different method than eval, as it's considered bad practice
    let currentReg = eval(selectedGroup + 'Reg').slice();
    let currentPC = eval(selectedGroup + 'PC').slice();
    let regCount = 0;
    while (regCount < currentReg.length) {
      document.getElementById(FieldReg[regCount]).value = currentReg[regCount];
      document.getElementById(FieldPC[regCount]).value = currentPC[regCount];
      regCount++;
    };
  };

  // Creation of Remove Registration Buttons
  function createRemoveRegistrationButtons() {
    for (let regIndex = 0; regIndex < FieldReg.length; regIndex++) {
      let deleteButton = document.createElement("button");
      deleteButton.appendChild(document.createTextNode("X"));
      deleteButton.type = "button";
      deleteButton.style.float = "right";
      deleteButton.style.marginRight = "5px";

      let regInput = document.getElementById(FieldReg[regIndex]);
      let regLabel = regInput.previousSibling;
      regLabel.parentNode.insertBefore(deleteButton, regLabel.previousSibling);
      deleteButton.addEventListener("click", function() { removeRegistration(regIndex) }, false);
    };
  }

  // Remove registration and move up remaining registrations
  function removeRegistration(regIndex) {

      for (let currentRegIndex = regIndex; currentRegIndex < FieldReg.length; currentRegIndex++) {
          let regInput = document.getElementById(FieldReg[currentRegIndex]);
          let postcodeInput = document.getElementById(FieldPC[currentRegIndex]);

          let nextRegIndex = currentRegIndex + 1;
          let nextRegExists = nextRegIndex < FieldReg.length;
          let nextRegInput = nextRegExists ? document.getElementById(FieldReg[nextRegIndex]) : null;
          let nextPostcodeInput = nextRegExists ? document.getElementById(FieldPC[nextRegIndex]) : null;

          if (nextRegInput != null && nextPostcodeInput != null) {
              regInput.value = nextRegInput.value;
              postcodeInput.value = nextPostcodeInput.value;
          } else {
              regInput.value = "";
              postcodeInput.value = "";
          }
      }
  };
};
