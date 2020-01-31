const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const session = require("express-session")
const KnexSessionStore = require("connect-session-knex")(session)
const dbConnection = require("../database/dbConfig")

const { authenticate } = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use(session({
    name: `oatmeal`,
    resave: false,
    saveUninitialized: false,
    secret: "Got a secret, can you keep it?",
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 30,
        secure: false
    },
    store: new KnexSessionStore({
        knex: dbConnection,
        tablename: "session",
        sidfieldname:"sid",
        createtable: true,
        clearInterval: 60000,
    })
    
}))



server.get("/", (req, res)=> {
    res.status(200).json({ message: `WELCOME TO MY FOOD DATABASE`})
})

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);


module.exports = server;
