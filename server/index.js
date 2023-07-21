const express = require('express')
const app = express()
const port = 3000
const mongoDB = require('./db')
mongoDB();

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(express.json());
app.use('/api', require('./Routes/createUser'));

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})