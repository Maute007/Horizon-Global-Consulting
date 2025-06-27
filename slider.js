// // Slider JavaScript - slider.js
// document.addEventListener('DOMContentLoaded', function() {
//     let currentSlideIndex = 0;
//     const slides = document.querySelectorAll('.slide');
//     const dots = document.querySelectorAll('.dot');
//     const totalSlides = slides.length;
//     let slideInterval;

//     // Function to show specific slide
//     function showSlide(index) {
//         // Remove active class from all slides and dots
//         slides.forEach(slide => {
//             slide.classList.remove('active', 'prev');
//         });
//         dots.forEach(dot => {
//             dot.classList.remove('active');
//         });

//         // Add active class to current slide and dot
//         slides[index].classList.add('active');
//         dots[index].classList.add('active');

//         // Add prev class to previous slide for animation
//         const prevIndex = index === 0 ? totalSlides - 1 : index - 1;
//         slides[prevIndex].classList.add('prev');
//     }

//     // Function to go to next slide
//     function nextSlide() {
//         currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
//         showSlide(currentSlideIndex);
//     }

//     // Function to go to specific slide (for dot navigation)
//     function currentSlide(index) {
//         currentSlideIndex = index - 1; // Convert to 0-based index
//         showSlide(currentSlideIndex);
//         restartAutoSlide(); // Restart auto-slide when user interacts
//     }

//     // Function to start auto-slide
//     function startAutoSlide() {
//         slideInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
//     }

//     // Function to restart auto-slide
//     function restartAutoSlide() {
//         clearInterval(slideInterval);
//         startAutoSlide();
//     }

//     // Add click event listeners to dots
//     dots.forEach((dot, index) => {
//         dot.addEventListener('click', () => {
//             currentSlide(index + 1);
//         });
//     });

//     // Pause auto-slide on hover
//     const heroSection = document.querySelector('.hero');
//     if (heroSection) {
//         heroSection.addEventListener('mouseenter', () => {
//             clearInterval(slideInterval);
//         });

//         heroSection.addEventListener('mouseleave', () => {
//             startAutoSlide();
//         });
//     }

//     // Start the auto-slide when page loads
//     startAutoSlide();

//     // Optional: Add keyboard navigation
//     document.addEventListener('keydown', function(e) {
//         if (e.key === 'ArrowLeft') {
//             currentSlideIndex = currentSlideIndex === 0 ? totalSlides - 1 : currentSlideIndex - 1;
//             showSlide(currentSlideIndex);
//             restartAutoSlide();
//         } else if (e.key === 'ArrowRight') {
//             nextSlide();
//             restartAutoSlide();
//         }
//     });
// });