import express from 'express';
import 'dotenv/config';
import connectDB from './Config/ConnectDB.js';
import cors from 'cors';
import { clerkWebHooks, stripeWebhooks } from './Controllers/webHooks.js';
import educatorRouter from './Routes/educatorRoutes.js';
import { clerkMiddleware } from '@clerk/express';
import { connectCloudinary } from './Config/cloudinary.js';
import courseRouter from './Routes/courseRoute.js';
import userRouter from './Routes/userRoutes.js';


// Initialize express
const app  = express();

// connect to database
await connectDB();

// connect to cloudinary
await connectCloudinary();

const port = process.env.PORT || 4003;

// Middlewares
app.use(cors());
app.use(clerkMiddleware());

// Routes
app.get('/', (req, res) => {
  res.send("Hello express");
});

app.post('/stripe', express.raw({type: 'application/json'}), stripeWebhooks);

app.use(express.json());
app.post('/clerk', clerkWebHooks);
app.use('/api/educator', educatorRouter);
app.use('/api/course', courseRouter);
app.use('/api/user', userRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});