import mongoose from 'mongoose';
import { loadType } from 'mongoose-currency';


//by this line, we will have access to this particular currency type in mongoose: mongoose.Types.Currency
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
        //this is referring to the transaction schema object, so we have references to each transaction that's relevant ot this particular product
        //this is how you make relationships between different models and schemes, 
        //and you do that coz sometimes you need to grab all the transactions for a particular product, and you wanna keep track of all the Ids relevant to that
        productIds: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }],
    },
    //timestamps will give us the data about when one is created or updated
    { timestamps: true, toJSON: { getters: true }}
);

const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;