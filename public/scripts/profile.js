window.onload = () => {
    getUser((data) => {
        let user = data.user
        let posts = data.post
        document.getElementById('username').innerHTML = user.email
        document.getElementById('postAmount').innerHTML = posts.length

        let sample = document.getElementById('sample')
        let parent = sample.parentNode
        let postsToAppend = []
        posts.forEach(post => {
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
        sample.style.display = 'none'
    })
}

let getUser = (callback) => {
    fetch('/api/user/profile', {
        headers: {
            'x-auth': localStorage.getItem('x-auth')
        }
    })
    .then(res => res.json())
    .then((data) => {
        callback(data)
    })
}

let comment = (id) => {
    window.location.href = '/post?id=' + id
}

let changePassword = () => {
    let oldPassword = document.getElementById('oldPassword').value
    let newPassword = document.getElementById('newPassword').value
    let repeatPassword = document.getElementById('repeatPassword').value

    if(newPassword === repeatPassword) {
        $.ajax({
            url: '/api/user/password',
            type: 'POST',
            data: {
                oldPassword,
                newPassword
            },
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            },
            success: () => {
                alert('Password changed successfully')
            },
            error: (err) => {
                console.log('Error: ' + err)
            }
        })
    } else {
        alert('passwords are not equal')
    }
}