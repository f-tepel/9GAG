
window.onload = () => {
    fetch('/api/post/all', {
        headers: {
            'x-auth': localStorage.getItem('x-auth')
        }
    })
    .then(res => res.json())
    .then((data) => {
        let sample = document.getElementById('sample')
        let parent = sample.parentNode
        let postsToAppend = []
        data.forEach(post => {
            let el = sample.cloneNode(true)
            el.classList.remove('hidden')
            el.id = post._id
            let children = el.children[0].children
            children[0].children[1].innerHTML = post.section
            children[0].children[2].innerHTML = post.date
            children[1].innerHTML = post.caption
            children[2].children[0].src = post.image
            children[3].children[0].innerHTML = post.likes.length
            children[3].children[2].innerHTML = post.dislikes.length
            children[3].children[4].innerHTML = post.comments.length
            children[4].children[0].addEventListener('click', () => {
                like(post._id)
            })
            children[4].children[1].addEventListener('click', () => {
                dislike(post._id)
            })
            children[4].children[2].addEventListener('click', () => {
                comment(post._id)
            })
            postsToAppend.unshift(el)
        })
        postsToAppend.forEach(post => {
            parent.appendChild(post)
        })
    })
    .catch((error) => {
        window.location.href = '/login'
    })

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
            el.children[1].innerHTML = section.name
            parent.appendChild(el)
        })

    })
    .catch((error) => {
        window.location.href = '/login'
    })
}

let like = (id) => {
    fetch('/api/like/' + id, {
        headers: {
            'x-auth': localStorage.getItem('x-auth')
        }
    })
    .then((res) => {
        let el = document.getElementById(id).children[0].children[3].children[0]
        el.innerHTML = Number(el.innerHTML) + 1
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
    .then((res) => {
        let el = document.getElementById(id).children[0].children[3].children[2]
        el.innerHTML = Number(el.innerHTML) + 1
    })
    .catch((error) => {
        window.location.href = '/login'
    })
}

let comment = (id) => {
    window.location.href = '/post?id=' + id
}