import { Conversation, Messages, messages } from "@/dbconfig/dbconfig";
import sortParticipantsAlphabetically from "@/helpers/arranger";
import { ObjectId } from "mongodb";

import { NextResponse } from "next/server";

export async function POST(request: NextResponse, response: NextResponse) {
  try {
    const data = await request.json();
    const { senderEmail, reciverEmail, message, conversationId } = data;
    if(conversationId===null){
      return NextResponse.json(
        { error: "Please Mention Id" },
        { status: 404 }
      );
    }
    console.log(data, "From Send Message");

    const chat: messages = {
      senderEmail,
      reciverEmail,
      message,
      timestamp: Date.now(),
    };
    const newMessage = {
      text: message,
      senderEmail: senderEmail,
      timestamp: Date.now(),
    };

    const updatedConversation = await Conversation.findOne({
      _id: new ObjectId(conversationId),
    });
    
    if (!updatedConversation) {
      return NextResponse.json(
        { error: "Conversation not found" },
        { status: 404 }
      );
    }
    
    let updatedConversation2; // Define updatedConversation2 outside of the if block
    
    if (updatedConversation.messages) {
      updatedConversation.messages.push(newMessage);
    } else {
      updatedConversation2 = {
        _id: updatedConversation._id,
        participants: updatedConversation.participants,
        messages: [newMessage], // Initialize messages array with the new message
      };
    }
    
    console.log(updatedConversation, "This is conversation");
    
    if (updatedConversation2) {
      const res2 = await Conversation.findOneAndReplace(
        { _id: new ObjectId(updatedConversation._id) },
        updatedConversation2
      );
      console.log(res2);
    }
     const res = await Messages.insertOne(chat);
    

    return NextResponse.json({ res });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
