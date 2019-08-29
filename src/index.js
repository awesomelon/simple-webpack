import './app.css';
import image1 from './images/shopping1_img.png';
import image2 from './images/shopping2_img.png';
import image3 from './images/coupon1_img.png';
import image4 from './images/coupon2_img.png';
import image5 from './images/coupon3_img.png';
import image6 from './images/culture1_img.png';
import image7 from './images/culture2_img.png';
import icon1 from './images/benefit_icon_on.png';
import icon2 from './images/reward_icon_on.png';
import icon3 from './images/shopping_icon_on.png';
import icon4 from './images/coupon_icon_on.png';
import icon5 from './images/culture_icon_on.png';

import { MYAPP } from './js/app';
import { loadAfterChangeId } from './js/youtube';

let ImageArray = [image1, image2, image3, image4, image5, image6, image7, icon1, icon2, icon3, icon4, icon5];

const preload = () => {
    ImageArray.forEach(el => {
        let img = new Image();
        img.src = el;
    });
};

window.addEventListener('DOMContentLoaded', () => {
    MYAPP.init();
    preload();
});

window.addEventListener('load', () => {
    loadAfterChangeId();
});
