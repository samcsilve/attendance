import asyncHandler from "express-async-handler";
import Hour from "../models/hourModel.js";
import Student from "../models/studentModel.js";
import Attendance from "../models/attendanceModel.js";

const getHours = asyncHandler(async (req, res) => {
  const hours = await Hour.find({ user: req.user._id }).populate("students");

  if (hours) {
    res.json(hours);
  } else {
    res.status(401);
    throw new Error("Classes not found");
  }
});

const newHour = asyncHandler(async (req, res) => {
  const { subject, hour } = req.body;

  const hourExists = await Hour.findOne({ user: req.user._id, hour, subject });

  if (hourExists) {
    res.status(400);
    throw new Error("Class already exists");
  }

  const newHour = await Hour.create({
    user: req.user._id,
    subject,
    hour,
  });

  if (newHour) {
    res.status(201).json(newHour);
  } else {
    res.status(400);
    throw new Error("Invalid hour data");
  }
});

const getHourById = asyncHandler(async (req, res) => {
  const hour = await Hour.findById(req.params.id).populate({
    path: "students",
    model: "Student",
    populate: { path: "attendance", model: "Attendance" },
  });

  if (hour) {
    res.json(hour);
  } else {
    res.status(404);
    throw new Error("Class not found");
  }
});

const updateHour = asyncHandler(async (req, res) => {
  const hour = await Hour.findOne({ _id: req.body.hour });

  if (hour) {
    hour.hour = req.body.hour || hour.hour;
    hour.subject = req.body.subject || hour.subject;

    const updatedHour = await hour.save();

    res.json(updatedHour);
  } else {
    res.status(404);
    throw new Error("Class not found");
  }
});

const getAllHours = asyncHandler(async (req, res) => {
  const hours = await Hour.find({});
  res.json(hours);
});

const deleteHour = asyncHandler(async (req, res) => {
  const hour = await Hour.findOne({
    user: req.user._id,
    _id: req.params.id,
  });

  // Delete attendance data
  const attendanceRemoval = async (record) => {
    const recordToRemove = await Attendance.findByIdAndDelete(record._id);
    if (recordToRemove) {
      res.json({ message: "Attendance successfully deleted" });
    } else {
      res.status(404);
      throw new Error(`Record could not be located`);
    }
  };

  // Delete student data
  const studentRemoval = async (student) => {
    const studentToRemove = await Student.findOneAndDelete({
      _id: student._id,
    });
    if (studentToRemove) {
      res.json({ message: "Student successfully removed" });
    } else {
      res.status(404);
      throw new Error(`Student: ${student.name} could not be found`);
    }
  };

  const students = await Student.find({ hour: req.params.id });
  students.forEach((student) => {
    studentRemoval(student);
    student.attendance.forEach(record => {
      attendanceRemoval(record)
    })
  });

  if (hour) {
    await hour.remove();
    res.json({ message: "Class removed" });
  } else {
    res.status(404);
    throw new Error("Class not found");
  }
});

const addStudentToHour = asyncHandler(async (req, res) => {
  const hour = await Hour.findOne({
    user: req.user._id,
    _id: req.body.hour,
  });
  const student = await Student.findOne({
    user: req.user._id,
    _id: req.body.student,
  });
  if (!student) {
    res.status(404);
    throw new Error("Student not found");
  }

  if (!hour) {
    res.status(404);
    throw new Error("Class could not be found");
  }

  hour.students.unshift(student._id);

  const updatedHour = await hour.save();
  res.json(updatedHour);
});

const removeStudentFromHour = asyncHandler(async (req, res) => {
  const hour = await Hour.findOne({
    user: req.user._id,
    _id: req.body.hour,
  });
  const student = await Student.findOne({
    user: req.user._id,
    _id: req.body.student,
  });

  if (!student) {
    res.status(404);
    throw new Error("Student not found");
  }
  const foundStudent = hour.students.find(
    (s) => s.toString() === student._id.toString()
  );
  if (!foundStudent) {
    res.status(404);
    throw new Error("Student not found");
  }

  if (!hour) {
    res.status(404);
    throw new Error("Class could not be found");
  }

  const newArr = hour.students.filter(
    (record) => record.toString() !== student._id.toString()
  );

  hour.students = newArr;
  await hour.save();
  res.json(hour);
});

export {
  getHours,
  newHour,
  getHourById,
  updateHour,
  getAllHours,
  deleteHour,
  addStudentToHour,
  removeStudentFromHour,
};
