# RandomPost
## Description
RandomPost project for Web basierte Anwendungssysteme

## Documentation

### User

#### Register User
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

#### Login User:
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

#### Delete User:
- DELETE to "/user"
- Body: name
- Beispiel: 
```
$.ajax({
    url: '/user',
    type: 'DELETE',
    data: {
        name
    },
    success: (res) => {
        alert(res + ' deleted successfully')
    },
    error: (err) => {
        alert('error: ' + err)
    }
})
```

#### Get profile data from User:
- POST to "/user/profile"
- Body: name
- Beispiel: 
```
$.ajax({
    url: '/user',
    type: 'POST',
    data: {
        name
    },
    success: (res) => {
        alert(res + ' received profile data successfully')
    },
    error: (err) => {
        alert('error: ' + err)
    }
})
```

### Post 

#### Add post:
- POST to "/post"
- Body: name
- Beispiel: 
```
$.ajax({
    url: '/post',
    type: 'POST',
    data: {
        userId,
        caption,
        description
    },
    success: (res) => {
        alert(res + ' added post successfully')
    },
    error: (err) => {
        alert('error: ' + err)
    }
})
```

#### Delete post:
- DELETE to "/post"
- Body: name
- Beispiel: 
```
$.ajax({
    url: '/post',
    type: 'DELETE',
    data: {
        id
    },
    success: (res) => {
        alert(res + ' deleted post successfully')
    },
    error: (err) => {
        alert('error: ' + err)
    }
})
```
