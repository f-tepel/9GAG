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
        const offsetTime = getOffsetTimeToPost(post.date)
        el.classList.remove('hidden')
        el.id = post._id
        let children = el.children[0].children
        children[0].children[1].innerHTML = post.section
        children[0].children[2].innerHTML = offsetTime
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

let getOffsetTimeToPost = (createdTime) => {
    const currentTime = new Date()
    createdTime = new Date(createdTime)
    let offsetSek = (currentTime.getTime() - createdTime.getTime()) / 1000
    let offsetMin = offsetSek / 60
    if ( offsetMin < 1 ) {
        return ' - just now'
    } else if ( offsetMin < 60 ) {
        return ' - ' + parseInt(offsetMin) + ' minutes ago'
    } else if (offsetMin < 1440) {
        return ' - ' + parseInt(offsetMin / 60) + ' hours ago'
    } else {
        return ' - ' + parseInt(offsetMin / 1440) + ' days ago'
    }
}