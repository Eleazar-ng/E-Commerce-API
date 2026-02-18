import express from 'express';
import cors from "cors";
import helmet from 'helmet';
import { env } from './config/env';
import { Routers } from './routes/index.route';
import { ErrorHandler, rateLimiter, RequestLogger } from './requests/middleware';
import { eventHandler } from './config/event';

const app = express();

app.use(helmet());

app.use(cors({
  origin: env.NODE_ENV === 'production' 
  ? ['https://mydomain.com']
  : ['http://localhost:3000'],
  credentials: true
}))
app.set("trust proxy", true);

// Ignite Event handlers
eventHandler.registerEventHandlers()

app.use(RequestLogger);

app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

//Rate limiter
app.use(rateLimiter);

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

app.options('*splat', cors());

// Invalid route handler
app.all("*splat", (req, res, next) => {
  res.status(404).json({
    error: true,
    message:"Route not found"
  });
});

//Error handler
app.use(ErrorHandler)

export { app };