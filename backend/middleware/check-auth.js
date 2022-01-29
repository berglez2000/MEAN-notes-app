const jwt = require("jsonwebtoken");
const secretKey = "2Pe8xTMmt&_B&vZ$2Q_4vfD-WTR@5zQVjz%V@5!hWuv5xkcz^t";

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, secretKey);
    next();
  } catch (err) {
    res.status(401).json({ success: false, msg: "Invalid token" });
  }
};
