const supertest = require("supertest")
const db = require("../database/dbConfig")
const server = require("../api/server")


describe("/JOKES ENDPOINT", ()=> {

    test("GET/ endpoint for jokes should not work", async()=> {
        const res = await supertest(server).get("/api/jokes")
        expect(res.status).toBe(401)
    })

    test("GET/ endpoint should not work with correct message", async()=> {
        const res = await supertest(server).get("/api/jokes")
        expect(res.body.message).toMatch(/restricted/i)
    })

})


