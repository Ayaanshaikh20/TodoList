import dbConnect from "@/config/dbconnect";
import { NextResponse } from "next/server";
import sql from "mssql";

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({
        message: "User not found",
        status: 404,
      });
    }

    let query = `SELECT * FROM dbo.userTasks WHERE userId=@userId order by created_date`;
    const requestDB = new sql.Request(); //for sql injection safety
    requestDB.input("userId", sql.VarChar(255), userId);

    const result = await requestDB.query(query);
    return NextResponse.json({
      status: 200,
      message: "Tasks retrieved successfully",
      data: {
        tasklist: result.recordset,
      },
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}
