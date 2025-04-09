//import .... 
const express = require('express');
const app = express();
const morgan = require('morgan');
const { readdirSync } = require('fs');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const bodyParser = require('body-parser');
const prisma = new PrismaClient();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

readdirSync('./routes')
  .map((c) => app.use('/api', require('./routes/' + c)));

const port = process.env.PORT || 5000;

// ใช้ async function เพื่อรอการเชื่อมต่อฐานข้อมูล
const startServer = async () => {
  try {
    await prisma.$connect();
    console.log('Connected to the database');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Database connection failed:', error);
  }
};

startServer();
