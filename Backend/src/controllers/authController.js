
// Importing Bcrypt and Json web token
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const User = require('../models/user.js');





const getSignInForm = (req, res) => res.rener('signForm');




// New user Registration 
const register = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    let newUser = await User.create({
      name,
      email,
      password: hashPassword
    });

    res.status(200).json({ id: newUser._id, name: newUser.name, email: newUser.email });

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}





const loginForm = (req, res) => res.render('loginForm');





const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" })
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Password incorrect" })
    }


    const token = jwt.sign(

      {
        userId: user._id
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d"
      }
    )


    // res.cookie("token", token);

    res.status(200).json({

      message: "login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    })


  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}



const getCurrentUser = async (req, res) => {

  try {

    const user = await User.findById(req.user.userId)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

}


module.exports = {
  register,
  getSignInForm,
  loginForm,
  login,
  getCurrentUser
};
