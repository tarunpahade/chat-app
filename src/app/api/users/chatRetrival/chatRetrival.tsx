import { Messages } from "@/dbconfig/dbconfig";
import { NextResponse } from "next/server";


export async function GetMessages(request: NextResponse, response: NextResponse) {
    try {
     
    const data =await request.json()
    const { userId } = data


    const senderMessages = await Messages.find({ sender: userId }).toArray();
    const receiverMessages = await Messages.find({ receiver: userId }).toArray();

    const allMessages = [...senderMessages, ...receiverMessages];

    // Sort the messages by timestamp (ascending)
    allMessages.sort((a, b) => a.timestamp - b.timestamp);

return NextResponse.json(allMessages)   
    } catch (error:any) {
        console.log( error);
    
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}