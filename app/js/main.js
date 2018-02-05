$(document).ready(function () {
   $('.slider').slick();
});










$(function() {
    $(".dev-des-box__btn").bind('touchend click',function(event){
        event.preventDefault();
        var boxTarget = '.dev-des-box__' + $(this).attr('data-target');
        $('.dev-des-box__tab').removeClass('active');
        $(boxTarget).addClass('active');
    });

    $(".ddb-open-popup").on('click touchend',function(event){

        var boxTarget = '#' + $(this).attr('data-popup');
        $(boxTarget).addClass('active-pop');
    });
    $(".ddb-close-popup").on('click touchend',function(event){

        var boxTarget = '#' + $(this).attr('data-popup');
        $(boxTarget).removeClass('active-pop');
    });
});