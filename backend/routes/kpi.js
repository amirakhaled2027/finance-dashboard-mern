import express from 'express';
import KPI from '../models/KPI.js';

const router = express.Router();

router.get('/kpis', async (req, res) => {
    try {
        const kpis = await KPI.find();
        res.status(200).json(kpis); //so we're sending the json kpi to the frontend in case it's success
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

export default router