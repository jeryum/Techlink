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
const mobileMenu = document.querySelector('.mobile-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (mobileMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.mobile-nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const mobileThemeToggle = document.getElementById('mobileThemeToggle');
const themeIcon = themeToggle.querySelector('i');
const mobileThemeIcon = mobileThemeToggle.querySelector('i');

// Check for saved theme preference
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    mobileThemeIcon.classList.remove('fa-moon');
    mobileThemeIcon.classList.add('fa-sun');
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        mobileThemeIcon.classList.remove('fa-moon');
        mobileThemeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        mobileThemeIcon.classList.remove('fa-sun');
        mobileThemeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
}

themeToggle.addEventListener('click', toggleTheme);
mobileThemeToggle.addEventListener('click', toggleTheme);

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


// Refresh AOS when window is resized
window.addEventListener('resize', function() {
    AOS.refresh();
});

// Fix for mobile viewport height issue
function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVH();
window.addEventListener('resize', setVH);