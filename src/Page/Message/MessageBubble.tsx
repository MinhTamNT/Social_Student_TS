import React from "react";

interface MessageProps {
  sender: string;
  content: string;
  timestamp: string;
  isSender: boolean;
}

export const MessageBubble: React.FC<MessageProps> = ({
  sender,
  content,
  timestamp,
  isSender,
}) => {
  return (
    <div className={`flex ${isSender ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-xs p-3 rounded-lg shadow-md ${
          isSender ? "bg-blue-500 text-white" : "bg-white text-gray-900"
        }`}
      >
        <div className="text-sm">
          {!isSender && <span className="font-semibold">{sender}</span>}
          <span className="block">{content}</span>
          <span className="block text-xs text-gray-500">{timestamp}</span>
        </div>
      </div>
    </div>
  );
};
