const express = require("express")
const { User, Fruit } = require("../models/index")
const app = require("../src/app")
const { check, validationResult } = require("express-validator")

const fruitRouter = express.Router()

fruitRouter.post("/", [check(["color", "name"]).not().isEmpty().trim(), check("name").isLength({ min: 5, max: 20 })], async (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		res.json({ error: errors.array() })
	} else {
		let createFruit = await Fruit.create(req.body)
		res.json(createFruit)
	}
})

fruitRouter.put("/:id", [check(["color", "name"]).not().isEmpty().trim()], async (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		res.json({ error: errors.array() })
	} else {
		let fruitId = req.params.id
		let updateFruit = await Fruit.update(req.body, { where: { id: fruitId } })
		res.json(updateFruit)
	}
})

module.exports = fruitRouter
