
        let currentSlide = 0;
        const slides = document.querySelectorAll('.carousel-slide');
        const indicators = document.querySelectorAll('.indicator');
        const totalSlides = slides.length;
        let autoSlideInterval;

        function updateCarousel() {
            const wrapper = document.getElementById('carouselWrapper');
            wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            indicators.forEach((indicator, index) => {
                if (index === currentSlide) {
                    indicator.classList.add('active');
                    indicator.setAttribute('aria-selected', 'true');
                } else {
                    indicator.classList.remove('active');
                    indicator.setAttribute('aria-selected', 'false');
                }
            });
        }

        function moveSlide(direction) {
            currentSlide += direction;
            
            if (currentSlide < 0) {
                currentSlide = totalSlides - 1;
            } else if (currentSlide >= totalSlides) {
                currentSlide = 0;
            }
            
            updateCarousel();
            resetAutoSlide();
        }

        function goToSlide(index) {
            currentSlide = index;
            updateCarousel();
            resetAutoSlide();
        }

        function autoSlide() {
            moveSlide(1);
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(autoSlide, 5000);
        }

        updateCarousel();
        autoSlideInterval = setInterval(autoSlide, 5000);

        const carouselContainer = document.querySelector('.carousel-container');
        carouselContainer.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        carouselContainer.addEventListener('mouseleave', resetAutoSlide);
        carouselContainer.addEventListener('focusin', () => clearInterval(autoSlideInterval));
        carouselContainer.addEventListener('focusout', resetAutoSlide);

        document.addEventListener('keydown', (e) => {
            if (document.activeElement.closest('.carousel-container')) {
                if (e.key === 'ArrowLeft') {
                    moveSlide(-1);
                } else if (e.key === 'ArrowRight') {
                    moveSlide(1);
                }
            }
        });

        // Smooth scroll para links internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });