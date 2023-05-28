const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const SCREAT_KEY = process.env.KEY;

const auth = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      let user = jwt.verify(token, SCREAT_KEY);
      req.userId = user.Id;
    } else {
      return res.status(401).json({ message: "unautherize user" });
    }
    next();
  } catch (error) {
    res.status(400).json({ message: "invalid user" });
    console.log(error);
  }
};
module.exports=auth
