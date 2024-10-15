import mongoose from 'mongoose';
import { loadType } from 'mongoose-currency';


//by this line, we will have access to this particular currency type in mongoose: mongoose.Types.Currency
loadType(mongoose);


const ProductSchema = new mongoose.Schema(
    {
        price: {
            //totalProfit will be able to take in a decimal of two decimals and a number and that will allow us to convert it as necessary 
            type: mongoose.Types.Currency,
            currency: 'USD',
            //the reason we wanna use a get call for these: we wanna grab the value that we have in saved in the currency and the currency is always multiplied by a hundred 
            get: (v) => v / 100
        },
        expense: {
            type: mongoose.Types.Currency,
            currency: 'USD',
            get: (v) => v / 100
        },
        //this is referring to the transaction schema object, so we have references to each transaction that's relevant ot this particular product
        //this is how you make relationships between different models and schemes, 
        //and you do that coz sometimes you need to grab all the transactions for a particular product, and you wanna keep track of all the Ids relevant to that
        transactions: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Transaction"
        }],
    },
    //timestamps will give us the data about when one is created or updated
    { timestamps: true, toJSON: { getters: true }}
);

const Product = mongoose.model('Product', ProductSchema);

export default Product;