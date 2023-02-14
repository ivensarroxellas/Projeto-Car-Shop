import express from 'express';
import carRoutes from './Routes/Cars.routes';

const app = express();
app.use(express.json());
app.use('/cars', carRoutes);

export default app;