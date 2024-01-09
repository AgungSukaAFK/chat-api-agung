import dbPool from "../database/mysql-config.js";
const pool = dbPool.promise();

function getCookies(cookieString) {
  const cookies = {};
  cookieString.split(";").forEach((cookie) => {
    const parts = cookie.split("=");
    const name = parts[0].trim();
    const value = parts[1];
    cookies[name] = value;
  });
  return cookies;
}

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
  let userIdReq = "";
  if (req.headers.cookie) {
    let cookies = getCookies(req.headers.cookie);
    userIdReq = cookies.userId;
  }

  if (userIdReq) {
    res.json({
      message: `tidak perlu login, sudah login dengan userId: ${userIdReq}`,
      code: 3,
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
            res.cookie("userId", account.userId, {
              secure: true,
              sameSite: "None",
              maxAge: 1000 * 60 * 60 * 3,
              httpOnly: false,
            });
            res.json({
              message: `Login berhasil, Halo user ${account.username}`,
              code: 1,
            });
          } else {
            res.json({
              message: "Password salah",
              code: 2,
            });
          }
        } else {
          res.json({
            message: "userId not found",
            code: 2,
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
  if (req.headers.cookie) {
    const cookie = getCookies(req.headers.cookie);
    let userIdReq = cookie.userId;
    // res.clearCookie("userId");
    res.cookie("userId", "", {
      expires: new Date(0),
      secure: true,
      sameSite: "None",
    });
    res.json({
      message: "done",
    });
  } else {
    res.json({
      message: "Tidak ada login",
    });
  }
};

// get My userId
const getMyId = (req, res, next) => {
  let userIdReq = "";
  if (req.headers.cookie) {
    let cookies = getCookies(req.headers.cookie);
    userIdReq = cookies.userId;
    console.log(userIdReq);
    res.json({
      message: "userId detected",
      userId: userIdReq,
      code: 1,
    });
  } else {
    res.json({
      message: "no login",
      code: 2,
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
  let [rows] = await pool.query(
    `SELECT * FROM user WHERE userId = "${userId}"`
  );
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
      WHERE userId = "${userId}"
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

const getAllGroups = async (req, res, next) => {
  // let cookie = req.headers.cookie;
  // if (!cookie) {
  //   res.json({
  //     message: "Tidak ada login",
  //   });
  //   return;
  // }

  let cookie = getCookies(req.headers.cookie);

  // let cookieArr = cookie.split("=");
  let userId = cookie.userId;

  // Contact groupids
  let [row1] = await pool.query(
    `SELECT groupIds FROM contacts where userId = "${userId}"`
  );

  // groupName yang sama
  let [row2] = await pool.query(
    `SELECT groupName FROM group_chat WHERE groupName LIKE "%${userId}%"`
  );

  let arr = Object.values(row1);

  let arr1 = arr[0].groupIds;
  let result = [];
  arr1.forEach((element) => {
    result.push(element);
  });
  if (row2.length) {
    console.log(" dari row2: " + JSON.stringify(row2));
    let arr2 = Object.values(row2);
    console.log(arr2);
    arr2.forEach((element) => {
      let { groupName } = element;
      result.push(groupName);
    });
  }

  res.json({
    data: result,
  });
};

async function getPhoto(req, res, next) {
  let { userId } = req.body;
  let [row1] = await pool.query(
    `select photoIndex from user where userId = '${userId}'`
  );
  console.log(row1);
  res.json({
    photoIndex: row1[0],
  });
}

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
  getAllGroups,
  getMyId,
  getPhoto,
  //   getContact,
};
