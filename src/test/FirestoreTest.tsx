import React, { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../DB/firebase";

const FirestoreTest = () => {
  useEffect(() => {
    const testFirestore = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "testCollection"));
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} =>`, doc.data());
        });
      } catch (error) {
        console.error("Error reading Firestore:", error);
      }
    };

    testFirestore();
  }, []);

  return <h1>Firestore Test</h1>;
};

export default FirestoreTest;
