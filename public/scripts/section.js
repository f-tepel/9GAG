let getSections = () => {
    fetch('/api/section/all', {
        headers: {
            'x-auth': localStorage.getItem('x-auth')
        }
    })
    .then(res => res.json())
    .then((sections) => {
        var sample = document.getElementById('section-sample')
        var parent = sample.parentNode
        sections.forEach(section => {
            var el = sample.cloneNode(true)
            el.classList.remove('hidden')
            el.href = '/section?name=' + section.name
            el.children[1].innerHTML = section.name
            parent.appendChild(el)
        })

    })
    .catch((error) => {
        window.location.href = '/login'
    })
}