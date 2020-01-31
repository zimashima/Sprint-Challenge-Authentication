const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const { jwtSecret } = require("../database/config/secrets")

const router = require('express').Router();

const db = require("./auth-model")
const { validateRequest } = require("./authenticate-middleware")

router.post('/register', validateRequest, async (req, res) => {

  try {
    res.status(201).json( await db.registerNewUser(req.body))
  }
  catch(err){
    res.status(500).json({message: `ERROR 500 ${error}`})
  }

});

router.post('/login', validateRequest, async (req, res) => {
  try {

    const  { username, password } = req.body;
    const user = await usersDB.findBy({ username }).first()
    const passwordValid = await bcrypt.compareSync(password, user.password)

    if (user && passwordValid){
        const token = signToken(user)
        req.session.user = user
        req.session.loggedIn = true
        res.status(200).json({ token, message: `Welcome ${user.username}` })

    } else {
        res.status(401).json({ message: "INVALID CREDENTIALS, please retry" });
    }
}

catch(err){
    res.status(500).json({ message: `ERROR 500 ${err}` })
}
});



function signToken(user) {
  const payload = {
      time: Date.now()
  }
  const options = {
      expiresIn: '1d'
  }

  return jwt.sign(payload, jwtSecret, options);
}


module.exports = router;
