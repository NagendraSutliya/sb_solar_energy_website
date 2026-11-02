import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { testConnection } from './config/db.js';
import leadsRouter from './routes/leads.js';
import dealsRouter from './routes/deals.js';
import contactsRouter from './routes/contacts.js';
import tasksRouter from './routes/tasks.js';
import vendorsRouter from './routes/vendors.js';
import quotesRouter from './routes/quotes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL ? [process.env.FRONTEND_URL, 'http://localhost:5173', 'http://localhost:3000'] : '*',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'SB Solar Energy Backend API',
    database: 'MySQL',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/leads', leadsRouter);
app.use('/api/deals', dealsRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/tasks', tasksRouter);
app.use('/api/vendors', vendorsRouter);
app.use('/api/quotes', quotesRouter);

// 404 Route handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[SERVER ERROR]', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Start Server & Test Database Connection
app.listen(PORT, async () => {
  console.log(`\n=================================================`);
  console.log(`  SB Solar Energy Backend running on port ${PORT}`);
  console.log(`  Health Check: http://localhost:${PORT}/api/health`);
  console.log(`=================================================\n`);
  
  await testConnection();
});

export default app;

