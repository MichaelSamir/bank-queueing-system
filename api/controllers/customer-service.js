//Load Service model
const Service = require('../models/service');

//Load error methods
const errors = require('../error/errors');

//Pull the next customer
exports.pull_from_queue = (req, res, next) => {
    //Retreive all queued numbers
    Service.find({
        serviceName: { $in: ['open_account', 'close_account'] }
    })
        .select('customerNumber serviceName')
        .sort({
            customerNumber: 'ascending'
        })
        .then(queue => {
            if (queue.length >= 1) {
                //Pull next customer from queue
                const nextCustomer = queue[0];
                Service.deleteOne({ customerNumber: nextCustomer.customerNumber })
                    .then(successObj => {
                        console.log(successObj);
                        res.status(200).json({
                            nextCustomer: nextCustomer
                        });
                    })
                    .catch(err => { errors.err_code_500(err, res) });
            } else {
                //Queue is empty
                res.status(200).json({
                    message: 'Queue is empty!'
                });
            }
        })
        .catch(err => { errors.err_code_500(err, res) });
}

exports.show_queue = (req, res, next) => {
    //Retreive all queued numbers
    Service.find({
        serviceName: { $in: ['open_account', 'close_account'] }
    }).sort({
        customerNumber: 'ascending'
    })
        .then(queue => {
            if (queue.length >= 1) {
                res.status(200).json({
                    queuedCustomers: queue
                });
            } else {
                //Queue is empty
                res.status(200).json({
                    message: 'Queue is empty!'
                });
            }
        })
        .catch(err => { errors.err_code_500(err, res) });
}