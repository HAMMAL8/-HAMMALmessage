import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import { socket } from "./socket";
import "./styles.css";

export default function App() {
  const [user, setUser] = useState("");
  const [chatWith, setChatWith] = useState("");

  const join = () => socket.emit("join", user);

  if (!user)
    return (
      <div className="login">
        <input placeholder="Username" onBlur={e => setUser(e.target.value)} />
        <button onClick={join}>Enter Chat</button>
      </div>
    );

  return (
    <div className="app">
      <Sidebar setChatWith={setChatWith} />
      <ChatWindow user={user} chatWith={chatWith} />
    </div>
  );
        } 
