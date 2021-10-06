$(function () {

    //const burgerBtn = document.querySelector('.burger-btn');
    //const burgerClose = document.querySelector('.burger-menu__close-btn');
    //const burgerMenu = document.querySelector('.burger-btn');

    $('.burger-btn').on('click', function () {
        $('.burger-btn').addClass('burger-btn--active');
        $('.burger-menu').addClass('burger-menu--active');
    });

    $('.burger-menu__close-btn').on('click', function () {
        $('.burger-btn').removeClass('burger-btn--active');
        $('.burger-menu').removeClass('burger-menu--active');
    });

    $('.header__menu-link').on('click', function () {
        $('.burger-menu').removeClass('burger-menu--active');
    });

    @@include('tabs.js')

    @@include('scroll.js')

    @@include('dinamic-adapt.js')

    // Custom select
    /* let selectItem = document.querySelector('.select');
    let selectTitle = selectItem.querySelector('.select__title');
    let selectLabels = selectItem.querySelectorAll('.select__label');
    // Toggle menu
    selectTitle.addEventListener('click', () => {
        if ('active' === selectItem.getAttribute('data-state')) {
            selectItem.setAttribute('data-state', '');
        } else {
            selectItem.setAttribute('data-state', 'active');
        }
    });
    // Close when click to option
    for (let i = 0; i < selectLabels.length; i++) {
        selectLabels[i].addEventListener('click', (e) => {
            selectTitle.textContent = e.target.textContent;
            selectItem.setAttribute('data-state', '');
        });
    } */
});



