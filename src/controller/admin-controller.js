import dbPool from "../database/mysql-config.js";
const pool = dbPool.promise();

const createGroup = async (req, res, next) => {
  let { groupName, kind } = req.body;
  // INSERT INTO group_chat (groupName, kind) VALUES ("global", "public");
  let [row1] = await pool
    .query(
      `INSERT INTO group_chat (groupName, kind) VALUES ('${groupName}', '${kind}')`
    )
    .catch((err) => next(err));

  let [row2] = await pool.query(
    `INSERT INTO chat_table (chatAddress, chats) VALUES ("${groupName}", "[]")`
  );

  res.json({
    message: "Group chat telah dibuah",
  });
};

const getGroups = (req, res) => {
  res.json({
    message: "admin approved",
  });
};

export default {
  createGroup,
  getGroups,
};
