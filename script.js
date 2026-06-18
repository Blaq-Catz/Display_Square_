document.addEventListener('DOMContentLoaded', () => {
    
    /* --- 1. Dynamic Glassmorphism Navbar --- */
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.85)';
            navbar.style.padding = '1rem 5rem';
            navbar.style.boxShadow = '0 8px 32px 0 rgba(0, 34, 68, 0.08)';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 1)';
            
            if(window.innerWidth <= 900) {
                 navbar.style.padding = '1rem 2rem';
            }
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.6)';
            navbar.style.padding = '1.5rem 5rem';
            navbar.style.boxShadow = 'none';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.8)';
            
            if(window.innerWidth <= 900) {
                 navbar.style.padding = '1rem 2rem';
            }
        }
    });

    /* --- 2. Cinematic Hero Carousel --- */
    const carouselContainer = document.querySelector('.hero-carousel');
    
    if (carouselContainer) {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        let currentIndex = 0;
        let autoPlayInterval;
        const intervalTime = 7000; 

        const goToSlide = (index) => {
            slides[currentIndex].classList.remove('active');
            dots[currentIndex].classList.remove('active');
            currentIndex = index;
            slides[currentIndex].classList.add('active');
            dots[currentIndex].classList.add('active');
        };

        const nextSlide = () => goToSlide((currentIndex + 1) % slides.length);
        const prevSlide = () => goToSlide((currentIndex - 1 + slides.length) % slides.length);

        const startAutoPlay = () => { autoPlayInterval = setInterval(nextSlide, intervalTime); };
        const resetTimer = () => { clearInterval(autoPlayInterval); startAutoPlay(); };

        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => { nextSlide(); resetTimer(); });
            prevBtn.addEventListener('click', () => { prevSlide(); resetTimer(); });
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => { goToSlide(index); resetTimer(); });
        });

        startAutoPlay();
    }

    /* --- 3. Full-Screen Mobile Menu Logic --- */
    const menuToggle = document.querySelector('#mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const body = document.querySelector('body');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('is-active');
            navLinks.classList.toggle('active');
            
            // Prevent background scrolling when menu is open
            if(navLinks.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
        
        // Auto-close menu when clicking a link
        const links = document.querySelectorAll('.nav-links li a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('is-active');
                navLinks.classList.remove('active');
                body.style.overflow = ''; // Restore scrolling
            });
        });
    }

    /* --- 4. Intersection Observer (Scroll Reveals) --- */
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15, 
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));
});