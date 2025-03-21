import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000"); 

const useWebSocket = (userId, onNewJob) => {
    useEffect(() => {
        if (!userId) return;

        socket.emit("subscribeToJobAlerts", userId);
        socket.on("newJob", onNewJob);

        return () => {
            socket.off("newJob", onNewJob);
        };
    }, [userId, onNewJob]);
};

export default useWebSocket;
