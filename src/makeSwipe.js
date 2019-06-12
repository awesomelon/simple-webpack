import { Swiper } from './swiper.esm';
import $ from 'jquery';
import { changeNav } from './main';
import { TweenMax } from 'gsap';
import slideCount from './counting';
import { closeMenu } from './clickEvents';
var setTime;
export var mySwiper = new Swiper('.swiper-container', {
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

export var mySwiperSub3Nav = new Swiper('.swiper-container-sub3Nav', {
    width: 540,
    spaceBetween: -350
});

export var mySwiperSub4Nav = new Swiper('.swiper-container-sub4Nav', {
    width: 540,
    spaceBetween: -370
});

mySwiper.on('slideChange', slideMove);
mySwiper.on('slideChangeTransitionEnd', slideChangeEndEv);
mySwiper.on('slideChangeTransitionStart', slideChangeStart);

export function slideChangeStart() {
    var index = mySwiper.realIndex + 1,
        hashStr = document.querySelector('.swiper-container  .swiper-slide-active').getAttribute('data-hash'),
        hashNumber = hashStr.substr(3, 1);

    if (hashNumber === '3') subNavMove(index, '.fashion', $(document.querySelector("[data-hash='sub3']")).index());
    if (hashNumber === '4') subNavMove(index, '.food', $(document.querySelector("[data-hash='sub4']")).index());

    changeNav();
}

function subNavMove(index, ele, startNum) {
    var naviImg = document.querySelectorAll(ele);
    for (var i = 0, len = naviImg.length; i < len; i++) {
        naviImg[i].classList.remove('on');
    }
    naviImg[index - startNum].classList.add('on');
    ele == '.fashion' ? mySwiperSub3Nav.slideTo(index - startNum) : mySwiperSub4Nav.slideTo(index - startNum);
}

export function NavBindClick() {
    subNavOnClick('.fashion', $(document.querySelector("[data-hash='sub3']")).index());
    subNavOnClick('.food', $(document.querySelector("[data-hash='sub4']")).index());
}

function subNavOnClick(el, startNum) {
    var els = document.querySelectorAll(el);
    [].forEach.call(els, function(navs, index) {
        navs.addEventListener('click', function() {
            // console.log(index);
            mySwiper.slideTo(index + startNum);
        });
    });
}

function slideMove() {
    closeMenu();
}

export function slideChangeEndEv() {
    // 카운팅을 위한 part title 값 설정
    var index = mySwiper.realIndex + 1;
    // 슬라이드 카운팅
    var title = $('.swiper-container > .swiper-wrapper > .swiper-slide-active').attr('data-name');
    slideCount(index, title);
    slideMoveEnd();
}

function slideMoveEnd() {
    activeHeightSet();
    scrollUp();
    analytics();
}

function activeHeightSet() {
    var activeHt = $('.swiper-slide-active > .sub_content').height();
    eventActiveHt(activeHt);
}

function eventActiveHt(activeHt) {
    TweenMax.to('.swiper-container', 0.2, { height: activeHt });
}

function scrollUp() {
    TweenMax.to('body, html', 0.2, { scrollTop: 0 });
}

function analytics() {
    // setTime = setTimeout(function() {
    //     gtag('event', 'swiper', {
    //         event_category: 'sub',
    //         event_label: $('.swiper-slide-active').attr('data-hash')
    //     });
    //     wcs.event('sub', $('.swiper-slide-active').attr('data-hash'));
    // }, 1000);
    // var preidx = mySwiper.previousIndex;
    // var idx = mySwiper.realIndex + 1;
    //console.log("이전 트래킹 번호 = " + preidx);
    //console.log("현재 트래킹 번호 = " + idx);
    // page.stayTimePage(preidx, function() {
    //     page.clickPage(idx);
    // });
}
