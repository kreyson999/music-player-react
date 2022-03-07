import { setDoc, doc, getDoc, updateDoc, getDocs, query, collection, Timestamp, where } from "firebase/firestore";
import { db } from "../firebase";
import { getUniqueId } from "../helpers/getUniqueId";

const USERS_COLLECTION = "users"
const SONGS_COLLECTION = "songs"
const PLAYLIST_COLLECTION = "playlists"

/* 
-------------------------
USERS
-------------------------
*/

export async function createUser(id, name) {
  const data = {
    name: name, 
  }

  return setDoc(doc(db, USERS_COLLECTION, id), data)
}

export async function getUser(id) {
  const userDocument = await getDoc(doc(db, USERS_COLLECTION, id))

  if (userDocument.exists()) {
    return userDocument.data()
  } else {
    return null
  }
}

export async function updateUser(id, name, profileUrl) {
  const userDoc = await getDoc(doc(db, USERS_COLLECTION, id))

  if (userDoc.exists()) {
    return updateDoc(doc(db, USERS_COLLECTION, id), { name: name, profileUrl: profileUrl })
  } else {
    return setDoc(doc(db, USERS_COLLECTION, id), { name: name, profileUrl: profileUrl })
  }
}

/* 
-------------------------
SONGS
-------------------------
*/

const SONGS_QUERY = query(collection(db, SONGS_COLLECTION))

export async function getSongs() {
  const songDocs = await getDocs(SONGS_QUERY)

  const songs = []
  songDocs.forEach((song) => {
    songs.push({...song.data(), id: song.id})
  })

  return songs
}

export async function getPlaylistSongs(songsArray) {
  const songsQuery = query(collection(db, SONGS_COLLECTION), where("__name__", "in", songsArray))
  const songDocs = await getDocs(songsQuery)

  const songs = []
  songDocs.forEach((song) => {
    songs.push({...song.data(), id: song.id})
  })

  return songs
}

/* 
-------------------------
PLAYLISTS
-------------------------
*/

const PLAYLIST_QUERY = query(collection(db, PLAYLIST_COLLECTION))

export async function getPlaylists() {
  const playlistDocuments = await getDocs(PLAYLIST_QUERY)

  const playlists = []
  playlistDocuments.forEach((doc) => {
    playlists.push({...doc.data(), id: doc.id})
  })

  return playlists
}

export async function getUserPlaylists(id) {
  const userPlaylistsQuery = query(collection(db, PLAYLIST_COLLECTION), where("createdBy", "==", id))
  const userPlaylistsDocuments = await getDocs(userPlaylistsQuery)
  const userPlaylists = []

  userPlaylistsDocuments.forEach((doc) => {
    userPlaylists.push({...doc.data(), id: doc.id})
  })

  return userPlaylists
}

export async function addSongToPlaylist(playlist, songId) {
  // check if playlist contains this song and return if so
  if (playlist.songs.includes(songId)) return

  const data = {
    songs: [...playlist.songs, songId]
  }

  return updateDoc(doc(db, PLAYLIST_COLLECTION, playlist.id), data)
}
export async function updatePlaylist({title, photoUrl, id}) {
  const data = {
    title: title,
    photoUrl: photoUrl ?? null,
  }

  return updateDoc(doc(db, PLAYLIST_COLLECTION, id), data)
}

export async function getPlaylistById(id) {
  const playlistDoc = await getDoc(doc(db, PLAYLIST_COLLECTION, id))

  return {...playlistDoc.data(), id: playlistDoc.id}
}


export async function createPlaylist(userId) {
  try {
    const uniqueId = getUniqueId()

    const data = {
      title: "New playlist",
      createdBy: userId,
      createdAt: Timestamp.now(),
      songs: []
    }

    await setDoc(doc(db, PLAYLIST_COLLECTION, uniqueId), data)
    // return true to force update playlists in component
    return true
  } catch (error) {
    return false
  }
}