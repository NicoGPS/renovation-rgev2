document.addEventListener('DOMContentLoaded', () => {
    // Menu mobile
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fermer le menu mobile quand on clique sur un lien
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Gestion du scroll pour le header
    let lastScroll = 0;
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (header) {
            // Ajouter une classe quand on scroll vers le bas
            if (currentScroll > headerHeight) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Masquer/afficher le header selon la direction du scroll
            if (currentScroll > lastScroll && currentScroll > headerHeight) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }

            lastScroll = currentScroll;
        }
    });

    // Animation des liens de navigation
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-2px)';
        });

        link.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Smooth scroll pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = header ? header.offsetHeight : 0;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation au scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer les éléments avec la classe .fade-in
    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

    // Gestion des boutons d'appel à l'action
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-accent');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.05)';
        });

        button.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });

        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });
});
