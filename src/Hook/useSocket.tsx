import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  ReactNode,
} from "react";

interface WebSocketContextValue {
  current: WebSocket | null;
}

const WebSocketContext = createContext<WebSocketContextValue | null>(null);

interface WebSocketProviderProps {
  children: ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
  children,
}) => {
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8000/ws/posts/");
    ws.current.onopen = () => console.log("WebSocket connection opened");
    ws.current.onclose = () => console.log("WebSocket connection closed");

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
};

export const useWebSocket = (): WebSocketContextValue | null => {
  return useContext(WebSocketContext);
};
