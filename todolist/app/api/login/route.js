import dbConnect from "@/config/dbconnect";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import sql from "mssql";

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { email, password } = body;
    const userExistsQuery = `SELECT * FROM dbo.userRegister WHERE email='${email}'`;
    const userExistsResponse = await sql.query(userExistsQuery);
    if (!userExistsResponse?.recordset[0]) {
      return NextResponse.json({
        error: "User does not exist with this email",
        isExists: false,
        status: 404,
        message: 'Failure'
      });
    }

    const user = userExistsResponse.recordset[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({
        error: "Invalid password",
        isPasswordValid: false,
        status: 401,
        message: 'Failure'
      });
    }

    return NextResponse.json({
      data: {
        email: user.email,
        first_name: user.first_name,
        isPasswordValid: true,
        uid: user.uid,
      },
      status: 200,
      message: "Login successful",
    });
  } catch (error) {
    return NextResponse.json({ error: "Error during login" }, { status: 500 });
  }
}
