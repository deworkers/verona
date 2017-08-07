$(document).ready(function() {
    

    var scrollTo = function(pos) {
        var pos;
        $('html,body').animate({scrollTop:pos}, 1000);
        return false;
    }

    $('.j-scroll-to').click(function(event) {
        event.preventDefault(); 
        var div = $(this).attr('href');
        var toPos = $(div).offset().top;
        scrollTo(toPos);
    });

    /*Модальные окна*/
    var overlay = $('#overlay'); 
    var open_modal = $('.open-modal'); 
    var close = $('.modal__close'); 
    var modal = $('.modal'); 

    // для открытия модалки нужна ссылка вида <a href="#name"></a> и класс "open_modal"
    // будет открыта модалка с id="name"
    open_modal.click( function(event){
        modal.fadeOut(200);
        event.preventDefault(); 
        var div = $(this).attr('href'); 
        overlay.fadeIn(400);
        $(div).fadeIn(400);
        $('html, body').addClass('j-noScroll');
        baseBoxHeight = $('.mobile-menu__right').height();
    });

    close.click(function() {
        modal.fadeOut(200);
        overlay.fadeOut(200);
        $('html, body').removeClass('j-noScroll');
    });

    overlay.click(function(event) {
        if ( $( event.target ).attr('id') == 'overlay' ) {
            $(this).fadeOut(200);
            modal.fadeOut(200);
            $('html, body').removeClass('j-noScroll');
        }
    });

    /*селект*/
    $('.select').click(function(e) {
        if ( !$(this).hasClass('j-open') ) {
            e.stopPropagation();
            $(this).addClass('j-open');
            $('.select-list').hide();
            $('.select').not(this).removeClass('j-open');
            $(this).find('.select-list').slideDown(200);
        } else {
            $(this).find('.select-list').slideUp(200);
            $(this).removeClass('j-open');
        }
    });


    // подстановка значения по умолчанию
    $('.select').each(function() {
        var val = $(this).find('.select-default').text();
        $(this).find('.select-default').addClass('selected');
        console.log(val);
        $(this).find('input').val(val);
    })

    $('body').click(function() {
        $('.select-list').slideUp(200);
        $('.select').removeClass('j-open');
    });

    $('.select-list__one').click(function(e) {
        e.stopPropagation();
        var val = $(this).text();
        $('.select').removeClass('j-open');
        $(this).parents('.select').find('input').val(val);
        $(this).parents('.select').find('.select-list').slideUp(200);
        $(this).parents('.select-list').find('.select-list__one').removeClass('selected');
        $(this).addClass('selected');
    });


    
    var topSlider = new Swiper('.slider-main', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        effect: 'fade',
        speed: 500
    }); 

    var cardSlider = new Swiper('.card-gallery', {
        hashnav: true,
        hashnavWatchState: true,
        paginationClickable: true
    }); 

    var sliderCarusel = new Swiper('.gallery-list', {
        slidesPerView: 5,
        spaceBetween: 5,
    });

    var sertSlider = new Swiper('.sert-slider', {
        slidesPerView: 3,
        spaceBetween: 10,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        breakpoints: {
            480: {
              slidesPerView: 1,
              spaceBetween: 20
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30
            }
        }
    });

    $('.carusel-one').on('click', function() {
        $('.carusel-one').removeClass('active');
        $(this).addClass('active');
    });

    $('.sert-slider .swiper-slide, .review__img').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        closeBtnInside: false,
        fixedContentPos: true,
        mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
        image: {
            verticalFit: true
        }
    });

    $('.review__more').on('click', function() {
        $(this).hide().next().slideDown()
    });

    $('.review__hide').on('click', function() {
        $(this).parent('.review__hidden').slideUp().prev().show();
    });

    $("#order").validate({
        rules:{
            name:{
                required: true
            },
            phone:{
                required: true,
            },
        },
        messages:{
            name:{
                required: "Это поле обязательно для заполнения",
            },
            phone:{
                required: "Это поле обязательно для заполнения",
            },
        },
        submitHandler: function() {
            $('.form-order').html('<h2>Ваше сообщение отправлено</h2><p>Наш менеджер свяжется с вами в бижайшее время</p>')
        }

    });

    $("#order").submit(function() { //устанавливаем событие отправки для формы с id=form
        var formData = $(this).serialize(); //собераем все данные из формы
        $.ajax({
            type: "POST", //Метод отправки
            url: "/ajax/send.php", //путь до php фаила отправителя
            data: formData
        });
    });

    $("#order-form").validate({
        rules:{
            name:{
                required: true
            },
            phone:{
                required: true,
            },
        },
        messages:{
            name:{
                required: "Это поле обязательно для заполнения",
            },
            phone:{
                required: "Это поле обязательно для заполнения",
            },
        },
        submitHandler: function() {
            $('.form-order').html('<h2>Ваше сообщение отправлено</h2><p>Наш менеджер свяжется с вами в бижайшее время</p>')
        }
    });

    $("#review").validate({
        rules:{
            name:{
                required: true
            },
            text:{
                required: true,
            },
        },
        messages:{
            name:{
                required: "Это поле обязательно для заполнения",
            },
            text:{
                required: "Это поле обязательно для заполнения",
            },
        },
        submitHandler: function() {
            $('.form-order').html('<h2>Спасибо за ваш отзыв</h2>')
        }
    });



    $("#review").submit(function() { //устанавливаем событие отправки для формы с id=form
        var formData = $(this).serialize(); //собераем все данные из формы
        $.ajax({
            type: "POST", //Метод отправки
            url: "/ajax/send.php", //путь до php фаила отправителя
            data: formData
        });
    });

    $("#order-form").submit(function() { //устанавливаем событие отправки для формы с id=form
        var formData = $(this).serialize(); //собераем все данные из формы
        $.ajax({
            type: "POST", //Метод отправки
            url: "/ajax/send.php", //путь до php фаила отправителя
            data: formData
        });
    });

    $('.vacancy-title').on('click', function() {
        $(this).next('.vacancy-hidden').slideToggle();
        $(this).toggleClass('open');
    });

    var clear = function() {
        if  ( $('.card-gallery .swiper-slide').length == 0 ) {
            $('.card-left').hide();
        }
    }

    clear();

    
});