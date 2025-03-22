import { useEffect } from "react";
import { io } from "socket.io-client";

// ✅ Change WebSocket URL to Render backend
const socket = io("https://jobsparx-backend.onrender.com", { 
    withCredentials: true, 
    transports: ["websocket", "polling"], // ✅ Ensures WebSocket compatibility
});

const useWebSocket = (userId, onNewJob) => {
    useEffect(() => {
        if (!userId) return;

        console.log("📢 Connecting to WebSocket with userId:", userId);
        socket.emit("subscribeToJobAlerts", userId);

        socket.on("newJob", (job) => {
            console.log("📢 New job alert received:", job);
            onNewJob(job);
        });

        return () => {
            console.log("📢 Disconnecting WebSocket");
            socket.off("newJob", onNewJob);
        };
    }, [userId, onNewJob]);
};

export default useWebSocket;
