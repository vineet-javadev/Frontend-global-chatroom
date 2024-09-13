import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

const express = require('express');
const cors = require("cors");
const app = express();

// Allow requests from the Vercel frontend
app.use(
  cors({
    origin: "https://frontend-global-chatroom.vercel.app",
  })
);

app.get("/server/info", (req, res) => {
  res.json({ message: "This is the server info" });
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});

let stompClient = null;

const ChatService = {
  // Initialize WebSocket connection
  connect: (onConnected, onError) => {
    // localhost server
    // const socket = new SockJS("http://localhost:8080/server");
    // web server
    const socket = new SockJS(
      "https://render.com/docs/web-services:8080/server"
    );
    stompClient = Stomp.over(socket);
    stompClient.connect({}, onConnected, onError);
  },

  // Subscribe to a chat topic (e.g., "/topic/messages")
  subscribe: (topic, onMessageReceived) => {
    if (stompClient) {
      stompClient.subscribe(topic, onMessageReceived);
    }
  },

  // Send a message to the backend WebSocket
  sendMessage: (destination, message) => {
    if (stompClient && message) {
      stompClient.send(destination, {}, JSON.stringify(message));
    }
  },

  // Disconnect WebSocket
  disconnect: () => {
    if (stompClient) {
      stompClient.disconnect();
    }
  },

  //Unsubscribe  from a chat topic
  unsubscribe: () => {
    if (stompClient) {
      stompClient.unsubscribe();
    }
  },
};

export default ChatService;
