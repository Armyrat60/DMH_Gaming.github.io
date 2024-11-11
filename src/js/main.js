import { initBackgroundAnimation } from './background.js';
import { initHeroGallery } from './gallery.js';
import { initializeGameSlideshows } from './gameSlideshow.js';
import { initModal } from './modal.js';

// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initBackgroundAnimation();
    initHeroGallery();
    initializeGameSlideshows();
    initModal();

    // Update copyright year
    const yearSpan = document.querySelector('.copyright-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});