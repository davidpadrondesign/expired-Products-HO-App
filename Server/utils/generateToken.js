import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT__SECRET, {
    expiresIn: "5h",
  });
};

export default generateToken;