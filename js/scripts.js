function showModal(openButton) {
	const selector = openButton.dataset.morphModal;

	if ((selector ?? "") === "") return false;

	const modal = document.querySelector(selector);

	if ((modal ?? "") === "") return false;

	const overlay = document.getElementById("morph-modal-overlay");
	const closeButton = modal.querySelector(".morph-modal-close-btn");
	const scrollableElement = document.getElementsByTagName('html')[0];
	const oldOverflowY = scrollableElement.style.overflowY;
	const DEFAULT_STYLE = "fullscreen";
	const newStyle = modal.dataset.style || DEFAULT_STYLE;

	function hideModal() {
		// Enable the button again.
		openButton.style.removeProperty("disabled");

		// Hide and reset the modal.
		modal.classList.remove("show", "shown", newStyle);
		for (const property in modal.style) modal.style.removeProperty(property);

		//Hide the overlay.
		overlay?.classList.remove("show");

		// Enable window scroll again.
		scrollableElement.style.overflowY = oldOverflowY;
	}

	// Making the close button or overlay click event, hide the modal.
	closeButton.addEventListener("click", hideModal, { once: true });
	overlay.addEventListener("click", hideModal, { once: true });

	// Disable the button.
	openButton.style.disabled = "disabled";

	// Show the overlay.
	overlay?.classList.add("show");

	// Placing the modal where the button is.
	const elementPos = openButton.getBoundingClientRect();
	const startingPointStyle = {
		left: `${elementPos.left}px`,
		top: `${elementPos.top}px`,
		right: `${window.innerWidth - elementPos.left - elementPos.width}px`,
		bottom: `${window.innerHeight - elementPos.top - elementPos.height}px`,
	};
	for (const property in startingPointStyle) modal.style[property] = startingPointStyle[property];

	// Show the modal.
	modal.classList.add("show");

	// When css transition, in .morph-modal.show css class, finishes.
	modal.addEventListener("transitionend", function () {
		// Show body and close button.
		modal.classList.add("shown");

		// Disabling the window scroll.
		scrollableElement.style.overflowY = "hidden";
	}, { once: true, capture: false }, false);

	// Force the browser to redraw so that css transition in .morph-modal.show can work.
	modal.getBoundingClientRect();

	// Placing the modal in its desired position.
	modal.classList.add(newStyle);
};
