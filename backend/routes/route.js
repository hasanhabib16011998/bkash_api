const router = require('express').Router();
const paymentController = require('../controllers/controller');
const middleware = require('../middelwares/middleware');

router.post('/bkash/payment/create',middleware.bkash_auth,paymentController.payment_create);

router.get('/bkash/payment/callback',middleware.bkash_auth,paymentController.call_back);

module.exports = router;
