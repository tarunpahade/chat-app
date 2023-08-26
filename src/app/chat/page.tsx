"use client";
import ChatArea from "@/components/chat/chatArea";
import ChatInput from "@/components/chat/chatInput";
import Navbar from "@/components/chat/nav";
import { List } from "@/components/list/list";
import { Nav } from "@/components/navbar/nav";
import React, { useState, useEffect } from "react";
interface People {
  userName: string;
  email: string;
  role: string;
  imageUrl: string;
  lastSeen?: string; // Make it optional
  lastSeenDateTime?: string;
  id: number;
}
interface Conversation {
  text: string;
  isUser: boolean;
  userName: string;
  id: number;
  msgSentByMe: boolean;
}

const Chat = () => {

  const [input, setinput] = useState("");

  const messagesFromDatabase: Conversation[] = [
    {
      text: "Hello!  I am ",
      isUser: true,
      userName: "Tom Cook",
      id: 6,
      msgSentByMe: false,
    },
    {
      text: "Hello!  I am ",
      isUser: true,
      userName: "Courtney Henry",
      id: 5,
      msgSentByMe: false,
    },
    {
      text: "Hello!  I am ",
      isUser: true,
      userName: "Lindsay Walton",
      id: 4,
      msgSentByMe: false,
    },
    {
      text: "Hello!  I am ",
      isUser: true,
      userName: "Dries Vincent",
      id: 3,
      msgSentByMe: false,
    },
    {
      text: "Hello! I am ",
      isUser: true,
      userName: "Michael Foster",
      id: 2,
      msgSentByMe: false,
    },
    {
      text: "Hello I am !",
      isUser: true,
      userName: "Leslie Alexander",
      id: 1,
      msgSentByMe: false,
    },
  ];
  const [messages, setMessages] = useState([
    { text: "Hello!", isUser: true },
   ]);
  const people: People[] = [
    {
      userName: "Leslie Alexander",
      email: "leslie.alexander@example.com",
      role: "Co-Founder / CEO",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      lastSeen: "3h ago",
      lastSeenDateTime: "2023-01-23T13:23Z",
      id: 1,
    },
    {
      userName: "Michael Foster",
      email: "michael.foster@example.com",
      role: "Co-Founder / CTO",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      lastSeen: "3h ago",
      lastSeenDateTime: "2023-01-23T13:23Z",
      id: 2,
    },
    {
      userName: "Dries Vincent",
      email: "dries.vincent@example.com",
      role: "Business Relations",
      imageUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      lastSeen: "3h ago",
      lastSeenDateTime: "2023-01-23T13:23Z",
      id: 3,
    },
    {
      userName: "Lindsay Walton",
      email: "lindsay.walton@example.com",
      role: "Front-end Developer",
      imageUrl:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      lastSeen: "3h ago",
      lastSeenDateTime: "2023-01-23T13:23Z",
      id: 4,
    },
    {
      userName: "Courtney Henry",
      email: "courtney.henry@example.com",
      role: "Designer",
      imageUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      lastSeen: "3h ago",
      lastSeenDateTime: "2023-01-23T13:23Z",
      id: 5,
    },
    {
      userName: "Tom Cook",
      email: "tom.cook@example.com",
      role: "Director of Product",
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      lastSeen: "3h ago",
      lastSeenDateTime: "2023-01-23T13:23Z",
      id: 6,
    },
  ];
  const [person, setPerson] = useState<People>(people[0]);

  const onChange = (e: any) => {
    setinput(e.target.value);
  };
  const sendMsg = () => {
    if (input.trim() !== "") {
      // Create a new message object and append it to the messages state
      const newMessage = { text: input, isUser: true, userName: person.userName, id: person.id, msgSentByMe: true };
      setMessages([...messages, newMessage]);
      messagesFromDatabase.push(newMessage)
      // Clear the input field
      setinput("");
    }
  };
  const onPress = async(e: People) => {
  // Clear old messages immediately
  setMessages([]);

  // Set the new person
  setPerson(e);

  // Filter conversations
  const conversations = messagesFromDatabase.filter((item) => item.id === e.id);

  // Create new messages
  const newMessages = conversations.map((item) => ({
    text: item.text + item.userName,
    isUser: item.msgSentByMe === false ? false : true,
  }));

  // Set the new messages
  setMessages(newMessages);

//This code will clear the old messages, set the new person, and populate the messages associated with that person when the "List" button is pressed. It should work without causing the "Invalid hook call" error.






  };
  return (
    <div className="min-h-screen flex">
      <Nav></Nav>

      <div className="min-h-full" style={{ width: '25%' }}>
        <div>
          <List data={people} onPress={onPress}></List>
        </div>
      </div>
      <div className="h-full flex flex-col " style={{ width: '75%' }}>
        <ChatArea messages={messages} profile={person} />
        <ChatInput value={input} onChange={onChange} sendMsg={sendMsg} />
      </div>
    </div>
  );
};
export default Chat;
