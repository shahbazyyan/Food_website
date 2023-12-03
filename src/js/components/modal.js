function openModal(modal, modalTimerId) {
	modal.classList.add("show");
	modal.classList.remove("hide");
	document.body.style.overflow = "hidden";
	// clearTimeout(modalTimerId);
}

function closeModal(modal) {
	modal.classList.remove("show");
	modal.classList.add("hide");
	document.body.removeAttribute("style");
}

function modalModule() {
	const modalTrigger = document.querySelectorAll("[data-modal]");
	const modal = document.querySelector(".modal");

	modalTrigger.forEach(btn => btn.addEventListener("click", () => openModal(modal)));

	modal.addEventListener("click", (e) => {
		if (e.target === modal || e.target.getAttribute("data-close") == "") {
			closeModal(modal);
		}
	});

	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && modal.matches(".show")) {
			closeModal(modal);
		}
	});

	// const modalTimerId = setTimeout(() => openModal(modal, modalTimerId), 600000);

	function showModalByScroll() {
		if (window.scrollY >= 1000) {
			openModal(modal);
			window.removeEventListener("scroll", showModalByScroll);
		}
		// if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
		// 	openModal(modal);
		// 	window.removeEventListener("scroll", showModalByScroll);
		// }
	}

	window.addEventListener("scroll", showModalByScroll);
}

// module.exports = modalModule;
export { openModal, closeModal };
export default modalModule;