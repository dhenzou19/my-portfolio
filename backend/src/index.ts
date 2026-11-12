import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import pkg from '@prisma/client';
const { PrismaClient } = pkg as any;
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const app = express();
const port = 5000;

// Database setup
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-vercel-app.vercel.app'], // Update this later
  credentials: true,
}));
app.use(express.json());

// --- ROUTES ---

// 1. Get all Projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' } // Newest first
    });
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// 2. Get all Skills
app.get('/api/skills', async (req, res) => {
  try {
    const skills = await prisma.skill.findMany();
    res.json(skills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
});

// 3. Contact Form (Save to DB)
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newMessage = await prisma.contactMessage.create({
      data: { name, email, message }
    });
    res.status(201).json({ message: 'Message sent successfully!', data: newMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Portfolio Backend running at http://localhost:${port}`);
});