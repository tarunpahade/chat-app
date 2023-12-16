import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import Users from "@/dbconfig/dbconfig";
import { sendMail } from "@/helpers/mailer";
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { reciverEmail, message, senderMail } = reqBody;
    console.log(message, reciverEmail,message, "this is token");
    const responseMail = sendMail({ reciverEmail, message, senderMail})
    console.log(responseMail);
 
    return NextResponse.json({ message: "Mail Sent Successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
