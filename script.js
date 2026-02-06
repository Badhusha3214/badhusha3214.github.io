function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
  
  // Update aria-expanded attribute for accessibility
  const isOpen = menu.classList.contains("open");
  icon.setAttribute("aria-expanded", isOpen);
}

// Close menu when clicking outside
document.addEventListener('click', function(e) {
  const hamburgerNav = document.querySelector('#hamburger-nav');
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  
  if (hamburgerNav && !hamburgerNav.contains(e.target) && menu.classList.contains('open')) {
    menu.classList.remove("open");
    icon.classList.remove("open");
    icon.setAttribute("aria-expanded", "false");
  }
});

// Add smooth scroll animation to sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        if (section) {
          section.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
          });
        }
    });
});

// Add scroll reveal animations
window.addEventListener('scroll', reveal);

function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 100;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Add active state to navigation based on scroll position
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('nav-active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('nav-active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Onload Animations
document.addEventListener('DOMContentLoaded', function() {
    // Trigger reveal for elements in view
    reveal();
    
    // Animate navigation
    const logo = document.querySelector('.logo');
    if (logo) logo.classList.add('slide-in-left');
    
    const navLinks = document.querySelectorAll('.nav-links li');
    navLinks.forEach((link, index) => {
        link.classList.add('fade-in-up', `delay-${index + 1}`);
    });

    // Animate profile section
    const profilePic = document.querySelector('#profile .section__pic-container');
    if (profilePic) profilePic.classList.add('pop-in', 'delay-1');

    const profileText = document.querySelector('#profile .section__text');
    const profileElements = profileText.children;
    Array.from(profileElements).forEach((element, index) => {
        element.classList.add('fade-in-up', `delay-${index + 2}`);
    });

    // Animate social icons
    const socialIcons = document.querySelectorAll('#socials-container img');
    socialIcons.forEach((icon, index) => {
        icon.classList.add('pop-in', `delay-${index + 4}`);
    });

    // Add loading state
    document.body.classList.add('loaded');
});

// Add preloader
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.display = 'none';
    }
});

// Add this to your existing script.js
function handleArrowClick() {
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const currentScroll = window.scrollY;
    
    // If we're not at the bottom, scroll to bottom
    if (currentScroll + windowHeight < documentHeight - 10) {
        window.scrollTo({
            top: documentHeight,
            behavior: 'smooth'
        });
    } else {
        // If we're at the bottom, scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}



// Add click event listener to the arrow
document.querySelector('.fixed-arrow').addEventListener('click', handleArrowClick);


// Arrow navigation functionality
function handleArrowClick() {
  const documentHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;
  const currentScroll = window.scrollY;
  const scrollThreshold = 100; // Threshold for considering bottom reached

  if (currentScroll + windowHeight >= documentHeight - scrollThreshold) {
      // If near bottom, scroll to top
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  } else {
      // If not at bottom, scroll to bottom
      window.scrollTo({
          top: documentHeight,
          behavior: 'smooth'
      });
  }
}
// ------------------------------------------------------------
function updateArrow() {
  const arrow = document.querySelector('.fixed-arrow');
  if (!arrow) return;

  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollThreshold = 100;

  // Hide arrow when at the very top
  if (scrollPosition < 100) {
      arrow.classList.add('hide');
  } else {
      arrow.classList.remove('hide');
  }

  // Change arrow direction based on scroll position
  if (scrollPosition + windowHeight >= documentHeight - scrollThreshold) {
      arrow.classList.add('up');
  } else {
      arrow.classList.remove('up');
  }
}

// Add scroll event listener with throttling
let isScrolling;
window.addEventListener('scroll', () => {
  clearTimeout(isScrolling);
  isScrolling = setTimeout(updateArrow, 50);
});

// Initial arrow setup
document.addEventListener('DOMContentLoaded', () => {
  updateArrow();
  
  // Add click event listener to the arrow
  const arrow = document.querySelector('.fixed-arrow');
  if (arrow) {
      arrow.addEventListener('click', handleArrowClick);
  }
});

// Update arrow on window resize
window.addEventListener('resize', updateArrow);

document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const nextButton = document.querySelector('.next-btn');
  const prevButton = document.querySelector('.prev-btn');
  const dotsContainer = document.querySelector('.carousel-dots');
  
  let currentIndex = 0;
  let slidesPerView = getSlidesPerView();
  
  // Create dots
  const totalDots = Math.ceil(slides.length / slidesPerView);
  for (let i = 0; i < totalDots; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }
  
  // Get number of slides to show based on screen width
  function getSlidesPerView() {
    if (window.innerWidth > 1024) return 3;
    if (window.innerWidth > 768) return 2;
    return 1;
  }
  
  // Update carousel position
  function updateCarousel() {
    const slideWidth = slides[0].offsetWidth;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    
    // Update dots
    document.querySelectorAll('.dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === Math.floor(currentIndex / slidesPerView));
    });
  }
  
  // Go to specific slide
  function goToSlide(index) {
    currentIndex = index * slidesPerView;
    if (currentIndex > slides.length - slidesPerView) {
      currentIndex = slides.length - slidesPerView;
    }
    updateCarousel();
  }
  
  // Next slide
  function nextSlide() {
    if (currentIndex < slides.length - slidesPerView) {
      currentIndex++;
      updateCarousel();
    }
  }
  
  // Previous slide
  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  }
  
  // Event listeners
  nextButton.addEventListener('click', nextSlide);
  prevButton.addEventListener('click', prevSlide);
  
  // Handle window resize
  window.addEventListener('resize', () => {
    const newSlidesPerView = getSlidesPerView();
    if (newSlidesPerView !== slidesPerView) {
      slidesPerView = newSlidesPerView;
      currentIndex = 0;
      updateCarousel();
      
      // Recreate dots
      dotsContainer.innerHTML = '';
      const totalDots = Math.ceil(slides.length / slidesPerView);
      for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      }
    }
  });
  
  // Initial setup
  updateCarousel();
});

// Initialize Swiper
document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('.project-swiper', {
        // Optional parameters
        loop: true,
        spaceBetween: 30,
        grabCursor: true,
        
        // Enable autoplay
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        
        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        
        // Pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        
        // Responsive breakpoints
        breakpoints: {
            // Mobile
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            // Tablet
            768: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            // Desktop
            1024: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        },
        
        // Effects
        effect: 'slide',
        speed: 800,
    });
});