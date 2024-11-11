export function initModal() {
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-img');
    const modalClose = document.querySelector('.modal-close');
    const modalCaption = document.querySelector('.modal-caption');

    if (modal && modalImg && modalClose && modalCaption) {
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

        modalClose.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
}