import User from "../models/user.js";

// Insert multiple candidates
export const insertCandidates = async (candidates) => {
  return await User.insertMany(candidates);
};

// Get all candidates
export const getCandidates = async () => {
  const candidates = await User.find();
  return candidates;
};

// ✅ Update Candidate by ID
export const updateCandidateById = async (id, updatedData) => {
  return await User.findByIdAndUpdate(id, updatedData, { new: true });
};
