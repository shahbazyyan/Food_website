function menuCardModule() { 
	class MenuCard {
		constructor(img, alt, title, descr, price, parentSelector) {
			this.img = img;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.parent = document.querySelector(parentSelector);
			this.transfer = 0.95;
			this.changeToEur();
		};

	changeToEur() {
		this.price = this.price * this.transfer;
	};

		render() {
			const { img, alt, title, descr, price, parent } = this;
			const element = document.createElement("div");
			element.classList.add("menu__item");
			element.innerHTML = `
	<img src=${img} alt=${alt}>
	<h3 class="menu__item-subtitle">${title}</h3>
	<div class="menu__item-descr">${descr}</div>
	<div class="menu__item-divider"></div>
	<div class="menu__item-price">
		<div class="menu__item-cost">Price:</div>
		<div class="menu__item-total"><span>${price.toFixed(1)}</span> EUR/day</div>
	</div>
			`;

			parent.append(element);
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


	// getData("http://localhost:8888/menu")
	// 	.then(data => data.forEach(({ img, altimg, title, descr, price }) => {
	// 		new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
	// 	}));

	// getData("http://localhost:8888/menu")
	// 	.then(data => createMenuCards(data));

	// axios.get("http://localhost:8888/menu")
	// 	.then(request => createMenuCards(request.data));

	// function createMenuCards(data) {
	// 	data.forEach(({ img, altimg, title, descr, price }) => {
	// 		const element = document.createElement("div");
	// 		element.classList.add("menu__item");
	// 		const transfer = 0.95;

	// 		function changeToEur() {
	// 			price = (parseFloat(price) * parseFloat(transfer)).toFixed(2);
	// 		};

	// 		changeToEur();

	// 		element.innerHTML = `
	// 			<img src=${img} alt=${altimg}>
	// 			<h3 class="menu__item-subtitle">${title}</h3>
	// 			<div class="menu__item-descr">${descr}</div>
	// 			<div class="menu__item-divider"></div>
	// 			<div class="menu__item-price">
	// 				<div class="menu__item-cost">Price:</div>
	// 				<div class="menu__item-total"><span>${price}</span> EUR/day </div>
	// 			</div>
	// 		`;
	// 		document.querySelector(".menu .container").append(element);
	// 	});
	// }
}

// module.exports = menuCardModule;
export default menuCardModule;