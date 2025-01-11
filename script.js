// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const topDiv = document.querySelector('.topdiv');
    const bioContent = document.querySelector('.bio-content');
    const bioToggle = document.querySelector('.bio-toggle');
    
    // Hamburger menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            topDiv.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        const menuLinks = document.querySelectorAll('.topmenu');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                topDiv.classList.remove('active');
            });
        });
    }

    // Bio toggle functionality
    if (bioToggle) {
        bioToggle.addEventListener('click', () => {
            bioContent.classList.toggle('expanded');
            bioToggle.textContent = bioContent.classList.contains('expanded') ? 'Read Less' : 'Read More';
        });
    }

    // Form handling
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (!name.trim() || !email.trim() || !message.trim()) {
            displayError('Please fill in all fields');
            return;
        }
        
        try {
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            const response = await fetch('https://formsubmit.co/ajax/rmkuhn518@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message
                })
            });
            
            if (response.ok) {
                form.reset();
                submitButton.textContent = 'Sent!';
                showPopup();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            displayError('There was an error sending your message. Please try again.');
        } finally {
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.textContent = 'Send Message';
            submitButton.disabled = false;
        }
    });
});

function displayError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

function showPopup() {
    const thankYouPopup = document.getElementById('thankYouPopup');
    thankYouPopup.style.display = 'block';
    
    thankYouPopup.addEventListener('click', function(e) {
        if (e.target === thankYouPopup) {
            closePopup();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closePopup();
        }
    });
}

function closePopup() {
    const thankYouPopup = document.getElementById('thankYouPopup');
    thankYouPopup.style.display = 'none';
}
