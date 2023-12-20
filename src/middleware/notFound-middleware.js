function notFound(req, res, next) {
  res.status(404).json({
    message: "404 Not found",
    route: req.url,
  });
}

export default notFound;
