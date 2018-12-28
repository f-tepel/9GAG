let like = (id) => {
    fetch('/api/like/' + id, {
        headers: {
            'x-auth': localStorage.getItem('x-auth')
        }
    })
    .then(res => res.json())
    .then((res) => {
        if(res.success) {
            let el = document.getElementById(id).children[0].children[3].children[0]
            el.innerHTML = Number(el.innerHTML) + 1
            if(res.removed) {
                let el = document.getElementById(id).children[0].children[3].children[2]
                el.innerHTML = Number(el.innerHTML) - 1
            }
        }
    })
    .catch((error) => {
        window.location.href = '/login'
    })
}

let dislike = (id) => {
    fetch('/api/dislike/' + id, {
        headers: {
            'x-auth': localStorage.getItem('x-auth')
        }
    })
    .then(res => res.json())
    .then((res) => {
        if(res.success) {
            let el = document.getElementById(id).children[0].children[3].children[2]
            el.innerHTML = Number(el.innerHTML) + 1
            if(res.removed) {
                let el = document.getElementById(id).children[0].children[3].children[0]
                el.innerHTML = Number(el.innerHTML) - 1
            }
        }
    })
    .catch((error) => {
        alert(error)
        window.location.href = '/login'
    })
}