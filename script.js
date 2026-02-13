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

// Form submission handling with AJAX
const contactForm = document.querySelector('.contact-form');
const submitBtn = document.getElementById('submit-btn');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Disable submit button to prevent double submissions
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        // Hide any previous messages
        formMessage.style.display = 'none';

        // Get form data
        const formData = new FormData(contactForm);

        try {
            // Send form data to PHP handler
            const response = await fetch('send-appointment.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            // Display message
            formMessage.style.display = 'block';

            if (result.success) {
                // Success
                formMessage.style.background = '#d1fae5';
                formMessage.style.color = '#065f46';
                formMessage.style.border = '2px solid #10b981';
                formMessage.innerHTML = `
                    <strong>✓ Success!</strong><br>
                    ${result.message}
                `;

                // Reset form
                contactForm.reset();

                // Auto-hide message after 10 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 10000);

            } else {
                // Error
                formMessage.style.background = '#fee2e2';
                formMessage.style.color = '#991b1b';
                formMessage.style.border = '2px solid #ef4444';
                formMessage.innerHTML = `
                    <strong>✗ Error</strong><br>
                    ${result.message}
                    ${result.errors ? '<br><br>' + result.errors.join('<br>') : ''}
                `;
            }

        } catch (error) {
            // Network or other error
            formMessage.style.display = 'block';
            formMessage.style.background = '#fee2e2';
            formMessage.style.color = '#991b1b';
            formMessage.style.border = '2px solid #ef4444';
            formMessage.innerHTML = `
                <strong>✗ Error</strong><br>
                There was a problem submitting your request. Please call us at (808) 533-3892 or email david@hawaiidentalwellness.com
            `;
            console.error('Form submission error:', error);
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Request';
        }
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

// RSS Feed Configuration
const RSS_FEED_URL = 'http://blog.hawaiidentalwellness.com/feed/';
const MAX_POSTS = 6; // Number of posts to display

// Color gradients for blog cards
const BLOG_GRADIENTS = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
];

// Message to show if RSS feed fails
const NO_POSTS_MESSAGE = 'Check back later for new updates!';

/**
 * Parse RSS feed XML and extract blog posts
 */
function parseRSSFeed(xmlText) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

    // Check for parsing errors
    if (xmlDoc.querySelector('parsererror')) {
        console.error('Error parsing RSS feed');
        return null;
    }

    const items = xmlDoc.querySelectorAll('item');
    const posts = [];

    items.forEach((item, index) => {
        if (index >= MAX_POSTS) return; // Limit number of posts

        // Extract post data
        const title = item.querySelector('title')?.textContent || 'Untitled Post';
        const link = item.querySelector('link')?.textContent || '#';
        const description = item.querySelector('description')?.textContent || '';
        const pubDate = item.querySelector('pubDate')?.textContent || '';
        const category = item.querySelector('category')?.textContent || 'General';

        // Create excerpt (strip HTML and limit length)
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = description;
        let excerpt = tempDiv.textContent || tempDiv.innerText || '';
        excerpt = excerpt.substring(0, 150).trim() + (excerpt.length > 150 ? '...' : '');

        // Parse date
        const date = pubDate ? new Date(pubDate) : new Date();

        posts.push({
            title,
            link,
            excerpt,
            date,
            category
        });
    });

    return posts;
}

/**
 * Fetch blog posts from RSS feed
 */
async function fetchBlogPosts() {
    try {
        // Use a CORS proxy to fetch the RSS feed
        const corsProxy = 'https://api.allorigins.win/raw?url=';
        const response = await fetch(corsProxy + encodeURIComponent(RSS_FEED_URL));

        if (!response.ok) {
            throw new Error('Failed to fetch RSS feed');
        }

        const xmlText = await response.text();
        const posts = parseRSSFeed(xmlText);

        if (posts && posts.length > 0) {
            return posts;
        } else {
            throw new Error('No posts found in RSS feed');
        }
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return null; // Return null to indicate no posts available
    }
}

/**
 * Format date for display
 */
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Render blog posts to the page
 */
function renderBlogPosts(posts) {
    const blogGrid = document.getElementById('blog-grid');

    if (!blogGrid) return;

    // Clear existing content
    blogGrid.innerHTML = '';

    // Create cards for each post
    posts.forEach((post, index) => {
        const blogCard = document.createElement('div');
        blogCard.className = 'blog-card';

        const gradient = BLOG_GRADIENTS[index % BLOG_GRADIENTS.length];

        blogCard.innerHTML = `
            <div class="blog-image" style="background: ${gradient};">
                <span class="blog-category">${post.category}</span>
            </div>
            <div class="blog-content">
                <div class="blog-meta">
                    <span class="blog-date">📅 ${formatDate(post.date)}</span>
                </div>
                <h3>${post.title}</h3>
                <p class="blog-excerpt">${post.excerpt}</p>
                <a href="${post.link}" target="_blank" rel="noopener noreferrer" class="blog-read-more">Read More</a>
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

/**
 * Initialize blog section
 */
async function initializeBlog() {
    const blogGrid = document.getElementById('blog-grid');

    if (!blogGrid) return;

    // Show loading state
    blogGrid.innerHTML = '<p style="text-align: center; color: var(--medium-gray); padding: 40px;">Loading latest articles...</p>';

    // Fetch and render posts
    const posts = await fetchBlogPosts();

    if (posts && posts.length > 0) {
        renderBlogPosts(posts);
    } else {
        // Show "Check back later" message if no posts available
        blogGrid.innerHTML = `
            <div style="text-align: center; padding: 60px 20px;">
                <p style="font-size: 1.2rem; color: var(--medium-gray); margin: 0;">
                    ${NO_POSTS_MESSAGE}
                </p>
            </div>
        `;
    }
}

// Initialize blog when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeBlog);
} else {
    initializeBlog();
}
