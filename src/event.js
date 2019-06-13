import { mySwiper } from './makeSwipe.js';
import $ from 'jquery';
/********************************************** */
const setCookie = (name, value, exp) => {
    let date = new Date();
    date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + escape(value) + ';expires=' + date.toUTCString() + ';path=/;';
};

const getCookie = name => {
    let value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value ? unescape(value[2]) : null;
};

/***************** common 변수 ************************ */
let cookie = 'checkPage-dj-190610',
    checkEnd = 'checkPage-dj-190610-checkEnd',
    slidelength = mySwiper.slides.length - 2,
    cookieValue = {},
    swiperContainer = document.querySelector('.swiper-container'),
    ACTIVE_COLOR = '#20639B',
    ACTIVE_FONT_COLOR = '#fff',
    ACTIVE_BUTTON_COLOR = '#3CAEA3',
    BUTTON_WIDTH = 25,
    ACTIVE_SCALE = 1.2,
    INIT_SCALE = (slidelength - ACTIVE_SCALE) / (slidelength - 1),
    MARGIN_COUNT = slidelength * 0.1,
    SUB_MARGIN_COUNT = 98 - BUTTON_WIDTH - MARGIN_COUNT,
    ACTIVE_COUNT_WIDTH = SUB_MARGIN_COUNT / slidelength + ACTIVE_SCALE,
    INIT_COUNT_WIDTH = (SUB_MARGIN_COUNT - ACTIVE_COUNT_WIDTH) / (slidelength - 1);

/*********** ready / load Event *************/
export function ready() {
    /**************** append ******************* */
    swiperContainer.appendChild(makeBottomDiv());

    /**************** click Event ******************* */
    bindOnClick();

    /**************** cookie check ******************* */
    if (!!getCookie(cookie)) {
        let getCookies = JSON.parse(getCookie(cookie));
        for (let i in getCookies) {
            if (getCookies[i] === 'O') countActive(i);
        }
    }
    floatingShow();
    topMenuShow();

    domInitEvent();

    mySwiper.on('slideChangeTransitionStart', slideStartCheck);
    mySwiper.on('slideChangeTransitionEnd', pageStampCheck);
}

export function load() {
    document.getElementById('loader').style.display = 'none';
}

function domInitEvent() {
    slideStartCheck();
}

function slideStartCheck() {
    pageStampActiveChange();
    slideOnCheckPageBtnDisabled();
}

function slideOnCheckPageBtnDisabled() {
    let idx = mySwiper.realIndex;
    checkPageBtnDisabled(idx);
}

function pageStampCheck() {
    let idx = mySwiper.realIndex;
    if (idx === slidelength - 1) {
        if (!doneLengthCheck()) alert('미완료된 페이지가 존재합니다.');
    }
}

// 슬라이드 시 현재 페이지가 체크된 페이지면 페이지 확인버튼 비활성화
function checkPageBtnDisabled(idx) {
    let checkPageBtn = document.getElementById('check-page');
    let checkPageBtnStyle = checkPageBtn.style;
    //쿠키가 있을때 설정값 가져오기
    if (!!getCookie(cookie)) cookieValue = JSON.parse(getCookie(cookie));

    if (cookieValue[idx] === 'O') {
        checkPageBtnStyle.backgroundColor = '#eee';
        checkPageBtn.setAttribute('disabled', true);
    } else {
        checkPageBtnStyle.backgroundColor = ACTIVE_BUTTON_COLOR;
        checkPageBtn.removeAttribute('disabled');
    }
}

// 슬라이드 시 현재 stamp page 칸 활성화
function pageStampActiveChange() {
    let idx = mySwiper.realIndex;
    $('.count')
        .removeClass('active')
        .css({
            transform: 'scale(' + INIT_SCALE + ')',
            width: INIT_COUNT_WIDTH + '%',
            margin: '0 0.1%'
        });
    $('.count')
        .eq(idx)
        .css({
            transform: 'scale(' + ACTIVE_SCALE + ')',
            width: ACTIVE_COUNT_WIDTH + '%',
            margin: '0 0.5%'
        })
        .addClass('active');
}

/*********** 클릭 이벤트 *************/
function bindOnClick() {
    checkBtnOnClick();
    floatingOnClick();
    countOnClick();
}

function checkBtnOnClick() {
    let checkPageBtn = document.getElementById('check-page');
    checkPageBtn.addEventListener('click', function() {
        let idx = mySwiper.realIndex;

        //쿠키가 있을때 설정값 가져오기
        if (!!getCookie(cookie)) cookieValue = JSON.parse(getCookie(cookie));

        cookieValue[idx] = 'O';
        setCookie(cookie, JSON.stringify(cookieValue), 30);
        countActive(idx);
        checkPageBtnDisabled(idx);

        if (doneLengthCheck()) {
            setCookie(checkEnd, checkEnd, 30);
            floatingShow();
            topMenuShow();
        }
    });
}

function floatingOnClick() {
    let floatingBtn = document.getElementById('floatingBox');
    floatingBtn.addEventListener('click', function() {
        location.href = '../event';
    });
}

function countOnClick() {
    $('.count').on('click', function(e) {
        let targetIndex = $(e.target).index(),
            idx = mySwiper.realIndex;
        if (idx === targetIndex) return;
        // if (e.target.classList.contains('done')) return;
        mySwiper.slideToLoop(targetIndex);
    });
}

function countActive(i) {
    return $('.count')
        .eq(i)
        .css({ 'background-color': ACTIVE_COLOR, color: ACTIVE_FONT_COLOR })
        .addClass('done');
}

function topMenuShow() {
    if (allCheckPage()) $('#menuBtn2').attr('style', 'display:block');
}

function floatingShow() {
    if (allCheckPage()) return floatingIcon();
}

function allCheckPage() {
    return !!getCookie(checkEnd) && doneLengthCheck();
}

function doneLengthCheck() {
    return $('.done').length === slidelength;
}

//플로팅 배너
function floatingIcon() {
    return $('#floatingBox').css('display', 'block');
}

/**************** bottom 바 생성 ************************** */
function makeBottomDiv() {
    let div = createElementFunc('div', {
        class: 'bottomBtn swiper-no-swiping',
        style:
            'width:540px; height:50px; position:absolute; bottom:10px; left:0; z-index:2; text-align:center; line-height:3; padding-left:1%; box-sizing:border-box;'
    });
    makePageStamp(div);
    makeCheckBtn(div);

    return div;
}

/************** 페이지 스탬프 생성 *********** */
function makePageStamp(div) {
    let docFragment = document.createDocumentFragment();
    for (let i = 0, len = slidelength; i < len; i++) {
        let span = createElementFunc(
            'span',
            {
                class: 'count',
                style: `
                        display:block; width:${INIT_COUNT_WIDTH}%; height:50px; 
                        float:left; font-weight:700;margin:0 0.1%;
                        color:#ccc; border-radius:10px;
                        background-color:#eee; border:1px solid transparent;
                        box-sizing:border-box; cursor:pointer;
                        transform:scale(${INIT_SCALE})
                    `
            },
            i + 1 + 'p'
        );
        docFragment.appendChild(span);
    }

    div.appendChild(docFragment);
}

/******************** 페이지 확인 버튼 생성 ****************** */
function makeCheckBtn(div) {
    let btn = createElementFunc(
        'button',
        {
            id: 'check-page',
            style: `position:absolute; right:0; top:0; width:${BUTTON_WIDTH}%; height:50px; background:${ACTIVE_BUTTON_COLOR}; border:1px solid${ACTIVE_FONT_COLOR}; color:${ACTIVE_FONT_COLOR}; border-radius:10px; font-weight:700;`,
            value: '페이지 확인'
        },
        '페이지 확인'
    );

    div.appendChild(btn);
}

function createElementFunc(el, attributes) {
    let node = document.createElement(el);
    if (attributes) {
        for (let attr in attributes) {
            if (attributes.hasOwnProperty(attr)) {
                node.setAttribute(attr, attributes[attr]);
            }
        }
    }
    for (let i = 2, len = arguments.length; i < len; i++) {
        let child = arguments[i];
        if (typeof child == 'string') {
            child = document.createTextNode(child);
        }
        node.appendChild(child);
    }
    return node;
}
