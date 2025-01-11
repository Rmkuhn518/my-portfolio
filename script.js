document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const thankYouPopup = document.getElementById('thankYouPopup');
    
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
            
            // Hide the contact form and show the thank you popup
            form.style.display = 'none';   // Hide the form
            showPopup();                   // Show the thank you popup
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
        form.style.display = 'block';          // Show the form again
        form.reset();                          // Optionally reset the form for future use
    }
});
