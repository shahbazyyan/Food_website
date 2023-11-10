"use strict";

window.addEventListener("DOMContentLoaded", function () {

  // tab logic start

  const tabHeaders = document.querySelectorAll(".tabheader__item");
  const tabsContents = document.querySelectorAll(".tabcontent");
  const tabHead = document.querySelector(".tabheader__items");

  function hideTabs(tabcontents, tabHeads) {
    tabcontents.forEach(item => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });
    tabHeads.forEach(item => item.classList.remove("tabheader__item_active"));
  };

  function showTabs(tabcontents, tabHeads, i = 0) {
    tabcontents[i].classList.add("show", "fade");
    tabcontents[i].classList.remove("hide");
    tabHeads[i].classList.add("tabheader__item_active");
  };

  tabHead.addEventListener("click", (e) => {
    if (e.target && e.target.matches(".tabheader__item")) {
      tabHeaders.forEach((item, index) => {
        if (e.target === item) {
          hideTabs(tabsContents, tabHeaders);
          showTabs(tabsContents, tabHeaders, index);
        };
      });
    };
  });

  hideTabs(tabsContents, tabHeaders);
  showTabs(tabsContents, tabHeaders);

  //tab logic end

  //timer logic start

  const timerBlocks = document.querySelectorAll(".timer__block");


  function getCurrentTime(endTime) {
    const total = Date.parse(endTime) - Date.parse(new Date());
    let days, hours, minutes, seconds;

    if (total <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(total / (1000 * 60 * 60 * 24));
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

  function checkZero(x) {
    return x >= 0 && x < 10 ? `0${x}` : x;
  };

  function setClock(selector, endTime) {
    const timer = document.querySelector(selector);
    const daysTime = timer.querySelector("#days");
    const hoursTime = timer.querySelector("#hours");
    const minutesTime = timer.querySelector("#minutes");
    const secondsTime = timer.querySelector("#seconds");
    const timerID = setInterval(updateClock, 1000);

    function updateClock() {
      const { total, days, hours, minutes, seconds } = getCurrentTime(endTime);

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

  // OOP menu card 

  class MenuCard {
    constructor(img, alt, title, descreption, price, parentSelector) {
      this.img = img;
      this.alt = alt;
      this.title = title;
      this.descreption = descreption;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 0.94;
      this.changeToEur();
    };

    changeToEur() {
      this.price = this.price * this.transfer;
    };

    render() {
      const { img, alt, title, descreption, price, parent } = this;
      const elem = document.createElement("div");
      elem.classList.add("menu__item");
      elem.innerHTML = `
    <img src=${img} alt=${alt}>
    <h3 class="menu__item-subtitle">${title}</h3>
    <div class="menu__item-descr">${descreption}</div>
    <div class="menu__item-divider"></div>
    <div class="menu__item-price">
      <div class="menu__item-cost">Price:</div>
      <div class="menu__item-total"><span>${price}</span> usd/day</div>
    </div>
    `;
      parent.append(elem);
    };
  };

  new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    "Menu Premium",
    "The Fitness menu is a new approach to cooking: more fresh vegetables and fruits. A product for active and healthy people. This is a completely new product with the best price and high quality!",
    2,
    ".menu .container"
  ).render();

  new MenuCard(
    "img/tabs/helthy.jpg",
    "vegy",
    "Menu Helthy",
    "The Fitness menu is a new approach to cooking: more fresh vegetables and fruits. A product for active and healthy people. This is a completely new product with the best price and high quality!",
    4,
    ".menu .container"
  ).render();


  new MenuCard(
    "img/tabs/good.jpg",
    "vegy",
    "Menu Fitness",
    "The Fitness menu is a new approach to cooking: more fresh vegetables and fruits. A product for active and healthy people. This is a completely new product with the best price and high quality!",
    3,
    ".menu .container"
  ).render();

  new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    "Menu Fitness",
    "The Fitness menu is a new approach to cooking: more fresh vegetables and fruits. A product for active and healthy people. This is a completely new product with the best price and high quality!",
    8,
    ".menu .container"
  ).render();

  new MenuCard(
    "img/tabs/good.jpg",
    "vegy",
    "Menu Fitness",
    "The Fitness menu is a new approach to cooking: more fresh vegetables and fruits. A product for active and healthy people. This is a completely new product with the best price and high quality!",
    4,
    ".menu .container"
  ).render();

  new MenuCard(
    "img/tabs/helthy.jpg",
    "vegy",
    "Menu Fitness",
    "The Fitness menu is a new approach to cooking: more fresh vegetables and fruits. A product for active and healthy people. This is a completely new product with the best price and high quality!",
    6,
    ".menu .container"
  ).render();

  // slider logic start

  const slider = document.querySelector(".offer__slider");
	const slides = document.querySelectorAll(".offer__slide");
	const prev = document.querySelector(".offer__slider-prev");
	const next = document.querySelector(".offer__slider-next");
	const current = document.querySelector("#current");
	const total = document.querySelector("#total");
	const slidesWrapper = document.querySelector(".offer__slider-wrapper");
	const slidesInner = document.querySelector(".offer__slider-inner");
	const width = window.getComputedStyle(slidesWrapper).width;

	let slideIndex = 1;
	let offset = 0;

	if (slides.length < 10) {
		total.textContent = `0${slides.length}`;
		current.textContent = `0${slideIndex}`;
	} else {
		total.textContent = slides.length;
		current.textContent = slideIndex;
	}

  console.log(slidesInner);

	slidesInner.style.cssText = `
		display: flex;
		width: ${100 * slides.length}%;
		transition: all .5s;
	`;

	slidesWrapper.style.overflow = "hidden";

	slides.forEach(slide => {
		slide.style.width = width;
	});

	slider.style.position = "relative";

	const dots = [];
	const dotsWrapper = document.createElement("ul");
	dotsWrapper.style.cssText = `
		position: absolute;
		right: 0;
		left: 0;
		bottom: 0;
		z-index: 15;
		display: flex;
		justify-content: center;
		margin-left: 15%;
		margin-right: 15%;
		list-style: none;
	`;
	slider.append(dotsWrapper);

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement("li");
		dot.setAttribute("data-slide-to", i + 1);
		dot.style.cssText = `
			box-sizing: content-box;
			flex: 0 1 auto;
			width: 30px;
			height: 6px;
			margin-left: 3px;
			margin-right: 3px;
			cursor: pointer;
			background-color: #fff;
			background-clip: padding-box;
			border-top: 10px solid transparent;
			border-bottom: 10px solid transparent;
			opacity: .5;
			transition: opacity .5s;
		`;

		if (i === 0) {
			dot.style.opacity = 1;
		}
		dotsWrapper.append(dot);
		dots.push(dot);
	}

	next.addEventListener("click", () => {
		if (offset === parseFloat(width.slice(0, width.length - 2)) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += parseFloat(width.slice(0, width.length - 2));
		}

		slidesInner.style.transform = `translateX(-${offset}px)`;

		if (slideIndex === slides.length || slideIndex >= slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		if (slides.length < 10) {
			total.textContent = `0${slides.length}`;
			current.textContent = `0${slideIndex}`;
		} else {
			total.textContent = slides.length;
			current.textContent = slideIndex;
		}

		dots.forEach(dot => dot.style.opacity = 0.5);
		dots[slideIndex - 1].style.opacity = 1;
	});

	prev.addEventListener("click", () => {
		if (offset === 0) {
			offset = parseFloat(width.slice(0, width.length - 2)) * (slides.length - 1);
		} else {
			offset -= parseFloat(width.slice(0, width.length - 2));
		}

		slidesInner.style.transform = `translateX(-${offset}px)`;

		if (slideIndex === 1 || slideIndex <= 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		if (slides.length < 10) {
			total.textContent = `0${slides.length}`;
			current.textContent = `0${slideIndex}`;
		} else {
			total.textContent = slides.length;
			current.textContent = slideIndex;
		}

		dots.forEach(dot => dot.style.opacity = 0.5);
		dots[slideIndex - 1].style.opacity = 1;
	});

	dots.forEach(dot => {
		dot.addEventListener("click", (e) => {
			const slideTo = e.target.getAttribute("data-slide-to");
			slideIndex = slideTo;
			offset = parseFloat(width.slice(0, width.length - 2)) * (slideTo - 1);

			slidesInner.style.transform = `translateX(-${offset}px)`;

			if (slides.length < 10) {
				total.textContent = `0${slides.length}`;
				current.textContent = `0${slideIndex}`;
			} else {
				total.textContent = slides.length;
				current.textContent = slideIndex;
			}

			dots.forEach(dot => dot.style.opacity = 0.5);
			dots[slideIndex - 1].style.opacity = 1;
		});
	});

  
  
 

});