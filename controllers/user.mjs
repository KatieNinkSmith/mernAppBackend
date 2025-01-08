import User from "../models/user.mjs";
import jwt from "jsonwebtoken";

async function create(req, res) {
  try {
    const createdUser = await User.create(req.body);
    // create a JWT token
    // the token will be a string
    const token = createJWT(createdUser);
    res.status(200).json(token);
  } catch (err) {
    res.status(400).json(err);
  }
}
// ===================Helper Function============
function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: "24h" }
  );
}
export default { create, createJWT };
