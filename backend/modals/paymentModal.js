const { model, Schema } = require('mongoose');

const paymentSchema = new Schema({
    paymentID: { type: String, required: true, unique: true }, // Primary unique identifier
    userID: { type: String, required: true },
    trxID: { type: String, default: null }, // Transaction ID (null until execute payment)
    statusCode: { type: String, required: true }, // Status code
    statusMessage: { type: String, required: true }, // Status message
    amount: { type: Number, required: true }, // Payment amount
    currency: { type: String, default: 'BDT' }, // Currency (default to BDT)
    intent: { type: String, required: true }, // Payment intent
    transactionStatus: { type: String, default: 'Initiated' }, // Transaction status
    merchantInvoiceNumber: { type: String, required: true }, // Merchant invoice number
    paymentCreateTime: { type: String, default: null }, // Payment creation timestamp
    paymentExecuteTime: { type: String, default: null }, // Payment execution timestamp
    payerType: { type: String, default: null }, // Payer type
    payerReference: { type: String, default: null }, // Payer reference
    customerMsisdn: { type: String, default: null }, // Customer mobile number
    payerAccount: { type: String, default: null }, // Payer account
}, { timestamps: true });

module.exports = model('Payment', paymentSchema);
