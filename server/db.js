const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://someurl';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true })
        console.log('Connected')
        let fetched = await mongoose.connection.db.collection("food_items").find({}).toArray();
        // console.log(fetched);
    } catch (err) {
        console.log(err)
    }

    // await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
    //     if (err) console.log("---", err)
    //     else {
    //         console.log("Connected");
    //     }
    // })

    // .then((res) => {
    //     console.log('Connected to mongoDB');
    // })
    // .finally((res) => {
    //     let fetched = await mongoose.connection.db.collection("food_items");
    //     fetched.find({}).toArray(function (err, data) {
    //         if (err) console.log(err)
    //         else console.log(data)
    //     })
    //     console.log(fetched)
    // })
    // .catch((error) => console.log(error))
}

module.exports = mongoDB;