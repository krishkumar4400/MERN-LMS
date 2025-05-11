import { clerkClient } from "@clerk/express";
import { v2 as cloudinary } from "cloudinary";
import { Course } from "../Model/Course.js";
import { Purchase } from "../Model/Purchase.js";

export const updateRoleToEducator = async (req, res) => {
  try {
    const userId = req.auth.userId;

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: "educator",
      },
    });

    res.json({
      message: "You can publish a course now",
      success: true,
    });
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
    });
  }
};

// Add New Course
export const addCourse = async (req, res) => {
  try {
    const { courseData } = req.body;
    const imageFile = req.file;
    const educatorId = req.auth.userId;
    if (!imageFile) {
      return res.json({
        message: "Thumbnail Not Attached",
        successs: false,
      });
    }
    const parsedData = await JSON.parse(courseData);
    parsedData.educator = educatorId;

    const newCourse = await Course.create(parsedData);
    const imageUpload = await cloudinary.uploader.upload(imageFile.path);
    newCourse.courseThumbnail = imageUpload.secure_url;
    await newCourse.save();

    res.json({
      message: "Course Added",
      success: true,
    });
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
    });
  }
};

// Get Educator Courses-
export const getEducatorCourses = async (req, res) => {
  try {
    const educator = req.auth.userId;
    const courses = await Course.find({ educator });
    if (!courses) {
      return res.json({
        message: "Course not available",
        success: false,
      });
    }
    return res.json({
      courses,
      success: true,
    });
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
    });
  }
};

// Get Educator Dashboard Data (Total Earning, Enrolled Students, No. of Courses)
export const educatorDashboardData = async (req, res) => {
  try {
    const educator = req.auth.userId;
    const courses = await Course.find(educator);
    const totalCourses = courses.length;

    const courseIds = courses.map((course) => course._id);

    // calculate total earnings from purchases
    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: "completed",
    });

    const totalEarnings = purchase.reduce(
      (sum, purchase) => sum + purchase.amount,
      0
    );

    // Collect unique enrolled students IDs with their course titles

    const enrolledStudentsData = [];
    for (const course of courses) {
      const students = await User.find(
        {
          _id: { $in: course.enrolledStudents },
        },
        "name",
        imageUrl
      );

      students.forEach((student) => {
        enrolledStudentsData.push({
          courseTitle: course.courseTitle,
          student,
        });
      });
    }

    res.json({
      success: true,
      dashboardData: {
        totalEarnings,
        enrolledStudentsData,
        totalCourses,
      },
    });
  } catch (error) {
    res.json({
      message: error.messsage,
      success: false,
    });
  }
};

// Get enrolled students data with purchase data
export const getEnrolledStudentsData = async (req, res) => {
  try {
    const educator = req.auth.userId;
    const courses = await Course.find({ educator });
    const courseIds = courses.map((course) => course._id);

    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: "completed",
    })
      .populate("userId", "name imageUrl")
      .populate("courseId", courseTitle);
      
      const enrolledStudents = purchases.map(purchase => ({
        student: purchase.userId,
        courseTitle: purchase.courseId.courseTitle,
        purchaseDate: purchase.createdAt
      }));

      res.json({
        success: true,
        enrolledStudents
      });

  } catch (error) {
    res.json({
      message: error.message,
      success: false,
    });
  }
};
