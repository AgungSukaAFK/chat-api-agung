// BAGIAN MIDDLEWARE KHUSUS
const loginValidation = (req, res, next) => {
  if (req.session.user) {
    console.log(`Dari middleware: ${req.session}`);
    next();
  } else {
    res.json({
      message: "No login detected",
    });
  }
};

export default loginValidation;
