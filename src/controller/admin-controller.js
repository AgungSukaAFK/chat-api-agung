import Group from "../model/group-model.js";
import chat from "../model/chats-model.js";

const createGroup = async (req, res) => {
    if(req.body.groupConfig){
        let {groupName, kind,chatAddress} = req.body.groupConfig;
        let group = new Group({
            groupName,
            kind,
            chatAddress
        })
    
    let sudah_ada;
    await Group.findOne({groupName}).then((groupfound) => {
        if(groupfound){
            sudah_ada = true
        } else {
            sudah_ada = false
        }
    })

    try {
        if(sudah_ada){
            res.json({
                message: `Group dengan name: "${groupName}" sudah ada`
            })
        } else {
            let newChat = new chat({
                chatAddress: groupName,
                chat: []
            })
            newChat.save();
            group.save();
            res.json({
                message: "Group created succesfully"
            })
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

const getGroups = (req, res) => {
    res.json({
        message: "admin approved"
    })
}

export default {
    createGroup,
    getGroups
}