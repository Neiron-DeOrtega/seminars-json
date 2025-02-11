const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 5050
import appRouter from './router/appRouter'

app.use(express.json())
app.use(cors())

app.use('/seminars', appRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})


