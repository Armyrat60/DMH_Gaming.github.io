export function initializeGameSlideshows() {
    const slideshows = document.querySelectorAll('.game-card-slideshow');
    
    slideshows.forEach(slideshow => {
        const slides = slideshow.querySelectorAll('.slide');
        if (!slides.length) {
            console.warn('No slides found in game card slideshow');
            return;
        }

        let currentSlide = 0;
        let slideInterval;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                if (i === index) {
                    slide.classList.add('active');
                    slide.style.display = 'block';
                    slide.style.opacity = '1';
                } else {
                    slide.classList.remove('active');
                    slide.style.display = 'none';
                    slide.style.opacity = '0';
                }
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        function startSlideshow() {
            showSlide(0);
            slideInterval = setInterval(nextSlide, 4000);
        }

        slideshow.addEventListener('mouseenter', () => clearInterval(slideInterval));
        slideshow.addEventListener('mouseleave', () => {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 4000);
        });

        // Initialize first slide and start slideshow
        showSlide(0);
        startSlideshow();
    });
}