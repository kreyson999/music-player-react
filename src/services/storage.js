import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { getUniqueId } from "../helpers/getUniqueId";

export async function uploadPlaylistPhoto(file) {
  const randomId = getUniqueId()
  const fileRef = ref(storage, `/playlists/${randomId}`);
  
  await uploadBytes(fileRef, file)
  return getDownloadURL(fileRef)
}