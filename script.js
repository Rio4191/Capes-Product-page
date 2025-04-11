// Initialize AOS (Animate On Scroll) library
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS with custom settings
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            backToTopButton.classList.add('visible');
        } else {
            navbar.classList.remove('scrolled');
            backToTopButton.classList.remove('visible');
        }
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Close mobile menu when clicking on a nav link
    const navLinkItems = document.querySelectorAll('.nav-links a');
    
    navLinkItems.forEach(function(link) {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Back to top button functionality
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Color option selection
    const colorOptions = document.querySelectorAll('.color-option');
    
    colorOptions.forEach(function(option) {
        option.addEventListener('click', function() {
            // Remove active class from all options
            colorOptions.forEach(function(opt) {
                opt.classList.remove('active');
            });
            
            // Add active class to clicked option
            this.classList.add('active');
        });
    });

    // Add active class to navigation links based on scroll position
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinkItems.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Simple image slider for testimonials (auto-scroll)
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    if (testimonialCards.length > 1) {
        let currentIndex = 0;
        const cardWidth = testimonialCards[0].offsetWidth + 32; // width + gap
        
        // Auto scroll function
        function autoScroll() {
            currentIndex = (currentIndex + 1) % testimonialCards.length;
            testimonialSlider.scrollTo({
                left: currentIndex * cardWidth,
                behavior: 'smooth'
            });
        }
        
        // Set auto scroll interval
        const scrollInterval = setInterval(autoScroll, 5000);
        
        // Pause auto scroll on hover
        testimonialSlider.addEventListener('mouseenter', function() {
            clearInterval(scrollInterval);
        });
        
        // Resume auto scroll when mouse leaves
        testimonialSlider.addEventListener('mouseleave', function() {
            clearInterval(scrollInterval);
            scrollInterval = setInterval(autoScroll, 5000);
        });
    }

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image img');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        if (scrollPosition < heroSection.offsetHeight) {
            const parallaxValue = scrollPosition * 0.3;
            heroImage.style.transform = `translateY(${parallaxValue}px) scale(1)`;
        }
    });

    // Intersection Observer for enhanced animations
    const animatedElements = document.querySelectorAll('.feature-card, .gallery-item, .testimonial-card');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);
    
    animatedElements.forEach(element => {
        appearOnScroll.observe(element);
    });
});