// Import Modules
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from "helmet";
import morgan from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compression from 'compression';

// Import Routes
import UserRoutes from './routes/user.route.js';
import BankRoutes from './routes/bank.route.js';
import BudgetRoutes from './routes/budget.route.js';
import SupplierRoutes from './routes/supplier.route.js'
import AccountingRoutes from './routes/Accounting.route.js'
import ProjectRoutes from './routes/project.route.js'
import LabourRoutes from './routes/labour.route.js'
import RequirementRoutes from "./routes/requirement.route.js";

// Env Config
dotenv.config();

// Prop Variables
const app = express();
const port = process.env.PORT || 4000;

// | Middleware
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: [ 'GET', 'POST', 'PUT', 'DELETE' ],
}));
app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));
app.use(compression());

// Disabling the cache
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});


// API Routs

// User Route
app.use('/api/auth', UserRoutes);

// Supplier Route
app.use('/api/supplier', SupplierRoutes);

// Bank Route
app.use('/api/bank', BankRoutes);

// Budget Route
app.use('/api/budget', BudgetRoutes);

// Cash In Hand Route
app.use('/api/accounting', AccountingRoutes);

// Requirement Route
app.use('/api/requirements', RequirementRoutes);

// Project Route
app.use('/api/project', ProjectRoutes);

// Labour Route
app.use('/api/labour', LabourRoutes);

// Server Runs
app.listen(port, () => {
    console.log('Listening on port 4000');
})