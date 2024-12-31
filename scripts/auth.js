// Form validation and submission handling
document.addEventListener('DOMContentLoaded', function() {
    console.log('Auth script loaded successfully');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    console.log('Login Form:', loginForm);
    console.log('Signup Form:', signupForm);

    // Predefined admin credentials
    const ADMIN_CREDENTIALS = [
        { username: 'soha', password: 'soha1234' },
        { username: 'lid', password: 'lid1234' },
        { username: 'kal', password: 'kal1234' }
    ];

    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            console.log('Login form submitted');
            e.preventDefault();
            
            // Get form values
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            console.log('Username:', username);
            console.log('Password:', password);

            // Validate form
            if (username.trim().length < 3) {
                showError('Please enter a valid username or email');
                return;
            }

            if (password.length < 6) {
                showError('Please enter your password');
                return;
            }

            // Check for admin credentials
            const isAdmin = ADMIN_CREDENTIALS.some(admin => 
                admin.username === username && admin.password === password
            );

            console.log('Is Admin:', isAdmin);

            if (isAdmin) {
                localStorage.setItem('username', username);
                localStorage.setItem('userType', 'admin');
                
                showSuccess('Admin Login successful! Redirecting...');
                
                setTimeout(() => {
                    window.location.href = 'admin-dashboard.html';
                }, 1500);
                return;
            }

            // Simulate a default student login
            localStorage.setItem('username', username);
            localStorage.setItem('userType', 'student');

            showSuccess('Login successful! Redirecting...');
            
            setTimeout(() => {
                window.location.href = 'student-dashboard.html';
            }, 1500);
        });
    }

    // Handle signup form submission
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            console.log('Signup form submitted');
            e.preventDefault();
            
            // Get form values
            const userType = document.querySelector('input[name="userType"]:checked')?.value;
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            console.log('User Type:', userType);
            console.log('Full Name:', fullName);
            console.log('Email:', email);
            console.log('Password:', password);
            console.log('Confirm Password:', confirmPassword);

            // Validate form
            if (!userType) {
                showError('Please select a user type');
                return;
            }

            if (fullName.trim().length < 2) {
                showError('Please enter a valid full name');
                return;
            }

            if (!validateEmail(email)) {
                showError('Please enter a valid email address');
                return;
            }

            if (password !== confirmPassword) {
                showError('Passwords do not match');
                return;
            }

            if (password.length < 8) {
                showError('Password must be at least 8 characters long');
                return;
            }

            // Simulate user registration (replace with actual backend logic)
            localStorage.setItem('username', fullName);
            localStorage.setItem('email', email);
            localStorage.setItem('userType', userType);

            showSuccess('Account created successfully! Redirecting to login...');
            
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        });
    }

    // Helper functions
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showError(message) {
        console.error(message);
        const errorContainer = document.createElement('div');
        errorContainer.className = 'error-message';
        errorContainer.textContent = message;
        
        const form = loginForm || signupForm;
        if (form) {
            const existingError = form.querySelector('.error-message');
            if (existingError) existingError.remove();
            form.insertBefore(errorContainer, form.querySelector('button'));
        }
    }

    function showSuccess(message) {
        console.log(message);
        const successContainer = document.createElement('div');
        successContainer.className = 'success-message';
        successContainer.textContent = message;
        
        const form = loginForm || signupForm;
        if (form) {
            const existingSuccess = form.querySelector('.success-message');
            if (existingSuccess) existingSuccess.remove();
            form.insertBefore(successContainer, form.querySelector('button'));
        }
    }
});
