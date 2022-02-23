import { setDoc, doc, getDoc, updateDoc, getDocs, query, collection } from "firebase/firestore";
import { db } from "../firebase";

const userCollection = "users"
const songCollection = "songs"

/* 
-------------------------
USERS
-------------------------
*/

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

/* 
-------------------------
SONGS
-------------------------
*/

const songsQuery = query(collection(db, songCollection))

export async function getSongs() {
  const songsDoc = await getDocs(songsQuery)
  const songs = []
  songsDoc.forEach((song) => {
    songs.push({...song.data(), id: song.id})
  })
  return songs
}