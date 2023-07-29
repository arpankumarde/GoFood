const mongoose = require('mongoose');
const mongoURI = process.env.mongoURI;

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true })
        console.log('Connected to MongoDB')
        const fetched_items = await mongoose.connection.db.collection("food_items").find({}).toArray()
        const fetched_category = await mongoose.connection.db.collection("food_category").find({}).toArray()
        global.food_items = await fetched_items;
        global.food_category = await fetched_category;
    } catch (err) {
        console.log(err)
    }
}

module.exports = mongoDB;