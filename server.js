// server.js
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

const API_BASE = "http://4.224.186.213/evaluation-service";

console.log("🚀 Starting proxy server...");

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server running' });
});

// Proxy endpoint for registration
app.post('/api/register', async (req, res) => {
  try {
    console.log("📝 Registering:", req.body.email);
    const response = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    console.log("✅ Registration response received");
    res.json(data);
  } catch (error) {
    console.error("❌ Registration error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Proxy endpoint for auth
app.post('/api/auth', async (req, res) => {
  try {
    console.log("🔐 Getting auth token for:", req.body.email);
    const response = await fetch(`${API_BASE}/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    console.log("✅ Auth token received");
    res.json(data);
  } catch (error) {
    console.error("❌ Auth error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Proxy endpoint for logs
app.post('/api/logs', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const response = await fetch(`${API_BASE}/logs`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Proxy endpoint for notifications
app.get('/api/notifications', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const query = new URLSearchParams(req.query).toString();
    const url = `${API_BASE}/notifications${query ? '?' + query : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': token
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Proxy server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoints:`);
  console.log(`   POST http://localhost:${PORT}/api/register`);
  console.log(`   POST http://localhost:${PORT}/api/auth`);
  console.log(`   GET  http://localhost:${PORT}/api/notifications`);
  console.log(`   POST http://localhost:${PORT}/api/logs`);
});