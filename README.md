# 9GAG
## Description
9GAG project for Web basierte Anwendungssysteme

## Documentation

### Register User
- Post to "/user/register"
- Body: name, email, pwd
- Beispiel:
```
$.ajax({
    url: '/user/register',
    type: 'POST',
    data: {
        name: 'Felix',
        email: 'felix@asdf.de',
        pwd: 'Start123'
    },
    success: (res) => {
        alert(res + ' added successfully')
    },
    error: (err) => {
        alert('error: ' + err)
    }
})  
```

### Login User:
- Post to "/user/login"
- Body: email, pwd
- Beispiel: 
```
$.ajax({
    url: '/user/login',
    type: 'POST',
    data: {
        email,
        pwd
    },
    success: (res) => {
        alert(res + ' logged in successfully')
    },
    error: (err) => {
        alert('error: ' + err)
    }
})
```
