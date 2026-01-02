import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "sonner";

export default function Unsubscribe() {
  const [status, setStatus] = useState("loading"); 

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email");
    if (!email) {
      setStatus("notfound");
      return;
    }

    const unsubscribe = async () => {
      try {
        const q = query(
          collection(db, "newsletter_subscribers"),
          where("email", "==", email)
        );
        const snapshot = await getDocs(q);
        if (snapshot.empty) {
          setStatus("notfound");
          return;
        }
        await Promise.all(snapshot.docs.map((docu) => deleteDoc(docu.ref)));
        setStatus("success");
        toast.success("You have been unsubscribed.");
      } catch (err) {
        setStatus("error");
        toast.error("Error unsubscribing. Try again.");
      }
    };

    unsubscribe();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-2xl font-bold mb-4">Unsubscribe from Blog Updates</h1>
      {status === "loading" && <p>Processing your request…</p>}
      {status === "success" && (
        <p className="text-green-600">You have been unsubscribed.</p>
      )}
      {status === "notfound" && (
        <p className="text-destructive">Invalid or expired unsubscribe link.</p>
      )}
      {status === "error" && (
        <p className="text-destructive">Something went wrong. Please try again.</p>
      )}
    </div>
  );
}