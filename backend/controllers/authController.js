const UserModel = require('../models/userModel');
const { oauth2Client } = require('../utils/googleConfig');

const axios = require('axios');
const jwt = require('jsonwebtoken');

const googleLogin = async (req, res) => {
  try {
    const code = req.query.code;

    const googleRes = await oauth2Client.getToken(code);


    oauth2Client.setCredentials(googleRes.tokens);

    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );

    const { email, name, picture } = userRes.data;

    let user = await UserModel.findOne({ email });
    if (!user) {
      user = await UserModel.create({ name, email, image: picture });
    }

    const { id } = user;
    const token = jwt.sign(
      { _id: id, email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_TIMEOUT
      }
    );

    return res.status(200).json({
        message: 'Success',
        token,
        user
      });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          message: 'Internal server error'
        });
      }
    }

    module.exports = {googleLogin}