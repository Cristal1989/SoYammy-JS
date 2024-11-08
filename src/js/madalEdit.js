(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-modal-open-edit]'),
    closeModalBtn: document.querySelector('[data-modal-close-edit]'),
    modal: document.querySelector('[data-modal-edit]'),
  };

  refs.openModalBtn.addEventListener('click', toggleModalEdit);
  refs.closeModalBtn.addEventListener('click', toggleModalEdit);

  function toggleModalEdit() {
    refs.modal.classList.toggle('is-hidden');
  }
})();
