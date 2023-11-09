"use strict";

window.addEventListener("DOMContentLoaded", function () {

// tab logic start

const tabHeaders = document.querySelectorAll(".tabheader__item");
const tabsContents = document.querySelectorAll(".tabcontent");
const tabHead = document.querySelector(".tabheader__items");

function hideTabs (tabcontents,tabHeads) {
    tabcontents.forEach(item => {
        item.classList.add("hide");
        item.classList.remove("show", "fade");
    });
    tabHeads.forEach(item => item.classList.remove("tabheader__item_active"));
};

function showTabs (tabcontents,tabHeads, i = 0) {
   tabcontents[i].classList.add("show", "fade");
   tabcontents[i].classList.remove("hide");
   tabHeads[i].classList.add("tabheader__item_active");
};

tabHead.addEventListener("click", (e) => {
  if(e.target && e.target.matches(".tabheader__item")) {
    tabHeaders.forEach((item,index) => {
      if(e.target === item) {
        hideTabs(tabsContents,tabHeaders);
        showTabs(tabsContents, tabHeaders, index);
      };
    });
  };
});

hideTabs(tabsContents,tabHeaders);
showTabs(tabsContents, tabHeaders);

//tab logic end

});