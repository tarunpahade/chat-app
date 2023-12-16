import { Conversation } from "@/dbconfig/dbconfig";
import sortParticipantsAlphabetically from "@/helpers/arranger";
import { NextResponse } from "next/server";

export async function POST(request: NextResponse, response: NextResponse) {
  try {
    const data = await request.json();
    const reArrangedParticipants = sortParticipantsAlphabetically(data);


    const conversation = await Conversation.findOne({
      participants: { $all: reArrangedParticipants },
    });

    if (conversation === null) {

      const result = await Conversation.insertOne({ participants: data });

      return NextResponse.json(result, { status: 200 });
    }
    return NextResponse.json(conversation, { status: 200 });
  } catch (error) {
    console.error("Error creating chat conversation:", error);
    return NextResponse.json(
      { error: "Failed to create chat conversation" },
      { status: 500 }
    );
  }
}
