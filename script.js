// Smooth scrolling for anchor links
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

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Mensagem enviada com sucesso! Felipe entrará em contato em breve.');
        contactForm.reset();
    });
}

// --- Hero Section Animations ---

document.addEventListener('DOMContentLoaded', () => {
    const heroImage = document.querySelector('.hero-image');
    const heroH2 = document.querySelector('.hero-text h2');
    const heroParagraphs = document.querySelectorAll('.hero-text p');
    const heroButton = document.querySelector('.hero-text .btn');

    // Function to wrap characters in spans and animate them
    function animateTextChars(element, baseDelay) {
        if (!element) return baseDelay;
        const text = element.textContent.trim();
        element.innerHTML = ''; // Clear existing content
        element.style.opacity = 1; // Make container visible

        let currentDelay = baseDelay;
        const delayIncrement = 0.03; // Time between each character

        text.split('').forEach(char => {
            const span = document.createElement('span');
            // Use non-breaking space for spaces to maintain layout
            span.innerHTML = char === ' ' ? '&nbsp;' : char;
            element.appendChild(span);
            // Apply staggered delay
            span.style.transitionDelay = `${currentDelay}s`;
            currentDelay += delayIncrement;
        });

        // Add class to trigger animation after a tiny delay
        // This ensures styles are applied before class is added
        setTimeout(() => {
             // Select all spans within the element and make them visible
             element.querySelectorAll('span').forEach(span => {
                 span.style.opacity = 1;
                 span.style.transform = 'translateY(0)';
             });
        }, 50);

        return currentDelay; // Return the time when this animation ends
    }

    // --- Animation Sequence ---
    let animationEndTime = 0.5; // Initial delay before anything starts (matches image animation delay in CSS)

    // 1. Image animation is handled by CSS (starts at 0.5s, ends at 1.5s)

    // 2. Animate H2 after image starts fading in
    animationEndTime = animateTextChars(heroH2, 0.8); // Start H2 at 0.8s

    // 3. Animate Paragraphs sequentially after H2
    heroParagraphs.forEach(p => {
        // Add a small gap between H2 ending and P starting
        animationEndTime = animateTextChars(p, animationEndTime + 0.1);
    });

    // 4. Animate Button after paragraphs finish
    if (heroButton) {
        heroButton.style.opacity = 0;
        heroButton.style.transform = 'translateY(15px)';
        heroButton.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        // Start button slightly after the last paragraph character animation begins
        heroButton.style.transitionDelay = `${animationEndTime + 0.2}s`;

        setTimeout(() => {
            heroButton.style.opacity = 1;
            heroButton.style.transform = 'translateY(0)';
        }, 50);
    }
});

