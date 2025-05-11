import { clerkClient } from "@clerk/express";

export const protectEducator = async (req,res,next) => {
  try {
    const userId = req.auth.userId;
    const response = await clerkClient.users.getUser(userId);

    if(response.publicMetadata.role !== "educator") {
      res.json({
        message: "Unauthorized Access",
        success: false 
      });
    }

    next();

  } catch (error) {
    res.json({
      message: error.message,
      success: false
    });
  }
}


// { "courseTitle": "test","courseDescription": "fegegrg", "coursePrice": 600, "discount": 10, "courseContent":[ { "chapterId": "ch001", "chapterOrder": 1, "chapterTitle": "This is a title", "chapterContent": [ {"lectureId": "lec001", "lectureTitle": "This is a lectureTitle", "lectureDuration": 20, "lectureUrl":"https://lecture.com", "isPreviewFree":"true", "lectureOrder":"1" } ] } ]  }