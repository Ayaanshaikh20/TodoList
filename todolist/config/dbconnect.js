import sql from "mssql";
import connectionString from "./database";

let connectionPool = null;

const dbConnect = async () => {
  if (!connectionPool) {
    try {
      connectionPool = await sql.connect(connectionString);
      console.log("Connected successfully to the database");
    } catch (error) {
      console.error("Error while connecting to the database:", error.message);
      throw error;
    }
  }
  return connectionPool;
};

export default dbConnect;
