const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let leads = [];
let id = 1;

app.get("/leads", (req, res) => {
  res.json(leads);
});

app.post("/add", (req, res) => {
  const { name, email, phone, company } = req.body;

  const newLead = {
    id: id++,
    name,
    email,
    phone,
    company,
    status: "New"
  };

  leads.push(newLead);
  res.json(newLead);
});

app.delete("/delete/:id", (req, res) => {
  leads = leads.filter(l => l.id != req.params.id);
  res.send("Deleted");
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});