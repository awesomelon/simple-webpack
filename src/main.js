import { mySwiper, NavBindClick, slideChangeStart, slideChangeEndEv } from './makeSwipe.js';

export default function() {
    // 모든 컨텐츠가 로드되면, 스와이퍼 관련 초기화 진행
    swiperInit();

    changeNav();

    slideChangeStart();

    NavBindClick();

    slideChangeEndEv();
}

function swiperInit() {
    mySwiper.slideToLoop(getSwiperhashIndex(document.location.hash), 0);
}

// 스와이퍼가 해쉬값을 가지고 움직이는 형태라면, 최초 시작 페이지를 url hash 값으로 이동한다.
function getSwiperhashIndex(hashStr) {
    // 지정된 해시값이 없다면, sub1 의 해시값을 가지는 페이지로 이동
    if (hashStr == '' || typeof hashStr == 'undefined') {
        document.location.href = document.location.href + '#sub1';
    }
    // 지정된 해시값으로 이동
    else {
        var swiperTotal = mySwiper.slides.length;
        for (var i = 0; i < swiperTotal; i++) {
            var hashName = '#' + $(mySwiper.slides[i]).attr('data-hash');

            if (hashName == hashStr) {
                return mySwiper.realIndex;
            }
        }
    }
}

// 각 페이지 당 sub_nav 활성화 함수
export function changeNav() {
    var hashStr = document
            .querySelector('.swiper-container  .swiper-slide-active')
            .getAttribute('data-hash'),
        hashNumber = hashStr.substr(3, 1);

    // $('#title1>img').attr('src', downImg.src);
    // $('#title2>img').attr('src', upImg.src);

    document.getElementById('title1').className = 'down_title' + hashNumber;
    document.getElementById('title2').className = 'up_title' + hashNumber;

    $('.menuBtn').attr('style', 'display:block');
    $('#menuBtn' + hashNumber).attr('style', 'display:none');

    // 서브3 또는 서브4일 때 공통으로 쓰는 것
    if (hashNumber === '3' || hashNumber === '4') {
        // 서브 네비에 클래스값 "on" 줬다 뺏기
        $('#sub_nav' + hashNumber + ' > ul')
            .children()
            .removeClass('on');

        $('.topMenu').css({
            borderBottom: 'none'
        });
        $('.swiper-container').css({
            top: 160
        });
    }
    // 서브1,2일 때 공통으로 쓰는것
    else {
        $('#sub_nav3').hide();
        $('#sub_nav4').hide();
        $('.swiper-container').css({
            top: 120
        });
        $('.topMenu').css({
            borderBottom: '1px solid #e6e6e6'
        });
    }

    // 서브3 만 쓰는것
    if (hashNumber === '3') {
        $('#sub_nav3').show();
        $('#sub_nav4').hide();
    }
    // 서브4 만 쓰는것
    else if (hashNumber === '4') {
        $('#sub_nav3').hide();
        $('#sub_nav4').show();
    }
}
