import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT__SECRET, {
    expiresIn: "30m",
  });
};

export default generateToken;