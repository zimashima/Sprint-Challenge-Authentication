const supertest = require("supertest")
const server = require("./server")

test("GET/ enpoint for server works", async()=> {
    const res = await supertest(server).get("/")
    expect(res.status).toBe(200)
    expect(res.type).toBe("application/json")
    expect(res.body.message).toMatch(/welcome/i)
})