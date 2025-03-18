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
