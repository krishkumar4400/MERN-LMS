import mongoose from "mongoose";

// connect to the MongoDB database
const connectDB = async () => {
  mongoose.connection.on('connected', ()=> console.log("Database connected"));
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/MERN_AUTH`);
    console.log("Database connected Successfully");
  } catch (error) {
    console.log(error.message)
  }
}

export default connectDB;