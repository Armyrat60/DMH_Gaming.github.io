// Wait for DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', () => {
    /**
     * Background Animation System
     * Creates floating card suit shapes that move and collide
     */
    const backgroundShapes = document.querySelector('.background-shapes');
    const suits = ['spade', 'heart', 'diamond', 'club'];
    const shapes = [];
    
    backgroundShapes.innerHTML = '';
    
    class Shape {
        constructor(element, x, y, speedX, speedY, rotation) {
            this.element = element;
            this.x = x;
            this.y = y;
            this.speedX = speedX;
            this.speedY = speedY;
            this.rotation = rotation;
            this.width = 40;
            this.height = 40;
            this.rotationSpeed = (Math.random() - 0.5) * 2;
        }

        update() {
            // Update position
            this.x += this.speedX;
            this.y += this.speedY;
            this.rotation += this.rotationSpeed;
            
            // Bounce off screen boundaries
            if (this.x <= 0 || this.x >= window.innerWidth - this.width) {
                this.speedX *= -1;
            }
            if (this.y <= 0 || this.y >= window.innerHeight - this.height) {
                this.speedY *= -1;
            }

            // Apply new position and rotation
            this.element.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg)`;
        }

        checkCollision(other) {
            const dx = this.x - other.x;
            const dy = this.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            return distance < (this.width + other.width) / 2;
        }

        handleCollision(other) {
            // Calculate collision angle
            const dx = other.x - this.x;
            const dy = other.y - this.y;
            const angle = Math.atan2(dy, dx);
            
            // Update velocity based on collision
            const speed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
            this.speedX = -Math.cos(angle) * speed;
            this.speedY = -Math.sin(angle) * speed;
            
            // Add some rotation on collision
            this.rotationSpeed *= -0.8;
        }
    }

    // Initialize background shapes
    for (let i = 0; i < 34; i++) {
        const shape = document.createElement('div');
        shape.className = `shape ${suits[Math.floor(Math.random() * suits.length)]}`;
        
        // Random starting position
        const x = Math.random() * (window.innerWidth - 60);
        const y = Math.random() * (window.innerHeight - 60);
        
        // Random movement direction and speed
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 0.5 + 0.5;
        const speedX = Math.cos(angle) * speed;
        const speedY = Math.sin(angle) * speed;
        
        const rotation = Math.random() * 360;

        shape.style.position = 'absolute';
        backgroundShapes.appendChild(shape);

        shapes.push(new Shape(shape, x, y, speedX, speedY, rotation));
    }

    // Animation loop for background shapes
    function animate() {
        shapes.forEach(shape => shape.update());

        // Check for collisions between shapes
        for (let i = 0; i < shapes.length; i++) {
            for (let j = i + 1; j < shapes.length; j++) {
                if (shapes[i].checkCollision(shapes[j])) {
                    shapes[i].handleCollision(shapes[j]);
                    shapes[j].handleCollision(shapes[i]);
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();

    /**
     * Hero Section Gallery
     * Manages the main hero section slideshow
     */
    function initHeroGallery() {
        const slides = document.querySelectorAll('.hero-slide');
        const prevButton = document.querySelector('.prev-slide');
        const nextButton = document.querySelector('.next-slide');
        const dotsContainer = document.querySelector('.hero-dots');
        
        if (!slides.length || !prevButton || !nextButton || !dotsContainer) return;

        let currentSlide = 0;
        let slideInterval;

        // Create navigation dots
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `hero-dot${index === 0 ? ' active' : ''}`;
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.hero-dot');

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

        // Event listeners for navigation
        prevButton.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });

        nextButton.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });

        // Start automatic slideshow
        resetInterval();

        // Pause on hover
        const heroGallery = document.querySelector('.hero-gallery');
        heroGallery.addEventListener('mouseenter', () => clearInterval(slideInterval));
        heroGallery.addEventListener('mouseleave', resetInterval);
    }

    /**
     * Game Card Slideshows
     * Manages the automatic slideshows in game cards
     */
    function initializeGameSlideshows() {
        const slideshows = document.querySelectorAll('.game-card-slideshow');
        
        slideshows.forEach(slideshow => {
            const slides = slideshow.querySelectorAll('.slide');
            if (slides.length === 0) return;

            let currentSlide = 0;
            let slideInterval;

            function showSlide(index) {
                slides.forEach(slide => slide.style.display = 'none');
                slides[index].style.display = 'block';
            }

            function nextSlide() {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            }

            function startSlideshow() {
                showSlide(0);
                slideInterval = setInterval(nextSlide, 4000);
            }

            startSlideshow();

            // Pause on hover
            slideshow.addEventListener('mouseenter', () => clearInterval(slideInterval));
            slideshow.addEventListener('mouseleave', () => {
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, 4000);
            });
        });
    }

    // Initialize all galleries
    initHeroGallery();
    initializeGameSlideshows();

    /**
     * Smooth Scrolling
     * Enables smooth scroll behavior for navigation links
     */
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

    // Update copyright year
    const yearSpan = document.querySelector('.copyright-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    /**
     * Image Modal
     * Handles the fullscreen image modal functionality
     */
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-img');
    const modalClose = document.querySelector('.modal-close');
    const modalCaption = document.querySelector('.modal-caption');

    if (modal && modalImg && modalClose && modalCaption) {
        // Add click handlers for all slides with full-size images
        document.querySelectorAll('.slide[data-full]').forEach(slide => {
            slide.addEventListener('click', () => {
                modal.style.display = 'flex';
                modalImg.src = slide.dataset.full;
                const img = slide.querySelector('img');
                if (img) {
                    modalCaption.textContent = img.alt;
                }
            });
        });

        // Close modal handlers
        modalClose.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});