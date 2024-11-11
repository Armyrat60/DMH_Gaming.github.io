import { initHeroGallery } from './gallery.js';
import { initializeGameSlideshows } from './gameSlideshow.js';
import { setupBackgroundShapes } from './background.js';

document.addEventListener('DOMContentLoaded', () => {
    setupBackgroundShapes();
    initHeroGallery();
    initializeGameSlideshows();
    
    // Update copyright year
    const yearSpan = document.querySelector('.copyright-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});