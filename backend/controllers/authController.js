const User = require('../models/user');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const crypto = require('crypto');
const generateToken = require('../utils/generateToken');
const sendEmail = require('../utils/sendEmail');
dotenv.config();


const signup = async(req,res)=>{
    const {name,email,password} = req.body;
    try{

        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({
                success:false,
                message:"User already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({name,email,password:hashedPassword});
        await newUser.save();
        const token = generateToken(newUser._id);
        res.status(201).json({token,user:{id:newUser._id,name:newUser.name,email:newUser.email},message:"Signup Successfull"});

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
};

const login = async(req,res)=>{
    const {email,password} = req.body;
    try{

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"User does not exists"
            })
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Invalid Credentials"
            })
        }
        const token = generateToken(user._id);
        res.json({token,user:{id:user._id,name:user.name,email:user.email},message:"Login successfull"});

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 1000 * 60 * 10; // 10 min
    await user.save();


    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    const message = `Click to reset your password: ${resetUrl}`;
    await sendEmail(user.email, 'Password Reset', message);

    res.json({ message: 'Reset email sent' });
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    // Validate input
    if (!newPassword) {
      return res.status(400).json({ message: 'New password is required' });
    }

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getMe = async(req,res)=>{
  const user = req.user;
  if(!user){
    return res.status(401).json({
      message:"Unauthorized"
    })
  }
  res.json({
    id:user._id,
    name:user.name,
    email:user.email
  })
}

module.exports = {signup,login,forgotPassword,resetPassword,getMe};