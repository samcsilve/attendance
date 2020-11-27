import asyncHandler from "express-async-handler";
import Attendance from "../models/attendanceModel.js";
import Student from "../models/studentModel.js";
import cron from "node-cron";

const cronAttendance = asyncHandler(async (req, res) => {
  const d = new Date();
  const n = d.toLocaleDateString();
  const students = await Student.find({});
  students.map(async (student) => {
    const attendance = await Attendance.findOneAndUpdate(
      { user: student.user, student: student._id, date: n},
      {
        user: student.user,
        student: student._id,
        status: "Present",
        hour: student.hour,
        date: n
      },
      { new: true, upsert: true }
    );
    const studentRecord = await Student.findById(student._id);

    if (studentRecord) {
      studentRecord.attendance.addToSet(attendance);
      await studentRecord.save();
    } else {
      throw new Error("Invalid data");
    }
  });
});

const todayAttendance = asyncHandler(async (req, res) => {
  const d = new Date();
  const n = d.toLocaleDateString();
  const students = await Student.find({});
  students.map(async (student) => {
    const attendance = await Attendance.findOneAndUpdate(
      { user: student.user, student: student._id, date: n },
      {
        user: student.user,
        student: student._id,
        status: "Present",
        hour: student.hour,
        date: n
      },
      { new: true, upsert: true }
    );
    const studentRecord = await Student.findById(student._id);

    if (studentRecord) {
      studentRecord.attendance.addToSet(attendance);
      await studentRecord.save();
    } else {
      throw new Error("Invalid data");
    }
  });
  res.json({msg: 'Seeding complete'})
});



cron.schedule("01 11 1-31 * *", () => {
  cronAttendance();
});

const getAttendance = asyncHandler(async (req, res) => {
  const attendance = await Attendance.find({ user: req.user._id });
  if (attendance) {
    res.json(attendance);
  } else {
    res.status(401);
    throw new Error("Records not found");
  }
});

const newAttendance = asyncHandler(async (req, res) => {
  const { student, status, hour } = req.body;

  const attendance = await Attendance.findOneAndUpdate(
    { user: req.user._id, student },
    { user: req.user._id, student, status, hour },
    { new: true, upsert: true }
  );

  const studentRecord = await Student.findById(student);

  if (studentRecord) {
    studentRecord.attendance.addToSet(attendance);
    await studentRecord.save();
    res.status(201).json(attendance);
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }
});

const updateAttendance = asyncHandler(async (req, res) => {
  const attendance = await Attendance.findOneAndUpdate(
    { _id: req.params.id },
    { status: req.body.status },
    { new: true }
  );

  if (attendance) {
    attendance.status = req.body.status || attendance.status;

    const updatedAttendance = await attendance.save();

    res.json(updatedAttendance);
  } else {
    res.status(404);
    throw new Error("Record not found");
  }
});

const deleteAttendance = asyncHandler(async (req, res) => {
  const attendance = await Attendance.findOneAndRemove({ _id: req.params.id });
  if (attendance) {
    const student = await Student.findById(attendance.student);
    student.attendance.pull({ _id: req.params.id });
    student.save();
    res.json({ message: "Record removed" });
  } else {
    res.status(404);
    throw new Error("Record not found");
  }
});
export {
  getAttendance,
  newAttendance,
  updateAttendance,
  deleteAttendance,
  todayAttendance,
};
