import dbPool from "../database/mysql-config.js";
const pool = dbPool.promise();

// Mendapatkan data user
const getUser = async (req, res, next) => {
  //request body none
  let { id } = req.params;
  pool
    .query(`SELECT * FROM user WHERE userId = "${id}"`)
    .then(([rows]) => {
      if (rows.length) {
        res.json({
          message: "User found",
          rows,
        });
      } else {
        res.json({
          message: "User not found",
          id,
        });
      }
    })
    .catch((err) => {
      next(err);
    });
};

// Login session user
const loginUser = (req, res, next) => {
  // request body
  // {
  //     userId,
  //     password
  // }

  if (req.session.userId) {
    res.json({
      message: "Sudah login, tidak perlu login lagi.",
    });
    return;
  }

  let { userId, password } = req.body;
  if (userId && password) {
    pool
      .query(`SELECT * FROM user WHERE userId = "${userId}"`)
      .then(([rows]) => {
        if (rows.length) {
          let account = rows[0];
          if (password == account.password) {
            // set session userId
            req.session.userId = account.userId;
            res.json({
              message: `Login berhasil, Halo user ${account.username}`,
            });
          }
        } else {
          res.json({
            message: "userId not found",
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  }
};

// Logout session user
const logoutUser = (req, res, next) => {
  if (req.session.userId) {
    req.session.destroy((err) => {
      if (err) {
        next(err);
      } else {
        res.json({
          message: "Logout succesful",
        });
      }
    });
  } else {
    res.json({
      message: "Tidak ada login",
    });
  }
};

// Membuat user baru + kontak
const createUser = async (req, res, next) => {
  // req body{
  //     userId,
  //     username,
  //     password
  // }

  if (!req.body.userId) {
    res.json({
      message:
        "Req body required: {userId(VARCHAR 15), username(VARCHAR 15), password(VARCHAR 15)",
    });
  }
  let { userId, username, password } = req.body;
  await pool
    .query(
      `
      INSERT INTO 
      user (userId, username, password)
      VALUES ("${userId}", '${username}', '${password}')`
    )
    .then(async ([rows, fields]) => {
      // buat kontak baru
      await pool
        .query(
          `INSERT INTO contacts (groupIds, userIds, userId) values ('["global"]', '[]', "${userId}")`
        )
        .then(([rows]) => {
          res.json({
            message: "UserId berhasil terbuat",
            rows,
            fields,
          });
        })
        .catch((err) => {
          if (err) {
            console.log(err);
          }
        });
    })
    .catch((err) => {
      next(err);
    });
};

const deleteUser = async (req, res, next) => {
  let { userId } = req.body;
  await pool
    .query(`DELETE FROM user WHERE id = ${id}`)
    .then(([rows, fields]) => {
      res.json({
        message: "Delete user berhasil",
      });
    })
    .catch((err) => {
      next(err);
    });
};

const updateUser = async (req, res, next) => {
  let { userId, username, photoIndex, status } = req.body;
  let [rows] = await pool.query(`SELECT * FROM user WHERE id = ${id}`);
  if (rows) {
    let queries = [];
    if (username) {
      queries.push(`username = "${username}"`);
    }
    if (photoIndex) {
      queries.push(`photoIndex = ${photoIndex}`);
    }
    if (status) {
      queries.push(`status = "${status}"`);
    }

    let query = queries.join(", ");

    await pool
      .query(
        `
      UPDATE user 
      SET ${query}
      WHERE userId = ${userId}
      `
      )
      .then(([rows, fields]) => {
        res.json({
          message: "User berhasil diupate",
        });
      })
      .catch((err) => next(err));
  } else {
    res.json({
      message: `Tidak ditemukan user dengan id = ${userId}`,
    });
  }
};

// const getContact = async (req, res) => {
//   return;
// };

export default {
  getUser,
  createUser,
  loginUser,
  logoutUser,
  deleteUser,
  updateUser,
  //   getContact,
};
