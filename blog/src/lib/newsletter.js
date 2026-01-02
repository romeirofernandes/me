import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export async function subscribeToNewsletter(email) {
  // You can add more fields if needed
  return await addDoc(collection(db, "newsletter_subscribers"), {
    email,
    subscribedAt: serverTimestamp(),
  });
}
