$(function () {

    //const burgerBtn = document.querySelector('.burger-btn');
    //const burgerClose = document.querySelector('.burger-menu__close-btn');
    //const burgerMenu = document.querySelector('.burger-btn');

    $('.burger-btn').on('click', function () {
        $('.burger-menu').addClass('burger-menu--active');
        $('body').addClass('_lock');
    });

    $('.burger-menu__close-btn').on('click', function () {
        $('.burger-menu').removeClass('burger-menu--active');
        $('body').removeClass('_lock');
    });

    $('.header__menu-item').on('click', function () {
        $('.burger-menu').removeClass('burger-menu--active');
        $('body').removeClass('_lock');
    });
        
    const topWinnersSlider = new Swiper('.top-winners__slider', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 20,
        /* pagination: {
            el: '.swiper-pagination',
            clickable: true,
        }, */
        navigation: {
            nextEl: '.swiper-button-prev',
            prevEl: '.swiper-button-next',
        },
        breakpoints: {
            576: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 4,
            },
        }
    });

    // Логика вопросов квиза
    let currentQuestion = 0;

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

    @@include('tabs.js')

    @@include('scroll.js')

    @@include('dinamic-adapt.js')
});



