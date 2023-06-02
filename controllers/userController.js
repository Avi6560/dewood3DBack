const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validEmail = (Email) => {
  if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(Email)) {
    return false;
  } else {
    return true;
  }
};

const validPwd = (Password) => {
  if (
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(
      Password
    )
  ) {
    return false;
  } else {
    return true;
  }
};

const register = async (req, res) => {
  try {
    const body = req.body;
    const { email, password, cnfPassword } = body;

    if (!email || !password || !cnfPassword) {
      return res
        .status(400)
        .json({ status: false, message: "All required fields" });
    }
    if (validEmail(email)) {
      return res
        .status(400)
        .json({ status: false, message: "Enter a valid email address" });
    }
    let checkEmail = await User.findOne({ email: email });
    if (checkEmail) {
      return res
        .status(400)
        .json({ status: false, message: "User already exists or login now" });
    }
    if (validPwd(password && cnfPassword)) {
      return res.status(400).json({
        status: false,
        message:
          "Password should be 8 characters long and must contain one of 0-9,A-Z,a-z and special characters",
      });
    }
    if (password !== cnfPassword) {
      return res
        .status(400)
        .json({ status: false, message: "Passwords do not match" });
    } else {
      body.password = await bcrypt.hash(body.password, 10);
      body.cnfPassword = await bcrypt.hash(body.cnfPassword, 10);
    }
    let userData = await User.create(body);
    console.log("created", userData);
    res.status(201).send({
      status: true,
      message: "User created successfully",
      data: userData,
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    let data = req.body;
    console.log(data);
    const { email, password } = data;
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "All required fields" });
    }

    if (validEmail(email)) {
      return res
        .status(400)
        .json({ status: false, message: "Enter a valid email address" });
    }
    if (validPwd(password)) {
      return res.status(400).json({
        status: false,
        message:
          "Password should be 8 characters long and must contain one of 0-9,A-Z,a-z and special characters",
      });
    }
    const checkValidUser = await User.findOne({ email: data.email });
    if (!checkValidUser) {
      return res
        .status(404)
        .send({ status: false, message: "Email not found " });
    }
    let checkPassword = await bcrypt.compare(
      data.password,
      checkValidUser.password
    );
    if (!checkPassword) {
      return res
        .status(400)
        .send({ status: false, message: "Password is not correct" });
    }
    console.log("checkPassword", checkPassword);
    // let token = jwt.sign({ userId: checkValidUser._id }, "Product-Management", {
    //   expiresIn: "1d",
    // });
    const token = await checkValidUser.generateAuthtoken();
    console.log("token: " + token);
    res.setHeader("x-api-key", token);
    res
      .status(200)
      .send({ status: true, message: "Successfully Login", data: token });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { register, login };
