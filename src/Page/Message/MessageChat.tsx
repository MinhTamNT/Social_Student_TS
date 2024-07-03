import React, { useState, useEffect, useRef } from "react";
import { MessageBubble } from "./MessageBubble";
import { ChatFooter } from "./MessageFooter";
import { User } from "./Message";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

interface MessageProps {
  sender: string;
  content: string;
  timestamp: string;
  isSender: boolean;
}

interface MessageChatProps {
  selectedUser: User | null;
}

export const MessageChat: React.FC<MessageChatProps> = ({ selectedUser }) => {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const ws = useRef<WebSocket | null>(null);
  const user = useSelector(
    (state: RootState) => state?.user?.user?.currentUser
  );
  const auth = useSelector(
    (state: RootState) => state?.auth?.login?.currentUser
  );
  const userId = user?.id;
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (selectedUser && userId) {
      const roomName = [selectedUser.id, userId].sort().join("_");
      const wsUrl = `ws://localhost:8000/ws/chat/${roomName}/?token=${auth?.access_token}`;
      ws.current = new WebSocket(wsUrl);

      ws.current.onopen = () => {
        console.log("WebSocket connected");
      };

      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("Message received from server:", data);

        if (data.type === "load_messages") {
          const loadedMessages = data.messages.map((msg: any) => ({
            sender: msg.sender_name,
            content: msg.message,
            timestamp: new Date(msg.timestamp).toLocaleTimeString(),
            isSender: msg.sender_name === user?.username,
          }));
          setMessages(loadedMessages);
        } else {
          const message: MessageProps = {
            sender: data.sender_name,
            content: data.message,
            timestamp: new Date().toLocaleTimeString(),
            isSender: data.sender === user?.username,
          };
          setMessages((prevMessages) => [...prevMessages, message]);
          if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop =
              chatContainerRef.current.scrollHeight;
          }
        }
      };

      ws.current.onclose = () => {
        console.log("WebSocket closed");
        setTimeout(() => {
          if (selectedUser && userId) {
            ws.current = new WebSocket(wsUrl);
          }
        }, 3000);
      };

      return () => {
        ws.current?.close();
      };
    }
  }, [selectedUser, userId]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const message = {
      message: newMessage,
      sender: user?.username,
      receiver: selectedUser?.id,
      timestamp: new Date().toISOString(),
    };

    ws.current?.send(JSON.stringify(message));
    setNewMessage("");
  };

  return (
    <div className="h-full flex flex-col bg-gray-300 shadow-sm">
      <div className="room-user flex items-center shadow-md bg-white">
        {selectedUser && (
          <>
            <img
              src={selectedUser.avatar_user}
              alt="user_chat"
              className="object-cover rounded-full p-2 h-12"
            />
            <p>{selectedUser.username}</p>
          </>
        )}
      </div>
      <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto">
        {selectedUser ? (
          messages.map((message, index) => (
            <MessageBubble key={index} {...message} />
          ))
        ) : (
          <p>Please select a user to start chatting.</p>
        )}
      </div>
      {selectedUser && (
        <ChatFooter
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
        />
      )}
    </div>
  );
};
