import asyncHandler from "express-async-handler";
import Student from "../models/studentModel.js";
import Hour from "../models/hourModel.js";
import Attendance from "../models/attendanceModel.js";

const getStudents = asyncHandler(async (req, res) => {
  const students = await Student.find({ user: req.user._id });

  if (students) {
    res.json(students);
  } else {
    res.status(401);
    throw new Error("Students not found");
  }
});

const newStudent = asyncHandler(async (req, res) => {
  const { name, grade, hour } = req.body;

  const studentExists = await Student.findOne({ user: req.user._id, name });

  if (studentExists) {
    res.status(400);
    throw new Error("Student already exists");
  }

  const student = await Student.create({
    user: req.user._id,
    hour,
    name,
    grade,
  });

  const initialAttendance = await Attendance.create({
    user: req.user._id,
    student,
    status: "Present",
  });
  initialAttendance.save();

  if (student) {
    student.attendance.push(initialAttendance._id);
    await student.save();
    const studentHour = await Hour.findOne({ _id: req.body.hour });
    if (studentHour) {
      studentHour.students.addToSet(student);
      await studentHour.save();
    } else {
      res.status(400);
      throw new Error("Invalid student data");
    }
    res.status(201).json(student);
  } else {
    res.status(400);
    throw new Error("Invalid student data");
  }
});

const getStudentById = asyncHandler(async (req, res) => {
  const student = await Student.findOne({
    _id: req.params.id,
    user: req.user._id,
  }).populate("attendance");

  if (student) {
    res.json(student);
  } else {
    res.status(404);
    throw new Error("Student not found");
  }
});

const updateStudent = asyncHandler(async (req, res) => {
  const student = await Student.findOne({ _id: req.params.id });

  if (student) {
    student.name = req.body.name || student.name;
    student.grade = req.body.grade || student.grade;

    const updatedStudent = await student.save();

    res.json(updatedStudent);
  } else {
    res.status(404);
    throw new Error("Student not found");
  }
});

const getAllStudents = asyncHandler(async (req, res) => {
  const students = await Student.find({});
  res.json(students);
});

const deleteStudent = asyncHandler(async (req, res) => {
  const student = await Student.findOne({
    user: req.user._id,
    _id: req.params.id,
  });

  const deleteAttendance = async (id) => {
    try {
      const attendance = await Attendance.findByIdAndDelete(id)
    } catch (error) {
      res.status(400).json("Something went wrong")
    }
  }

  if (student) {
    student.attendance.map(record => deleteAttendance(record._id))
    await student.remove();
    res.json({ message: "Student removed" });
  } else {
    res.status(404);
    throw new Error("Student not found");
  }
});

export {
  getStudents,
  newStudent,
  getStudentById,
  updateStudent,
  getAllStudents,
  deleteStudent,
};
