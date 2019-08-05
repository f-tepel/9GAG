let login = () => {
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    $.ajax({
        url: '/api/user/login',
        type: 'POST',
        data: {
            email,
            password
        },
        success: (data, textStatus, request) => {
            let xAuth = request.getResponseHeader('x-auth');
            localStorage.setItem('x-auth', xAuth);
            window.location.href = '/dashboard';
        },
        error: (res) => {
            alert('Email or password is incorrect. Please try again.')
        }
    })
}