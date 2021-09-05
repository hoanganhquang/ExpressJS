const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/test_app');

        console.log('Connect successfully')
    } catch (error) {
        console.log('Error')
    }
}

module.exports = { connect }
