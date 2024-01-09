// BAGIAN MIDDLEWARE KHUSUS
const loginValidation = (req, res, next) => {
  console.log(req.headers.cookie);
  if (req.headers.cookie) {
    console.log(`"Login berhasil"`);
    next();
  } else {
    res.json({
      message: "No login detected",
    });
  }
};

export default loginValidation;
