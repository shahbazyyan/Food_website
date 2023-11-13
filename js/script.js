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

  asyncGetData("http://localhost:8888/menu")
   .then( data => data.forEach(({img,altimg,title,descr,price}) => {
    new MenuCard(img,altimg,title,descr,price, ".menu .container").render()
   }));

  // new MenuCard(
  //   "img/tabs/vegy.jpg",
  //   "vegy",
  //   "Menu Premium",
  //   "The Fitness menu is a new approach to cooking: more fresh vegetables and fruits. A product for active and healthy people. This is a completely new product with the best price and high quality!",
  //   2,
  //   ".menu .container"
  // ).render();

  // new MenuCard(
  //   "img/tabs/helthy.jpg",
  //   "vegy",
  //   "Menu Helthy",
  //   "The Fitness menu is a new approach to cooking: more fresh vegetables and fruits. A product for active and healthy people. This is a completely new product with the best price and high quality!",
  //   4,
  //   ".menu .container"
  // ).render();


  // new MenuCard(
  //   "img/tabs/good.jpg",
  //   "vegy",
  //   "Menu Fitness",
  //   "The Fitness menu is a new approach to cooking: more fresh vegetables and fruits. A product for active and healthy people. This is a completely new product with the best price and high quality!",
  //   3,
  //   ".menu .container"
  // ).render();

  // new MenuCard(
  //   "img/tabs/vegy.jpg",
  //   "vegy",
  //   "Menu Fitness",
  //   "The Fitness menu is a new approach to cooking: more fresh vegetables and fruits. A product for active and healthy people. This is a completely new product with the best price and high quality!",
  //   8,
  //   ".menu .container"
  // ).render();

  // new MenuCard(
  //   "img/tabs/good.jpg",
  //   "vegy",
  //   "Menu Fitness",
  //   "The Fitness menu is a new approach to cooking: more fresh vegetables and fruits. A product for active and healthy people. This is a completely new product with the best price and high quality!",
  //   4,
  //   ".menu .container"
  // ).render();

  // new MenuCard(
  //   "img/tabs/helthy.jpg",
  //   "vegy",
  //   "Menu Fitness",
  //   "The Fitness menu is a new approach to cooking: more fresh vegetables and fruits. A product for active and healthy people. This is a completely new product with the best price and high quality!",
  //   6,
  //   ".menu .container"
  // ).render();

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

  //modal logic start

  const modalTrigger = document.querySelectorAll("[data-modal]");
  const modal = document.querySelector(".modal");
  const modalCloseBtn = document.querySelector("[data-close]");

  modalTrigger.forEach(item => item.addEventListener("click", openModal));
  modalCloseBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    };
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.matches(".show")) {
      closeModal();
    };
  });

  // function showModalInScroll() {
  //   if (window.scrollY >= 1000) {
  //     openModal();
  //     window.removeEventListener("scroll", showModalInScroll);
  //   }
  //   if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
  //     openModal();
  //     window.removeEventListener("scroll", showModalInScroll);
  //   }
  // }

  // window.addEventListener("scroll", showModalInScroll);

  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
  };

  function closeModal() {
    modal.classList.remove("show");
    modal.classList.add("hide");
    document.body.removeAttribute("style");
  };

  // calculator settings

  const result = document.querySelector(".calculating__result span");
  let gender, height, weight, age, ratio;

  function startSettings(key, value, variable) {
    if (localStorage.getItem(key)) {
      variable = localStorage.getItem(key);
    } else {
      variable = value;
      localStorage.setItem(key, value);
    };
  };

  startSettings("gender", "female", gender);
  startSettings("ratio", 1.375, ratio);

  function calculateTotal() {
    if (!gender || !height || !weight || !age || !ratio) {
      result.textContent = "...";
      return;
    };
    if (gender === "female") {
      result.textContent = Math.round(((10 * weight) + (6.25 * height) - (5 * age) - 161) * ratio);
    } else if (gender === "male") {
      result.textContent = Math.round(((10 * weight) + (6.25 * height) - (5 * age) + 5) * ratio);
    } else {
      result.textContent = "_____";
    };
  };

  calculateTotal(); function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
      elem.classList.remove(activeClass);

      if (elem.getAttribute("id") === localStorage.getItem("gender")) {
        elem.classList.add(activeClass);
      }

      if (elem.dataset.ratio === localStorage.getItem("ratio")) {
        elem.classList.add(activeClass);
      }
    });
  }

  initLocalSettings("#gender div", "calculating__choose-item_active");
  initLocalSettings(".calculating__choose_big div", "calculating__choose-item_active");

  function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
      elem.addEventListener("click", (e) => {
        if (e.target.dataset.ratio) {
          ratio = parseFloat(e.target.dataset.ratio);
          localStorage.setItem("ratio", parseFloat(e.target.dataset.ratio));
        } else {
          gender = e.target.getAttribute("id");
          localStorage.setItem("gender", e.target.getAttribute("id"));
        }

        elements.forEach(elem => elem.classList.remove(activeClass));
        e.target.classList.add(activeClass);
        calculateTotal();
      });
    });
  }

  getStaticInformation("#gender div", "calculating__choose-item_active");
  getStaticInformation(".calculating__choose_big div", "calculating__choose-item_active");

  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);

    input.addEventListener("input", () => {
      const val = input.value;

      if (val.match(/\D/g)) {
        input.style.border = "1px solid red";

        const timerID = setTimeout(() => {
          input.value = "";
          input.removeAttribute("style");
          clearTimeout(timerID);
        }, 200);
      }

      switch (input.getAttribute("id")) {
        case "height":
          height = parseFloat(val);
          break;
        case "weight":
          weight = parseFloat(val);
          break;
        case "age":
          age = parseFloat(val);
          break;
      }

      calculateTotal();
    });
  }

  getDynamicInformation("#height");
  getDynamicInformation("#weight");
  getDynamicInformation("#age");

  //post request for server

  const forms = document.querySelectorAll("form");

  function spinner() {
    return `
			<?xml version="1.0" encoding="utf-8"?>
			<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="38px" height="38px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
			<g transform="rotate(0 50 50)">
				<rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#337ab7">
					<animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"></animate>
				</rect>
			</g><g transform="rotate(30 50 50)">
				<rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#337ab7">
					<animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"></animate>
				</rect>
			</g><g transform="rotate(60 50 50)">
				<rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#337ab7">
					<animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate>
				</rect>
			</g><g transform="rotate(90 50 50)">
				<rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#337ab7">
					<animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate>
				</rect>
			</g><g transform="rotate(120 50 50)">
				<rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#337ab7">
					<animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"></animate>
				</rect>
			</g><g transform="rotate(150 50 50)">
				<rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#337ab7">
					<animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate>
				</rect>
			</g><g transform="rotate(180 50 50)">
				<rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#337ab7">
					<animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"></animate>
				</rect>
			</g><g transform="rotate(210 50 50)">
				<rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#337ab7">
					<animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate>
				</rect>
			</g><g transform="rotate(240 50 50)">
				<rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#337ab7">
					<animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate>
				</rect>
			</g><g transform="rotate(270 50 50)">
				<rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#337ab7">
					<animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"></animate>
				</rect>
			</g><g transform="rotate(300 50 50)">
				<rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#337ab7">
					<animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"></animate>
				</rect>
			</g><g transform="rotate(330 50 50)">
				<rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#337ab7">
					<animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate>
				</rect>
			</g>
			<!-- [ldio] generated by https://loading.io/ --></svg>
		`;
  }

  const messages = {
    loading: spinner,
    success: "Thank you ! We will contact with you.",
    failure: "Sorry, but this moment something went wrong !"
  };

  forms.forEach(form => postData(form));

  async function asyncPostData (url, data) {
    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=utf-8"
      },
      body: data
    });

    if(!request.ok) {
      throw new Error()
    }

    return await request.json();
  };

  async function asyncGetData (url) {
      const request = await fetch(url);
      if(!request.ok) {
        throw new Error()
      };
      return await request.json();
  };

  function postData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const { loading, success, failure } = messages;

      const loader = document.createElement("div");
      loader.innerHTML = loading();
      form.append(loader);

      if (!navigator.onLine) {
        messagesModal(failure + ": Please check your internet connection and try again.")
        loader.remove();
        form.reset();
      }

      const formData = new FormData(form);
      const data = JSON.stringify(Object.fromEntries(formData.entries()));

     
      asyncPostData("http://localhost:8888/requests", data)
        .then(() => {
          messagesModal(success);
        })
        .catch(error => {
          messagesModal(failure + ":" + error)
        })
        .finally(() => {
          loader.remove();
          form.reset();
        });



      // request.addEventListener("load", () => {
      // 	if (request.status === 200) {
      // 		console.log(request.response);
      // 		messagesModal(success);
      // 		loader.remove();
      // 		form.reset();
      // 	} else {
      // 		messagesModal(failure);
      // 		loader.remove();
      // 		form.reset();
      // 	}
      // });
    });
  };

  function messagesModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");
    prevModalDialog.classList.add("hide");
    openModal();

    const messageModal = document.createElement("div");
    messageModal.classList.add("modal__dialog");
    messageModal.innerHTML = `
			<div class="modal__content">
				<div data-close class="modal__close">&times;</div>
				<div class="modal__title">${message}</div>
			</div>
		`;

    document.querySelector(".modal").append(messageModal);

    setTimeout(() => {
      messageModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal();
    }, 2000);
  };


 

});