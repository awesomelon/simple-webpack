import './app.css';
import { MYAPP } from './js/app';
import { onYouTubeIframeAPIReady, loadAfterChangeId } from './js/youtube';

window.addEventListener('DOMContentLoaded', () => {
    MYAPP.init();
});

window.addEventListener('load', () => {
    loadAfterChangeId();
    onYouTubeIframeAPIReady('player2', 'vdwEE1mwjOo');
    onYouTubeIframeAPIReady('player', '_PpZarebqCo');
    onYouTubeIframeAPIReady('playerDuplicate', '_PpZarebqCo');
});
