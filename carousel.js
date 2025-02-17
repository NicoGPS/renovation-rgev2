document.addEventListener('DOMContentLoaded', () => {
    // Sélectionner tous les carrousels
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const slides = Array.from(track.children);
        const nextButton = carousel.querySelector('.carousel-button.next');
        const prevButton = carousel.querySelector('.carousel-button.prev');
        const slideWidth = slides[0].getBoundingClientRect().width;

        // Positionner les slides côte à côte
        const setSlidePosition = (slide, index) => {
            slide.style.left = slideWidth * index + 'px';
        };
        slides.forEach(setSlidePosition);

        // Fonction pour déplacer vers un slide
        const moveToSlide = (track, currentSlide, targetSlide) => {
            const targetIndex = slides.findIndex(slide => slide === targetSlide);
            track.style.transform = `translateX(-${targetSlide.style.left})`;
            currentSlide.classList.remove('current-slide');
            targetSlide.classList.add('current-slide');

            // Mettre à jour la visibilité des boutons
            updateButtonsVisibility(carousel, targetIndex);
        };

        // Fonction pour mettre à jour la visibilité des boutons
        const updateButtonsVisibility = (carousel, currentIndex) => {
            const prevButton = carousel.querySelector('.carousel-button.prev');
            const nextButton = carousel.querySelector('.carousel-button.next');

            prevButton.style.display = currentIndex === 0 ? 'none' : 'block';
            nextButton.style.display = currentIndex === slides.length - 1 ? 'none' : 'block';
        };

        // Gestionnaire d'événement pour le bouton suivant
        nextButton.addEventListener('click', e => {
            const currentSlide = track.querySelector('.current-slide') || slides[0];
            const nextSlide = currentSlide.nextElementSibling;
            if (nextSlide) {
                moveToSlide(track, currentSlide, nextSlide);
            }
        });

        // Gestionnaire d'événement pour le bouton précédent
        prevButton.addEventListener('click', e => {
            const currentSlide = track.querySelector('.current-slide') || slides[0];
            const prevSlide = currentSlide.previousElementSibling;
            if (prevSlide) {
                moveToSlide(track, currentSlide, prevSlide);
            }
        });

        // Défilement automatique
        let autoplayInterval;
        const startAutoplay = () => {
            autoplayInterval = setInterval(() => {
                const currentSlide = track.querySelector('.current-slide') || slides[0];
                const nextSlide = currentSlide.nextElementSibling || slides[0];
                moveToSlide(track, currentSlide, nextSlide);
            }, 5000); // Change de slide toutes les 5 secondes
        };

        const stopAutoplay = () => {
            clearInterval(autoplayInterval);
        };

        // Démarrer le défilement automatique
        startAutoplay();

        // Arrêter le défilement automatique au survol
        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);

        // Support tactile
        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener('touchstart', e => {
            touchStartX = e.touches[0].clientX;
            stopAutoplay();
        }, { passive: true });

        carousel.addEventListener('touchmove', e => {
            touchEndX = e.touches[0].clientX;
        }, { passive: true });

        carousel.addEventListener('touchend', () => {
            const currentSlide = track.querySelector('.current-slide') || slides[0];
            const swipeDistance = touchStartX - touchEndX;

            if (Math.abs(swipeDistance) > 50) { // Seuil minimum pour considérer qu'il y a eu un swipe
                if (swipeDistance > 0 && currentSlide.nextElementSibling) {
                    // Swipe vers la gauche
                    moveToSlide(track, currentSlide, currentSlide.nextElementSibling);
                } else if (swipeDistance < 0 && currentSlide.previousElementSibling) {
                    // Swipe vers la droite
                    moveToSlide(track, currentSlide, currentSlide.previousElementSibling);
                }
            }

            startAutoplay();
        });

        // Initialiser le premier slide comme actif
        slides[0].classList.add('current-slide');
        updateButtonsVisibility(carousel, 0);
    });
});
