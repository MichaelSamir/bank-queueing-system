const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
    serviceName: {
        type: String,
        required: true,
        match: /open_account|close_account|deposit|withdraw/
    },
    customerNumber: { type: String, required: true }
});

module.exports = mongoose.model('Service', serviceSchema);