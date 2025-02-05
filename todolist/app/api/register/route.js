import dbConnect from "@/config/dbconnect";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import sql from "mssql";
import { v4 as uuidv4 } from "uuid";

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { first_name, email, password } = body;
    const hashedPassword = await bcrypt.hash(password, 5);
    const userExistsCheck = `Select email from dbo.userRegister where email='${email}'`;
    let userEmail = await sql.query(userExistsCheck);
    if (userEmail?.recordset[0]?.email) {
      return NextResponse.json({
        error: "User already exists with this email",
        status: 409,
        message: "Failure",
        isExists: true,
      });
    }
    let userid = "";
    userid = uuidv4();
    const InsertQuery = `Insert into dbo.userRegister (userId, first_name, email, password) values('${userid}', '${first_name}', '${email}', '${hashedPassword}')`;
    await sql.query(InsertQuery).then("user added successfully");
    const fetchQuery = `Select * from dbo.userRegister where email='${email}'`;
    const fetchResponse = await sql.query(fetchQuery);
    const recordSet = fetchResponse.recordset[0];
    const { userId } = recordSet;
    return NextResponse.json({
      data: {
        email: email,
        first_name: first_name,
        userId: userId,
      },
      status: 200,
      message: `User registered successfully`,
    });
  } catch (error) {
    console.error("Error while registering user:", error);
    return NextResponse.json({
      error: "Something went wrong. Please try again",
      errorMessage: error,
      status: 500,
      message: "Failure",
    });
  }
}
