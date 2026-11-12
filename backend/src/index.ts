// backend/src/index.ts
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import pkg from '@prisma/client';
const { PrismaClient } = pkg as any;
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import { verifyAdmin } from './adminAuth.js'; // <-- SAKTO NA NI

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
  origin: ['http://localhost:3000', 'https://your-vercel-app.vercel.app'],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// ==========================================
// PUBLIC ROUTES
// ==========================================

// 1. Get all Projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' }
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

// 3. Contact Form
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

// ==========================================
// ADMIN ROUTES
// ==========================================

// 1. Admin Login
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Wrong password' });
  }
  
  const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET!, { expiresIn: '1d' });
  
  res.cookie('admin_token', token, {
    httpOnly: true,
    secure: false, // Lokal nga testing ra ni
    sameSite: 'lax',
    maxAge: 86400000,
  });
  
  res.json({ success: true });
});

// 2. Create Project (Admin Only)
app.post('/api/admin/projects', verifyAdmin, async (req, res) => {
  const { title, description, techStack, liveUrl, repoUrl, imageUrl } = req.body;
  try {
    const project = await prisma.project.create({
      data: { title, description, techStack, liveUrl, repoUrl, imageUrl },
    });
    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// 3. Update Project (Admin Only)
app.put('/api/admin/projects/:id', verifyAdmin, async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const project = await prisma.project.update({
      where: { id: parseInt(id) },
      data,
    });
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// 4. Delete Project (Admin Only)
app.delete('/api/admin/projects/:id', verifyAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.project.delete({ where: { id: parseInt(id) } });
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Portfolio Backend running at http://localhost:${port}`);
});