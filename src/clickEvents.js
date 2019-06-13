export default function() {
    $('#logo').on('click', goMain);
    $('#home').on('click', goMain);
    $('#title1').on('click', openMenu);
    $('#title2').on('click', closeMenu);
    $('#menuBox > div').on('click', menuSlide);
}

function openMenu() {
    var hashStr = document
            .querySelector('.swiper-container  .swiper-slide-active')
            .getAttribute('data-hash'),
        hashNumber = hashStr.substr(3, 1);

    var count = 0;
    [].forEach.call(document.querySelectorAll('#menuBox > div'), function(el) {
        if (el.style.display === 'block') count++;
    });

    TweenMax.to('#menuBg', 0.4, { height: count * 80 });
    $('#title1').hide();
    $('#title2').show();
}
export function closeMenu() {
    TweenMax.to('#menuBg', 0.4, { height: 0 });
    $('#title1').show();
    $('#title2').hide();
}

function menuSlide() {
    var i = $(this).attr('data-index');

    if (i === '2') location.href = '../event';
    else location.href = '#sub' + i;
}

function goMain() {
    /* 로고를 클릭했을때 */
    location.href = '../main';
    // window.open('../main' + page.getHashUrl(), '_self');
}
