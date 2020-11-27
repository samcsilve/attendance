import express from "express";
const router = express.Router();
import {
  getAttendance,
  newAttendance,
  updateAttendance,
  deleteAttendance,
  todayAttendance
} from "../controllers/attendanceController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route('/nightly').post(protect, todayAttendance)
router.route("/").get(protect, getAttendance).post(protect, newAttendance);
router
  .route("/:id")
  .post(protect, updateAttendance)
  .delete(protect, deleteAttendance);

export default router;
