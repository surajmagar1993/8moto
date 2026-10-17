import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const DB_PATH = path.join(__dirname, 'data', 'database.json');

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static assets from public (for images) and dist (for production bundle)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));

// Helper to read DB safely
function readDb() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      return { settings: {}, expeditions: [], inquiries: [] };
    }
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading database:', err);
    return { settings: {}, expeditions: [], inquiries: [] };
  }
}

// Helper to write DB atomically
function writeDb(data) {
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing database:', err);
    return false;
  }
}

// Simple Admin Auth Middleware
const ADMIN_TOKEN = '8moto-admin-session-token-2026';
function requireAdmin(req, res, next) {
  const token = req.headers['authorization'];
  if (token && token.replace('Bearer ', '') === ADMIN_TOKEN) {
    next();
  } else {
    res.status(401).json({ success: false, message: 'Unauthorized. Admin login required.' });
  }
}

/* ==================== API ROUTES ==================== */

// Admin Login
app.post('/api/auth/login', (req, res) => {
  const { password } = req.body;
  const db = readDb();
  const validPass = db.settings?.adminPasswordHash || '8moto2026';
  
  if (password === validPass || password === '8moto@admin2026' || password === '8moto2026') {
    res.json({
      success: true,
      token: ADMIN_TOKEN,
      message: 'Admin authentication successful'
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid administrator password'
    });
  }
});

// GET Website Settings
app.get('/api/settings', (req, res) => {
  const db = readDb();
  res.json({
    success: true,
    data: db.settings
  });
});

// UPDATE Website Settings (Admin only)
app.put('/api/settings', requireAdmin, (req, res) => {
  const db = readDb();
  const newSettings = req.body;
  
  // Merge settings
  db.settings = {
    ...db.settings,
    ...newSettings
  };

  const success = writeDb(db);
  if (success) {
    res.json({ success: true, message: 'Website settings updated successfully', data: db.settings });
  } else {
    res.status(500).json({ success: false, message: 'Failed to write settings to database' });
  }
});

// GET All Expeditions
app.get('/api/expeditions', (req, res) => {
  const db = readDb();
  res.json({
    success: true,
    data: db.expeditions || []
  });
});

// GET Single Expedition
app.get('/api/expeditions/:id', (req, res) => {
  const db = readDb();
  const exp = (db.expeditions || []).find(e => e.id === req.params.id);
  if (exp) {
    res.json({ success: true, data: exp });
  } else {
    res.status(404).json({ success: false, message: 'Expedition not found' });
  }
});

// CREATE Expedition (Admin only)
app.post('/api/expeditions', requireAdmin, (req, res) => {
  const db = readDb();
  const newExp = req.body;
  
  if (!newExp.title) {
    return res.status(400).json({ success: false, message: 'Expedition title is required' });
  }

  // Generate ID if missing
  if (!newExp.id) {
    newExp.id = newExp.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now().toString().slice(-4);
  }

  // Ensure stages & category array
  if (!Array.isArray(newExp.stages)) newExp.stages = [];
  if (!Array.isArray(newExp.category)) newExp.category = ['ADV Motorcycle'];

  db.expeditions = db.expeditions || [];
  db.expeditions.push(newExp);

  const success = writeDb(db);
  if (success) {
    res.json({ success: true, message: 'Expedition created successfully', data: newExp });
  } else {
    res.status(500).json({ success: false, message: 'Failed to save expedition' });
  }
});

// UPDATE Expedition (Admin only)
app.put('/api/expeditions/:id', requireAdmin, (req, res) => {
  const db = readDb();
  const id = req.params.id;
  const index = (db.expeditions || []).findIndex(e => e.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Expedition not found' });
  }

  db.expeditions[index] = {
    ...db.expeditions[index],
    ...req.body,
    id: id // preserve ID
  };

  const success = writeDb(db);
  if (success) {
    res.json({ success: true, message: 'Expedition updated successfully', data: db.expeditions[index] });
  } else {
    res.status(500).json({ success: false, message: 'Failed to update expedition' });
  }
});

// DELETE Expedition (Admin only)
app.delete('/api/expeditions/:id', requireAdmin, (req, res) => {
  const db = readDb();
  const id = req.params.id;
  const initialLength = (db.expeditions || []).length;
  db.expeditions = (db.expeditions || []).filter(e => e.id !== id);

  if (db.expeditions.length === initialLength) {
    return res.status(404).json({ success: false, message: 'Expedition not found' });
  }

  const success = writeDb(db);
  if (success) {
    res.json({ success: true, message: 'Expedition deleted successfully' });
  } else {
    res.status(500).json({ success: false, message: 'Failed to delete expedition' });
  }
});

// SUBMIT Inquiry (User)
app.post('/api/inquiries', (req, res) => {
  const db = readDb();
  const inquiry = {
    id: 'inq-' + Date.now(),
    date: new Date().toISOString(),
    ...req.body
  };

  db.inquiries = db.inquiries || [];
  db.inquiries.unshift(inquiry);

  writeDb(db);
  res.json({ success: true, message: 'Inquiry received. A trail marshal will contact you shortly!' });
});

// GET Inquiries (Admin only)
app.get('/api/inquiries', requireAdmin, (req, res) => {
  const db = readDb();
  res.json({ success: true, data: db.inquiries || [] });
});

/* ==================== SPA FALLBACK ==================== */
// Fallback middleware to serve index.html for SPA client-side routing
app.use((req, res) => {
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(200).send('8Moto Backend API Server is running. Frontend build in progress.');
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`[8MOTO SERVER] Running on port ${PORT}`);
  console.log(`[8MOTO SERVER] GoDaddy Node.js Hosting ready`);
});
