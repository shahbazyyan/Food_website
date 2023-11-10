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

//timer logic start

const timerBlocks = document.querySelectorAll(".timer__block");


function getCurrentTime (endTime) {
  const total = Date.parse(endTime) - Date.parse(new Date());
  let days, hours, minutes, seconds;

  if(total <= 0 ) {
    days = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;
  } else {
    days = Math.floor(total / (1000 * 60 * 60 *24));
    hours = Math.floor((total / (1000 * 60 * 60) % 24));
    minutes = Math.floor((total / 1000 / 60) % 60);
    seconds = Math.floor((total / 1000) % 60);
  };

  return {
    total,
    days,
    hours,
    minutes,
    seconds
  };
};

function checkZero (x) {
  return x >= 0 && x < 10 ? `0${x}` : x;
};

function setClock (selector, endTime) {
  const timer = document.querySelector(selector);
  const daysTime = timer.querySelector("#days");
  const hoursTime = timer.querySelector("#hours");
  const minutesTime = timer.querySelector("#minutes");
  const secondsTime = timer.querySelector("#seconds");
  const timerID = setInterval(updateClock, 1000);

    function updateClock () {
      const {total, days, hours, minutes, seconds} = getCurrentTime(endTime);

      daysTime.textContent = checkZero(days);
      hoursTime.textContent = checkZero(hours);
      minutesTime.textContent = checkZero(minutes);
      secondsTime.textContent = checkZero(seconds);

      if (total <= 0) {
        clearInterval(timerID);
      };
    };
    updateClock();
};

setClock(".timer", "2023-12-31 23:59:59");

});