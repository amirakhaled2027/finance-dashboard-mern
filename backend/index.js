import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import kpiRoutes from './routes/kpi.js';
import KPI from "./models/KPI.js";
import { kpis, products, transactions } from './data/data.js';
import productRoutes from './routes/product.js';
import Product from './models/Product.js';
import transactionRoutes from './routes/transaction.js';
import Transaction from './models/Transaction.js'

// CONFIGURATIONS 
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//ROUTES
app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);
app.use("/transaction", transactionRoutes)

// MONGOOSE SETUP
const PORT = process.env.PORT || 5000;
mongoose 
    .connect(process.env.MONGO_URL)
    .then(async () => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
        // //before we're gonna seed our database with information, we wanna drop the current database that we're already have
        // //the reason: so we don't have duplicate data or we don't have to run into specific errors 
        // //we're just gonna run this particular thing once and then we're gonna see the information as needed
        // //this is just necessary for development purposes especially when you first start your database and you're just testing things out,
        // //you wanna be able to drop the database information
        // //it's seed data, so it's not really useful   
        // //just don't do it on a real production app with real data, you wanna make sure you have real backup
        // //otherwise you'll have a lot of people angry with youuuuuu
        // //ADD DATA ONE TIME ONLY OR AS NEEDED (both lines)
        // await mongoose.connection.db.dropDatabase();
        // //we're passing in the array, and by doing so we can input this information
        // KPI.insertMany(kpis);
        // //we're gonna insert our products into the product database
        // Product.insertMany(products);
        // Transaction.insertMany(transactions);
        console.log("Connected to MongoDB")
    })
    .catch((error) => console.log(`${error} didn't connect`))
