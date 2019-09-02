import './app.css';
import UploadEv from './js/uploadData';
import RegEv from './js/RegEv';
import ListData from './js/listData';
import SwiperEv from './js/makeUploadSwiper';
import ChoiceFile from './js/choiceFileToMakeThumb';
import { util } from './js/util';

window.addEventListener('DOMContentLoaded', () => {
    const uploadEv = new UploadEv(),
        regEv = new RegEv(),
        choiceFile = new ChoiceFile(),
        listData = new ListData(),
        swiperEv = new SwiperEv(),
        getPage = util.getParameterByName('page');

    if (!!getPage) listData.getData(getPage);
});

window.addEventListener('load', () => {});
