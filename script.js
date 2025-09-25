// Initialize AOS
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
    
    // Initialize carousel after DOM is loaded
    initCarousel();
});

// typing

const elements = [
  { id: "title", text: "About Us" },
  { id: "para1", text: "TechLink is dedicated to enhancing digital literacy among first-year BSIT students through a structured learning program. We provide updated technology and resources to help students excel in their studies and prepare for future careers." },
  { id: "para2", text: "Our team thoughtfully selects and tests each tool to ensure it meets high standards of performance, reliability, and value. We are passionate about technology and committed to helping learners maximize the potential of their devices." },
  { id: "para3", text: "Through continuous innovation and support, TechLink strives to empower students with the skills needed to succeed in today’s digital world." }
];

function typeEffect(element, text, speed, callback) {
  let i = 0;
  element.innerHTML = "";
  const timer = setInterval(() => {
    element.innerHTML += text.charAt(i);
    i++;
    if (i >= text.length) {
      clearInterval(timer);
      if (callback) callback();
    }
  }, speed);
}

// Function to type all elements sequentially
function typeAll(elements, speed, index = 0) {
  if (index < elements.length) {
    const el = document.getElementById(elements[index].id);
    typeEffect(el, elements[index].text, speed, () => typeAll(elements, speed, index + 1));
  }
}

// Start typing with desired speed
typeAll(elements, 15);

// Add button click handlers for carousel
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers for carousel buttons
    const lessonsBtn = document.getElementById('lessonsBtn');
    const gamesBtn = document.getElementById('gamesBtn');
    
    if (lessonsBtn) {
        lessonsBtn.addEventListener('click', function() {
            window.location.href = 'main/lessons.html';
        });
    }
    
    if (gamesBtn) {
        gamesBtn.addEventListener('click', function() {
            window.location.href = 'main/games.html';
        });
    }
});
// Main Carousel Functionality
function initCarousel() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    
    // Ensure only the first slide is active initially
    slides.forEach((slide, index) => {
        if (index === 0) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
    
    function showSlide(n) {
        // Remove active class from all slides
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Update current slide index
        currentSlide = (n + totalSlides) % totalSlides;
        
        // Add active class to the current slide
        slides[currentSlide].classList.add('active');
        
        // Refresh AOS for new slide animations
        AOS.refresh();
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // Auto advance slides every 5 seconds
    setInterval(nextSlide, 5000);
}

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

// Products Carousel Manual Control
const productsContainer = document.querySelector('.products-container');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const productCards = document.querySelectorAll('.product-card');

if (productCards.length > 0) {
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
}

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