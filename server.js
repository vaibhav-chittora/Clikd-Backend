const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const xlsx = require("xlsx");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/clikdDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Candidate = mongoose.model("Candidate", {
  name: String,
  username: String,
  email: String,
  phone: String,
  //   avatar: String,
});

// Upload Excel & Save to DB
app.post("/upload", async (req, res) => {
  try {
    const { fileData } = req.body; // Base64 Excel File
    const workbook = xlsx.read(fileData, { type: "base64" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    await Candidate.insertMany(data);
    res.json({ success: true, message: "Candidates Uploaded!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get Candidates
app.get("/candidates", async (req, res) => {
  const candidates = await Candidate.find();
  res.json(candidates);
});

app.listen(5000, () => console.log("Server running on port 5000"));
