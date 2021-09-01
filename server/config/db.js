import mongoose from 'mongoose'
import * as dotenv from "dotenv";
dotenv.config({ path: './.env' });


export default function connectDB() {
  mongoose.connect(process.env.DB_MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((success) => {
    console.log("Database connected sucessfully");
    
  }).catch((err) => {
    console.log("Database connection failed ");
      console.log(err);
      process.exit(1); // Stop app
  });
};


