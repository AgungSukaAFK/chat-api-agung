function errorHandler(err, req, res, next) {
  res.json({
    message: err.message,
    url: req.url,
    // error: err,
  });
}

export default errorHandler;
