import './reset.css';
import './swiper.min.css';
import './event.css';
import './main.css';

import { ready, load } from './event';
import main from './main';
import clickEvent from './clickEvents';

window.addEventListener('DOMContentLoaded', function() {
    clickEvent();
    ready();
});
window.addEventListener('load', function() {
    main();
    load();
});
