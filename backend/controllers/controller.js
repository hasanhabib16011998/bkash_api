const axios = require('axios');
const { getValue, setValue, unsetValue } = require("node-global-storage");
const { v4 : uuidv4 } = require('uuid');
const Payment = require('../modals/paymentModal'); // Import model directly
class PaymentController {
    bkash_header = async () => {
        //console.log('ID TOKEN:', getValue('id_token'));
        //console.log(process.env.BKASH_APP_KEY);
        return {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": getValue('id_token'),
            "X-App-Key": process.env.BKASH_APP_KEY,
        };
    };

    payment_create = async (req, res) => {
        const { amount,userID } = req.body;
        setValue('userID',userID);

        try {
            console.log('payment is creating');
            const { data } = await axios.post(
                process.env.BKASH_CREATE_PAYMENT_URL,
                {
                    mode: '0011',
                    payerReference: '01619777283',
                    callbackURL: 'http://localhost:3000/api/bkash/payment/callback',
                    amount: amount,
                    currency: 'BDT',
                    intent: 'sale',
                    merchantInvoiceNumber: 'Inv' + uuidv4().substring(0, 5),
                },
                {
                    headers: await this.bkash_header(),
                }
            );

            console.log(data);
            // Create a new Payment entry with initial data from create_payment API
            if(data && data.statusCode === '0000'){
                const userID = getValue('userID');
                await Payment.create({
                    userID: userID,
                    paymentID: data.paymentID,
                    transactionStatus: data.transactionStatus,
                    amount: data.amount,
                    currency: data.currency,
                    paymentCreateTime: data.paymentCreateTime,
                    merchantInvoiceNumber: data.merchantInvoiceNumber,
                    callbackURL: data.callbackURL,
                    intent: data.intent, // Add the required intent field
                    statusMessage: data.statusMessage, // Add the required statusMessage field
                    statusCode: data.statusCode, // Add the required statusCode field
                }).catch((err) => {
                    console.error("Error creating payment entry:", err);
                    return res.status(500).json({ error: "Failed to create payment entry" });
                });

                return res.status(200).json({bkashURL:data.bkashURL})
        }

        } catch (error) {
            return res.status(401).json({error: error.message})
        }
    };

    call_back = async(req,res) => {
        const {paymentID,status} = req.query;
        console.log(req.query);
        if(status === 'cancel' || status === 'failure'){
            return res.redirect(`http://localhost:5173/error?message=${status}`)
        }
        else if(status === 'success'){
            try{
                const {data} = await axios.post(process.env.BKASH_EXECUTE_PAYMENT_URL,{paymentID},{
                    headers: await this.bkash_header(),
                })
                console.log(data);
                if(data && data.statusCode === '0000'){
                    console.log("Payment Successful");
                    const userID = getValue('userID');

                    await Payment.findOneAndUpdate(
                        { paymentID: data.paymentID },
                        {
                            trxID: data.trxID,
                            transactionStatus: data.transactionStatus,
                            paymentExecuteTime: data.paymentExecuteTime,
                            payerType: data.payerType,
                            payerReference: data.payerReference,
                            customerMsisdn: data.customerMsisdn,
                            payerAccount: data.payerAccount,
                            statusCode: data.statusCode,
                            statusMessage: data.statusMessage,
                        },
                        { new: true } // Return the updated document
                    );
                    return res.redirect(`http://localhost:5173/success?message=${paymentID}`)
                }
                else{
                    return res.redirect(`http://localhost:5173/error?message=${data.statusMessage}`)
                }

            }
            catch(error){
                return res.redirect(`http://localhost:5173/error?message=${error.message}`)

            }
        }

    }
}

module.exports = new PaymentController();