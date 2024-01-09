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

const getDashboardData = async (req, res, next) => {
  let cookie = getCookies(req.headers.cookie);
  let userId = cookie.userId;
  console.log(cookie);
  // Get all fields
  await pool
    .query(`SELECT * FROM user WHERE userId = "${userId}"`)
    .then(([rows]) => {
      if (rows.length) {
        res.json({
          message: "ooyay",
          rows,
        });
      } else {
        res.json({
          message: "No userId found",
        });
      }
    })
    .catch((err) => next(err));
};

const getPhotoIndex = async (req, res, next) => {
  let { userId } = req.body;
  console.log("ahaaa" + userId);
  let [row] = await pool.query(
    `SELECT photoIndex FROM user WHERE userId LIKE "%${userId}%"`
  );
  res.json({
    row,
  });
};

export default {
  getDashboardData,
  getPhotoIndex,
};
