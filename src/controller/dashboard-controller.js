const getDashboard = (req, res) => {
    if(req.session.user){
        delete req.session.user.password
        res.json({
            message: `Telah login`,
            user: req.session.user
        })
    } else {
        res.json({
            message: "Tidak ada login apapun..."
        })
    }
}

export default {
    getDashboard
}