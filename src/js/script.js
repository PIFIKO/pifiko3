$(document).ready(function(){
    $('.corousel__inner').slick({
        speed: 1200,
        // adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="../icons/chevron-left-solid.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="../icons/chevron-right-solid.svg"></button>',
        responsive:[
            {
                breakpoint: 992,
                settings: {
                  dots: true,
                  arrows: false
                }
                
            }
            
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__coneten').removeClass('catalog__coneten_active').eq($(this).index()).addClass('catalog__coneten_active');
      });
    //   $('.catalog-item__link').each(function(i){
    //       $(this).on('click',function(e){
    //           e.preventDefault();
    //           $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
    //           $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    //       });
    //   });
    //   $('.catalog-item__back').each(function(i){
    //     $(this).on('click',function(e){
    //         e.preventDefault();
    //         $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
    //         $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    //     });
    // });

    function toggleClass(item){
        $(item).each(function(i){
            $(this).on('click',function(e){
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            });
        });
    }
    toggleClass('.catalog-item__link');
    toggleClass('.catalog-item__back');

    //modal
    $('[data-modal="consultation"]').on('click',function(){
        $('.overlay,#consultation').fadeIn('slow');
    });
    $('.modal__close').on('click',function(){
        $('.overlay, #consultation, #order, #thencks').fadeOut('slow');
    });
    $('.button_mini').on('click' ,function(){
        $('.overlay,#order').fadeIn('slow');
    });
    $('.button_mini').each(function(i){
        $(this).on('click',function(){
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay,#order').fadeIn('slow');
        });
    });
    function validateForms(form){
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                  },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                  required: "Пожалуйста, введите свою почту",
                  email: "Неправильно введен адрес почты"
                }
            }
        });
    };

    validateForms('#addInfo');
    validateForms('#consultation form');
    validateForms('#order form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    $('form').submit(function(e){
        e.preventDefault();
        // if(!$(this).valid()){
        //     return;
        // }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function(){
            $(this).find("input").val("");
            $('#consultation form , #order form').fadeOut();
            $('.overlay,#thencks').fadeIn('slow');
            $('form').trigger('reset');
        });
        return false;
    });
    
});