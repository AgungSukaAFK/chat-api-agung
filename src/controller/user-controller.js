import user from "../model/user-model.js"

// Mendapatkan data user
const getUser = async (req, res) => {
    let userId = req.params.id
    let userFound = false
    let userAccount;
    await user.findOne({userId})
    .then((result) => {
        if(result){
            userFound = true;
            userAccount = result;
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })

    if(userFound){
        res.json({
            message: "User found",
            username: userAccount.username,
            userId: userAccount.userId,
            status: userAccount.status,
            photoIndex: userAccount.photoIndex
        })
    } else if(!userFound){
        res.json({
            message: `User with id ${req.params.id} is not found`
        })
    }
}

// Login session user
const loginUser = (req, res) => {
    let {userId, password} = req.body; //
    if(userId && password){
        user.findOne({userId})
        .then((result) => {
            if(result){
                if(result.password == password){
                    req.session.user = result;
                    // res.json({
                    //     message: "Login succesfully",
                    //     sectionId: req.session.id
                    // })
                    res.redirect("/dashboard")
                } else if(result.password != password){
                    res.json({
                        message: "Password salah"
                    })
                }
            } else {
                res.json({
                    message: "UserId tidak ditemukan"
                })
            }
        })
        .catch((err) => {
            res.json({
                message: "Database error"
            })
        })
    }
}

// Logout session user
const logoutUser = (req, res) => {
    let userId = req.session.user.userId
    req.session.destroy();
    res.json({
        userId,
        message: "logout succesfull"
    })
}

// Membuat user baru
const createUser = async (req, res, next) => {
    
    if(!req.body){
        res.json({
            data: {
                message: "Req body required"
            }
        })
        next()
    }

    let {userId, username, password} = req.body;

    if(!userId || !username || !password){
        res.json({
            data: {
                message: "Req body required, format read the api spec"
            }
        })
    } else {
        let newUser = new user({
            userId,
            username,
            password
        });
        
        let sudah_ada = true

        await user.findOne({userId}).then((userfound) => {
            if(userfound){
                sudah_ada = true
            } else {
                sudah_ada = false
            }
        })

        try {
            if(sudah_ada){
                res.json({
                    message: "userId sudah terdaftar, coba userId yang lain"
                })
            } else if(!sudah_ada){
                await newUser.save();
                res.json({
                    data: {
                        message: "User created"
                    }
                })
            }
        } catch (error) {
            res.status(500).json({
                error
            })
            
        }
    }
    



}

export default {
    getUser,
    createUser,
    loginUser,
    logoutUser
}