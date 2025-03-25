import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [jobNotifications, setJobNotifications] = useState([]);

    useEffect(() => {
        const newSocket = io(import.meta.env.VITE_BACKEND_URL, {  
            withCredentials: true,
            transports: ["websocket", "polling"]  
        });

        newSocket.on("connect", () => {
            console.log("WebSocket Connected:", newSocket.id);
        });

        newSocket.on("connect_error", (error) => {
            console.error("WebSocket Connection Error:", error);
        });

        newSocket.on("newJob", (job) => {
            console.log("New Job Received:", job);
            setJobNotifications((prevJobs) => [job, ...prevJobs]);
        });

        setSocket(newSocket);

        return () => newSocket.disconnect();
    }, []);

    return (
        <WebSocketContext.Provider value={{ socket, jobNotifications }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => useContext(WebSocketContext);
