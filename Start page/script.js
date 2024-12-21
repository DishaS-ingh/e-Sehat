// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
    }
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: this.querySelector('input[type="text"]').value,
        email: this.querySelector('input[type="email"]').value,
        message: this.querySelector('textarea').value
    };

    try {
        // Send data to backend
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        
        if (result.success) {
            // Clear form
            this.reset();
            
            // Show success message
            alert(result.message);
        } else {
            throw new Error(result.message || 'Something went wrong');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error sending your message. Please try again later.');
    }
});

// Service cards animation
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Create an images folder and placeholder images
async function createPlaceholderImages() {
    // This would typically be handled by your backend
    console.log('Note: Please add actual images to the images folder:');
    console.log('- hero.jpg (hero section background)');
    console.log('- consultation.jpg (online consultation service)');
    console.log('- pharmacy.jpg (e-pharmacy service)');
    console.log('- records.jpg (health records service)');
    console.log('- about.jpg (about section)');
}

// Call the function when the page loads
window.addEventListener('load', createPlaceholderImages);
