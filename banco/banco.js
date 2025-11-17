const mongoose = require("mongoose");

async function checkConnectionMongoDB() {
    const startTime = Date.now();
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/User', {
            serverSelectionTimeoutMS: 200,
            connectTimeoutMS: 200,
        });

        const endTime = Date.now();
        const time = endTime - startTime;

        try {
            await mongoose.disconnect();
        } catch (closeErr) {
            console.error('Erro ao desconectar do MongoDB após verificação:', closeErr.message || closeErr);
        }

        return { status: 'UP', time };
    } catch (err) {
        const endTime = Date.now();
        const time = endTime - startTime;
        return {
            status: 'DOWN',
            time,
            message: `Could not connect to MongoDB: ${err.message}`
        };
    }
}

module.exports = checkConnectionMongoDB;
