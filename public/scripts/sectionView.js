window.onload = () => {
    getSections();

    let url = new URL(window.location.href)
    name = url.searchParams.get('name')

    fetch('/api/section/post/' + name, {
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
            const offsetTime = getOffsetTimeToPost(post.date)
            let el = sample.cloneNode(true)
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
        alert(error)
        window.location.href = '/login'
    })
}

let comment = (id) => {
    window.location.href = '/post?id=' + id
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