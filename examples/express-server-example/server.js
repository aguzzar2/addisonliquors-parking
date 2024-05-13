const express = require('express')
const app = express()
const port = 3000

app.use(express.static("public")) //serves files from public folder
app.use(express.urlencoded( {extended : true })) //middleware to access form information
app.use(express.json()) //allows you to parse JSON info from body

app.set('view engine', 'ejs')


const userRouter = require('./routes/users')

app.use('/users', userRouter)


app.listen(port)
