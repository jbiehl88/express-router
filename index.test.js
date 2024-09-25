const request = require("supertest")
const app = require("./src/app.js")
const { User } = require("./models")
const syncSeed = require("./seed.js")
const db = require("./db/connection.js")

beforeAll(async () => {
	await syncSeed()
})

afterAll(async () => {
	await db.sync({ force: true })
})

describe("User Tests", () => {
	it("status code 200", async () => {
		const response = await request(app).get("/users").expect(200)
	})
	it("test get all", async () => {
		const response = await request(app).get("/users")
		expect(Array.isArray(response.body)).toBe(true)
		expect(response.body[0]).toHaveProperty("age")
	})
	it("test number of users", async () => {
		const response = await request(app).get("/users")
		expect(response.body.length).toBe(4)
	})
	it("test correct data", async () => {
		const response = await request(app).get("/users")
		expect(response.body).toContainEqual(
			expect.objectContaining({
				id: 1,
				name: "User 1",
				age: 30,
			})
		)
	})
	it("test correct data per id", async () => {
		const response = await request(app).get("/users/1")
		expect(response.body).toEqual(
			expect.objectContaining({
				id: 1,
				name: "User 1",
				age: 30,
			})
		)
	})
	it("add user", async () => {
		const response = await request(app).post("/users").send({ name: "Taco Bell", age: 18 })
		expect(response.body.name).toBe("Taco Bell")
	})
	it("update endpoint", async () => {
		const response = await request(app).put("/users/1").send({ name: "Taco Bell" })
		const user = await User.findByPk(1)
		expect(user.name).toBe("Taco Bell")
	})
	it("delete endpoint", async () => {
		const response = await request(app).delete("/users/1")
		const users = await User.findAll({})
		expect(users[0].id).toEqual(2)
	})
	it("checks user validator errors", async () => {
		const response = await request(app).post("/users").send({ age: 18 })
		expect(response.body.error).toContainEqual(
			expect.objectContaining({
				msg: "Invalid value",
				param: "name",
				location: "body",
			})
		)
	})
	it("checks fruit validator errors", async () => {
		const response = await request(app).post("/fruits").send({ name: "IDGAG" })
		expect(response.body.error).toContainEqual(
			expect.objectContaining({
				msg: "Invalid value",
				param: "color",
				location: "body",
			})
		)
	})
})
