document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================
       1. DYNAMIC NAVBAR SCROLL EFFECT
       ========================================= */
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            // Scrolled State: Dark Glass over content
            navbar.style.background = 'rgba(0, 18, 36, 0.95)';
            navbar.style.boxShadow = '0 8px 32px 0 rgba(0,0,0,0.2)';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
        } else {
            // Top State: Highly Transparent over Hero
            navbar.style.background = 'rgba(255, 255, 255, 0.05)';
            navbar.style.boxShadow = 'none';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.2)';
        }
    });

    /* =========================================
       2. BULLETPROOF MOBILE MENU
       ========================================= */
    const menuToggle = document.querySelector('#mobile-menu');
    const mobileNav = document.querySelector('.nav-links');
    const closeBtn = document.querySelector('.close-menu');
    const body = document.querySelector('body');

    // Function to explicitly open menu
    const openMenu = () => {
        if(mobileNav && body) {
            mobileNav.classList.add('active');
            body.classList.add('menu-open'); 
        }
    };

    // Function to explicitly close menu
    const closeMenu = () => {
        if(mobileNav && body) {
            mobileNav.classList.remove('active');
            body.classList.remove('menu-open'); 
        }
    };

    // Event Listeners for menu interaction
    if (menuToggle) menuToggle.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    
    // Auto-close menu when a specific link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    /* =========================================
       3. CINEMATIC HERO CAROUSEL
       ========================================= */
    const carouselContainer = document.querySelector('.hero-carousel');
    
    if (carouselContainer) {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        let currentIndex = 0;
        let autoPlayInterval;
        const intervalTime = 7000; // Change slide every 7 seconds

        const goToSlide = (index) => {
            slides[currentIndex].classList.remove('active');
            if (dots[currentIndex]) dots[currentIndex].classList.remove('active');
            
            currentIndex = index;
            
            slides[currentIndex].classList.add('active');
            if (dots[currentIndex]) dots[currentIndex].classList.add('active');
        };

        const nextSlide = () => goToSlide((currentIndex + 1) % slides.length);
        const prevSlide = () => goToSlide((currentIndex - 1 + slides.length) % slides.length);

        const startAutoPlay = () => { autoPlayInterval = setInterval(nextSlide, intervalTime); };
        const resetTimer = () => { clearInterval(autoPlayInterval); startAutoPlay(); };

        // Bind Arrow Navigation
        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => { nextSlide(); resetTimer(); });
            prevBtn.addEventListener('click', () => { prevSlide(); resetTimer(); });
        }

        // Bind Dot Navigation
        if (dots.length > 0) {
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => { goToSlide(index); resetTimer(); });
            });
        }

        startAutoPlay();
    }

    /* =========================================
       4. SCROLL REVEAL ANIMATIONS
       ========================================= */
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

    /* =========================================
       5. DYNAMIC PORTFOLIO SEARCH ENGINE
       ========================================= */
    const portfolioGrid = document.querySelector('#portfolio-grid');
    
    if (portfolioGrid) {
        // Read URL parameters to detect search queries
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('query');
        
        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            const projects = document.querySelectorAll('.project-card');
            let matchCount = 0;
            
            // Filter the DOM elements dynamically
            projects.forEach(project => {
                const title = project.querySelector('h3').textContent.toLowerCase();
                const category = project.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(lowerQuery) || category.includes(lowerQuery)) {
                    project.style.display = 'block'; 
                    matchCount++;
                } else {
                    project.style.display = 'none'; 
                }
            });
            
            // Dynamically update the Page Header to show search context
            const headerContent = document.querySelector('#portfolio-header');
            if (headerContent) {
                headerContent.innerHTML = `
                    <h1 style="font-size: 3rem;">Search Results</h1>
                    <p style="color: #ffffff;">Showing results for: <span style="color: var(--accent-gold); font-weight: bold;">"${searchQuery}"</span></p>
                    <a href="portfolio.html" style="display: inline-block; margin-top: 1.5rem; color: var(--accent-gold); text-decoration: none; font-weight: 600; text-transform: uppercase; letter-spacing: 2px;">&larr; View All Projects</a>
                `;
            }
            
            // Show custom "No Results" state if nothing matches
            if (matchCount === 0) {
                portfolioGrid.style.display = 'none';
                const noResults = document.querySelector('#no-results');
                if (noResults) noResults.style.display = 'block';
            }
        }
    }
});
