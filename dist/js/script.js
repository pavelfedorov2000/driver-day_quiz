$(function () {

    //const burgerBtn = document.querySelector('.burger-btn');
    //const burgerClose = document.querySelector('.burger-menu__close-btn');
    //const burgerMenu = document.querySelector('.burger-btn');

    if ($(window).width() > 992) {
        new WOW().init();
    }

    // Menu
    $('.burger-btn').on('click', function () {
        $('.burger-menu').addClass('burger-menu--active');
        $('body').addClass('_lock');
    });

    $('.burger-menu__close-btn').on('click', function () {
        $('.burger-menu').removeClass('burger-menu--active');
        $('body').removeClass('_lock');
    });

    $('.header__menu-link').on('click', function () {
        $('.burger-menu').removeClass('burger-menu--active');
        $('body').removeClass('_lock');
    });

    // Popups
    $('.register-btn').on('click', function () {
        $('.overlay').fadeIn('slow');
        $('#register-popup').fadeIn('slow');
        $('.burger-menu').removeClass('burger-menu--active');
        $('body').addClass('_lock');
    });
    $('.enter-link').on('click', function () {
        $('#register-popup').fadeOut('slow');
        $('#thanks').fadeOut('slow');
        $('#enter-popup').fadeIn('slow');
    });

    $('.enter-btn').on('click', function () {
        $('.overlay').fadeIn('slow');
        $('#enter-popup').fadeIn('slow');
        $('.burger-menu').removeClass('burger-menu--active');
        $('body').addClass('_lock');
    });
    $('.register-link').on('click', function () {
        $('#enter-popup').fadeOut('slow');
        $('#register-popup').fadeIn('slow');
    });

    $('.popup__close').on('click', function () {
        $('.overlay').fadeOut('slow');
        $('.popup').fadeOut('slow');
        $('body').removeClass('_lock');
    });
    // Закрытие по клику на документ (кроме самого попапа)
    $(document).on('mouseup', function (e) {
        let popup = $('.popup');
        if (!popup.is(e.target) && popup.has(e.target).length === 0) {
            $('.overlay').fadeOut('slow');
            $('.popup').fadeOut('slow');
            $('body').removeClass('_lock');
        }
    });

    $('.enter-popup form').submit(function (e) {
        e.preventDefault();
        $(this).find('input').val('');
        $(this).parent().parent().fadeOut('slow');
        $('.overlay').fadeOut('slow');
        $('body').removeClass('_lock');
    });
    
    $('.register-popup form').submit(function (e) {
        e.preventDefault();
        $(this).find('input').val('');
        $(this).parent().parent().fadeOut('slow');
        $('#thanks').fadeIn('slow');
    });
        
    // Winners slider
    const topWinnersSlider = new Swiper('.top-winners__slider', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 20,
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

    // Custom select
    let selectItem = document.querySelector('.select');
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
    }


    // Данные о викторине
    //const quizStartDate = newDate('2021-10-15');
    let quizResultsDate = '2021-10-10';

    // Ф-ция оставшегося времени
    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()), // Разница между датой дедлайна и текущей датой (в мс)
            seconds = Math.floor((t / 1000) % 60), // переводим мс в с и находим количество с, не хватающих до целой минуты (1-59 с)
            minutes = Math.floor((t / 1000 / 60) % 60), // количество минут, не хватающих до целого часа
            hours = Math.floor((t / 1000 / 60 / 60) % 24); // кол-во часов, не хватающих до суток
            //days = Math.floor((t / (1000 * 60 * 60 * 24)));

        // Объект
        return obj = {
            'total': t,
            //'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        };
    }

    // A-ция запуска таймера (id - место где будет таймер на странице, endtime - дедлайн)
    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            //days = timer.querySelector('.days'),
            hoursText = timer.querySelector('#hours'),
            minutesText = timer.querySelector('#minutes'),
            secondsText = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000); // Каждую секунду будет запускаться ф-ция updateClock

        // Делаем верстку динамической
        function updateClock() {
            let t = getTimeRemaining(endtime);
            if (obj.hours <= 9) {
                hoursText.textContent = `0${t.hours.toString()}`;
            } else {
                hoursText.textContent = t.hours.toString();
            }
            if (obj.minutes <= 9) {
                minutesText.textContent = `0${t.minutes.toString()}`;
            } else {
                minutesText.textContent = t.minutes.toString();
            }
            if (obj.seconds <= 9) {
                secondsText.textContent = `0${t.seconds.toString()}`;
            } else {
                secondsText.textContent = t.seconds.toString();
            }
        }
    }
    // Запускаем ф-wb. с аргументами
    setClock('timer', quizResultsDate);

    // Логика вопросов квиза
    let currentQuestion = 0;
    const quizLength = 10;
    let currentQuestionText = document.querySelector('#current-question');
    let quizLengthText = document.querySelector('.quiz-length');
    currentQuestionText.textContent = currentQuestion + 1;
    quizLengthText.textContent = quizLength;
    const questions = document.querySelectorAll('.quiz-question');
    console.log(questions);
    const backBtn = document.querySelector('#back-btn');
    const nextBtn = document.querySelector('#next-btn');
    backBtn.onclick = () => prevStep(1);
    nextBtn.onclick = () => nextStep(1);
    showQuestion(currentQuestion);
    let questionRadioInputs = document.querySelectorAll('input[type="radio"]');

    questionRadioInputs.forEach(radioInput => {
        radioInput.addEventListener('change', () => {
            if (radioInput.checked) {
                nextBtn.classList.remove('disabled');
            } else {
                nextBtn.classList.add('disabled');
            }
        });
    });
    
    const lastQuestionRadioInputs = document.querySelectorAll('input[name="question_10-answer"]');
    lastQuestionRadioInputs.forEach(question => {
        question.addEventListener('change', () => {
            $('.quiz').remove();
            $('.results').remove();
            $('.footer').remove();
            $('.quiz-result').fadeIn('300'); 
        });
    });

    function showQuestion(n) {
        if (n <= quizLength - 1) {
            questions[n].style.display = "block";
            //questions[n].style.transform = "translateX(0%)";
        }
        if (n == 0) {
            backBtn.style.display = "none";
        } else {
            backBtn.style.display = "block";
        }
        if (n == quizLength - 1) {
            nextBtn.style.display = "none";
            //nextBtn.textContent = "Отправить ответы";
        } else {
            nextBtn.style.display = "block";
            //nextBtn.textContent = "Следующий вопрос";
        }
    }

    function nextStep(n) {
        if (n <= quizLength - 1 && !nextBtn.matches('.disabled')) {
            questions[currentQuestion].style.display = "none";
            //questions[currentQuestion].style.transform = "translateX(-500%)";
            currentQuestion = +currentQuestion + n;
            console.log(currentQuestion);
        }
        currentQuestionText.textContent = currentQuestion + 1;
        showQuestion(currentQuestion);
    }

    function prevStep(n) {
        questions[currentQuestion].style.display = "none";
        //questions[currentQuestion].style.transform = "translateX(-500%)";
        currentQuestion = currentQuestion - n;
        currentQuestionText.textContent = currentQuestion + 1;
        showQuestion(currentQuestion);
    }

    $('.tab').on('click', function (e) {
    e.preventDefault();
    if ($(window).width() < 992) {
        //$($(this).siblings()).removeClass('tab--active');
        //$('.tabs-content').slideUp('300');
        $(this).toggleClass('tab--active');
        $($(this).attr('href')).slideToggle('300');
    } else {
        $($(this).parent().siblings().find('a.tab')).removeClass('tab--active');
        $('.tabs-content').removeClass('tabs-content--active');
        $(this).addClass('tab--active');
        $($(this).attr('href')).addClass('tabs-content--active');
    }
});

    $("a[href^='#']").not('.tab').click(function () {
    const href = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(href).offset().top + "px" });
    return false;
});

    function DynamicAdapt(type) {
    this.type = type;
}

DynamicAdapt.prototype.init = function () {
    const _this = this;
    // массив объектов
    this.оbjects = [];
    this.daClassname = "_dynamic_adapt_";
    // массив DOM-элементов
    this.nodes = document.querySelectorAll("[data-da]");

    // наполнение оbjects объктами
    for (let i = 0; i < this.nodes.length; i++) {
        const node = this.nodes[i];
        const data = node.dataset.da.trim();
        const dataArray = data.split(",");
        const оbject = {};
        оbject.element = node;
        оbject.parent = node.parentNode;
        оbject.destination = document.querySelector(dataArray[0].trim());
        оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
        оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
        оbject.index = this.indexInParent(оbject.parent, оbject.element);
        this.оbjects.push(оbject);
    }

    this.arraySort(this.оbjects);

    // массив уникальных медиа-запросов
    this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
        return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
    }, this);
    this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
        return Array.prototype.indexOf.call(self, item) === index;
    });

    // навешивание слушателя на медиа-запрос
    // и вызов обработчика при первом запуске
    for (let i = 0; i < this.mediaQueries.length; i++) {
        const media = this.mediaQueries[i];
        const mediaSplit = String.prototype.split.call(media, ',');
        const matchMedia = window.matchMedia(mediaSplit[0]);
        const mediaBreakpoint = mediaSplit[1];

        // массив объектов с подходящим брейкпоинтом
        const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
            return item.breakpoint === mediaBreakpoint;
        });
        matchMedia.addListener(function () {
            _this.mediaHandler(matchMedia, оbjectsFilter);
        });
        this.mediaHandler(matchMedia, оbjectsFilter);
    }
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
    if (matchMedia.matches) {
        for (let i = 0; i < оbjects.length; i++) {
            const оbject = оbjects[i];
            оbject.index = this.indexInParent(оbject.parent, оbject.element);
            this.moveTo(оbject.place, оbject.element, оbject.destination);
        }
    } else {
        for (let i = 0; i < оbjects.length; i++) {
            const оbject = оbjects[i];
            if (оbject.element.classList.contains(this.daClassname)) {
                this.moveBack(оbject.parent, оbject.element, оbject.index);
            }
        }
    }
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
    element.classList.add(this.daClassname);
    if (place === 'last' || place >= destination.children.length) {
        destination.insertAdjacentElement('beforeend', element);
        return;
    }
    if (place === 'first') {
        destination.insertAdjacentElement('afterbegin', element);
        return;
    }
    destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
    element.classList.remove(this.daClassname);
    if (parent.children[index] !== undefined) {
        parent.children[index].insertAdjacentElement('beforebegin', element);
    } else {
        parent.insertAdjacentElement('beforeend', element);
    }
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
    const array = Array.prototype.slice.call(parent.children);
    return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
    if (this.type === "min") {
        Array.prototype.sort.call(arr, function (a, b) {
            if (a.breakpoint === b.breakpoint) {
                if (a.place === b.place) {
                    return 0;
                }

                if (a.place === "first" || b.place === "last") {
                    return -1;
                }

                if (a.place === "last" || b.place === "first") {
                    return 1;
                }

                return a.place - b.place;
            }

            return a.breakpoint - b.breakpoint;
        });
    } else {
        Array.prototype.sort.call(arr, function (a, b) {
            if (a.breakpoint === b.breakpoint) {
                if (a.place === b.place) {
                    return 0;
                }

                if (a.place === "first" || b.place === "last") {
                    return 1;
                }

                if (a.place === "last" || b.place === "first") {
                    return -1;
                }

                return b.place - a.place;
            }

            return b.breakpoint - a.breakpoint;
        });
        return;
    }
};

const da = new DynamicAdapt("max");
da.init();
});



