import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = req.header.authorization;

  console.log(token);
};
