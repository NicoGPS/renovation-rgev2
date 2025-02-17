document.addEventListener('DOMContentLoaded', function() {
    // Sélection des éléments
    const filterButtons = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    const paginationButtons = document.querySelectorAll('.pagination-btn');

    // Filtrage des articles
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Mise à jour des boutons actifs
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.dataset.category;

            // Affichage/masquage des articles selon la catégorie
            blogCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    // Animation de fade in
                    card.classList.add('fade-in');
                } else {
                    card.style.display = 'none';
                    card.classList.remove('fade-in');
                }
            });
        });
    });

    // Pagination
    paginationButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (!button.classList.contains('next')) {
                // Mise à jour des boutons actifs
                paginationButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Ici, vous pouvez ajouter la logique pour charger les articles de la page sélectionnée
                // Par exemple, faire une requête AJAX pour charger les nouveaux articles
            }
        });
    });

    // Newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            // Ici, vous pouvez ajouter la logique pour envoyer l'email à votre service de newsletter
            // Par exemple, faire une requête AJAX vers votre backend

            // Exemple de message de confirmation
            alert('Merci de votre inscription à notre newsletter !');
            newsletterForm.reset();
        });
    }

    // Animation des cartes au scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer chaque carte de blog pour l'animation au scroll
    blogCards.forEach(card => {
        observer.observe(card);
    });
});
