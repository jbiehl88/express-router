const express = require("express")
const { User, Fruit } = require("../models/index")
const app = require("../src/app")
const { check, validationResult } = require("express-validator")

const userRouter = express.Router()

userRouter.get("/", async (req, res) => {
	let users = await User.findAll({})
	res.json(users)
})

userRouter.get("/:id", async (req, res) => {
	let userId = req.params.id
	let user = await User.findByPk(userId)
	res.json(user)
})

userRouter.post("/", [check("name").not().isEmpty().trim()], async (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		res.json({ error: errors.array() })
	} else {
		let createUser = await User.create(req.body)
		res.json(createUser)
	}
})

userRouter.put("/:id", async (req, res) => {
	let userId = req.params.id
	let updateUser = await User.update(req.body, { where: { id: userId } })
	res.json(updateUser)
})

userRouter.delete("/:id", async (req, res) => {
	let userId = req.params.id
	let deleteUser = await User.destroy({ where: { id: userId } })
	res.json(deleteUser)
})

module.exports = {
	userRouter,
}
