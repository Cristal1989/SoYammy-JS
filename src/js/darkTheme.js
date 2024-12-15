const currentTheme = 'dark__theme';
const btnTheme = document.querySelector('#light__theme-btn');

const toggleEl = document.querySelectorAll(
  '.nav__link, #light__theme-btn, body, .header, .hero__dish, .hero__leaf, .toggle__burger, .btn, .hero__title, .hero__info, .menu__btn-menu, .iconuser__start, .username__link, .breakfast__title, .breakfast__text, .breakfast__link, .btn__other, .footer, .sicial__footer-link, .team__social--link, .subscribe__footer-input, .subscribe__footer-btn, .categorise__title, .alldishes__link, .svg__nav, .resipe__title, .form__addresipe-itemtitle, .form__addresipe-about, .categories__select-text, #select__categories, #select__time, .resipe__follow-populartext, .resipe__follow-socialtext, .popular__item-title, .popular__item-subtitle, .form__engridients-titletext, .form__engridients-input, .form__engridients-subtitle, .form__engridients-x, .form__engridients-select, .form__engridients-weight, .form__engridients-button, .resipe__praparation-text, .resipe__praparation-input, .resipe__praparation-btn, .form__addresipe-plus, .social__addresipe, .favorites__title, .favorites__subtitle-text, .favorites__subtitle-textresipe, .favorites__subtitle-time, .favorites__btn, .favorites__numbers-item, .favorites__numbers-link, .nav__link-myresipe, .myresipe__btn, .preparation__title, .preparation__text, .favorites__items, .favorites__numbers, .table__ingridients-item, .table__ingridients-name, .table__ingridients-custom, .shoping__remove, .searh__text, .errorpage__title, .errorpage__subtitle, .menu-container, .nav__link-burger, .menu__btn--icon'
);

function changeTheme() {
  toggleEl.forEach(elem => elem.classList.toggle(currentTheme));
}
