// BAGIAN MIDDLEWARE KHUSUS
const loginValidation = (req, res, next) => {
  if (req.session.userId) {
    console.log(`Dari middleware: userId = ${req.session.userId}`);
    next();
  } else {
    res.json({
      message: "No login detected",
    });
  }
};

export default loginValidation;
