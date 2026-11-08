const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const FILE = 'complaints.json';
if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, '[]');

app.get('/complaints', (req, res) => {
  let data = JSON.parse(fs.readFileSync(FILE));
  res.json(data);
});

app.post('/complaint', (req, res) => {
  let data = JSON.parse(fs.readFileSync(FILE));
  let newComplaint = { id: Date.now().toString(), ...req.body };
  data.push(newComplaint);
  fs.writeFileSync(FILE, JSON.stringify(data));
  res.json({ success: true });
});

app.delete('/complaint/:id', (req, res) => {
  let data = JSON.parse(fs.readFileSync(FILE));
  data = data.filter(c => c.id != req.params.id);
  fs.writeFileSync(FILE, JSON.stringify(data));
  res.json({ success: true });
});

app.listen(process.env.PORT||5000, () => console.log('Server running on localhost:5000'));