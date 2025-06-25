
        document.addEventListener('DOMContentLoaded', function () {
            // Initialize Swiper
            const swiper = new Swiper('#swiper-container', {
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                speed: 800,
                grabCursor: true,
                spaceBetween: 20,
                pagination: {
                    el: '#swiper-pagination',
                    clickable: true,
                },
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 15
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    992: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    }
                }
            });

            // Animation when section comes into view
            const testimonialSection = document.querySelector('#testimonials-section');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            observer.observe(testimonialSection);
        });
        // main.js - Consolidated JavaScript for all page functionalities

        document.addEventListener('DOMContentLoaded', function () {
            // Initialize all Swiper sliders
            initSwipers();

            // Set up intersection observers for animations
            setupObservers();

            // Initialize infinite logo slider
            initLogoSlider();

            // Set up touch device hover effects
            setupTouchHoverEffects();
        });

        function initSwipers() {
            // Testimonials Swiper
            new Swiper('.swiper-container', {
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                speed: 800,
                grabCursor: true,
                spaceBetween: 20,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                breakpoints: {
                    320: { slidesPerView: 1, spaceBetween: 15 },
                    768: { slidesPerView: 2, spaceBetween: 20 },
                    992: { slidesPerView: 3, spaceBetween: 30 }
                }
            });

            // Services Swiper
            new Swiper('.services-swiper', {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true,
                autoplay: {
                    delay: 3500,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                breakpoints: {
                    640: { slidesPerView: 1, spaceBetween: 20 },
                    768: { slidesPerView: 2, spaceBetween: 25 },
                    1024: { slidesPerView: 3, spaceBetween: 30 }
                }
            });
        }

        function setupObservers() {
            // Testimonials section animation
            observeElement('.testimonials-section', (element) => {
                element.classList.add('animate-in');
            });

            // Section header animation
            const sectionHeader = document.getElementById('section-header');
            if (sectionHeader) {
                setTimeout(() => {
                    sectionHeader.classList.add('animate');
                }, 300);
            }

            // Welcome section animation
            observeElement('.welcome-section', (element) => {
                const welcomeText = element.querySelector('.welcome-text');
                const welcomeImage = element.querySelector('.welcome-image');
                if (welcomeText) welcomeText.classList.add('animate');
                if (welcomeImage) welcomeImage.classList.add('animate');
            });

            // Why Korearch section animation
            observeElement('.why-korearch', (element) => {
                const sectionTitle = element.querySelector('.section-title');
                if (sectionTitle) sectionTitle.classList.add('animate');

                const featureCards = element.querySelectorAll('.feature-card');
                featureCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animate');
                    }, index * 100);
                });
            });
        }

        function initLogoSlider() {
            const sliderTrack = document.getElementById('logo-slider-track');
            if (!sliderTrack) return;

            const slides = document.querySelectorAll('.logo-slide');
            if (slides.length === 0) return;

            // Duplicate slides for infinite effect
            slides.forEach(slide => {
                const clone = slide.cloneNode(true);
                sliderTrack.appendChild(clone);
            });

            // Animation variables
            let speed = 0.8; // pixels per frame
            let position = 0;
            let animationId;
            let isPaused = false;

            // Start animation
            function animate() {
                if (!isPaused) {
                    position -= speed;

                    // Reset position when we've scrolled all duplicated slides
                    if (-position >= (sliderTrack.scrollWidth / 2)) {
                        position = 0;
                    }

                    sliderTrack.style.transform = `translateX(${position}px)`;
                }

                animationId = requestAnimationFrame(animate);
            }

            // Pause on hover
            sliderTrack.addEventListener('mouseenter', () => {
                isPaused = true;
                document.querySelectorAll('.logo-slide').forEach(slide => {
                    slide.classList.add('hover-pause');
                });
            });

            // Resume on mouse leave
            sliderTrack.addEventListener('mouseleave', () => {
                isPaused = false;
                document.querySelectorAll('.logo-slide').forEach(slide => {
                    slide.classList.remove('hover-pause');
                });
            });

            // Start animation when section is in view
            observeElement('#clients-section', () => {
                animate();
            }, () => {
                cancelAnimationFrame(animationId);
            });

            // Clean up animation on unmount
            window.addEventListener('beforeunload', () => {
                cancelAnimationFrame(animationId);
            });
        }

        function setupTouchHoverEffects() {
            const featureCards = document.querySelectorAll('.feature-card');
            featureCards.forEach(card => {
                card.addEventListener('touchstart', function () {
                    this.classList.add('hover-effect');
                });

                card.addEventListener('touchend', function () {
                    setTimeout(() => {
                        this.classList.remove('hover-effect');
                    }, 300);
                });
            });
        }

        // Helper function to observe elements with intersection observer
        function observeElement(selector, onIntersect, onNotIntersect = null, threshold = 0.1) {
            const element = document.querySelector(selector);
            if (!element) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        onIntersect(entry.target);
                        observer.unobserve(entry.target);
                    } else if (onNotIntersect) {
                        onNotIntersect();
                    }
                });
            }, { threshold });

            observer.observe(element);
        }
        // Hero slider animation and navigation
        document.addEventListener('DOMContentLoaded', function () {
            const slides = document.querySelectorAll('.hero-slides .slide');
            const contents = document.querySelectorAll('.hero-content-wrapper .hero-content');
            const dots = document.querySelectorAll('.slider-dot');
            let current = 0;
            let interval = null;

            function showSlide(index) {
                slides.forEach((slide, i) => {
                    slide.classList.toggle('active', i === index);
                });
                contents.forEach((content, i) => {
                    content.classList.toggle('active', i === index);
                    if (i === index) {
                        content.classList.add('animate-in');
                    } else {
                        content.classList.remove('animate-in');
                    }
                });
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                });
                current = index;
            }

            function nextSlide() {
                let next = (current + 1) % slides.length;
                showSlide(next);
            }

            // Auto slide
            interval = setInterval(nextSlide, 5000);

            // Dot navigation
            dots.forEach((dot, i) => {
                dot.addEventListener('click', () => {
                    clearInterval(interval);
                    showSlide(i);
                    interval = setInterval(nextSlide, 5000);
                });
            });

            // Initial animation
            showSlide(0);
        });
        // Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        const dropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');

        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            mobileMenu.classList.toggle('open');
        });

        // Mobile Dropdown Toggle
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                const parent = toggle.parentElement;
                const dropdown = parent.querySelector('.mobile-dropdown-menu');

                toggle.classList.toggle('active');
                dropdown.classList.toggle('open');
            });
        });

        // Header Scroll Effect
        const header = document.getElementById('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Close mobile menu when clicking on a link
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (!link.classList.contains('mobile-dropdown-toggle')) {
                    mobileMenuBtn.classList.remove('active');
                    mobileMenu.classList.remove('open');
                }
            });
        });