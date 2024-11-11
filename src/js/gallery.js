export function initHeroGallery() {
    const galleryContainer = document.querySelector('.hero-gallery');
    if (!galleryContainer) return;

    // Sample hero images (in production, these would be loaded dynamically)
    const heroImages = [
        '/assets/hero/hero1.jpg',
        '/assets/hero/hero2.jpg',
        '/assets/hero/hero3.jpg',
        '/assets/hero/hero4.jpg'
    ];

    // Clear existing content
    galleryContainer.innerHTML = '';
    
    // Create slides
    heroImages.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.className = `hero-slide${index === 0 ? ' active' : ''}`;
        slide.style.backgroundImage = `url(${image})`;
        galleryContainer.appendChild(slide);
    });

    // Create controls
    const controls = document.createElement('div');
    controls.className = 'hero-controls';
    controls.innerHTML = `
        <button class="prev-slide" aria-label="Previous slide">❮</button>
        <button class="next-slide" aria-label="Next slide">❯</button>
    `;
    galleryContainer.appendChild(controls);

    // Create dots
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'hero-dots';
    heroImages.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `hero-dot${index === 0 ? ' active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    galleryContainer.appendChild(dotsContainer);

    // Initialize controls
    const slides = document.querySelectorAll('.hero-slide');
    const prevButton = document.querySelector('.prev-slide');
    const nextButton = document.querySelector('.next-slide');
    const dots = document.querySelectorAll('.hero-dot');
    
    let currentSlide = 0;
    let slideInterval;

    function updateSlides() {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlides();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlides();
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlides();
        resetInterval();
    }

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    prevButton?.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    nextButton?.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    galleryContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
    galleryContainer.addEventListener('mouseleave', resetInterval);

    // Start slideshow
    resetInterval();
}