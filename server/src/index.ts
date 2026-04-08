import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

type Lead = {
  id: number;
  name: string;
  company: string;
  status: string;
};

let leads: Lead[] = [
  { id: 1, name: 'Maria Lopez', company: 'BrightPath', status: 'New' },
  { id: 2, name: 'James Carter', company: 'TechNova', status: 'Contacted' }
];

app.get('/api/leads', (_req: Request, res: Response) => {
  res.json(leads);
});

app.post('/api/leads', (req: Request, res: Response) => {
  const newLead: Lead = {
    id: leads.length + 1,
    name: req.body.name,
    company: req.body.company,
    status: req.body.status,
  };

  leads.push(newLead);
  res.status(201).json(newLead);
});

app.put('/api/leads/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = leads.findIndex((lead) => lead.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Lead not found' });
  }

  leads[index] = {
    id,
    name: req.body.name,
    company: req.body.company,
    status: req.body.status,
  };

  res.json(leads[index]);
});

app.delete('/api/leads/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  leads = leads.filter((lead) => lead.id !== id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});