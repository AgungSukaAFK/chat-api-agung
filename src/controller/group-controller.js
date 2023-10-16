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

    let sudah_ada; // KEtika user nambah kontak lalu "tambah chat", buat privategroupnya lalu otomatis membuat chatAddress chat nya juga, ketika admin bikin grup otomatis membuat chat, ketika 
    // Ketika user tambah kontak, lalu tambah chat akan membuat coversation baru dan sudah otomatis dengan chatnya. done

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
                    message: "Conversation telah dibuat."
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

const getPublicGroups = async (req, res) => {
    await Group.find({kind: "public"})
    .then((result) => {
        if(result){
            res.json({
                result
            })
        }
    })
    .catch(err => {
        res.json({err})
    })
}

const getConversations = async (req, res) => {
    await Group.find({$and: [
        {kind: "conversation"},
        {userIds: {$in: [`${req.session.user.userId}`]}}
    ]})
    .then(result => {
        if(result){
            if(result.length == 0){
                res.json({
                    message: "belum ada conversation."
                })
            } else {
                res.json({
                    result
                })
            }
        }
    })
}

export default {
    createPrivateGroup,
    getPublicGroups,
    getConversations,
}