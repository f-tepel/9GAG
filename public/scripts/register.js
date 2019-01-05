let register = () => {
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value

    $.ajax({
        url: '/api/user/register',
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
            alert('error' + res.status + ': ' + res.responseText);
        }
    })
}