document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const popup = document.getElementById('thankYouPopup');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Validate form (optional additional validation)
        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            alert('Please fill in all fields');
            return;
        }
        
        // Show popup
        showPopup();
        
        // Reset form
        form.reset();
    });
});

function showPopup() {
    const popup = document.getElementById('thankYouPopup');
    popup.style.display = 'block';
}

function closePopup() {
    const popup = document.getElementById('thankYouPopup');
    popup.style.display = 'none';
}
