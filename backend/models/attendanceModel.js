import mongoose from "mongoose";
const d = new Date()
const n = d.toLocaleDateString()

const attendanceSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    hour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hour",
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    date: {
      type: String,
      default: n
    },
    status: String,
  },
  {
    timestamps: true,
  }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
