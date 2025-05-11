import Stripe from "stripe";
import { Course } from "../Model/Course.js";
import { User } from "../Model/User.js";
import { Purchase } from "../Model/Purchase.js";
import { CourseProgress } from "../Model/CourseProgress.js";

// Get User Data
export const getUserData = async (req,res) => {
  try {
    const userId = req.auth.userId;

    const user = await User.findById(userId);

    if(!user) {
      return res.json({
        message: "User Not Found",
        success: false 
      });
    }

    res.json({
      user,
      success: true
    });

  } catch (error) {
    res.json({
      message: error.message,
      success: false
    });
  }
}

// Users Enrolled Courses With Lecture Links
export const userEnrolledCourses = async (req,res) => {
  try {
  const userId = req.auth.userId;
  const userData = await User.findById(userId).populate('enrolledCourses');

  if(!userData) {
    res.json({
      message: "No Courses Are Available",
      success: false
    });
  }
  res.json({
    enrolledCourses: userData.enrolledCourses,
    success: true 
  });
  
} catch (error) {
  res.json({
    message: error.message,
    success: false
  });
}
}

// Purchase Course
export const purchaseCourse = async (req,res) => {
  try {
    const {courseId} = req.body;
    const {origin} = req.headers;
    const userId = req.auth.userId;
    const userData = await User.findById(userId);
    const courseData = await Course.findById(courseId);

    if(!userData || !courseData) {
      return res.json({
        message: 'Data Not Found',
        success: false
      });
    }

    const purchaseData = {
      courseId: courseData._id,
      userId,
      amount: (courseData.coursePrice - courseData.discount * courseData.coursePrice / 100).toFixed(2),
    }

    const newPurchase = await Purchase.create(purchaseData);

    // Stripe Gateway Initialize
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

    const currency = process.env.CURRENCY.toLowerCase();

    // Creating line items to for Stripe

    const line_items = [{
      price_data:{
        currency,
        product_data: {
          name: courseData.courseTitle
        },
        unit_amount: Math.floor(newPurchase.amount) * 100
      },
      quantity: 1
    }];

    const session = await stripeInstance.checkout.sessions.create({
      success_url: `${origin}/loading/my-enrollments`,
      cancel_url: `${origin}/`,
      line_items: line_items,
      mode: 'payment',
      metadata:{
        purchaseId: newPurchase._id.toString()
      }
    });

    res.json({
      session_url: session.url,
      success: true
    });

  } catch (error) {
    res.json({
      message: error.message,
      success: false
    });
  }
}

// Update User Course Progress
export const updateUserCourseProgress = async (req,res) => {
  try {
    const userId = req.auth.userId;
    const {courseId, lectureId} = req.body;
    const progressData = await CourseProgress.findOne({userId, courseId});

    if(progressData) {
      if(progressData.lectureCompleted.includes(lectureId)) {
        return res.json({
          success: true,
          message: 'Lecture Already Completed'
        });
      }

      progressData.lectureCompleted.push(lectureId);
      await progressData.save();
    }
    else {
      await CourseProgress.create({
        userId,
        courseId,
        lectureCompleted: [lectureId]
      });
    }

    res.json({
      success: true,
      message: 'Progress Updated'
    });

  } catch (error) {
    res.json({
      message: error.message,
      success: false
    });
  }
}

// Get User Course Progress
export const getUserCourseProgress = async (req,res) => {
  try {
    const userId = req.auth.userId;
    const {courseId} = req.body;
    const progressData = await CourseProgress.findOne({userId, courseId});
    res.json({
      success: true,
      progressData
    });
  } catch (error) {
    res.json({
      message: error.message,
      success: false
    });
  }
}

// Add User Rating To Course
export const addUserRating = async (req,res) => {
  const userId = req.auth.userId;
  const {courseId, rating} = req.body;

  if(!userId || !courseId || !rating || !rating || rating < 1 || rating  > 5){
    return res.json({
      message: "Invalid details",
      success: false 
    });
  }

  try {
    const course = await Course.findById(courseId);
    if(!course) {
      return res.json({
        message: 'Course Not Found',
        success: false
      });
    }

    const user = await User.findById(userId);
    if(!user || !user.enrolledCourses.includes(courseId)) {
      return res.json({
        message: "User has not purchased this course",
        success: false 
      });
    }

    const existingRatingIndex = course.courseRatings.findIndex(r => r.userId === userId);

    if(existingRatingIndex > -1) {
      course.courseRatings[existingRatingIndex].rating = rating;
    }
    else{
      course.courseRatings.push({
        userId,
        rating
      });
    }

    await Course.save();

    return res.json({
      success: true,
      message: 'Rating Added'
    })

  } catch (error) {
    res.json({
      message: error.message,
      success: false
    });
  }
}