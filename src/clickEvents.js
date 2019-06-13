import { TweenMax } from 'gsap';
import $ from 'jquery';

const openMenu = () => {
    let count = 0;
    Array.from(document.querySelectorAll('#menuBox > div')).forEach(el => {
        if (el.style.display === 'block') count++;
    });
    TweenMax.to('#menuBg', 0.4, { height: count * 80 });
    $('#title1').hide();
    $('#title2').show();
};

const menuSlide = () => {
    let i = $(this).attr('data-index');
    i === '2' ? (location.href = '../event') : (location.href = '#sub' + i);
};
const goMain = () => (location.href = '../main');

export default function() {
    $('#logo').on('click', goMain);
    $('#home').on('click', goMain);
    $('#title1').on('click', openMenu);
    $('#title2').on('click', closeMenu);
    $('#menuBox > div').on('click', menuSlide);
}

export function closeMenu() {
    TweenMax.to('#menuBg', 0.4, { height: 0 });
    $('#title1').show();
    $('#title2').hide();
}
