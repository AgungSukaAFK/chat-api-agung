import dbPool from "../database/mysql-config.js";
const pool = dbPool.promise();

// GET Contact groupIds
// req: userId

const getGroupIds = async (req, res, next) => {
  let { userId } = req.session;
  await pool
    .query(`SELECT * FROM contacts WHERE userId = "${userId}"`)
    .then(([rows]) => {
      if (rows.length) {
        let data = rows[0];
        res.json({
          groupIds: data.groupIds,
        });
      } else {
        res.json({
          message: "No userId found",
        });
      }
    })
    .catch((err) => next(err));
};

const getUserIds = async (req, res, next) => {
  let { userId } = req.session;
  await pool
    .query(`SELECT * FROM contacts WHERE userId = "${userId}"`)
    .then(([rows]) => {
      if (rows.length) {
        let data = rows[0];
        res.json({
          userids: data.userIds,
        });
      } else {
        res.json({
          message: "No userId found",
        });
      }
    })
    .catch((err) => next(err));
};

const addGroupid = async (req, res, next) => {
  let { groupId } = req.body;
  let { userId } = req.session;

  await pool
    .query(`SELECT * FROM contacts WHERE userId = "${userId}"`)
    .then(async ([rows]) => {
      if (rows.length) {
        let { groupIds } = rows[0];
        let arr = Object.values(groupIds);
        arr.push(groupId);
        console.log(typeof arr);
        console.log(arr);
        await pool
          .query(
            `UPDATE contacts SET groupIds = '${JSON.stringify(
              arr
            )}' WHERE userId = "${userId}"`
          )
          .then(([rows]) => {
            res.json({
              message: "Update contact berhasil",
            });
          });
      } else {
        res.json({
          message: "No contact found",
        });
      }
    })
    .catch((err) => next(err));
};

const addUserids = async (req, res, next) => {
  let userIdReq = req.body.userId;
  let { userId } = req.session;

  // First Query
  const [rows1] = await pool.query(
    `SELECT * FROM contacts WHERE userId = '${userIdReq}'`
  );
  if (!rows1.length) {
    res.json({
      message: "userId tujuan tidak valid",
    });
    return;
  }

  // Second Query
  const [rows2] = await pool.query(
    `SELECT * FROM contacts WHERE userId = "${userId}"`
  );
  if (rows2.length) {
    let { userIds } = rows2[0];
    let arr = Object.values(userIds);
    arr.push(userIdReq);
    let stringifiedArr = JSON.stringify(arr);

    // Third Query
    await pool.query(
      `UPDATE contacts SET userIds = '${stringifiedArr}' WHERE userId = "${userId}"`
    );

    res.json({
      message: "Update contact berhasil",
    });
  } else {
    res.json({
      message: "No contact found",
    });
  }
};

const deleteUserids = async (req, res, next) => {
  let userIdReq = req.body.userId;
  let { userId } = req.session;

  // First Query
  const [rows1] = await pool.query(
    `SELECT * FROM contacts WHERE userId = '${userId}'`
  );
  if (rows1.length) {
    let data = rows1[0];
    let userIdsData = data.userIds;
    let arr = Object.values(userIdsData);
    if (!arr.includes(`${userIdReq}`)) {
      res.json({
        message: "UserId tersebut tidak ditemukan dalam kontak",
      });
      return;
    }
  }

  // Second Query
  const [rows2] = await pool.query(
    `SELECT * FROM contacts WHERE userId = "${userId}"`
  );
  if (rows2.length) {
    let { userIds } = rows2[0];
    let arr = Object.values(userIds);
    arr = arr.filter((item) => item !== userIdReq);
    let stringifiedArr = JSON.stringify(arr);

    // Third Query
    await pool.query(
      `UPDATE contacts SET userIds = '${stringifiedArr}' WHERE userId = "${userId}"`
    );

    res.json({
      message: "Update contact berhasil",
    });
  } else {
    res.json({
      message: "No contact found",
    });
  }
};

export default {
  addGroupid,
  addUserids,
  getGroupIds,
  getUserIds,
  deleteUserids,
};
