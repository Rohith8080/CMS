const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { verifyToken, verifyAdmin } = require('./middleware/auth');
const authRoutes = require('./routes/auth.routes');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();

// Enable CORS with specific options
app.use(cors({
  origin: 'http://localhost:5173', // Vite's default port
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Auth routes
app.use('/api/auth', authRoutes);

// Get all customers
app.get('/customers', async (req, res) => {
  try {
    const customers = await prisma.customer.findMany();
    console.log('Retrieved customers:', customers);
    res.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Failed to fetch customers: ' + error.message });
  }
});

// Add a new customer
app.post('/customers', async (req, res) => {
  const { name, email, dept } = req.body;

  // Validate required fields
  if (!name || !email || !dept) {
    return res.status(400).json({ 
      error: 'Name, email, and department are required fields' 
    });
  }

  try {
    // Create customer with all fields
    const customer = await prisma.customer.create({
      data: {
        name,
        email,
        dept: dept.trim(), // Clean up department input
      },
    });
    
    // Return the created customer
    res.status(201).json(customer);
  } catch (error) {
    console.error('Error creating customer:', error);
    
    // Handle unique constraint violation
    if (error.code === 'P2002') {
      return res.status(400).json({ 
        error: 'A customer with this email already exists' 
      });
    }
    
    res.status(400).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
