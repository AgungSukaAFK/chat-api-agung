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
          groupids: data.groupids,
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

async function getuis(userId, next) {
  await pool
    .query(`SELECT * FROM contacts WHERE userId = "${userId}"`)
    .then(([rows]) => {
      if (rows.length) {
        let data = rows[0];
        return data.userids;
      } else {
        return "No contact found";
      }
    })
    .catch((err) => next(err));
}

async function getgis(userId, next) {
  await pool
    .query(`SELECT * FROM contacts WHERE userId = "${userId}"`)
    .then(([rows]) => {
      if (rows.length) {
        let data = rows[0];
        return data.groupIds;
      } else {
        return "No contact found";
      }
    })
    .catch((err) => next(err));
}

export default {
  addGroupid,
  getGroupIds,
  getUserIds,
};
