import React, { useEffect, useState } from "react";
import { socket } from "../socket";

export default function ChatWindow({ user, chatWith }) {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receive", msg => {
      if (msg.sender === chatWith) {
        setMessages(prev => [...prev, msg]);
      }
    });
  }, [chatWith]);

  const send = () => {
    const msg = { sender: user, receiver: chatWith, text };
    socket.emit("send", msg);
    setMessages(prev => [...prev, msg]);
    setText("");
  };

  if (!chatWith) return <div className="chat">Select a user</div>;

  return (
    <div className="chat">
      <h3>Chat with {chatWith}</h3>
      <div className="messages">
        {messages.map((m, i) => (
          <div key={i} className={m.sender === user ? "me" : "them"}>
            {m.text}
          </div>
        ))}
      </div>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => e.key === "Enter" && send()}
      />
    </div>
  );
}
