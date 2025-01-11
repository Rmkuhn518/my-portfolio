document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();  // Stop the form from submitting normally
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Validate form
        if (!name.trim() || !email.trim() || !message.trim()) {
            displayError('Please fill in all fields');
            return;
        }
        
        try {
            // Show loading state
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Submit the form data
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
                // This line actually shows the popup
            // Show loading state
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.textContent = 'Sent!';
            submitButton.disabled = true;
            } 
            else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            displayError('There was an error sending your message. Please try again.');
        } finally {
            // Reset button state
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.textContent = 'Send Message';
            submitButton.disabled = false;
        }
    });
});

// Function to display error messages
function displayError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

// Your existing popup functions
function showPopup() {
    const popup = document.getElementById('thankYouPopup');
    popup.style.display = 'block';
    
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
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
    const popup = document.getElementById('thankYouPopup');
    popup.style.display = 'none';
}
