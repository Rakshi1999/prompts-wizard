import mongoose from "mongoose";

let isConnected = false;

async function connectToDB() {
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  console.log("MONOG___URI", process.env.MONGODB_CONNECTION_STRING);
  console.log("TEST_____ENV======>", process);

  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
      dbName: "prompts-wizard",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;

    console.log("MongoDB connected");
  } catch (error) {
    console.log("MONGO__ERRROR", error);
  }
}

export { connectToDB };
