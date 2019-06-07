import Swiper from 'swiper';
// import $ from 'jquery';
// import TweenMax from 'gsap/TweenMax';

var watchSwiper = new Swiper('.swiper-container', {
    loop: true,
    autoHeight: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    pagination: {
        el: '.watch-pager',
        type: 'bullets',
        clickable: true
    }
});

export default function() {
    watchSwiper.on('slideChangeTransitionStart', function() {
        console.log(1);
    });
}
