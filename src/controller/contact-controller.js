import Contact from "../model/contact-model.js";
import User from "../model/user-model.js";

const addContact = async (req, res) => {
    let {contactId, targetId} = req.body;

    if(contactId && targetId){

        if(contactId == targetId){
            res.json({
                message: "Gak bisa nambahin diri sendiri"
            });
            return
        }

        await Contact.findOne({contactId})
        .then(async (contactFound) => {
            if(contactFound){
                res.json({
                    message: `${targetId} Sudah terdaftar di kontak.`
                })
            } else {
                await User.findOne({userId: targetId})
                .then( async (userFound) =>{
                    if(userFound){
                        await Contact.updateOne(
                            {contactId},
                            {$push: {userIds: targetId}}
                        )
                        res.json({
                            message: "Contact added"
                        })
                    } else {
                        res.json({
                            message: "Target userID tidak ditemukan"
                        })
                    }
                })
                .catch(err => res.json({err}));
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