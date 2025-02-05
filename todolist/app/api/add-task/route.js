import dbConnect from "@/config/dbconnect";
import { NextResponse } from "next/server";
import sql from "mssql";
import { v4 as uuidv4 } from "uuid";

export async function POST(request) {
  try {
    await dbConnect();
    const taskDetails = await request.json();
    console.log(taskDetails, "taskDetails");
    const {
      taskTitle,
      taskDescription,
      startDate,
      dueDate,
      priority,
      status,
      userId,
    } = taskDetails;
    let taskid;
    taskid = uuidv4();
    const query = `
    INSERT INTO dbo.userTasks (taskid, userId, task_title, task_description, priority, status, start_date, due_date)
    VALUES (@taskid, @userId, @taskTitle, @taskDescription, @priority, @status, @startDate, @dueDate)
  `;
    const requestDB = new sql.Request();
    requestDB.input("taskid", sql.VarChar(255), taskid);
    requestDB.input("userId", sql.VarChar(255), userId);
    requestDB.input("taskTitle", sql.VarChar(255), taskTitle);
    requestDB.input("taskDescription", sql.VarChar(255), taskDescription);
    requestDB.input("priority", sql.VarChar(255), priority);
    requestDB.input("status", sql.VarChar(255), status);
    requestDB.input("startDate", sql.Date, startDate);
    requestDB.input("dueDate", sql.Date, dueDate);
    await requestDB.query(query)
    return NextResponse.json({
      status: 200,
      message: `Task added successfully`,
    });
  } catch (error) {
    return NextResponse.json({
      error: "Error during add task",
      status: 500,
    });
  }
}
