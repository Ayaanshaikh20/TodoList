import dbConnect from "@/config/dbconnect";
import { NextResponse } from "next/server";
import sql from "mssql";

export async function PUT(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const {
      taskid,
      taskTitle,
      taskDescription,
      startDate,
      dueDate,
      priority,
      status,
      userId,
    } = body;

    if (!taskid) {
      return NextResponse.json({
        message: "task not found",
        status: 404,
      });
    }

    let query = `UPDATE dbo.userTasks SET 
    task_title=@taskTitle, 
    task_description=@taskDescription, 
    priority=@priority, status=@status, 
    start_date=@startDate, 
    due_date=@dueDate 
    where userId=@userId AND taskid=@taskid`;
    const requestDB = new sql.Request();
    requestDB.input("taskid", sql.VarChar(255), taskid);
    requestDB.input("userId", sql.VarChar(255), userId);
    requestDB.input("taskTitle", sql.VarChar(255), taskTitle);
    requestDB.input("taskDescription", sql.VarChar(255), taskDescription);
    requestDB.input("priority", sql.VarChar(255), priority);
    requestDB.input("status", sql.VarChar(255), status);
    requestDB.input("startDate", sql.Date, startDate);
    requestDB.input("dueDate", sql.Date, dueDate);

    await requestDB.query(query);
    return NextResponse.json({
      status: 200,
      message: "Task edited successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}
