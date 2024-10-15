import express from 'express';
import Transaction from '../models/Transaction.js';

const router = express.Router();

router.get('/transactions', async (req, res) => {
    try {
        const transactions = await Transaction.find()
        //transactions is a big list, and we wanna limit the amount of data that's coming from the backend
        //on the frontend, we don't need that many, we just wanna show the 50 latest transactions 
        .limit(50)
        .sort({ createdOn: -1 }); // -1 means that you're sorting by the latest 
        res.status(200).json(transactions); //so we're sending the json kpi to the frontend in case it's success
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

export default router

