"use client";
import ChatArea from "@/components/chat/chatArea";
import ChatInput from "@/components/chat/chatInput";
import { List } from "@/components/list/list"
import { Nav } from "@/components/navbar/nav";
import { Popup } from "@/components/popup/popup";
import { messages } from "@/dbconfig/dbconfig";
import axios from "axios";
import { useSession } from "next-auth/react"

import React, { useState, useEffect } from "react";
export interface People {
  username: string;
  email: string;
  imageUrl: string;
  lastSeen?: string; // Make it optional
  lastSeenDateTime?: string;
  id?: number;
}
interface Conversation {
  text: string;
  isUser: boolean;
  username: string;
  id: number;
  msgSentByMe: boolean;
}

const Chat = () => {
  const { data: session } = useSession()
  const [input, setinput] = useState("");
  const [showPopupState, setshowPopup] = useState(false);
  const [db, setdb] = useState([])
  const [disabled, setDisabled] = useState(false)
  const [messagesFromDatabase, setMessagesFromDataBase] = useState<messages[]>(
    [
      {

        senderEmail: "leslie.alexander@example.com",
        reciverEmail: "tarunpahade55@gmail.com",
        message: "Aaaaaaaaaaaa",
        timestamp: 1693223144105
      },
    ]

  )
  const user= session?.user.email
  const [conversationId, setconversationId] = useState('')
  const [messages, setMessages] = useState([
    { text: "Hello!", isUser: true },
  ]);
  const people: People[] = [
    {
      username: "Leslie Alexander",
      email: "leslie.alexander@example.com",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      lastSeen: "3h ago",
      lastSeenDateTime: "2023-01-23T13:23Z",

    },
    {
      username: "Michael Foster",
      email: "michael.foster@example.com",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      lastSeen: "3h ago",
      lastSeenDateTime: "2023-01-23T13:23Z",
    },
    {
      username: "Dries Vincent",
      email: "dries.vincent@example.com",
      imageUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      lastSeen: "3h ago",
      lastSeenDateTime: "2023-01-23T13:23Z",
    },
    {
      username: "Lindsay Walton",
      email: "lindsay.walton@example.com",
      imageUrl:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      lastSeen: "3h ago",
      lastSeenDateTime: "2023-01-23T13:23Z",
    },
    {
      username: "Courtney Henry",
      email: "courtney.henry@example.com",
      imageUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      lastSeen: "3h ago",
      lastSeenDateTime: "2023-01-23T13:23Z",
    },
    {
      username: "Tom Cook",
      email: "tom.cook@example.com",
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      lastSeen: "3h ago",
      lastSeenDateTime: "2023-01-23T13:23Z",
    },
  ];
const [conversationData,setConversationData]=useState([])
  const [person, setPerson] = useState<People>(people[0]);
  const [isListHidden, setIsListHidden] = useState(false);

  const onBackPress = () => {
    setIsListHidden((prevValue) => !prevValue);
  };

  const onChange = (e: any) => {
    setinput(e.target.value);
  };
  const sendMsg = async () => {
    if (input.trim() !== "") {
      const newMessage = { text: input, isUser: true, username: person.username, id: person.id, msgSentByMe: true };
      setMessages([...messages, newMessage]);
      setDisabled(true)
      console.log(conversationId);
      
      try {
        const chat = {

          senderEmail: session?.user.email!,
          reciverEmail: person.email,
          message: input,
          timestamp: Date.now(),
          conversationId
        }
        const newMessages = [...messagesFromDatabase, chat];

        // Update the state with the new array of messages
        setMessagesFromDataBase(newMessages);

        const res = await axios.post('/api/chat/sendMessage', chat)


      } catch (error) {
        console.log('Error', error);

      }

      setDisabled(false)
      setinput("");
    }
  };
  const onPress = async (e: People) => {
    setMessages([]);
    const participants = [person.email, session?.user.email]

    const response = await axios.post('/api/chat/findConversation', participants);

    setconversationId(response.data._id)


    await fetchChatsFromApi()


    // Set the new person
    setPerson(e);
    const newMessage: React.SetStateAction<{ text: string; isUser: boolean; }[]> = []

    const conversations3 = messagesFromDatabase.map((item) => {
      if (session?.user.email === item.reciverEmail) {
        ///message recieved to the person logged in
        newMessage.push({
          text: item.message,
          isUser: false
        })
      }
      else if (session?.user.email === item.senderEmail) {
        ///messages sent by the person logged in
        newMessage.push({
          text: item.message,
          isUser: true
        })
      }


    })

    setMessages(newMessage)
    // setMessages(newMessages);
    setIsListHidden((prevValue) => !prevValue);



  };
  const showPopup = () => {
    setshowPopup((previous) => !previous)

  }
  const fetchDataFromApi = async () => {
    try {
      const response = await axios.get('/api/chat/userDb');

      return response.data.users
    } catch (error) {
      // Handle any network or request errors
      console.error('API request failed with error:', error);
      return null;
    }
  }
  const fetchChatsFromApi = async () => {
    try {
      console.log(user);
      
      
      const response = await axios.post('/api/chat/chatRetrival', { email: session?.user.email });
      console.log(response.data);
      setMessagesFromDataBase(response.data.messages)


      return response.data
    } catch (error) {
      // Handle any network or request errors
      console.error('API request failed with error:', error);
      return null;
    }
  }

  const onPopupViewUser = async (person: People) => {

    //This try catch function finds if conversation exists and if not it create a conversation and sends Id 
    try {
      const participants = [person.email, session?.user.email]


      const response = await axios.post('/api/chat/findConversation', participants);

      setconversationId(response.data._id)
      setshowPopup(false)
      onPress(person)

    } catch (error) {
      // Handle any network or request errors
      console.error('API request failed with error:', error);
      return null;
    }

  }


  useEffect(() => {
    // Create an async function inside useEffect and call it immediately
    const fetchData = async () => {
      const dbUsers = await fetchDataFromApi();
      const chats = await fetchChatsFromApi();


      setdb(dbUsers);

    };
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showPopupState]);
  return (
    <div className="min-h-screen flex">
      <Nav></Nav>

      <div className={`h-full  ${isListHidden ? 'hidden' : 'flex w-full'}`}>
        <List showPopup={showPopup} data={people} onPress={onPress}></List>

      </div>
      <div className={`h-full  ${isListHidden ? 'flex w-full' : 'hidden'}`}>
        <ChatArea onBackPress={onBackPress} messages={messages} profile={person} />
        <div className="mb-28 "></div>
        <ChatInput disabled={disabled} value={input} onChange={onChange} sendMsg={sendMsg} />
      </div>
      {showPopupState ? (
        <Popup onPopupViewUser={onPopupViewUser} people={db} showPopup={showPopup} />
      ) : null

      }
    </div>
  );
};
export default Chat;
