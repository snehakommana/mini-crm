const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let leads = [];
let id = 1;

// 🔹 GET all leads
app.get("/leads", (req, res) => {
  res.json(leads);
});

// 🔹 ADD lead
app.post("/add", (req, res) => {
  const { name, email, phone, company } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name & Email required" });
  }

  const newLead = {
    id: id++,
    name,
    email,
    phone: phone || "",
    company: company || "",
    status: "New"
  };

  leads.push(newLead);
  res.json(newLead);
});

// 🔹 DELETE lead
app.delete("/delete/:id", (req, res) => {
  const leadId = parseInt(req.params.id);
  leads = leads.filter(l => l.id !== leadId);
  res.json({ message: "Deleted" });
});

// 🔹 UPDATE status
app.put("/update/:id", (req, res) => {
  const { status } = req.body;

  const lead = leads.find(l => l.id == req.params.id);

  if (!lead) {
    return res.status(404).json({ error: "Lead not found" });
  }

  lead.status = status || "Contacted";
  res.json(lead);
});

// 🔹 ROOT (optional test)
app.get("/", (req, res) => {
  res.send("Mini CRM Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});