import React, { useContext, useEffect, useState } from 'react'
import { getUser } from '../services/database'
import { useAuth } from './AuthContext'

const UserContext = React.createContext()

export function useUser() {
  return useContext(UserContext)
}

export function UserProvider({ children }) {
  const [user, setUser] = useState()
  const userAuth = useAuth()

  useEffect(() => {
    let isMounted = true
    async function getUserData() {
      if (userAuth?.uid) {
        const data = await getUser(userAuth.uid)
        if (isMounted) {
          setUser(data)
        }
      }
    }
    getUserData()
    return () => isMounted = false
  }, [userAuth?.uid])


  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  )
}