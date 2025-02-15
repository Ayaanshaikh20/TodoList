import dbConnect from "@/config/dbconnect";
import { NextResponse } from "next/server";
import sql from "mssql";

export async function GET(request) {
    try {
      await dbConnect();
      const { searchParams } = new URL(request.url);
      const taskid = searchParams.get("taskid");
  
      if (!taskid) {
        return NextResponse.json({
          message: "task not found",
          status: 404,
        });
      }
  
      let query = `SELECT * FROM dbo.userTasks WHERE taskid=@taskid`;
      const requestDB = new sql.Request(); //for sql injection safety
      requestDB.input("taskid", sql.VarChar(255), taskid);
  
      const result = await requestDB.query(query);
      return NextResponse.json({
        status: 200,
        message: "Task detail retrieved successfully",
        data: {
          taskDetails: result.recordset[0],
        },
      });
    } catch (error) {
      return NextResponse.json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  }