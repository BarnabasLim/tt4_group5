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
router.route('/checkLogin')
    .post(controller.checkLogin);
router.route('/getAccountBalByCustomerId')
    .get(controller.getAccountBalByCustomerId);
router.route('/getLoanById')
    .get(controller.getLoanById);

// Export API routes
module.exports = router;