// ============================================
// TECH-LINK MAIN JAVASCRIPT FILE
// ============================================
// This file handles common functionality across all pages
// Uses module pattern to avoid global scope pollution
// ============================================

(function() {
  'use strict';

  // ============================================
  // STATE MANAGEMENT
  // ============================================
  
  const State = {
    isDarkMode: localStorage.getItem('theme') === 'dark',
    isMobileMenuOpen: false,
    aosInitialized: false
  };

  // ============================================
  // DOM ELEMENT REFERENCES
  // ============================================
  
  const DomElements = {
    body: document.body,
    themeToggle: document.getElementById('themeToggle'),
    mobileThemeToggle: document.getElementById('mobileThemeToggle'),
    hamburger: document.querySelector('.hamburger'),
    mobileMenu: document.querySelector('.mobile-menu'),
    closeMenu: document.getElementById('closeMenu'),
    mobileLinks: document.querySelectorAll('.mobile-nav-links a')
  };

  // ============================================
  // THEME MANAGEMENT
  // ============================================

  function initializeTheme() {
    // Set initial theme from localStorage or system preference
    if (State.isDarkMode) {
      DomElements.body.classList.add('dark-mode');
      updateThemeIcons('dark');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      DomElements.body.classList.add('dark-mode');
      updateThemeIcons('dark');
      State.isDarkMode = true;
    }

    // Add theme toggle listeners
    if (DomElements.themeToggle) {
      DomElements.themeToggle.addEventListener('click', toggleTheme);
    }
    
    if (DomElements.mobileThemeToggle) {
      DomElements.mobileThemeToggle.addEventListener('click', toggleTheme);
    }
  }

  function toggleTheme() {
    State.isDarkMode = !DomElements.body.classList.contains('dark-mode');
    
    if (State.isDarkMode) {
      DomElements.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
      updateThemeIcons('dark');
    } else {
      DomElements.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
      updateThemeIcons('light');
    }
  }

  function updateThemeIcons(theme) {
    const icon = DomElements.themeToggle?.querySelector('i');
    const mobileIcon = DomElements.mobileThemeToggle?.querySelector('i');
    
    if (theme === 'dark') {
      if (icon) icon.className = 'fas fa-sun';
      if (mobileIcon) mobileIcon.className = 'fas fa-sun';
      if (DomElements.mobileThemeToggle) {
        DomElements.mobileThemeToggle.innerHTML = '<i class="fas fa-sun"></i> Toggle Theme';
      }
    } else {
      if (icon) icon.className = 'fas fa-moon';
      if (mobileIcon) mobileIcon.className = 'fas fa-moon';
      if (DomElements.mobileThemeToggle) {
        DomElements.mobileThemeToggle.innerHTML = '<i class="fas fa-moon"></i> Toggle Theme';
      }
    }
  }

  // ============================================
  // MOBILE MENU MANAGEMENT
  // ============================================

  function initializeMobileMenu() {
    if (DomElements.hamburger) {
      DomElements.hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    if (DomElements.closeMenu) {
      DomElements.closeMenu.addEventListener('click', toggleMobileMenu);
    }
    
    // Close menu when clicking on links
    DomElements.mobileLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
    
    // Close menu when clicking outside (on backdrop)
    if (DomElements.mobileMenu) {
      DomElements.mobileMenu.addEventListener('click', function(e) {
        if (e.target === this) {
          closeMobileMenu();
        }
      });
    }
    
    // Close menu on window resize (if mobile menu is open on desktop)
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768 && State.isMobileMenuOpen) {
        closeMobileMenu();
      }
    });
  }

  function toggleMobileMenu() {
    if (!DomElements.mobileMenu || !DomElements.hamburger) return;
    
    State.isMobileMenuOpen = !State.isMobileMenuOpen;
    
    if (State.isMobileMenuOpen) {
      DomElements.mobileMenu.classList.add('active');
      DomElements.hamburger.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
      DomElements.mobileMenu.classList.remove('active');
      DomElements.hamburger.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
    }
  }

  function closeMobileMenu() {
    if (!State.isMobileMenuOpen || !DomElements.mobileMenu || !DomElements.hamburger) return;
    
    State.isMobileMenuOpen = false;
    DomElements.mobileMenu.classList.remove('active');
    DomElements.hamburger.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  }

  // ============================================
  // AOS ANIMATIONS
  // ============================================

  function initializeAOS() {
    if (typeof AOS === 'undefined' || State.aosInitialized) return;
    
    AOS.init({
      duration: 400,
      once: true,
      offset: 50,
      delay: 100,
      easing: 'ease-in-out'
    });
    
    State.aosInitialized = true;
  }

  // ============================================
  // UTILITY FUNCTIONS
  // ============================================

  function isElementInViewport(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // ============================================
  // INITIALIZATION
  // ============================================

  function initializeAll() {
    // Initialize theme system
    initializeTheme();
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Initialize animations
    initializeAOS();
    
    // Handle page visibility (for tab switching)
    document.addEventListener('visibilitychange', function() {
      if (!document.hidden && State.aosInitialized) {
        AOS.refresh();
      }
    });
    
    // Refresh AOS on window load (for images that might affect layout)
    window.addEventListener('load', function() {
      if (State.aosInitialized) {
        AOS.refresh();
      }
    });
    
    // Console log for debugging (remove in production)
    console.log('TechLink initialized successfully');
  }

  // ============================================
  // PUBLIC API (if needed for other scripts)
  // ============================================

  window.TechLink = {
    toggleTheme: toggleTheme,
    toggleMobileMenu: toggleMobileMenu,
    closeMobileMenu: closeMobileMenu,
    refreshAOS: function() {
      if (State.aosInitialized) AOS.refresh();
    },
    isDarkMode: function() {
      return State.isDarkMode;
    }
  };

  // ============================================
  // START EVERYTHING
  // ============================================

  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAll);
  } else {
    initializeAll();
  }

})(); // End of IIFE