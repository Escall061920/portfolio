// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });
    
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    
    themeToggle.addEventListener('click', function() {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
    
    // Animate skill cards on scroll
    const skillCards = document.querySelectorAll('.skill-card');
    
    // Intersection Observer for revealing elements on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, Array.from(skillCards).indexOf(entry.target) * 80);
                
                // Unobserve after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    
    // Observe each skill card
    skillCards.forEach(card => {
        observer.observe(card);
    });
    
    // Handle contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill all fields');
                return;
            }
            
            // You would normally send this data to a server
            // For demo purposes, we'll just show an alert
            alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Add project hover class to all projects
    document.querySelectorAll('#projects .bg-white, #projects .dark\\:bg-gray-700').forEach(project => {
        project.classList.add('project-hover');
    });

    // Image Lightbox functionality
    const imageModal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const closeModal = document.getElementById('close-modal');
    const projectImages = document.querySelectorAll('.project-image');
    
    // Open modal when clicking on project images
    projectImages.forEach(container => {
        container.addEventListener('click', function() {
            const imgSrc = this.getAttribute('data-img');
            const imgAlt = this.getAttribute('data-alt');
            
            if (imgSrc) {
                modalImage.src = imgSrc;
                modalImage.alt = imgAlt || '';
                imageModal.classList.remove('hidden');
                document.body.style.overflow = 'hidden'; // Prevent scrolling while modal is open
            }
        });
    });
    
    // Close modal when clicking the close button
    closeModal.addEventListener('click', function() {
        imageModal.classList.add('hidden');
        document.body.style.overflow = ''; // Restore scrolling
    });
    
    // Close modal when clicking outside the image
    imageModal.addEventListener('click', function(e) {
        if (e.target === imageModal) {
            imageModal.classList.add('hidden');
            document.body.style.overflow = ''; // Restore scrolling
        }
    });
    
    // Close modal when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !imageModal.classList.contains('hidden')) {
            imageModal.classList.add('hidden');
            document.body.style.overflow = ''; // Restore scrolling
        }
    });
    
    // Make all external links open in a new tab
    document.querySelectorAll('a[href^="http"], a[href^="https"], a[href^="mailto:"]').forEach(link => {
        if (!link.getAttribute('target')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
}); 