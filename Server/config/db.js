const mongoose = require("mongoose");
//recruiterPortal

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://gademanicharan12:recruiterPortal@cluster0.nj0u1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = { connectDB };