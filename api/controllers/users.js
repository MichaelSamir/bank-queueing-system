//Load Service model
const Service = require('../models/service');

//Load error methods
const errors = require('../error/errors');

//Book number for a service
exports.book_number = (req, res, next) => {
    if (req.body.serviceName === 'open_account' || req.body.serviceName === 'close_account') {
        //Service belongs to Customer Service
        //Count Customer Service queued users & book new number starts with "c"
        Service.find({
            serviceName: { $in: ['open_account', 'close_account'] }
        })
            .then(queue => {
                const customerNumber = queue.length + 1
                const service = new Service({
                    serviceName: req.body.serviceName,
                    customerNumber: "c" + customerNumber
                });
                service
                    .save()
                    .then(service => {
                        res.status(201).json({
                            message: "your number is " + service.customerNumber
                        });
                    })
                    .catch(err => errors.err_code_500(err, res));
            })
            .catch(err => errors.err_code_500(err, res));

    } else if (req.body.serviceName === 'deposit' || req.body.serviceName === 'withdraw') {
        //Service belongs to Teller
        //Count Teller queued users & book new number starts with "t"
        Service.find({ serviceName: { $in: ['deposit', 'withdraw'] } })
            .then(queue => {
                const customerNumber = queue.length + 1
                const service = new Service({
                    serviceName: req.body.serviceName,
                    customerNumber: "t" + customerNumber
                });
                service
                    .save()
                    .then(service => {
                        res.status(201).json({
                            message: "your number is " + service.customerNumber
                        });
                    })
                    .catch(err => errors.err_code_500(err, res));
            })
            .catch(err => errors.err_code_500(err, res));
    } else {
        //No matching service name
        errors.err_code_500("Service name should be one of these:'open_account', 'close_account', 'deposit', 'withdraw'", res);
    }
}