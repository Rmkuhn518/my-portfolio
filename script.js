document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const popup = document.getElementById('Popup');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault(); // Temporarily prevent form submission
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Validate form
        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            alert('Please fill in all fields');
            return;
        }
        
        try {
            // Submit the form data
            await fetch('https://formsubmit.co/rmkuhn518@gmail.com', {
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
            
            // Show popup only after successful form submission
            showPopup();
        } catch (error) {
            console.error('Error:', error);
            alert('There was an issue submitting your form. Please try again.');
        }
    });
    
    function showPopup() {
        popup.style.display = 'block'; // Show popup
    }

    function closePopup() {
        popup.style.display = 'none'; // Hide popup
    }
});
