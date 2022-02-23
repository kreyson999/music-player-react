import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const userCollection = "users"

export function addUser(userId, name) {
  return setDoc(doc(db, userCollection, userId), { name: name })
}

export async function getUser(userId) {
  const userDoc = await getDoc(doc(db, userCollection, userId))

  if (userDoc.exists()) {
    return userDoc.data()
  } else {
    return null
  }
}

export async function updateUser(userId, name, profileUrl) {
  const userDoc = await getDoc(doc(db, userCollection, userId))
  if (!userDoc.exists()) {
    return setDoc(doc(db, userCollection, userId), { name: name, profileUrl: profileUrl })
  } else {
    return updateDoc(doc(db, userCollection, userId), { name: name, profileUrl: profileUrl })
  }
}