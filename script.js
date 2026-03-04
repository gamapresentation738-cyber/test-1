// WhatsApp Configuration
const WHATSAPP_NUMBER = '919301252524'; // Replace with your actual WhatsApp number

// Smooth scrolling for navigation links
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
// Filter Gallery by Category
function filterGallery(category) {
    // Get all gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Get all filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Remove active class from all buttons
    filterBtns.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    const activeBtn = document.querySelector(`[data-filter="${category}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    // Show/Hide gallery items
    galleryItems.forEach(item => {
        if (category === 'all') {
            item.style.display = 'block';
            item.classList.add('fade-in');
        } else if (item.getAttribute('data-category') === category) {
            item.style.display = 'block';
            item.classList.add('fade-in');
        } else {
            item.style.display = 'none';
            item.classList.remove('fade-in');
        }
    });
    
    // Scroll to gallery section
    document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
}
// Gallery Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        galleryItems.forEach(item => {
            if (filterValue === 'all') {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.animation = 'fadeIn 0.6s ease-out';
                }, 0);
            } else {
                if (item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.animation = 'fadeIn 0.6s ease-out';
                    }, 0);
                } else {
                    item.style.display = 'none';
                }
            }
        });
    });
});
// Change carousel image
function changeImage(button, direction) {
    // Get the carousel container
    const carousel = button.closest('.gallery-image-carousel');
    const images = carousel.querySelectorAll('.carousel-image');
    const thumbnails = carousel.parentElement.querySelectorAll('.thumbnail');
    const counter = carousel.querySelector('.image-counter');
    
    // Find current active image
    let currentIndex = 0;
    images.forEach((img, index) => {
        if (img.classList.contains('active')) {
            currentIndex = index;
        }
    });
    
    // Calculate new index
    let newIndex = currentIndex + direction;
    if (newIndex >= images.length) {
        newIndex = 0; // Loop to first
    } else if (newIndex < 0) {
        newIndex = images.length - 1; // Loop to last
    }
    
    // Remove active class from all
    images.forEach(img => img.classList.remove('active'));
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    
    // Add active class to new image
    images[newIndex].classList.add('active');
    thumbnails[newIndex].classList.add('active');
    
    // Update counter
    counter.querySelector('.current-img').textContent = newIndex + 1;
}

// Show image from thumbnail click
function showImage(thumbnail) {
    // Get parent gallery item
    const galleryItem = thumbnail.closest('.gallery-item');
    const carousel = galleryItem.querySelector('.gallery-image-carousel');
    const images = carousel.querySelectorAll('.carousel-image');
    const thumbnails = galleryItem.querySelectorAll('.thumbnail');
    const counter = carousel.querySelector('.image-counter');
    
    // Find thumbnail index
    let index = 0;
    thumbnails.forEach((thumb, i) => {
        if (thumb === thumbnail) {
            index = i;
        }
    });
    
    // Remove active class from all
    images.forEach(img => img.classList.remove('active'));
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    
    // Add active class to selected image
    images[index].classList.add('active');
    thumbnail.classList.add('active');
    
    // Update counter
    counter.querySelector('.current-img').textContent = index + 1;
}

// Keyboard navigation (optional)
document.addEventListener('keydown', (e) => {
    const activeCarousel = document.querySelector('.gallery-image-carousel:hover');
    if (!activeCarousel) return;
    
    if (e.key === 'ArrowLeft') {
        activeCarousel.querySelector('.carousel-btn.prev').click();
    } else if (e.key === 'ArrowRight') {
        activeCarousel.querySelector('.carousel-btn.next').click();
    }
});

// WhatsApp Form Submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const projectType = document.getElementById('projectType').value;
    const message = document.getElementById('message').value;

    // Create WhatsApp message
    const whatsappMessage = encodeURIComponent(
        `Hello HATIMI ALUMINIUM FABRIVATIONS,\n\n` +
        `I would like to inquire about your services.\n\n` +
        `*Customer Details:*\n` +
        `Name: ${fullName}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone}\n` +
        `Project Type: ${projectType}\n\n` +
        `*Project Details:*\n` +
        `${message}\n\n` +
        `Looking forward to your response.`
    );

    // Create WhatsApp link
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

    // Show success message
    const submitButton = this.querySelector('.submit-button');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '✓ Redirecting to WhatsApp...';
    submitButton.style.background = 'linear-gradient(135deg, #3A7D2D, #1F3A0B)';

    // Redirect to WhatsApp after a short delay
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        
        // Reset form
        setTimeout(() => {
            contactForm.reset();
            submitButton.innerHTML = originalText;
            submitButton.style.background = '';
        }, 1000);
    }, 500);
});

// Intersection Observer for animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all service items, gallery items, and feature cards
document.querySelectorAll('.service-item, .feature-card').forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--royal-green)';
        } else {
            link.style.color = '';
        }
    });
});

// Add hover effect to floating shapes
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.floating-shape');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const moveX = (x - 0.5) * (index + 1) * 20;
        const moveY = (y - 0.5) * (index + 1) * 20;
        shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

// Initialize animations
window.addEventListener('load', () => {
    // Add animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 1s ease-out';
    }
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
});

// CTA button click
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        document.getElementById('contact').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

console.log('✨ hatimi aluminium fabrications website loaded successfully with WhatsApp integration!');
