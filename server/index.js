const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

const db = require('./models')

// Routers
const userRouter = require('./routes/Users.js')
app.use('/users', userRouter)

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server is running")
    })
})
