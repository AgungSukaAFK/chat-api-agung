import dbPool from "../database/mysql-config.js";
const pool = dbPool.promise();

// Cek apakah sudah ada > jika belum, buat baru,
const createConversation = async (req, res, next) => {
  let { userId, userId2 } = req.body;

  // validasi request body valid
  if (!userId || !userId2) {
    res.json({
      Message: "User Id kurang",
    });
    return;
  }

  // validasi userId valid
  let [validateRow] = await pool
    .query(`select * from user where userId = "${userId}"`)
    .catch((err) => next(err));
  let [validateRow2] = await pool
    .query(`select * from user where userId = "${userId2}"`)
    .catch((err) => next(err));
  //validasi apakah sudah ada datanya
  let [validateRow3] = await pool
    .query(
      `select * from group_chat where groupName LIKE "%${userId}%" AND groupName LIKE "%${userId2}%"`
    )
    .catch((err) => next(err));

  if (!validateRow.length || !validateRow2.length) {
    res.json({
      message: "userId tidak valid",
      code: 2,
    });
    return;
  }
  if (validateRow3.length) {
    res.json({
      message: "sudah ada conversation",
      code: 2,
    });
    return;
  }

  let arr = [userId, userId2];
  let stringArr = arr.join("&");
  let [row] = await pool
    .query(
      `INSERT INTO group_chat (groupName, kind) VALUES ("${stringArr}", "private")`
    )
    .catch((err) => {
      next(err);
      return;
    });

  let [row2] = await pool.query(
    `INSERT INTO chat_table (chatAddress, chats) VALUES ("${stringArr}", '[]')`
  );

  res.json({
    message: "Chat baru sudah terbuat",
    code: 1,
  });
};

const getPublicGroups = async (req, res) => {};

const getConversations = async (req, res) => {};

export default {
  createConversation,
  getPublicGroups,
  getConversations,
};
