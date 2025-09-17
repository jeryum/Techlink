// Initialize AOS
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
});

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Main Carousel Auto-Sliding
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    
    // Add AOS animation to the newly active slide
    AOS.refresh();
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

// Auto advance slides every 5 seconds
setInterval(nextSlide, 5000);

// Products Carousel Manual Control
const productsContainer = document.querySelector('.products-container');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const productCards = document.querySelectorAll('.product-card');
const cardWidth = productCards[0].offsetWidth + 32; // width + margin

let scrollPosition = 0;
const maxScroll = productsContainer.scrollWidth - productsContainer.clientWidth;

nextBtn.addEventListener('click', () => {
    if (scrollPosition < maxScroll) {
        scrollPosition += cardWidth;
        // Ensure we don't scroll past the end
        scrollPosition = Math.min(scrollPosition, maxScroll);
        productsContainer.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }
});

prevBtn.addEventListener('click', () => {
    if (scrollPosition > 0) {
        scrollPosition -= cardWidth;
        // Ensure we don't scroll before the start
        scrollPosition = Math.max(scrollPosition, 0);
        productsContainer.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// View All button functionality
const viewAllBtn = document.querySelector('.view-all');
if (viewAllBtn) {
    viewAllBtn.addEventListener('click', () => {
        alert('View All products feature would show all available products.');
    });
}

// Carousel button functionality
const carouselButtons = document.querySelectorAll('.carousel-btn');
carouselButtons.forEach(button => {
    button.addEventListener('click', () => {
        alert('Special offer! Get 15% off on all gaming laptops this week!');
    });
});

// Refresh AOS when window is resized
window.addEventListener('resize', function() {
    AOS.refresh();
});