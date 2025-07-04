const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Airtable webhook URL
const AIRTABLE_WEBHOOK_URL = 'https://hooks.airtable.com/workflows/v1/genericWebhook/appDbaPMgEw6RIb3b/wflNqznG9IapoCGzf/wtrtK1GUpTvv4Fg9a';

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// API endpoint to proxy requests to Airtable
app.post('/api/submit-time-log', async (req, res) => {
  try {
    console.log('Proxying request to Airtable:', req.body);
    
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(AIRTABLE_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Airtable webhook error:', response.status, errorText);
      return res.status(response.status).json({ 
        error: `Airtable webhook error: ${response.status} ${response.statusText}`,
        details: errorText 
      });
    }

    const result = await response.text();
    console.log('Airtable webhook success:', result);
    
    return res.status(200).json({ success: true, message: 'Submission successful' });
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ 
      error: 'Internal server error', 
      message: error.message 
    });
  }
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});