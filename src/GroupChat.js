import React, { useState, useEffect } from "react";
import { sendGroupMessage, subscribeToGroupMessages } from "./firebaseUtils";

function GroupChat() {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  useEffect(() => {
    const unsubscribe = subscribeToGroupMessages(setMessages);
    return () => unsubscribe();
  }, []);

  const handleSend = () => {
    sendGroupMessage(newMsg);
    setNewMsg("");
  };

  return (
    <div>
      <h2>Group Chat</h2>
      <div style={{ height: "300px", overflowY: "auto", border: "1px solid #ccc" }}>
        {messages.map((m) => (
          <div key={m.id}>
            <strong>{m.senderId.substring(0, 5)}:</strong> {m.text}
          </div>
        ))}
      </div>
      <input value={newMsg} onChange={(e) => setNewMsg(e.target.value)} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default GroupChat;
