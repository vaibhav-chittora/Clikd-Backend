import xlsx from "xlsx";
import { getCandidates, insertCandidates } from "../service/user.js";
import User from "../models/user.js";

// Upload Excel & Save Users
export const uploadCandidates = async (req, res) => {
  try {
    const { fileData } = req.body; // Excel file in base64 format
    const workbook = xlsx.read(fileData, { type: "base64" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    const candidates = data.map((user) => ({
      name: user.Name,
      email: user.Email,
      phone: user.Phone,
      gender: user.Gender,
      dob: user.DOB ? new Date(user.DOB) : null, // Assuming "DOB" is in a valid date format
      //   dob: user.DOB,
      city: user.City,
      avatar: user.Avatar, // Assume avatar is a URL
    }));

    await insertCandidates(candidates);
    return res.json({
      success: true,
      message: "Candidates Uploaded Successfully!",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Fetch All Candidates
export const fetchCandidates = async (req, res) => {
  try {
    const candidates = await getCandidates();
    console.log("Candidates in fetchCandidates", candidates);
    return res.status(200).json({
      success: true,
      message: "Candidates Fetched Successfully!",
      data: candidates,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Candidate Data

export const updateCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedCandidate = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedCandidate) {
      return res
        .status(404)
        .json({ success: false, message: "Candidate not found" });
    }

    res.status(200).json({ success: true, data: updatedCandidate });
  } catch (error) {
    console.error("Error updating candidate:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
