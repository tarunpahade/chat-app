import { Conversation, Messages } from "@/dbconfig/dbconfig";
import { NextResponse } from "next/server";

export async function POST(request: NextResponse, response: NextResponse) {
  try {
    const data = await request.json();
    console.log(data);
    
    const { email } = data;
    console.log(email);

    const senderMessages = await Messages.find({ sender: email }).toArray();
    const receiverMessages = await Messages.find({ receiver: email }).toArray();

    const allMessages = [...senderMessages, ...receiverMessages];
    

    // Sort the messages by timestamp (ascending)
    allMessages.sort((a, b) => a.timestamp - b.timestamp);
console.log(email,'this is email');


const conversations = Conversation.find({
  participants: { $in: email },
})
      // Extract the relevant data and create an array of conversation objects
      const conversationData = conversations!.map((conversation) => ({
        _id: conversation._id,
        participants: conversation.participants,
        // Add other relevant fields as needed
      }));
  console.log(conversationData);
  
      return NextResponse.json({
        conversations: conversationData,
        messages:allMessages,
        success: true,
      });



  } catch (error: any) {
    console.log(error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
