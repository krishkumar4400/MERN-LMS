import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    imgUrl: {type: String, required: true},
    mnrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
      }
    ],
  }, {timestamps: true}
)

export const User = mongoose.model('user', userSchema);