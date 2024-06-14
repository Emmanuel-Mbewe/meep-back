const express = require("express");
const { getAllProgress, createProgress, getProgress, updateProgress, getUserProgress, deleteProgress } = require("../Controlers/progressController");
const router = express.Router();

router.get("/", getAllProgress);
router.post("/", createProgress);
router.get("/:progress_id", getProgress);
router.put(
  "/:progress_id/:user_id/:video_id",
  updateProgress
);
router.get("/:user_id/:video_id", getUserProgress);
router.delete("/:progress_id", deleteProgress);
module.exports = router;
