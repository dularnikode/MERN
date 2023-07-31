import bcrypt from "bcrypt";
import User from "../models/user.js";
import sendCookie from "../utils/cookie.js";
import ErrorHandler from "../middleware/error.js";

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Email not found.", 404));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new ErrorHandler("Wrong Password", 404));
    }

    sendCookie(user, res, `${user.name} you are logged in successfully.`, 200);
  } catch (error) {
    next(error);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return next(new ErrorHandler("User Already Exists"), 400);
    const hashedPass = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedPass });

    sendCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};

const getMyProfile = (req, res, next) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
};

const logoutUser = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .send({
      success: true,
      message: "Logout Successfully",
    });
};

export { userLogin, registerUser, getMyProfile, logoutUser };
