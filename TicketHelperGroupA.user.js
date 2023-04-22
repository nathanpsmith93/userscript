// ==UserScript==
// @name         TicketHelper - Group Population
// @description  Add our Group Data onto the Registration Form
// @version      23.04.5
// @updateURL    https://campsolo.info/scripts/TicketHelperGroups.user.js
// @downloadURL  https://campsolo.info/scripts/TicketHelperGroups.user.js
// @match        *://glastonbury.seetickets.com/*
// @match        *://advance.byethost17.com/*
// @match        *://campsolo.info/*
// @run-at       document-end
// ==/UserScript==


// Set Ticket Group Data
const GroupList = ["Group_MR1","Group_MR2","Group_MR3","Group_MR4","Group_MR5"];

const Group_MR1Reg = ["2588742008","271586035","699674289","996692613"];
const Group_MR1PC = ["SE20 7TZ","DL6 2FR","DL6 2FR","CV10 0BS"];
const Group_MR2Reg = ["2566681809","3510572666","4039865721","1152414005"];
const Group_MR2PC = ["KT18 7BH","KT6 4TR","CM11 2NG","E17 9LR"];
const Group_MR3Reg = ["725516196","626485675","326787993","1532898442"];
const Group_MR3PC = ["TN38 0GB","SW15 6SY","SW15 6SY","CR6 9NP"];
const Group_MR4Reg = ["3540738398","3513745223","2105881903","3031976968"];
const Group_MR4PC = ["TN25 6PU","TN25 6PU","6248706","3184"];
const Group_MR5Reg = ["26280459","255606037","936541937","2050391374"];
const Group_MR5PC = ["CO4 9EU","NW5 2XA","E10 5DS","E10 5DS"];


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
