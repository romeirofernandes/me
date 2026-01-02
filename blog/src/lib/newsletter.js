import { collection, addDoc, serverTimestamp, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export async function subscribeToNewsletter(email) {
  return await addDoc(collection(db, "newsletter_subscribers"), {
    email,
    subscribedAt: serverTimestamp(),
  });
}

export async function isEmailSubscribed(email) {
  const q = query(
    collection(db, "newsletter_subscribers"),
    where("email", "==", email)
  );
  const snapshot = await getDocs(q);
  return !snapshot.empty;
}
