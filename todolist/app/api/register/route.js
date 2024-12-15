import dbConnect from "@/config/dbconnect";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import sql from "mssql";

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { first_name, email, password } = body;
    const hashedPassword = await bcrypt.hash(password, 5);

    const InsertQuery = `Insert into dbo.userRegister (first_name, email, password) values('${first_name}', '${email}', '${hashedPassword}')`;
    await sql.query(InsertQuery).then("user added successfully");

    const fetchQuery = `Select * from dbo.userRegister where email='${email}'`;
    const fetchResponse = await sql.query(fetchQuery);
    const recordSet = fetchResponse.recordset[0];
    const { uid } = recordSet;
    return NextResponse.json({
      data: `User ${uid} id  registered successfully`,
    });
  } catch (error) {
    console.error("Error while registering user:", error);
    return NextResponse.json(
      { error: "Error while registering user" },
      { status: 500 }
    );
  }
}
