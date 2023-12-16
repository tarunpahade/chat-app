import { Conversation } from "@/dbconfig/dbconfig";
import { NextResponse } from "next/server";


export async function POST(request: NextResponse, response: NextResponse) {
    try {
        const { participants } = await request.json();
  
        // Call the function to create a new chat conversation
        const result = await Conversation.insertOne(participants)
  
        return NextResponse.json(result, { status: 200 });
      } catch (error) {
        console.error('Error creating chat conversation:', error);
        return NextResponse.json({ error: 'Failed to create chat conversation' }, { status: 500 });
      }
  


}
