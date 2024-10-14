import mongoose from 'mongoose';
import { loadType } from 'mongoose-currency';


//by this line, we will have access to this particular currency type in mongoose: mongoose.Types.Currency
loadType(mongoose);

//defining a schema for daily data
const daySchema = new mongoose.Schema(
    {
        data: String,
        revenue: {
            type: mongoose.Types.Currency,
            currency: 'USD',
            get: (v) => v / 100
        },
        expenses: {
            type: mongoose.Types.Currency,
            currency: 'USD',
            get: (v) => v / 100
        },
    },
    //this is a setting so we can use get in all of them
    { toJSON: { getters: true }}
)

//defining a scheme for monthly data, coz it's gonna be an array, and it's gonna be problematic an array nested in objects
const monthSchema = new mongoose.Schema(
    {
        month: String,
        revenue: {
            type: mongoose.Types.Currency,
            currency: 'USD',
            get: (v) => v / 100
        },
        expenses: {
            type: mongoose.Types.Currency,
            currency: 'USD',
            get: (v) => v / 100
        },
        operationalExpenses: {
            type: mongoose.Types.Currency,
            currency: 'USD',
            get: (v) => v / 100
        },
        noneOperationalExpenses: {
            type: mongoose.Types.Currency,
            currency: 'USD',
            get: (v) => v / 100
        },
    },
    //this is a setting so we can use get in all of them
    { toJSON: { getters: true }}
)



const KPISchema = new mongoose.Schema(
    {
        totalProfit: {
            //totalProfit will be able to take in a decimal of two decimals and a number and that will allow us to convert it as necessary 
            type: mongoose.Types.Currency,
            currency: 'USD',
            //the reason we wanna use a get call for these: we wanna grab the value that we have in saved in the currency and the currency is always multiplied by a hundred 
            get: (v) => v / 100
        },
        totalRevenue: {
            type: mongoose.Types.Currency,
            currency: 'USD',
            get: (v) => v / 100
        },
        totalExpenses: {
            type: mongoose.Types.Currency,
            currency: 'USD',
            get: (v) => v / 100
        },
        expensesByCategory: {
            //since this is an object the way Mongoose defines objects is by using map
            type: Map,
            of: {
                type: mongoose.Types.Currency,
                currency: 'USD',
                get: (v) => v / 100
            }
        },
        monthlyData: [monthSchema],
        dailyData: [daySchema],
    },
    //timestamps will give us the data about when one is created or updated
    { timestamps: true, toJSON: { getters: true }}
);

const KPI = mongoose.model('KPI', KPISchema);

export default KPI;