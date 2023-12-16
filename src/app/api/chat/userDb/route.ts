import { NextResponse, NextRequest } from "next/server";
import Users from "@/dbconfig/dbconfig";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    // Use the Users model to find all users
    const users = await Users.find().toArray();;


    // Return a JSON response with the list of users
    return NextResponse.json({
      users: users,
      success: true,
    });
  } catch (error: any) {
    console.error('Error:', error);

    // Return an error response with a 500 status code
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
