import express from "express";
import { fetchCandidates, uploadCandidates } from "../controller/user.js";

const router = express.Router();

router.post("/upload", uploadCandidates);
router.get("/candidates", fetchCandidates);

export default router;
