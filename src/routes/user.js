import express from "express";
import {
  fetchCandidates,
  updateCandidate,
  uploadCandidates,
} from "../controller/user.js";

const router = express.Router();

router.post("/upload", uploadCandidates);
router.get("/candidates", fetchCandidates);
router.put("/candidates/:id", updateCandidate);

export default router;
