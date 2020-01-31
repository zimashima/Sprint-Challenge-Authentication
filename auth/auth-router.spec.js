const supertest = require("supertest")
const db = require("../database/dbConfig")
const server = require("../api/server")

describe("POST/ register endpoint", ()=> {

    beforeEach(async () => {
        await db('users').truncate();
    })

    test("POST /REGISTER should work", async()=> {

        const newUser = { username: "galapagos", password: "123456789" }
        const res = await supertest(server).post("/api/auth/register").send(newUser)
        expect(res.status).toBe(201)
        expect(res.body.username).toBe(newUser.username)
    })

    test("POST /REGISTER should NOT work", async()=> {
        const newUser = { username: "galapagos" }
        const res = await supertest(server).post("/api/auth/register").send(newUser)
        expect(res.status).toBe(400)
    })
    
})

describe("POST/ login endpoint", ()=> {
    beforeEach(async () => {
        await db('users').truncate();
    })

    test("POST/ login should work", async()=> {

        const newUser = { username: "galapagos", password: "123456789" }
        await supertest(server).post("/api/auth/register").send(newUser)
        const res = await supertest(server).post("/api/auth/login").send(newUser)
        expect(res.status).toBe(200)
        expect(res.body.message).toMatch(/welcom/i)
    })

    test("POST/ login should NOT work with wrong request", async()=> {

        const newUser = { username: "panamacitybeach", password: "12345678" }
        await supertest(server).post("/api/auth/register").send(newUser)
        const res = await supertest(server).post("/api/auth/login").send({ username: "panamacity" })
        expect(res.status).toBe(400)
    })
})

