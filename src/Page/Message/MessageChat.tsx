// MessageChat.tsx
import React, { useState } from "react";
import { MessageBubble } from "./MessageBubble";
import { ChatFooter } from "./MessageFooter";
import { User } from "./Message";

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

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const timestamp = new Date().toLocaleTimeString();
    const message: MessageProps = {
      sender: "minhtam7895",
      content: newMessage,
      timestamp,
      isSender: true,
    };

    try {
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-300 shadow-sm">
      <div className="room-user flex items-center shadow-md  bg-white">
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
      <div className="flex-1 p-4 overflow-y-auto">
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
