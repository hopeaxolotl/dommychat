import React, { useState, useEffect } from "react";
import { sendDirectMessage, subscribeToDirectMessages } from "./firebaseUtils";

function DMChat({ targetUserId }) {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  useEffect(() => {
    const unsubscribe = subscribeToDirectMessages(targetUserId, setMessages);
    return () => unsubscribe();
  }, [targetUserId]);

  const handleSend = () => {
    sendDirectMessage(targetUserId, newMsg);
    setNewMsg("");
  };

  return (
    <div>
      <h2>Direct Chat with {targetUserId.substring(0, 5)}</h2>
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

export default DMChat;
