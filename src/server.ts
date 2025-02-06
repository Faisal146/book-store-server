import app from "./app";
import config from "./config";
import mongoose from "mongoose";

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("connected to mongoDB");
  } catch (error) {
    console.log(error);
  }
}

main();

app.listen(config.port, () => {
  console.log(`Book Store app listening on port ${config.port}`);
});
