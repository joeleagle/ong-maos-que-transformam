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
