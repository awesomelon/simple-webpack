import Swiper from 'swiper';
import $ from 'jquery';
import TweenMax from 'gsap/TweenMax';

var swiperOnOption = {
    init: function() {},
    slideChangeTransitionStart: function() {
        allPagerHide();
        activePagerShow();
    },
    slideChangeTransitionEnd: function() {
        scrollUp();
    }
};

var fashionSwiper = new Swiper('.swiper-fashion', {
    loop: true,
    autoHeight: true,
    width: 540,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    pagination: {
        el: '.fashion-pager',
        type: 'bullets',
        clickable: true
    },
    on: swiperOnOption
});

var watchSwiper = new Swiper('.swiper-watch', {
    loop: true,
    autoHeight: true,
    width: 540,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    pagination: {
        el: '.watch-pager',
        type: 'bullets',
        clickable: true
    },
    on: swiperOnOption
});

// 로드 시 페이저 온 오프 세팅
function pagerImageSet() {
    // fashion 페이저
    [].forEach.call(document.querySelectorAll('.fashion-pager .swiper-pagination-bullet'), function(
        pager,
        idx
    ) {
        // css : fashion-pager backgroung Image position set
        var fashionBackgroundPosition = [
            '34px 29px',
            '27px 29px',
            '51px 27px',
            '45px 24px',
            '48px 18px',
            '31px 23px',
            '70px 15px',
            '50px 27px',
            '32px 29px'
        ];
        pager.style.backgroundPosition = fashionBackgroundPosition[idx];
    });

    // watch 페이저
    [].forEach.call(document.querySelectorAll('.watch-pager .swiper-pagination-bullet'), function(
        pager,
        idx
    ) {
        // css : watch-pager backgroung Image position set
        var watchBackgroundPosition = [
            '58px 29px',
            '30px 24px',
            '51px 20px',
            '44px 18px',
            '30px 30px',
            '62px 21px',
            '45px 25px',
            '40px 23px',
            '61px 15px',
            '46px 14px'
        ];
        pager.style.backgroundPosition = watchBackgroundPosition[idx];
    });
}

// 스크롤 탑
function scrollUp() {
    TweenMax.to('html,body', 0.4, { scrollTop: 0 });
}

// 섹션 Tween 옵션 세팅
function sectionTweenOption(y, positionValue) {
    return {
        y: window.innerHeight * y,
        position: positionValue
    };
}

// 카테고리 클릭 이벤트
function categoryOnClick() {
    $('.category, .arrow').on('click', function(e) {
        // 클릭한 요소의 부모 section이 class on을 가지고 있는지 확인 : 요소가 이미 오픈된 상태인지 확인
        var targetParent = e.target.parentNode.parentNode;
        var isClassHasOn = targetParent.classList.contains('on');
        onClickActivePager(isClassHasOn);
        if (isClassHasOn) {
            arrowInit();
            titleScaleInit();
            return sectionPositionInit(0.4);
        }
        slideIndexInit(targetParent.id);
        scrollUp();
        arrowUp(e);
        titleScaleUp();
        sectionDown(targetParent, 0.4);
        return sectionUp(targetParent);
    });
}

// 섹션 오픈
function sectionUp(target) {
    target.classList.add('on');
    return TweenMax.to(target, 0.4, sectionTweenOption(0.08, 'absolute'));
}

// 섹션 오픈시 slide 첫 번째 페이지로
function slideIndexInit(section) {
    section === 'fashion' ? fashionSwiper.slideToLoop(0) : watchSwiper.slideToLoop(0);
}

// 섹션 클릭시 페이저 show hide
function onClickActivePager(show) {
    show ? allPagerHide() : activePagerShow();
}

// 모든 페이저 hide
function allPagerHide() {
    return TweenMax.set(
        ['.fashion-pager .swiper-pagination-bullet', '.watch-pager .swiper-pagination-bullet'],
        { opacity: 0 }
    );
}

// 현재 액티브 페이저 show
function activePagerShow() {
    return TweenMax.set(
        [
            '.fashion-pager .swiper-pagination-bullet-active',
            '.watch-pager .swiper-pagination-bullet-active'
        ],
        { opacity: 1 }
    );
}

// 섹션들 위치 초기화
function sectionPositionInit(duration) {
    TweenMax.to('#reward', duration, sectionTweenOption(0.5, 'fixed'));
    TweenMax.to('#fashion', duration, sectionTweenOption(0.6, 'fixed'));
    TweenMax.to('#watch', duration, sectionTweenOption(0.7, 'fixed'));
    return sectionRemoveClass();
}

// 섹션들 하단에 위치 시키기.
function sectionDown(target, duration) {
    var targetId = target.id;
    function rewardDown() {
        return TweenMax.to('#reward', duration, sectionTweenOption(0.7, 'fixed'));
    }
    function fashionDown() {
        return TweenMax.to('#fashion', duration, sectionTweenOption(0.8, 'fixed'));
    }
    function watchDown() {
        return TweenMax.to('#watch', duration, sectionTweenOption(0.9, 'fixed'));
    }

    if (targetId === 'reward') {
        fashionDown();
        return watchDown();
    } else if (targetId === 'fashion') {
        rewardDown();
        return watchDown();
    } else {
        rewardDown();
        return fashionDown();
    }
}

// 섹션들 전부 class on 제거
function sectionRemoveClass() {
    [].forEach.call(document.querySelectorAll('section'), function(category) {
        category.classList.remove('on');
    });
}

// 상단 타이틀 스케일 업
function titleScaleUp() {
    return TweenMax.to('#title', 0.4, { scale: 0.5, y: 20 });
}

// 상단 타이틀 스케일 초기화
function titleScaleInit() {
    return TweenMax.to('#title', 0.4, { scale: 1, y: 170 });
}

// 화살표 모션
function arrowUp(e) {
    var target = e.target;
    console.log(target.className);
    var arrow = target.className.indexOf('arrow') != -1 ? target : target.nextSibling.nextSibling;
    return TweenMax.to(arrow, 0.4, { rotation: 180 });
}

// 전체 화살표 위치 초기화
function arrowInit() {
    return TweenMax.to('.arrow', 0.4, { rotation: 0 });
}

// 클릭 이벤트 모음
function bindOnClick() {
    return categoryOnClick();
}

export default function() {
    pagerImageSet();
    sectionPositionInit(0);
    bindOnClick();
}
