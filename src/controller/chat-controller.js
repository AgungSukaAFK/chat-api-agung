import chat from "../model/chats-model.js";

const getChat =  async (req, res)=> {
    let objChats = await chat.find({"server": "global"});
    let globalChats;
    objChats.forEach((item) => {
        if(item.chatAddress == "global"){ // ubah ini jadi globalnya dimbil dari tab chat yang sedang aktif
            globalChats = item.chats;
        }
    })

    if(globalChats){
        res.json({
            globalChats
        })
    } else {
        res.status(500).json({
            message: "Database error cant find chat server"
        })
    }

}

const sendChat = async (req, res)=> {
    let reqChat = req.body.chat;
    let reqFrom = req.body.from;

    // Bikin server global
    // let newServer = new chat({
    //     server: "global",
    //     chats: [{}]
    // })
    // newServer.save();
    // res.json({
    //     "Message": "yeay"
    // })

    let newChat = {
        chat: reqChat,
        from: reqFrom
    }

    try {
        await chat.updateOne(
            {chatAddress: "global"},
            {$push: {chats: newChat}}
        )
        chat.find().then((result) => {
            res.json({
                chats: result
            })
        })
    } catch (error) {
        res.json({
            error
        })
    }
}

export default {
    getChat,
    sendChat
}