import mongoose from 'mongoose';
import { loadType } from 'mongoose-currency';

//having access to this particular currency type in mongoose: mongoose.Types.Currency
loadType(mongoose);

const ProductSchema = new mongoose.Schema(
    {
        price: {
            //totalProfit will be able to take in a decimal of two decimals and a number and that will allow me to convert it as necessary 
            type: mongoose.Types.Currency,
            currency: 'USD',
            //using a get call to  grab the value that I have saved in the currency, and the currency is always multiplied by a hundred 
            get: (v) => v / 100
        },
        expense: {
            type: mongoose.Types.Currency,
            currency: 'USD',
            get: (v) => v / 100
        },
        //this is referring to the transaction schema object, so I have references to each transaction that's relevant to this particular product
        transactions: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Transaction"
        }],
    },
    //timestamps will give the data about when one is created or updated
    { timestamps: true, toJSON: { getters: true } }
);

const Product = mongoose.model('Product', ProductSchema);

export default Product;