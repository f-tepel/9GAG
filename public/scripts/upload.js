let caption;
let imgBase64;

document.getElementById("image").addEventListener("change", readFile);

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
    if(caption == null || caption == '') {
        alert('Please enter a caption')
    } else if (imgBase64 == null) {
        alert('Please upload an image')
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
            caption: caption
        },
        success: (res) => {
            alert('Your post has been added successfully. Thanks!')
            window.location.pathname = '/dashboard'
        },
        error: (error) => {
            alert('Upload failed. Please try again or ocntact support.')
            window.location.pathname = '/upload'
        }
    })
}