import Contact from "../model/contact-model.js";
import User from "../model/user-model.js";

const addContact = async (req, res) => {
    let {targetId} = req.body;
    let contactId = req.session.user.userId

    if(contactId && targetId){

        if(contactId == targetId){
            res.json({
                message: "Gak bisa nambahin diri sendiri"
            });
            return
        }

        await Contact.findOne({contactId}) // Nyari kontak
        .then(async (contactFound) => {
            if(contactFound){ // Kalau ada id Agung, maka harusnya cek apakah userId nya sudah ada
                let userIds = contactFound.userIds;
                if(userIds.includes(targetId)){
                    res.json({
                        message: `${targetId} Sudah terdaftar di kontak.`
                    })
                } else {
                    await Contact.updateOne(
                        {contactId},
                        {$push: {userIds: targetId}}
                    )
                    res.json({
                        message: `${targetId} Berhasil ditambahkan ke kontak.`
                    })
                }
            } else {
                res.json({
                    message: "error: 2, Hubungi admin untuk proses lebih lanjut"
                })
            }
        }).catch(err => res.json({err}));

    } else {
        res.json({
            message: "Request body tidak valid"
        })
    }
}

export default {
    addContact
}