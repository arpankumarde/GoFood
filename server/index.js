const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT
const mongoDB = require('./db')

mongoDB();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT);
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
})

app.use(express.json());

app.use('/api', require('./routes/createUser'));
app.use('/api', require('./routes/displayData'));
app.use('/api', require('./routes/orderData'));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})