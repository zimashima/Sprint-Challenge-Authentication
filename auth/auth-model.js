const bcrypt = require("bcryptjs")
const db = require("../database/dbConfig")

async function registerNewUser(newUser) {
    newUser.password = await bcrypt.hash(newUser.password, 10)
    const [ id ] = await db("users").insert(newUser)
    return await db("users").where("id", id).first()
}

function findUserById(id){
    return db("users").where("id", id).first("id","username")

}

function findUserBy(key) {
    return db("users").select("id", "username", "password").where(key);
}

module.exports = {
    registerNewUser,
    findUserById,
    findUserBy
}