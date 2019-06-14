const User = require('../models/user')
const { compareSync } = require('../helpers/bcrypt')
const jwt = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const randomPass = require("../helpers/randomPass")

class UserCont {
  static GoogleSignIn(req, res, next) {
    let payload = null
    let newPass = null
    client.verifyIdToken({
      idToken: req.body.id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
      .then((ticket) => {
        payload = ticket.getPayload();
        const userid = payload['sub']
        return User.findOne({ email: payload.email })
      })
      .then((user) => {
        if (!user) {
          newPass = randomPass()
          return User.create({
            name: payload.name,
            email: payload.email,
            password: newPass
          })
        }
        return user
      })
      .then(user => {
        let { name } = user
        let payload = {
          _id: user._id,
          name: user.name,
          email: user.email
        }
        let token = jwt.sign(payload, process.env.KUNCI)
        console.log('token --->', token, '<---token')
        let data = { token, name }
        if (newPass) data.newPass = newPass
        res.status(201).json(data)
      })
      .catch(next)
  }

  static register(req, res, next) {
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
      .then(row => {
        res.status(201).json(row)
      })
      .catch(next)
  }

  static login(req, res, next) {
    User.findOne({
      email: req.body.email,
    })
      .then(row => {
        if (row) {
          let { name } = row
          let isSame = compareSync(req.body.password, row.password)
          if (isSame) {
            let payload = {
              _id: row._id,
              email: row.email
            }
            let token = jwt.sign(payload)
            res.status(201).json({
              token,
              name,
            })
          }
          else next({ code: 422, message: 'Wrong email/password' })
        }
        else
          next({ code: 422, message: 'Wrong email/password' })
      })
      .catch(next)
  }
}

module.exports = UserCont