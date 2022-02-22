import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { addUser } from "./database";

export async function signUp(name, email, password) {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    console.log(result)
    if (result.user.uid !== null) {
      console.log('wykonuje')
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

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
}

export function logout() {
  return signOut(auth)
}