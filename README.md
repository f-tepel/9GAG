# 9GAG
## Description
9GAG project for Web basierte Anwendungssysteme

## Documentation

### Register User
- Post to "/user/register"
- Body: name, pwd
- Beispiel:
```
$.ajax({
    url: '/user/register',
    type: 'POST',
    data: {
        name,
        pwd
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
- Body: name, pwd
- Beispiel: 
```
$.ajax({
    url: '/user/login',
    type: 'POST',
    data: {
        name,
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
