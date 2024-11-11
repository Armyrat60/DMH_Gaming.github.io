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
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        
        if (this.x <= 0 || this.x >= window.innerWidth - this.width) {
            this.speedX *= -1;
        }
        if (this.y <= 0 || this.y >= window.innerHeight - this.height) {
            this.speedY *= -1;
        }

        this.element.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg)`;
    }

    checkCollision(other) {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < (this.width + other.width) / 2;
    }

    handleCollision(other) {
        const dx = other.x - this.x;
        const dy = other.y - this.y;
        const angle = Math.atan2(dy, dx);
        
        const speed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
        this.speedX = -Math.cos(angle) * speed;
        this.speedY = -Math.sin(angle) * speed;
        
        this.rotationSpeed *= -0.8;
    }
}

export function initBackgroundShapes() {
    const backgroundShapes = document.querySelector('.background-shapes');
    if (!backgroundShapes) {
        console.warn('Background shapes container not found');
        return;
    }

    const suits = ['spade', 'heart', 'diamond', 'club'];
    const shapes = [];
    
    backgroundShapes.innerHTML = '';
    
    for (let i = 0; i < 34; i++) {
        const shape = document.createElement('div');
        shape.className = `shape ${suits[Math.floor(Math.random() * suits.length)]}`;
        
        const x = Math.random() * (window.innerWidth - 60);
        const y = Math.random() * (window.innerHeight - 60);
        
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 0.5 + 0.5;
        const speedX = Math.cos(angle) * speed;
        const speedY = Math.sin(angle) * speed;
        
        const rotation = Math.random() * 360;

        shape.style.position = 'absolute';
        backgroundShapes.appendChild(shape);

        shapes.push(new Shape(shape, x, y, speedX, speedY, rotation));
    }

    function animate() {
        shapes.forEach(shape => shape.update());

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
}