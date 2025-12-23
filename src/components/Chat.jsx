import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const connections = useSelector((store) => store.connections);
  const user = useSelector((store) => store.user);
  const socketRef = useRef(null);
  const messageEndRef = useRef(null);
  const [newMessage, setNewMessage] = useState("");
  const userId = user._id;
  const name = `${user.firstName} ${user.lastName}`;
  const [messages, setMessages] = useState([]);
  const { firstName, lastName, photoUrl } = connections.find(
    (connection) => connection?._id.toString() === targetUserId.toString()
  );

  const fetchChat = async () => {
    const chat = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
      withCredentials: true,
    });
    const chatMessage = chat?.data?.chat?.messages.map((msg) => {
      return {
        name: `${msg.senderId.firstName} ${msg.senderId.lastName}`,
        text: msg.text,
        time: new Date(msg.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
    });
    setMessages(chatMessage);
  };

  //   useEffect(() => {
  //     fetchChat();
  //   }, []);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!userId) return;
    fetchChat();

    socketRef.current = createSocketConnection();

    socketRef.current.emit("joinChat", {
      name: `${user.firstName} ${user.lastName}`,
      userId,
      targetUserId,
    });

    socketRef.current.on("messageReceived", ({ name, text, time }) => {
      setMessages((prev) => [...prev, { name, text, time }]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    socketRef.current.emit("sendMessage", {
      name,
      userId,
      targetUserId,
      text: newMessage,
      time,
    });
    setNewMessage("");
  };
  return (
    <>
      {/* Header */}
      <div className="max-w-3xl mx-auto mt-4">
        <div className="card bg-base-300 shadow-md">
          <div className="card-body flex flex-row items-center gap-4">
            <div className="avatar">
              <div className="w-12 rounded-full ring ring-primary ring-offset-base-300 ring-offset-2">
                <img src={photoUrl} alt="Profile" className="object-cover" />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold">{`${firstName} ${lastName}`}</h2>
              <p className="text-xs">Online</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="max-w-3xl mx-auto my-4 h-[60vh] overflow-y-auto px-2">
        {/* Other user message */}
        {messages.map((msg, index) => {
          const isMe = msg.name.trim() === name.trim();
          return (
            <div
              key={index}
              className={`flex my-2 chat ${
                isMe
                  ? "justify-end chat-end text-white px-4 py-2 rounded-t-2xl"
                  : "justify-start chat-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-t-2xl max-w-md chat-bubble ${
                  isMe ? "bg-blue-600" : "bg-base-300"
                }`}
              >
                {msg?.text}
              </div>
              <time className="text-xs opacity-50">{msg?.time}</time>
            </div>
          );
        })}
        <div ref={messageEndRef} />
      </div>

      {/* Input Box */}
      <div className="max-w-3xl mx-auto mb-4">
        <div className="card bg-base-300 shadow-md">
          <div className="card-body flex flex-row gap-3 items-center">
            <input
              type="text"
              placeholder="Type a message..."
              className="input input-bordered w-full"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => (e.key === "Enter" ? sendMessage() : "")}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-800 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-3xl"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
