import mongoose from 'mongoose';
import { loadType } from 'mongoose-currency';


//having access to this particular currency type in mongoose: mongoose.Types.Currency
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
    //this is a setting so I can use get in all of them
    { toJSON: { getters: true } }
)

//defining a scheme for monthly data
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
    //this is a setting so I can use get in all of them
    { toJSON: { getters: true } }
);

const KPISchema = new mongoose.Schema(
    {
        totalProfit: {
            //totalProfit will be able to take in a decimal of two decimals and a number and that will allow me to convert it as necessary 
            type: mongoose.Types.Currency,
            currency: 'USD',
            //using a get call to  grab the value that I have saved in the currency, and the currency is always multiplied by a hundred 
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
            //the way Mongoose defines objects is by using map
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
    //timestamps will give the data about when one is created or updated
    { timestamps: true, toJSON: { getters: true } }
);

const KPI = mongoose.model('KPI', KPISchema);

export default KPI;