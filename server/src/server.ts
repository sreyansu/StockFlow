import express from 'express';
import cors from 'cors';


const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());



import adminRoutes from './routes/admin';
import { protect, admin } from './middleware/authMiddleware';


import inventoryRoutes from './routes/inventory';

app.use('/api/admin', protect, admin, adminRoutes);
app.use('/api/inventory', protect, inventoryRoutes);

app.get('/', (req, res) => {
  res.send('StockFlow-Pro server is running!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
