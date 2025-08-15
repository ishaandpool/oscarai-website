// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Pre-order form handling (placeholder for future functionality)
    const preOrderForm = document.getElementById('preOrderForm');
    if (preOrderForm) {
        preOrderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message (placeholder for future email integration)
            alert('Thank you for your pre-order! We will contact you soon with next steps.');
            
            // Reset form
            this.reset();
        });
    }

    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.background = '#fff';
                navbar.style.backdropFilter = 'none';
            }
        }
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .timeline-item, .org-card, .competition-card, .market-card, .fund-item, .term-card, .risk-card, .team-member, .faq-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Timeline animation for Our Story page
    const timelineItems = document.querySelectorAll('.journey-step');
    if (timelineItems.length > 0) {
        const timelineObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
            });
        }, { threshold: 0.3 });

        timelineItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
            item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            timelineObserver.observe(item);
        });
    }

    // Form validation enhancement
    const formInputs = document.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#e74c3c';
            } else {
                this.style.borderColor = '#27ae60';
            }
        });

        input.addEventListener('input', function() {
            if (this.style.borderColor === 'rgb(231, 76, 60)') {
                this.style.borderColor = '#eee';
            }
        });
    });

    // Pricing tier selection enhancement
    const pricingOptions = document.querySelectorAll('.pricing-option');
    pricingOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            pricingOptions.forEach(opt => opt.classList.remove('active'));
            // Add active class to clicked option
            this.classList.add('active');
            // Check the radio button
            const radio = this.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
            }
        });
    });

    // Add loading state to submit buttons
    const submitButtons = document.querySelectorAll('.submit-btn');
    submitButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.type === 'submit') {
                this.innerHTML = 'Processing...';
                this.disabled = true;
                
                // Re-enable after 3 seconds (placeholder for actual form submission)
                setTimeout(() => {
                    this.innerHTML = 'Submit Pre-Order';
                    this.disabled = false;
                }, 3000);
            }
        });
    });

    // FAQ accordion functionality (if needed in future)
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('p');
        
        if (question && answer) {
            question.style.cursor = 'pointer';
            question.addEventListener('click', function() {
                answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
            });
        }
    });

    // Add parallax effect to hero sections
    const heroSections = document.querySelectorAll('.hero, .page-hero');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        heroSections.forEach(hero => {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    });

    // Smooth reveal animation for statistics
    const statCards = document.querySelectorAll('.stat-card');
    if (statCards.length > 0) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const value = entry.target.querySelector('.stat-value');
                    if (value) {
                        const finalValue = value.textContent;
                        value.textContent = '0';
                        
                        let current = 0;
                        const increment = parseInt(finalValue.replace(/[^0-9]/g, '')) / 50;
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= parseInt(finalValue.replace(/[^0-9]/g, ''))) {
                                value.textContent = finalValue;
                                clearInterval(timer);
                            } else {
                                value.textContent = Math.floor(current) + finalValue.replace(/[0-9]/g, '');
                            }
                        }, 30);
                    }
                }
            });
        }, { threshold: 0.5 });

        statCards.forEach(card => statsObserver.observe(card));
    }
});

// Add some CSS for the active pricing option
const style = document.createElement('style');
style.textContent = `
    .pricing-option.active {
        border-color: #27ae60;
        background: #f8fff8;
    }
    
    .pricing-option.active .option-content strong {
        color: #27ae60;
    }
`;
document.head.appendChild(style);
