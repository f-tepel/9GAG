let register = () => {
    let email = document.getElementById('email').value
    let username = document.getElementById('username').value
    let password = document.getElementById('password').value
    let confirmPassword = document.getElementById('confirmPassword').value

    if(email == '') {
        return alert('Please enter an email')
    } else if (username == '') {
        return alert('Please enter a username')
    } else if(password == '') {
        return alert('Please enter password')
    } else if(password.length < 9) {
        return alert('Password must have at least 9 characters')
    } else if(password != confirmPassword) {
        return alert('Passwords are not equal')
    } else {
        $.ajax({
            url: '/api/user/register',
            type: 'POST',
            data: {
                email,
                username,
                password
            },
            success: (data, textStatus, request) => {
                let xAuth = request.getResponseHeader('x-auth');
                localStorage.setItem('x-auth', xAuth);
                window.location.href = '/dashboard';
            },
            error: (res) => {   
                alert('Email is already in use');
            }
        })       
    }
}