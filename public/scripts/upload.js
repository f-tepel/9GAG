let caption
let imgBase64
let section

document.getElementById("image").addEventListener("change", readFile);

window.onload = () => {
    getSections()
}

function readFile() {
    if (this.files && this.files[0]) {
        
        var FR = new FileReader();
        
        FR.addEventListener("load", function(e) {
            imgBase64 = e.target.result;
            document.getElementById('toPreview').disabled = false;
        }); 
        
        FR.readAsDataURL( this.files[0] );
    }  
}
let preview = () => {
    caption = document.getElementById('caption').value
    section = document.getElementById('section').value
    if(caption == null || caption == '') {
        alert('Please enter a caption')
    } else if (imgBase64 == null) {
        alert('Please upload an image')
    } else if (section == null) {
        alert('Please select a section')
    } else {
        document.getElementById('uploadForm').style.display = 'none'
        document.getElementById('preview').style.display = 'block'
        document.getElementById('prevImage').src = imgBase64
        document.getElementById('prevCaption').innerHTML = caption
    }
}
let upload = () => {
    $.ajax({
        type: 'POST',
        url: '/api/post',
        data: {
            image: imgBase64,
            caption: caption,
            section: section
        },
        headers: {
            'x-auth': localStorage.getItem('x-auth')
        },
        success: (res) => {
            alert('Your post has been added successfully. Thanks!')
            window.location.pathname = '/dashboard'
        },
        error: (error) => {
            alert('Upload failed. Please try again or contact support.')
            window.location.pathname = '/upload'
        }
    })
}

let getSections = () => {
    fetch('/api/section/all', {
        headers: {
            'x-auth': localStorage.getItem('x-auth')
        }
    })
    .then(res => res.json())
    .then((sections) => {
        let select = document.getElementById('section')
        sections.forEach(section => {
            let option = document.createElement('OPTION')
            option.value = section.name
            option.innerHTML = section.name
            select.appendChild(option)
        })
    })
}