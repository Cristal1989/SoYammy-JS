function changeTheme() {
  const toggleEl = document.querySelectorAll(
    '.nav__link, #light__theme-btn, body, .header, .hero__dish, .hero__leaf, .toggle__burger, .btn, .hero__title, .hero__info, .menu__btn-menu, .iconuser__start, .username__link, .breakfast__title, .breakfast__text, .breakfast__link, .btn__other, .footer, .sicial__footer-link, .team__social--link, .subscribe__footer-input, .subscribe__footer-btn'
  );
  console.log(toggleEl);
  toggleEl.forEach(elem => elem.classList.toggle('dark__theme'));
}
