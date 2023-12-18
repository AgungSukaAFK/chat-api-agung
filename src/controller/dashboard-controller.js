import dbPool from "../database/mysql-config.js";
const pool = dbPool.promise();

const getDashboardData = async (req, res, next) => {
  let { userId } = req.session;
  // Get all fields
  pool.query(`SELECT * FROM user WHERE userId = "${userId}"`).then(([rows]) => {
    if (rows.length) {
      res.json({
        message: "ooyay",
        rows,
      });
    } else {
      res.json({
        message: "Monster on the loose",
      });
    }
  });
};

export default {
  getDashboardData,
};
