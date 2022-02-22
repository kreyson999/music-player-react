import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const userCollection = "users"

export function addUser(userId, name) {
  return setDoc(doc(db, userCollection, userId), { name: name })
}

export async function getUser(userId) {
  const userDoc = await getDoc(doc(db, userCollection, userId))

  if (userDoc.exists()) {
    console.log('exits')
    return userDoc.data()
  } else {
    return null
  }
}