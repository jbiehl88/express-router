const app = require("./src/app")
const port = 3000
const db = require("./db/connection")
// Express Routes

app.listen(port, () => {
	db.sync()
	console.log(`App listening on port ${port}`)
})
