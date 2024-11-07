import express from 'express';
import Transaction from '../models/Transaction.js';

const router = express.Router();

router.get('/transactions', async (req, res) => {
    try {
        const transactions = await Transaction.find()
        //transactions is a big list, and I wanna limit the amount of data that's coming from the backend
        //on the frontend, I don't need that many, I just wanna show the 50 latest transactions 
        .limit(50)
        .sort({ createdOn: -1 }); // -1 means that I'm sorting by the latest 
        res.status(200).json(transactions);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

export default router