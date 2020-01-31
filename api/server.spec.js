const supertest = require("supertest")
const server = require("./server")

test("GET/ endpoint for server works", async()=> {
    const res = await supertest(server).get("/")
    expect(res.status).toBe(200)
    expect(res.type).toBe("application/json")
    expect(res.body.message).toMatch(/welcome/i)
})



test("POST/ enpoint for jokes should not work", async()=> {
    const res = await supertest(server).get("/api/jokes")
    expect(res.status).toBe(401)
})