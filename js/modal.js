export function initializeModal() {
    const dialog = document.querySelector("#feedback-modal");

    if (!dialog || !(dialog instanceof HTMLDialogElement)) {
        return;
    }

    const openButton = document.querySelector("[data-modal-open]");

    if (openButton) {
        openButton.setAttribute("aria-expanded", dialog.hasAttribute("open") ? "true" : "false");
    }
}

export function handleModalClick(event) {
    const trigger = event.target.closest('[data-modal-open]');
    if (trigger) {
        const dialog = document.querySelector('#feedback-modal');
        if (dialog && typeof dialog.showModal === 'function') {
            dialog.showModal();
        }
        return;
    }

    const closer = event.target.closest('[data-modal-close]');
    if (closer) {
        const dialog = document.querySelector('#feedback-modal');
        if (dialog && typeof dialog.close === 'function') {
            dialog.close();
        }
    }
}
