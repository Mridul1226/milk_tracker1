const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files

mongoose.connect('mongodb://localhost:27017/milk-tracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define a schema for milk batches
const batchSchema = new mongoose.Schema({
    batchId: String,
    spoilageTime: Number, // in hours
    bacterialContamination: Number, // sample value
    sensorData: Object // real-time sensor data
});

const Batch = mongoose.model('Batch', batchSchema);

// Sample data route
app.get('/api/batch/:id', async (req, res) => {
    const batch = await Batch.findOne({ batchId: req.params.id });
    if (batch) {
        res.json(batch);
    } else {
        res.status(404).json({ message: 'Batch not found' });
    }
});

// Sample route to add data
app.post('/api/batch', async (req, res) => {
    const batch = new Batch(req.body);
    await batch.save();
    res.status(201).json(batch);
});

// Sample batch creation
const sampleBatch = new Batch({
    batchId: 'batch001',
    spoilageTime: 5,
    bacterialContamination: 5,
    sensorData: {
        '2024-01-01T00:00': 10,
        '2024-01-01T01:00': 15,
        '2024-01-01T02:00': 12,
        '2024-01-01T03:00': 20,
    }
});
sampleBatch.save(); // Save this sample batch on server start

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
