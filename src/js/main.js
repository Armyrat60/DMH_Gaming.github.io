import { initHeroGallery } from './gallery.js';
import { initializeGameSlideshows } from './gameSlideshow.js';
import { initBackgroundShapes } from './backgroundShapes.js';

// Wait for DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', () => {
    initBackgroundShapes();
    initHeroGallery();
    initializeGameSlideshows();

    // Update copyright year
    const yearSpan = document.querySelector('.copyright-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});