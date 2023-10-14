# AoChatt api and database documentation  

Dokumentasi seputar api  dan database untuk aplkasi AoChatt.  
versi: 1


## API Docs
Dibuat menggunakan: express, mongodb atlas sebagai databse, nodejs sebagai bahasa yang digunakan.  
Tujuan dibuat: Penyedia layanan untuk aplikasi chat AoChatt.

Dalam pertukaran data disini menggunakan file json sebagai request bodynya.  
Berikut daftar service yang disediakan:  

### Route: api/user
1. GET - Informasi user  
    >Route: /:id  

    Req body: none  
    Res example  
    ```json
    {
        "message": "User found",
	    "username": "Agung ganteng",
	    "userId": "123",
	    "status": "Hello there, i'm using AoChat app!",
	    "photoIndex": 1
    }
    ```
2. GET - Informasi kontak
    > Route: /contact

    Req body: none
    Res example:  
    ```json
    {
        "message": "Contact found",
	    "contact": {
            "_id": "652546c47f2c75c6be1c5d7a",
            "contactId": "testing",
            "groupNames": ["Group_1", "Group_2"],
            "userIds": ["Friend1", "Friend2"],
            "__v": 0
	    }
    }
    ```
3. POST - Create account
    > Route: /create

    Req body:  
    ```json
    {
        "userId": "Agung",
        "username": "Agung Ganteng XYz",
        "password": "rahasia"
    }
    ```
    Res example:  
    ```json
    {
	    "message": "User created"
    }
    ```
4. POST - Login account
    > Route: /login

    Req body:  
    ```json
    {
	    "userId": "Agung",
	    "password": "rahasia"
    }
    ```
    Res example:  
    ```json
    {
        "message": "Login succesfully",
        "session": {
            "cookie": {
                "originalMaxAge": 3600000,
                "expires": "2023-10-11T14:00:42.126Z",
                "secure": false,
                "httpOnly": true,
                "domain": null,
                "path": "/",
                "sameSite": "none"
            },
            "user": {
                "_id": "652546c47f2c75c6be1c5d79",
                "userId": "Agung",
                "username": "Agung Ganteng XYz",
                "photoIndex": 1,
                "status": "Hello there, i'm using AoChat app!",
                "online": true,
                "contactId": "testing",
                "__v": 0
            }
        }
    }
    ```
5. POST - Logout account
    > Route: /logout

    Req body: none  
    Res example:  
    ```json
    {
        "userId": "Agung",
        "message": "logout succesfull"
    }
    ```

### Route: api/dashboard
1. GET - Mendapatkan informasi user saat ini  
    >Route: /  

    Req body: none  
    Res example  
    ```json
    {
        "message": "Telah login",
        "user": {
            "userId": "Agung",
            "username": "Agung Ganteng Xyz",
            "photoIndex": 1,
            "status": "Hello there, i'm using AoChat app!",
            "online": false,
            "contactId": "Agung",
            "__v": 0
        }
    }
    ```

### Route: api/chat
1. POST - Mendapatkan chat  
    >Route: /  

    Req body:  
    ```json
    {
        "action": "get",
        "chatAddress": "global"
    }
    ```
    Res example  
    ```json
    {
        "chats": [
            {
                "chat": "Hello chat",
                "from": "userId"
            },
        ]
    }
    ```
2. POST - Mengirim chat  
    >Route: /  

    Req body:  
    ```json
    {
        "action": "send",
        "chatAddress": "chatAddress",
        "from": "userId",
        "chat": "Hello chat"
    }
    ```
    Res example  
    ```json
    {
        "chats": [
            {
                "chat": "Hello chat",
                "from": "userId"
            },
        ]
    }
    ```
3. POST - Membuat chat baru  
    >Route: /create  

    Req body:  
    ```json
    {
	    "chatAddress": "nama_chat_address"
    }
    ```
    Res example  
    ```json
    {
	    "message": "New chat created successfully"
    }
    ```



## Database Docs
database memiliki 4 entitas, yakni user, group, chat, dan contact. 
1. user  
Atribut:
    - userId: String
    - username: String
    - password: String // *hashed dalam database*
    - contactId: String // *Saat ini memiliki value yang sama dengan userId*
    - status: String
    - photoIndex: Number
    - online: Boolean  

    Contoh: 
    ```json
     {
       userId: "Agung",
       username: "Agung Ganteng XYz",
       password: "rahasia",
       password: "rahasia",
       contactId: "Agung",
       status: "Halo, saya menggunakan AoChatt !",
       photoIndex: 1,
       online: true
    }
    ```