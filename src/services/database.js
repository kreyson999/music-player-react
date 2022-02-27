import { setDoc, doc, getDoc, updateDoc, getDocs, query, collection, Timestamp, where } from "firebase/firestore";
import { db } from "../firebase";
import { getUniqueId } from "../helpers/getUniqueId";

const userCollection = "users"
const songCollection = "songs"
const playlistCollection = "playlists"

/* 
-------------------------
USERS
-------------------------
*/

export function addUser(userId, name) {
  return setDoc(doc(db, userCollection, userId), { name: name, playlists: [] })
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
    return setDoc(doc(db, userCollection, userId), { name: name, profileUrl: profileUrl, playlists: [] })
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

/* 
-------------------------
PLAYLISTS
-------------------------
*/

const playlistQuery = query(collection(db, playlistCollection))

export async function getPlaylists() {
  const playlistDoc = await getDocs(playlistQuery)
  const playlists = []
  playlistDoc.forEach((playlist) => {
    playlists.push({...playlist.data(), id: playlist.id})
  })
  return playlists
}

export async function getUserPlaylists(userId) {
  const userPlaylistsQuery = query(collection(db, playlistCollection), where("createdBy", "==", userId))
  const userPlaylistsSnap = await getDocs(userPlaylistsQuery)
  const userPlaylists = []
  userPlaylistsSnap.forEach((doc) => {
    userPlaylists.push({...doc.data(), id: doc.id})
  })
  return userPlaylists
}

export async function addSongToPlaylist(playlistId, songId) {
  const playlistDoc = await getDoc(doc(db, playlistCollection, playlistId))
  const playlistData = playlistDoc.data()
  const songs = playlistData.songs
  songs.push(songId)
  const data = {
    songs: songs
  }
  return updateDoc(doc(db, playlistCollection, playlistId), data)
}

export async function updatePlaylist(playlistId, title, photoUrl) {
  const playlistDoc = await getDoc(doc(db, playlistCollection, playlistId))
  const playlistData = playlistDoc.data()
  const data = {
    title: title ?? playlistData.title
  }
  return updateDoc(doc(db, playlistCollection, playlistId), data)
}

export async function createPlaylist(userId) {
  try {
    const data = {
      title: "New playlist",
      createdBy: userId,
      createdAt: Timestamp.now(),
      songs: []
    }
    const uniqueId = getUniqueId()
    await setDoc(doc(db, playlistCollection, uniqueId), data)
    // return true to force update playlists in component
    return true
  } catch (error) {
    return false
  }
  // create playlist in the database
}