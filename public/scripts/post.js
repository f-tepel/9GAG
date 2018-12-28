window.onload = () => {
    getSections()

    let url = new URL(window.location.href)
    postId = url.searchParams.get('id')
    fetch('/api/post/' + postId, {
        headers: {
            'x-auth': localStorage.getItem('x-auth')
        }
    })
    .then(res => res.json())
    .then((post) => {
        let sample = document.getElementById('sample')
        let parent = sample.parentNode
        
        let el = sample.cloneNode(true)
        parent.removeChild(sample)
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
        parent.appendChild(el)

        if(post.comments != null) {
            let commentSample = document.getElementById('commentSample')
            post.comments.forEach(comment => {
                let el = commentSample.cloneNode(true)
                el.classList.remove('hidden')
                el.innerHTML = '<strong>' + comment.author + '</strong>: ' + comment.text
                children[5].appendChild(el)
            })
        }
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

let addComment = () => {
    let text = document.getElementById('comment').value
    $.ajax({
        url: '/api/comment',
        type: 'POST',
        data: {
            id: postId,
            text: text
        },
        headers: {
            'x-auth': localStorage.getItem('x-auth')
        },
        success: (res) => {
            window.location.reload()
        },
        error: (res) => {
            window.location.href = '/login'
        }
    })
}