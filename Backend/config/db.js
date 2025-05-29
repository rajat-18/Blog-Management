const mongoose = require('mongoose');

const connectToDatabase = async () => {
    try {
        const connectionString =`mongodb+srv://akashkesharwani81:Akash%408173@vega6.apfo75c.mongodb.net/vega`;
        await mongoose.connect(connectionString);

        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = connectToDatabase;