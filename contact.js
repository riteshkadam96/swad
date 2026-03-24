document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // In a real application, you would send this to a server
    console.log('Form submitted:', { name, email, message });

    // Show success message
    alert('Thank you for your message! We will get back to you soon.');

    // Clear form
    this.reset();
});