    <div class="contact-form">
      <h2>Shoot Me a Message!</h2>
      <form id="contactForm" action="https://formsubmit.co/rmkuhn518@gmail.com" method="POST">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" required>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required>
        </div>
        <div class="form-group">
          <label for="message">Message:</label>
          <textarea id="message" name="message" required></textarea>
        </div>
        <button class="contact-button" type="submit">Send Message</button>
      </form>

      <div id="thankYouPopup" class="popup">
        <div class="popup-content">
          <h3>Hey, thanks for that!</h3>
          <p>I'll will get back to you soon.</p>
          <button onclick="closePopup()">Close</button>
        </div>
      </div>
    </div>document.addEventListener('DOMContentLoaded', function() {
    // Get the form and popup elements
    const form = document.getElementById('contactForm');
    const thankYouPopup = document.getElementById('thankYouPopup');

    // Form submission handler
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Basic validation
        if (!name.trim() || !email.trim() || !message.trim()) {
            displayError('Please fill in all fields');
            return;
        }
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            displayError('Please enter a valid email address');
            return;
        }

        try {
            // Show loading state (optional)
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Submit the form data using FormSubmit's AJAX endpoint
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

            // Check if the submission was successful
            if (response.ok) {
                // Show success popup
                showPopup();
                // Reset the form
                form.reset();
            } else {
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
    const errorDiv = document.getElementById('errorMessage') || createErrorDiv();
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';

    // Automatically hide the error after 5 seconds
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}
// Function to create error div if it doesn't exist
function createErrorDiv() {
    const errorDiv = document.createElement('div');
    errorDiv.id = 'errorMessage';
    errorDiv.className = 'error-message';
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(errorDiv, form);
    return errorDiv;
}
// Function to show the thank you popup
function showPopup() {
    const popup = document.getElementById('thankYouPopup');
    popup.style.display = 'block';

    // Close popup when clicking outside
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            closePopup();
        }
    });

    // Close popup when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closePopup();
        }
    });
}
// Function to close the popup
function closePopup() {
    const popup = document.getElementById('thankYouPopup');
    popup.style.display = 'none';
}
