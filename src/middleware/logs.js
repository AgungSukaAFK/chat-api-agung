import ansiColor from "../config/ansiColor.js";
const ANSICOLOR = ansiColor;

function terminalLogs(req, res, next) {
  console.log(
    `${ANSICOLOR.green}[Request masuk]${ANSICOLOR.reset} url: ${
      req.url
    }, method: ${req.method}, body: ${
      req.body ? JSON.stringify(req.body, null, 2) : null
    }`
  );
  next();
}

export default terminalLogs;
