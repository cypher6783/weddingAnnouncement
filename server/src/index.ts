import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Zod schemas
const WeddingSchema = z.object({
  couple_names: z.string(),
  date: z.string().transform((str) => new Date(str)),
  venue: z.string(),
  story: z.string().optional(),
});

const RSVPSchema = z.object({
  name: z.string(),
  attendance_status: z.enum(['yes', 'no', 'maybe']),
  guest_count: z.number().int().min(0).default(1),
  message: z.string().optional(),
});

// Wedding Routes
app.get('/api/wedding', async (req: Request, res: Response) => {
  try {
    const wedding = await prisma.wedding.findFirst({
      orderBy: { created_at: 'desc' }
    });
    res.json(wedding);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch wedding details' });
  }
});

app.post('/api/wedding', async (req: Request, res: Response) => {
  try {
    const validatedData = WeddingSchema.parse(req.body);
    const wedding = await prisma.wedding.create({ data: validatedData });
    res.status(201).json(wedding);
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.put('/api/wedding/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const validatedData = WeddingSchema.parse(req.body);
    const wedding = await prisma.wedding.update({
      where: { id },
      data: validatedData,
    });
    res.json(wedding);
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.delete('/api/wedding/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.wedding.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete wedding' });
  }
});

// RSVP Routes
app.get('/api/rsvp', async (req: Request, res: Response) => {
  try {
    const adminPassword = req.headers['x-admin-password'];
    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Unauthorized: Invalid admin password' });
    }

    const rsvps = await prisma.rSVP.findMany({
      orderBy: { created_at: 'desc' }
    });
    res.json(rsvps);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch RSVPs' });
  }
});

app.get('/api/rsvp/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const rsvp = await prisma.rSVP.findUnique({ where: { id } });
    if (!rsvp) return res.status(404).json({ error: 'RSVP not found' });
    res.json(rsvp);
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.post('/api/rsvp', async (req: Request, res: Response) => {
  try {
    const validatedData = RSVPSchema.parse(req.body);
    const rsvp = await prisma.rSVP.create({ data: validatedData });
    res.status(201).json(rsvp);
  } catch (error) {
    console.error('RSVP Error:', error);
    res.status(400).json({ error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
