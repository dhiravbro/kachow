const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("kachow-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "No token , access denied" });
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtSecretToken"));
    req.user = decoded.user;
    req.type = decoded.type;
    req.restaurant = decoded.restaurant;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token not valid" });
  }
};
