const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let leads = [];
let id = 1;

// GET all leads
app.get("/leads", (req, res) => {
  res.json(leads);
});

// ADD lead
app.post("/add", (req, res) => {
  const { name, email } = req.body;

  const newLead = {
    id: id++,
    name,
    email,
    status: "New"
  };

  leads.push(newLead);
  res.json(newLead);
});

// DELETE lead
app.delete("/delete/:id", (req, res) => {
  const leadId = parseInt(req.params.id);
  leads = leads.filter(l => l.id !== leadId);
  res.json({ message: "Deleted" });
});

// UPDATE status
app.put("/update/:id", (req, res) => {
  const lead = leads.find(l => l.id == req.params.id);
  if (lead) {
    lead.status = "Contacted";
    res.json(lead);
  } else {
    res.status(404).json({ error: "Not found" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));