import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { addUser, updateUser } from "./database";

export async function signUp(name, email, password) {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    if (result.user.uid !== null) {
      const dbResult = await addUser(result.user.uid, name)
      console.log(dbResult)
    }
    return true
  } catch (error) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'Podany e-mail jest już w użyciu!'
      default:
        return 'Wystąpił niezidentifikowany problem z logowaniem. Spróbuj później!'
    }
  }
}

const googleProvider = new GoogleAuthProvider()

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    const credential = GoogleAuthProvider.credentialFromResult(result)
    const token = credential.accessToken
    const user = result.user
    if (user.uid !== null) {
      await updateUser(user.uid, user.displayName, user.photoURL)
    }
  } catch (error) {
    return error.message
  }
}

export async function signIn(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password)
    return true
  } catch (error) {
    switch (error.code) {
      case 'auth/wrong-password':
        return 'Podane hasło jest nieprawidłowe.'
      case 'auth/user-not-found':
        return 'Podany użytkownik nie znajduje się w naszej bazie danych!' 
      default:
        return 'Wystąpił niezidentifikowany problem z logowaniem. Spróbuj później!'
    }
  }
}

export function logout() {
  return signOut(auth)
}