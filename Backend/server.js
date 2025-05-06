import express from 'express';
import 'dotenv/config';
import connectDB from './Config/ConnectDB.js';
import cors from 'cors';
import { clerkWebHooks } from './Controllers/webHooks.js';

// Initialize express
const app  = express();

// connect to database
await connectDB();

const port = process.env.PORT || 4003;

// Middlewares
// app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send("Hello express");
});

app.post('/clerk', express.json(), clerkWebHooks);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});