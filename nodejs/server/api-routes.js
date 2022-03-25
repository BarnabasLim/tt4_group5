// Initialize express router
var router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to DBS SEED TT4_Group5!'
    });
});

var controller = require('./controller');

router.route('/getAllCustomers')
    .get(controller.getAllCustomers);
router.route('/getCustomerById')
    .post(controller.getCustomerById);
// router.route('/getAccountBalByCustomerId')
//     .get(controller.getAccountBalByCustomerId);

// Export API routes
module.exports = router;