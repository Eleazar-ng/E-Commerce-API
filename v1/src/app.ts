import express from 'express';
import cors from "cors";
import helmet from 'helmet';
import { env } from './config/env';
import { Routers } from './routes/index.route';

const app = express();

app.use(helmet());

app.use(cors({
  origin: env.NODE_ENV === 'production' 
  ? ['https://mydomain.com']
  : ['http://localhost:3000'],
  credentials: true
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Home Route
app.get("/", (req, res) => {
  res.status(200).json({
    message:"Welcome aboard, E-commerce API starts here, Cheers !",
    timestamp: new Date().toISOString()
  });
});

//Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    message:"Health check passed! (1/1)",
    timestamp: new Date().toISOString()
  });
});

// Ignite routes
app.use(Routers)

// Invalid route handler
app.all("*splat", (req, res, next) => {
  res.status(404).json({
    error: true,
    message:"Route not found"
  });
});

export { app };