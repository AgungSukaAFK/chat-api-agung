import chat from "../model/chats-model.js";

// const getChat =  async (req, res)=> {
//     let objChats = await chat.find({chatAddress: "global"});
//     let chatsFound;
//     objChats.forEach((item) => {
//         if(item.chatAddress == "global"){ // ubah ini jadi globalnya dimbil dari tab chat yang sedang aktif
//             chatsFound = item.chats;
//         }
//     })

//     if(chatsFound){
//         res.json({
//             chats: chatsFound
//         })
//     } else {
//         res.status(500).json({
//             message: "Database error cant find chat server"
//         })
//     }

// }

// const sendChat = async (req, res)=> {
//     let reqChat = req.body.chat;
//     let reqFrom = req.body.from;

//     // Bikin server global
//     // let newServer = new chat({
//     //     server: "global",
//     //     chats: [{}]
//     // })
//     // newServer.save();
//     // res.json({
//     //     "Message": "yeay"
//     // })

//     let newChat = {
//         chat: reqChat,
//         from: reqFrom
//     }

//     if(newChat.chat && newChat.from){
//         try {
//             await chat.updateOne(
//                 {chatAddress: "global"},
//                 {$push: {chats: newChat}}
//             )
//             chat.find().then((result) => {
//                 res.json({
//                     chats: result
//                 })
//             })
//         } catch (error) {
//             res.json({
//                 error
//             })
//         }
//     } else {
//         res.json({
//             message: "Chat gagal terkirim, kekurangan atribut"
//         })
//     }

// } Alih fungsi #1

const createChat = async (req, res) => {
    let newChat = new chat({
        chatAddress: req.body.chatAddress,
        chat: []
    })

    try {
        await newChat.save()
        res.json({
            message: "New chat created successfully"
        })
    } catch (error) {
        res.json({
            error: error,
            message: error.message
        })
    }

}

const chatListener = async (req, res) => {
    let {action, chatAddress} = req.body;

    if(action == "get"){
        let objChats = await chat.find({chatAddress});
        let chatsFound;
        objChats.forEach((item) => {
            if(item.chatAddress == chatAddress){ 
                chatsFound = item.chats;
            }
        })

        if(chatsFound){
            res.json({
                chats: chatsFound
            })
        } else {
            res.status(500).json({
                message: "Database error cant find chatAddress"
            })
        }

    } else if(action == "send"){
        
        let reqChat = req.body.chat;
        let reqFrom = req.body.from;

        let newChat = {
            chat: reqChat,
            from: reqFrom
        }

        if(newChat.chat && newChat.from){
            try {
                await chat.updateOne(
                    {chatAddress: chatAddress},
                    {$push: {chats: newChat}}
                )
                await chat.find({chatAddress}).then((result) => {
                    res.json({
                        chats: result
                    })
                })
            } catch (error) {
                res.json({
                    error
                })
            }
        } else {
            res.json({
                message: "Chat gagal terkirim, kekurangan atribut"
            })
        }

    } else {
        res.json({
            message: "Action tidak dikenal"
        })
    }
}

export default {
    chatListener,
    createChat
}