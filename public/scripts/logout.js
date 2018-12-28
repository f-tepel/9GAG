let logout = () => {
    fetch('/api/user/logout', {
        headers: {
            'x-auth': localStorage.getItem('x-auth')
        }
    })
    .then((res) => {
        localStorage.removeItem('x-auth')
        window.location.href = '/login'
    })
}