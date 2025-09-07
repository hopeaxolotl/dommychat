import { db, auth } from "./firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

/**
 * Send a message to the group chat
 */
export async function sendGroupMessage(text) {
  if (!text.trim()) return;
  await addDoc(collection(db, "groupMessages"), {
    text,
    senderId: auth.currentUser.uid,
    timestamp: serverTimestamp(),
  });
}

/**
 * Subscribe to group chat messages
 */
export function subscribeToGroupMessages(callback) {
  const q = query(collection(db, "groupMessages"), orderBy("timestamp"));
  return onSnapshot(q, (snapshot) => {
    const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(msgs);
  });
}

/**
 * Get unique conversation ID for two users
 */
export function getConversationId(userA, userB) {
  return [userA, userB].sort().join("_");
}

/**
 * Send a direct message to another user
 */
export async function sendDirectMessage(toUserId, text) {
  if (!text.trim()) return;
  const conversationId = getConversationId(auth.currentUser.uid, toUserId);

  await addDoc(
    collection(db, "directMessages", conversationId, "messages"),
    {
      text,
      senderId: auth.currentUser.uid,
      timestamp: serverTimestamp(),
    }
  );
}

/**
 * Subscribe to messages in a DM conversation
 */
export function subscribeToDirectMessages(userId, callback) {
  const conversationId = getConversationId(auth.currentUser.uid, userId);
  const q = query(
    collection(db, "directMessages", conversationId, "messages"),
    orderBy("timestamp")
  );
  return onSnapshot(q, (snapshot) => {
    const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(msgs);
  });
}
