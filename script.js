document.addEventListener('DOMContentLoaded', function() {
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

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            displayError('Please enter a valid email address');
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
                showPopup();
                form.reset();
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
            // Show the thank you popup after successful submission
            showPopup();
        } catch (error) {
            console.error('Error:', error);
            alert('There was an issue submitting your form. Please try again.');
        }
    });
    
    // Function to show the popup
    function showPopup() {
        thankYouPopup.style.display = 'block'; // Show the popup
    }

    // Function to close the popup
    function closePopup() {
        thankYouPopup.style.display = 'none'; // Hide the popup
    }
});

