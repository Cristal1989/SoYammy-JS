(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-modal-open-logout]'),
    closeModalBtn: document.querySelector('[data-modal-close-logout]'),
    modal: document.querySelector('[data-modal-logout]'),
  };

  refs.openModalBtn.addEventListener('click', toggleModalLogout);
  refs.closeModalBtn.addEventListener('click', toggleModalLogout);

  function toggleModalLogout() {
    refs.modal.classList.toggle('is-hidden');
  }
})();
