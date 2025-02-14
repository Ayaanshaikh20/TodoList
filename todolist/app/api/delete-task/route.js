import dbConnect from "@/config/dbconnect";
import { NextResponse } from "next/server";
import sql from "mssql";

export async function DELETE(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const taskid = searchParams.get("taskid");
    console.log(taskid);
    const requestDB = new sql.Request();
    requestDB.input("taskid", sql.VarChar(255), taskid);
    await requestDB.query("DELETE FROM dbo.userTasks WHERE taskid=@taskid");
    return NextResponse.json({
      message: "Task deleted successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Error while deleting task',
      status: 500,
    });
  }
}
