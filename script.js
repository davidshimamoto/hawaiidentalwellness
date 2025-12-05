// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link, .btn-book');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.padding = '10px 0';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.padding = '20px 0';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
    }

    lastScroll = currentScroll;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.feature-card, .service-card, .team-card, .testimonial-card, .about-content, .about-image');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);

        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        alert('Thank you for your message! We will get back to you soon. Mahalo!');

        // Reset form
        contactForm.reset();
    });
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');

    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - (scrolled * 0.002);
    }
});

// Counter animation for stats
const stats = document.querySelectorAll('.stat-number');
const statsSection = document.querySelector('.about-stats');

const animateCounter = (element, target) => {
    const targetNumber = parseInt(target.replace(/\D/g, ''));
    const duration = 2000;
    const increment = targetNumber / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < targetNumber) {
            element.textContent = Math.ceil(current) + (target.includes('+') ? '+' : '') + (target.includes('%') ? '%' : '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
};

if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                stats.forEach(stat => {
                    const target = stat.textContent;
                    animateCounter(stat, target);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
}

// Add wave animation intensity based on scroll
const waves = document.querySelectorAll('.wave');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    waves.forEach((wave, index) => {
        const speed = (index + 1) * 0.05;
        wave.style.transform = `translateX(${-scrolled * speed}px)`;
    });
});

// Add hover effect to service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Lazy loading for better performance
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

// Add active state to navigation based on scroll position
const sections = document.querySelectorAll('section[id]');

const highlightNavigation = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink.style.color = 'var(--ocean-blue)';
        } else if (navLink) {
            navLink.style.color = 'var(--text-dark)';
        }
    });
};

window.addEventListener('scroll', highlightNavigation);

// Add entrance animation to hero
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 1s ease forwards';
    }
});

// Console message
console.log('%c🌺 Hawaii Dental Wellness - Made with Aloha 🌺', 'color: #0ea5e9; font-size: 16px; font-weight: bold;');

// Blog Posts Data Structure
const blogPosts = [
    {
        id: 1,
        title: "5 Tips for Maintaining Your Smile This Summer",
        excerpt: "Summer in Hawaii is beautiful, but the heat and activities can affect your dental health. Learn how to keep your smile bright and healthy all season long.",
        category: "Tips & Advice",
        date: "November 15, 2024",
        author: "Dr. Chad Kawashima",
        image: "images/blog-placeholder-1.jpg",
        imageGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
        id: 2,
        title: "The Benefits of Regular Dental Cleanings",
        excerpt: "Discover why professional cleanings are essential for your oral health and how they can prevent serious dental issues down the road.",
        category: "Preventive Care",
        date: "November 1, 2024",
        author: "Dr. Randal Motooka",
        image: "images/blog-placeholder-2.jpg",
        imageGradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    {
        id: 3,
        title: "Teeth Whitening: What You Need to Know",
        excerpt: "Thinking about brightening your smile? We answer common questions about professional teeth whitening and what to expect from the process.",
        category: "Cosmetic",
        date: "October 20, 2024",
        author: "Dr. Chad Kawashima",
        image: "images/blog-placeholder-3.jpg",
        imageGradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    }
];

// Function to render blog posts
function renderBlogPosts() {
    const blogGrid = document.getElementById('blog-grid');

    if (!blogGrid) return;

    blogGrid.innerHTML = '';

    blogPosts.forEach(post => {
        const blogCard = document.createElement('div');
        blogCard.className = 'blog-card';

        blogCard.innerHTML = `
            <div class="blog-image" style="background: ${post.imageGradient};">
                <span class="blog-category">${post.category}</span>
            </div>
            <div class="blog-content">
                <div class="blog-meta">
                    <span class="blog-date">📅 ${post.date}</span>
                    <span class="blog-author">✍️ ${post.author}</span>
                </div>
                <h3>${post.title}</h3>
                <p class="blog-excerpt">${post.excerpt}</p>
                <a href="#" class="blog-read-more" data-post-id="${post.id}">Read More</a>
            </div>
        `;

        blogGrid.appendChild(blogCard);
    });

    // Add entrance animations to blog cards
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Initialize blog posts when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderBlogPosts);
} else {
    renderBlogPosts();
}

// Add function to add new blog post
function addBlogPost(post) {
    blogPosts.unshift(post);
    renderBlogPosts();
}

// Add function to get all blog posts
function getAllBlogPosts() {
    return blogPosts;
}

// Add function to get blog post by ID
function getBlogPostById(id) {
    return blogPosts.find(post => post.id === id);
}
