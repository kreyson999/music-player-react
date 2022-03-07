import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

import { auth, googleProvider } from "../firebase";
import { createUser, updateUser } from "./database";

export async function signUpWithEmail({ name, email, password }) {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    
    if (user.uid !== null) {
      await createUser(user.uid, name)
    }

    return true
  } catch (error) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'This address e-mail is already in use!'
      default:
        return 'Something went wrong with creating user. Try again later!'
    }
  }
}

export async function signInWithGoogle() {
  try {
    const { user } = await signInWithPopup(auth, googleProvider)

    if (user.uid !== null) {
      await updateUser(user.uid, user.displayName, user.photoURL)
    }
    return true
  } catch (error) {
    switch(error.code) {
      case 'auth/popup-closed-by-user':
        return "You've closed the popup window."
      default: 
        return error.message
    }
  }
}

export async function signInWithEmail({ email, password }) {
  try {
    await signInWithEmailAndPassword(auth, email, password)

    return true
  } catch (error) {
    switch (error.code) {
      case 'auth/wrong-password':
        return 'Your password is incorrect!'
      case 'auth/user-not-found':
        return 'The user is not in our database!' 
      default:
        return 'Something went wrong with creating user. Try again later!'
    }
  }
}

export function logout() {
  return signOut(auth)
}