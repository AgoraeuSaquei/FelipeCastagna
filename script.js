/**
 * MAIN SCRIPT FILE
 * Contains all interactive functionality for the website
 */

document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // 1. SMOOTH SCROLLING FOR ANCHOR LINKS
    // =============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // =============================================
    // 2. FORM HANDLING
    // =============================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Mensagem enviada com sucesso! Felipe entrará em contato em breve.');
            contactForm.reset();

            // Reset floating labels if they exist
            document.querySelectorAll('.form-group label').forEach(label => {
                label.style.top = '18px';
                label.style.fontSize = '1rem';
                label.style.color = '#777';
            });
        });
    }

    // =============================================
    // 3. HERO SECTION ANIMATIONS
    // =============================================
    const heroImage = document.querySelector('.hero-image');
    const heroH2 = document.querySelector('.hero-text h2');
    const heroParagraphs = document.querySelectorAll('.hero-text p');
    const heroButton = document.querySelector('.hero-text .btn');

    function animateTextChars(element, baseDelay) {
        if (!element) return baseDelay;
        const text = element.textContent.trim();
        element.innerHTML = '';
        element.style.opacity = 1;

        let currentDelay = baseDelay;
        const delayIncrement = 0.03;

        text.split('').forEach(char => {
            const span = document.createElement('span');
            span.innerHTML = char === ' ' ? '&nbsp;' : char;
            element.appendChild(span);
            span.style.transitionDelay = `${currentDelay}s`;
            currentDelay += delayIncrement;
        });

        setTimeout(() => {
            element.querySelectorAll('span').forEach(span => {
                span.style.opacity = 1;
                span.style.transform = 'translateY(0)';
            });
        }, 50);

        return currentDelay;
    }

    if (heroH2) {
        let animationEndTime = 0.5;
        animationEndTime = animateTextChars(heroH2, 0.8);

        heroParagraphs.forEach(p => {
            animationEndTime = animateTextChars(p, animationEndTime + 0.1);
        });

        if (heroButton) {
            heroButton.style.opacity = 0;
            heroButton.style.transform = 'translateY(15px)';
            heroButton.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            heroButton.style.transitionDelay = `${animationEndTime + 0.2}s`;

            setTimeout(() => {
                heroButton.style.opacity = 1;
                heroButton.style.transform = 'translateY(0)';
            }, 50);
        }
    }

    // =============================================
    // 4. ADDITIONAL SERVICES TOGGLE
    // =============================================
    const toggleBtn = document.getElementById('toggle-services');
    const servicesContainer = document.getElementById('additional-services');

    if (toggleBtn && servicesContainer) {
        const chevronIcon = toggleBtn.querySelector('i');
        const serviceCards = servicesContainer.querySelectorAll('.pricing-card');

        // Initialize cards
        serviceCards.forEach(card => {
            card.style.opacity = 0;
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });

        // Toggle functionality
        toggleBtn.addEventListener('click', function() {
            this.classList.toggle('active');

            if (servicesContainer.style.display === 'none') {
                servicesContainer.style.display = 'block';
                toggleBtn.querySelector('span').textContent = 'Ocultar Serviços';
                servicesContainer.style.opacity = 0;
                servicesContainer.style.transition = 'opacity 0.5s ease';
                setTimeout(() => {
                    servicesContainer.style.opacity = 1;
                }, 10);
            } else {
                toggleBtn.querySelector('span').textContent = 'Ver Serviços Adicionais';
                servicesContainer.style.opacity = 0;
                setTimeout(() => {
                    servicesContainer.style.display = 'none';
                }, 500);
            }
        });

        // Intersection Observer for cards
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const cards = entry.target.querySelectorAll('.pricing-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = 1;
                            card.style.transform = 'translateY(0)';
                        }, 150 * index);
                    });
                }
            });
        }, { threshold: 0.1 });

        observer.observe(servicesContainer);
    }

    // =============================================
    // 5. SOCIAL BUTTONS ANIMATION
    // =============================================
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // =============================================
    // 6. FLOATING LABELS FOR CONTACT FORM
    // =============================================
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
        input.addEventListener('focus', function() {
            const label = this.previousElementSibling;
            if (label) {
                label.style.top = '-10px';
                label.style.fontSize = '0.9rem';
                label.style.color = '#f7ad36';
            }
        });

        input.addEventListener('blur', function() {
            if (this.value === '') {
                const label = this.previousElementSibling;
                if (label) {
                    label.style.top = '18px';
                    label.style.fontSize = '1rem';
                    label.style.color = '#777';
                }
            }
        });
    });
});
