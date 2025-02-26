import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors'; // Import CORS

const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://festusekuruemu:73rjiX8vhIH0wdYR@clusweer.lrsqv.mongodb.net/?retryWrites=true&w=majority&appName=Clusweer', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const sensorSchema = new mongoose.Schema({
  temperature: Number,
  humidity: Number,
  co_level: Number,
  timestamp: { type: Date, default: Date.now },
});

const SensorData = mongoose.model('SensorData', sensorSchema);

app.use(bodyParser.json());

// POST request to save sensor data
app.post('/api/sensordata', async (req, res) => {
  try {
    const { temperature, humidity, co_level } = req.body;

    // Create a new record in the database
    const newData = new SensorData({ temperature, humidity, co_level });
    await newData.save();

    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving data', error });
  }
});

// GET request to retrieve all sensor data
app.get('/api/sensordata', async (req, res) => {
  try {
    const data = await SensorData.find({});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving data', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
