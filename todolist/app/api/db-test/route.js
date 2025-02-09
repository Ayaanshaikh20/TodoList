import sql from "mssql";
import connectionString from "../../../config/database";

export default async function handler(req, res) {
  try {
    await sql.connect(connectionString);
    res.status(200).json({ message: "✅ Database connected successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
