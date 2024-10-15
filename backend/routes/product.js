import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

router.get('/products', async (req, res) => {
    try {
        //this will give us our list of products
        const products = await Product.find();
        res.status(200).json(products); //so we're sending the json kpi to the frontend in case it's success
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

export default router