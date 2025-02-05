import dbConnect from "@/config/dbconnect";
import { NextResponse } from "next/server";
import sql from "mssql";

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { userId } = body;
    const fetchQuery = `Select * from dbo.userRegister where userId='${userId}'`;
    const fetchResponse = await sql.query(fetchQuery);
    const recordSet = fetchResponse.recordset[0];
    const { first_name, email } = recordSet;
    return NextResponse.json({
      data: {
        userId: userId,
        first_name,
        email,
      },
      status: 200,
      message: `User details fetched successfully`,
    });
  } catch (error) {
    console.error("Error while fetching user:", error);
    return NextResponse.json({
      error: "Something went wrong. Please try again",
      status: 500,
      message: "Failure",
    });
  }
}
