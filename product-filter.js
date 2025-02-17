document.addEventListener('DOMContentLoaded', () => {
    // Sélectionner tous les boutons de filtre et les produits
    const filterButtons = document.querySelectorAll('.filter-btn');
    const products = document.querySelectorAll('.product-card');

    // Fonction pour filtrer les produits
    function filterProducts(category) {
        products.forEach(product => {
            // Si la catégorie est "all" ou si le produit correspond à la catégorie sélectionnée
            if (category === 'all' || product.dataset.category === category) {
                // Afficher le produit avec une animation
                product.style.opacity = '0';
                product.style.display = 'flex';
                setTimeout(() => {
                    product.style.opacity = '1';
                }, 50);
            } else {
                // Masquer le produit
                product.style.opacity = '0';
                setTimeout(() => {
                    product.style.display = 'none';
                }, 300);
            }
        });
    }

    // Ajouter les écouteurs d'événements aux boutons de filtre
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            button.classList.add('active');
            
            // Récupérer la catégorie du bouton et filtrer les produits
            const category = button.dataset.filter;
            filterProducts(category);

            // Animation du bouton
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 100);
        });
    });

    // Fonction pour mettre à jour les prix avec animation
    function updatePrices() {
        const priceElements = document.querySelectorAll('.product-price');
        
        priceElements.forEach(element => {
            const currentPrice = element.querySelector('.price-current');
            if (currentPrice) {
                currentPrice.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    currentPrice.style.transform = 'scale(1)';
                }, 300);
            }
        });
    }

    // Mettre à jour les prix périodiquement pour attirer l'attention
    setInterval(updatePrices, 5000);

    // Animation des badges de réduction
    const badges = document.querySelectorAll('.product-badge');
    badges.forEach(badge => {
        badge.addEventListener('mouseover', () => {
            badge.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        badge.addEventListener('mouseout', () => {
            badge.style.transform = 'scale(1) rotate(0)';
        });
    });

    // Animation des cartes produit au survol
    products.forEach(product => {
        product.addEventListener('mouseover', () => {
            const image = product.querySelector('.product-image img');
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
        });

        product.addEventListener('mouseout', () => {
            const image = product.querySelector('.product-image img');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });

    // Initialiser avec tous les produits visibles
    filterProducts('all');
});
