const adminValidation = (req, res, next) => {
  if (req.session.user) {
    if (req.session.user.userId == "admin") {
      next();
    } else {
      res.status(404).json({
        message: "Lol, nope",
      });
    }
  } else {
    res.status(404).json({
      message: "Lol, nope",
    });
  }
};

export default adminValidation;
