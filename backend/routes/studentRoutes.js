import express from "express";
const router = express.Router();
import {
  getStudents,
  newStudent,
  getStudentById,
  updateStudent,
  getAllStudents,
  deleteStudent,
} from "../controllers/studentController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, newStudent).get(protect, getStudents);
router
  .route("/:id")
  .get(protect, getStudentById)
  .put(protect, updateStudent)
  .delete(protect, deleteStudent);
router.route("/admin").get(protect, admin, getAllStudents);

export default router;
