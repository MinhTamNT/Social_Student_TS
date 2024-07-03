interface ChatFooterProps {
  newMessage: string;
  setNewMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: (e: React.FormEvent) => void;
}

export const ChatFooter: React.FC<ChatFooterProps> = ({
  newMessage,
  setNewMessage,
  handleSendMessage,
}) => {
  return (
    <footer className="p-4 bg-gray-100  border-gray-200">
      <form onSubmit={handleSendMessage} className="flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="p-2 bg-blue-600 text-white rounded-r-md"
        >
          Send
        </button>
      </form>
    </footer>
  );
};
