import sql from "mssql";
import connectionString from "./database";

const dbConnect = async () => {
  try {
    await sql
      .connect(connectionString)
      .then(console.log("Connected successfully"));
  } catch (error) {
    console.error("Error while connecting to db:", error);
  }
};

export default dbConnect;
