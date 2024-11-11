export function initializeGameSlideshows() {
    const slideshows = document.querySelectorAll('.game-card-slideshow');
    
    // Sample game images (in production, these would be loaded dynamically)
    const gameImages = {
        squad: [
            '/assets/games/squad/squad1.jpg',
            '/assets/games/squad/squad2.jpg',
            '/assets/games/squad/squad3.jpg',
            '/assets/games/squad/squad4.jpg'
        ],
        squad44: [
            '/assets/games/squad44/squad44-1.jpg',
            '/assets/games/squad44/squad44-2.jpg',
            '/assets/games/squad44/squad44-3.jpg',
            '/assets/games/squad44/squad44-4.jpg'
        ]
    };
    
    slideshows.forEach((slideshow) => {
        const gameType = slideshow.dataset.game;
        if (!gameType || !gameImages[gameType]) return;

        // Clear existing content
        slideshow.innerHTML = '';
        
        // Create slides
        gameImages[gameType].forEach((image, index) => {
            const slide = document.createElement('div');
            slide.className = `slide${index === 0 ? ' active' : ''}`;
            slide.dataset.full = image;
            
            const img = document.createElement('img');
            img.src = image;
            img.alt = `${gameType} - Image ${index + 1}`;
            
            slide.appendChild(img);
            slideshow.appendChild(slide);
        });
        
        // Initialize slideshow controls
        initSlideshowControls(slideshow);
    });
}

function initSlideshowControls(slideshow) {
    const slides = slideshow.querySelectorAll('.slide');
    if (!slides.length) return;

    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
            slide.classList.toggle('active', i === index);
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

    // Add click handler for modal
    slides.forEach(slide => {
        slide.addEventListener('click', () => {
            const modal = document.getElementById('gallery-modal');
            const modalImg = document.getElementById('modal-img');
            const modalCaption = document.querySelector('.modal-caption');
            
            if (modal && modalImg) {
                modal.style.display = 'flex';
                modalImg.src = slide.dataset.full;
                if (modalCaption) {
                    const img = slide.querySelector('img');
                    modalCaption.textContent = img?.alt || '';
                }
            }
        });
    });

    slideshow.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slideshow.addEventListener('mouseleave', () => {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 4000);
    });

    startSlideshow();
}