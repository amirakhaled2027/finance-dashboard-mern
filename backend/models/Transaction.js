import mongoose from 'mongoose';
import { loadType } from 'mongoose-currency';


//having access to this particular currency type in mongoose: mongoose.Types.Currency
loadType(mongoose);

const TransactionSchema = new mongoose.Schema(
    {
        buyer: {
            type: String,
            required: true,
        },
        amount: {
            type: mongoose.Types.Currency,
            currency: 'USD',
            get: (v) => v / 100
        },
        //this is referring to the transaction schema object, so I have references to each transaction that's relevant to this particular product
        productIds: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }],
    },
    //timestamps will give us the data about when one is created or updated
    { timestamps: true, toJSON: { getters: true } }
);

const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;