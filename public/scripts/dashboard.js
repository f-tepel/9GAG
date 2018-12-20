fetch('/api/post/all')
.then(res => res.json())
.then((data) => {
    let sample = document.getElementById('sample')
    let parent = sample.parentNode
    let postsToAppend = []
    data.forEach(post => {
        let el = sample.cloneNode(true)
        el.classList.remove('hidden')
        let children = el.children[0].children
        console.log(children)
        children[1].innerHTML= post.caption
        children[2].children[0].src = post.image 
        postsToAppend.push(el)
    })
    postsToAppend.forEach(post => {
        parent.appendChild(post)
    });
})