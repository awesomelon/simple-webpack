import { changeNav } from './main';
import slideCount from './counting';
import { closeMenu } from './clickEvents';
import { TweenMax } from 'gsap';
import $ from 'jquery';

export let mySwiper = new Swiper('.swiper-container', {
    loop: true,
    hashNavigation: {
        replaceState: true,
        watchState: true
    },
    touchRatio: 0.9,
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
    }
});

export let mySwiperSub3Nav = new Swiper('.swiper-container-sub3Nav', {
    width: 540,
    spaceBetween: -350
});

export let mySwiperSub4Nav = new Swiper('.swiper-container-sub4Nav', {
    width: 540,
    spaceBetween: -370
});

let subNavMove = (index, ele, startNum) => {
    let naviImg = document.querySelectorAll(ele);
    for (let i = 0, len = naviImg.length; i < len; i++) {
        naviImg[i].classList.remove('on');
    }
    naviImg[index - startNum].classList.add('on');
    ele == '.fashion'
        ? mySwiperSub3Nav.slideTo(index - startNum)
        : mySwiperSub4Nav.slideTo(index - startNum);
};

let subNavOnClick = (el, startNum) => {
    let els = document.querySelectorAll(el);
    [].forEach.call(els, function(navs, index) {
        navs.addEventListener('click', function() {
            // console.log(index);
            mySwiper.slideTo(index + startNum);
        });
    });
};

export let slideChangeStart = () => {
    let index = mySwiper.realIndex + 1,
        hashStr = document
            .querySelector('.swiper-container  .swiper-slide-active')
            .getAttribute('data-hash'),
        hashNumber = hashStr.substr(3, 1);

    if (hashNumber === '3')
        subNavMove(index, '.fashion', $(document.querySelector("[data-hash='sub3']")).index());
    if (hashNumber === '4')
        subNavMove(index, '.food', $(document.querySelector("[data-hash='sub4']")).index());

    changeNav();
};

export let NavBindClick = () => {
    subNavOnClick('.fashion', $(document.querySelector("[data-hash='sub3']")).index());
    subNavOnClick('.food', $(document.querySelector("[data-hash='sub4']")).index());
};

let slideMove = () => closeMenu();

let analytics = () => {};

let eventActiveHt = activeHt => TweenMax.to('.swiper-container', 0.2, { height: activeHt });

let activeHeightSet = () => {
    let activeHt = $('.swiper-slide-active > .sub_content').height();
    eventActiveHt(activeHt);
};

let scrollUp = () => TweenMax.to('body, html', 0.2, { scrollTop: 0 });

let slideMoveEnd = () => {
    activeHeightSet();
    scrollUp();
    analytics();
};

export let slideChangeEndEv = () => {
    // 카운팅을 위한 part title 값 설정
    let index = mySwiper.realIndex + 1;
    // 슬라이드 카운팅
    let title = $('.swiper-container > .swiper-wrapper > .swiper-slide-active').attr('data-name');
    slideCount(index, title);
    slideMoveEnd();
};

mySwiper.on('slideChange', slideMove);
mySwiper.on('slideChangeTransitionEnd', slideChangeEndEv);
mySwiper.on('slideChangeTransitionStart', slideChangeStart);
