import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  // load messages in real-time
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, []);

  // send a new message
  const sendMessage = async () => {
    if (!newMsg.trim()) return;
    await addDoc(collection(db, "messages"), {
      text: newMsg,
      senderId: auth.currentUser?.uid || "anon",
      timestamp: serverTimestamp(),
    });
    setNewMsg("");
  };

  return (
    <div>
      <div
        style={{
          border: "1px solid #ccc",
          height: "300px",
          overflowY: "scroll",
          padding: "10px",
        }}
      >
        {messages.map((msg) => (
          <div key={msg.id}>
            <strong>{msg.senderId.substring(0, 5)}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        value={newMsg}
        onChange={(e) => setNewMsg(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
