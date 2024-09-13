import express from 'express';
import mongoose from 'mongoose';
import productRoutes from './routes/productRoutes.js';
import {logger} from './helpers/index.js';

const app = express();
const port = 3000

mongoose.connect('mongodb://localhost:27017/imageProcessing', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('connected', () => {
  logger.info(`Mongoose-MongoDB connection successful`);
});

db.on('error', (err) => {
  logger.error(`Error occurred while connection`. err?.message)
});

app.use('/api/product', productRoutes);

app.get('/', (req, res) => {
  res.send('Hello, welcome to our Image Processing API!');
});


app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
