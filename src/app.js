const express = require("express")
const app = express()

const { userRouter } = require("../routes/users")
// const { fruitRouter } = require("../routes/fruits")

app.use(express.json())
app.use(express.urlencoded())

app.use("/users", userRouter)

module.exports = app
