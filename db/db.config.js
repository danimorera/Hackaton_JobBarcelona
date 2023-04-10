const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const mongoConnect = async () => {

    try {
        await mongoose.connect(process.env.MONGO_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB up and running')

    } catch (error) {
        console.log(error)
        throw new Error('Error when starting DB')
    }
};


module.exports = {
    mongoConnect
};