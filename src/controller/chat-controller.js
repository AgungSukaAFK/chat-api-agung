import dbPool from "../database/mysql-config.js";
const pool = dbPool.promise();

const createChat = async (req, res) => {
  return;
};

const chatListener = async (req, res, next) => {
  let method = req.body.purpose;
  if (method == "GET") {
    let { chatAddress } = req.body;
    let [row] = await pool
      .query(
        `SELECT chats FROM chat_table WHERE chatAddress = "${chatAddress}"`
      )
      .catch((err) => next(err));
    if (!row.length) {
      res.json({
        message: "Chat tidak ada",
        code: 2,
      });
      return;
    }
    let { chats } = row[0];
    res.json({
      chats,
    });
  } else if (method == "POST") {
    let { chatAddress, from, chat } = req.body;
    // chat = chat.replace(/\n/g, "\\n");
    // console.log(chat);
    let [row] = await pool
      .query(
        `SELECT chats FROM chat_table WHERE chatAddress = "${chatAddress}"`
      )
      .catch((err) => next(err));

    if (!row.length) {
      res.json({
        message: "Chat tidak ada",
      });
      return;
    }

    let chatsDb = row[0];
    let chatArr = Object.values(chatsDb.chats);
    let chatInput = {
      from,
      chat,
    };
    chatArr.push(chatInput);

    let stringifiedArr = JSON.stringify(chatArr);

    await pool
      .query(
        `UPDATE chat_table SET chats = '${stringifiedArr}' WHERE chatAddress = "${chatAddress}"`
      )
      .then(() => {
        res.json({
          message: "chat terkirim",
          code: 1,
        });
      })
      .catch((err) => next(err));
  } else if (method == "GETLAST") {
    let { chatAddress } = req.body;
    let [row] = await pool.query(
      `SELECT chats FROM chat_table WHERE chatAddress = "${chatAddress}"`
    );
    if (!row.length) {
      res.json({
        message: "Chat tidak ada",
      });
      return;
    }
    let arr = row[0];
    let { chats } = arr;
    const lastChat = chats[chats.length - 1];
    res.json({
      lastChat,
    });
  } else {
    res.json({
      message: "Method tidak diterima",
    });
  }
};

export default {
  chatListener,
  createChat,
};
