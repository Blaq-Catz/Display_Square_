document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================
       1. NAVBAR SCROLL EFFECT
       ========================================= */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(0, 18, 36, 0.95)';
            navbar.style.boxShadow = '0 8px 32px 0 rgba(0,0,0,0.2)';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.1)';
            navbar.style.boxShadow = 'none';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.2)';
        }
    });

    /* =========================================
       2. MOBILE MENU LOGIC
       ========================================= */
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.nav-links');
    const closeBtn = document.querySelector('.close-menu');
    const body = document.querySelector('body');

    const openMenu = () => {
        if (mobileNav && body) {
            mobileNav.classList.add('active');
            body.classList.add('menu-open');
        }
    };

    const closeMenu = () => {
        if (mobileNav && body) {
            mobileNav.classList.remove('active');
            body.classList.remove('menu-open');
        }
    };

    if (menuToggle) menuToggle.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    if (body) {
        body.addEventListener('click', (e) => {
            if (body.classList.contains('menu-open') && 
                mobileNav && !mobileNav.contains(e.target) && 
                menuToggle && !menuToggle.contains(e.target)) {
                closeMenu();
            }
        });
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    /* =========================================
       3. HERO CAROUSEL
       ========================================= */
    const carouselContainer = document.querySelector('.hero-carousel');
    if (carouselContainer) {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        let currentIndex = 0;
        let autoPlayInterval;

        const goToSlide = (index) => {
            slides[currentIndex].classList.remove('active');
            if (dots[currentIndex]) dots[currentIndex].classList.remove('active');
            currentIndex = index;
            slides[currentIndex].classList.add('active');
            if (dots[currentIndex]) dots[currentIndex].classList.add('active');
        };

        const nextSlide = () => goToSlide((currentIndex + 1) % slides.length);
        const prevSlide = () => goToSlide((currentIndex - 1 + slides.length) % slides.length);

        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => goToSlide(index));
        });

        autoPlayInterval = setInterval(nextSlide, 7000);
    }

    /* =========================================
       4. SCROLL REVEALS
       ========================================= */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    /* =========================================
       5. PORTFOLIO SEARCH LOGIC
       ========================================= */
    const portfolioGrid = document.querySelector('#portfolio-grid');
    if (portfolioGrid) {
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('query');
        
        if (query) {
            const items = document.querySelectorAll('.project-card');
            let found = false;
            
            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(query.toLowerCase())) {
                    item.style.display = 'block';
                    found = true;
                } else {
                    item.style.display = 'none';
                }
            });

            const headerContent = document.querySelector('#portfolio-header');
            if (headerContent) {
                headerContent.innerHTML = `
                    <h1 style="font-size: 3rem;">Search Results</h1>
                    <p style="color: #ffffff;">Showing results for: <span style="color: var(--accent-gold); font-weight: bold;">"${query}"</span></p>
                    <a href="portfolio.html" style="display: inline-block; margin-top: 1.5rem; color: var(--accent-gold); text-decoration: none; font-weight: 600; text-transform: uppercase; letter-spacing: 2px;">&larr; View All Projects</a>
                `;
            }
            
            if (!found) {
                portfolioGrid.style.display = 'none';
                const noResults = document.querySelector('#no-results');
                if (noResults) noResults.style.display = 'block';
            }
        }
    }
});