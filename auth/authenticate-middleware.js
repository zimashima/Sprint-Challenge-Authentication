/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require("jsonwebtoken")
const { jwtSecret } = require("../database/config/secrets")

module.exports = {
  authenticate,
  validateRequest
}

function authenticate(req, res, next) {
    const token = req.headers.authorization;
    if (req.session && req.session.loggedIn && token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if(err) {
              res.status(401).json({ message: "LEAVE NOW AND NEVER COME BACK!!"})
            } else {
              req.user = { time: decodedToken.time };
              next();
            }
          })
        } else {
          res.status(401).json({ message: 'This is a restricted area, may I please ask you politely to not proceed?' })
        }
}

function validateRequest(req, res, next){
  if (!req.body){
      res.status(400).json({ message: `Please make sure the REQUEST BODY is not empty` })
    } else if (!req.body.username) {
      res.status(400).json({ message: `Please make sure that USERNAME field is not empty` })
    } else if (!req.body.password){
      res.status(400).json({ message: `Please make sure that PASSWORD field is not empty` })
    } else {
      next()
    }
}
