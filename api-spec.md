# Create user

POST /api/user/create

req body  
```json
"data": {
    "userId": "agung123",
    "username": "Agung Ganteng",
    "password": "rahasia"
}
```

res success  
```json
"data": {
    "message": "Account created succesfully"
}
```

ress error 
```json
"data": {
    "messsage": "Username already exist"
}
```

# Login user

POST /api/user/login  

req body 
```json
{
    "userId": "agung123",
    "password": "rahasia"
}
```
Buat section login
res success  
```json
{
    "message": "Login succesfull"
}
```

res failed
```json
{
    "message": "Password salah"
}
```

# Ambil data user user

GET /api/user/:userId

req body  
```json
"data": {
    "userId": "agung123",
    "passowrd": "rahasia"
}
```

res success  
```json
"data" : {
    "username": "Agunng Ganteng",
    "status": "Hey there im using ao chat app",
    "photoIndex": 2,
    "online": true
}
```

# Logout user  

POST /api/user/logout

res succesfull
```json
{
    "userId": "123",
    "message": "Logout succesfully"
}
```

# Get chat

GET /api/chats  

res success  
```json
"data" : {
    "chats": [
        {
            "chat": "Hello world",
            "from": "Agung Ganteng"
        },
    ]
}
```

# Send Chat

POST /api/chats  

res body  
```json
"data": {
    "chat": "Hello world",
    "from": "Agung Ganteng"
}
```

res success  
```json
"data": {
    "chats": [
        {
            "chat": "Hello world",
            "from": "Agung Ganteng"
        },
    ]
}
```