import express from "express";
const router = express.Router();
import {
  getHours,
  newHour,
  getHourById,
  updateHour,
  getAllHours,
  deleteHour,
  addStudentToHour,
  removeStudentFromHour
} from "../controllers/hourController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, newHour).get(protect, getHours);
router.route("/add-student").post(protect, addStudentToHour);
router.route("/remove-student").delete(protect, removeStudentFromHour);
router
  .route("/:id")
  .get(protect, getHourById)
  .put(protect, updateHour)
  .delete(protect, deleteHour);
router.route("/admin").get(protect, admin, getAllHours);

export default router;
