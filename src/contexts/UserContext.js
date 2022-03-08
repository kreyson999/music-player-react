import { doc, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../firebase'
import { useAuth } from './AuthContext'

const UserContext = React.createContext()

export function useUser() {
  return useContext(UserContext)
}

export function UserProvider({ children }) {
  const userAuth = useAuth()
  const [user, setUser] = useState(null)
  const [shouldRerender, setShouldRerender] = useState(false)

  useEffect(() => {
    let unsub = null
    if (userAuth?.uid) {
      unsub = onSnapshot(doc(db, "users", userAuth.uid), (doc) => {
        setUser({...doc.data(), uid: userAuth.uid})
      })
    }

    return unsub
  }, [userAuth?.uid])

  const forceRerender = () => {
    setShouldRerender(state => !state)
  }

  return (
    <UserContext.Provider value={{...user, forceRerender, shouldRerender}}>
      {children}
    </UserContext.Provider>
  )
}