import Group from "../model/group-model.js";
import chat from "../model/chats-model.js";

// Cek apakah sudah ada > jika belum, buat baru,
const createPrivateGroup = async (req, res) => {
    if(req.body.groupConfig){
        let {kind, userIds} = req.body.groupConfig;
        let groupName = `${userIds[0]} & ${userIds[1]}`
        let chatAddress = groupName
        let group = new Group({
            groupName,
            kind,
            chatAddress,
            userIds
        })

    let sudah_ada;

    await Group.findOne(
        {$or: [
            {groupName: `${userIds[0]} & ${userIds[1]}`},
            {groupName: `${userIds[1]} & ${userIds[0]}`}
        ]}
        ).then((groupfound) => {
        if(groupfound){
            sudah_ada = true
        } else {
            sudah_ada = false
        }
    })

    try {
        if(sudah_ada){
            res.json({
                message: `Private conversation: "${groupName}" sudah ada`
            })
        } else {

            let newChat = new chat({
                chatAddress: groupName,
                chat: []
            })
        
            try {
                await newChat.save()
                await group.save()
                res.json({
                    message: "Private Group created succesfully"
                })
            } catch (error) {
                res.json({
                    error: error,
                    message: error.message
                })
            }

        }
    } catch (error) {
        res.json({
            error: error,
            message: error.message
        })
    }

    } else {
        res.json({
            message: "groupConfig is not defined correctly"
        })
    }
}

export default {
    createPrivateGroup
}