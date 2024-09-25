const express = require("express")
const { User, Fruit } = require("../models/index")
const app = require("../src/app")
const { check, validationResult } = require("express-validator")

const fruitRouter = express.Router()

fruitRouter.post("/", [check("color").not().isEmpty().trim()], async (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		res.json({ error: errors.array() })
	} else {
		let createFruit = await Fruit.create(req.body)
		res.json(createFruit)
	}
})

module.exports = fruitRouter
