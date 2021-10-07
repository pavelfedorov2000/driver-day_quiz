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