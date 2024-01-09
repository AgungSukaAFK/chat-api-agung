const adminValidation = (req, res, next) => {
  if (req.session.userId) {
    if (req.session.userId == "admin") {
      console.log("Admin approved: ");
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
