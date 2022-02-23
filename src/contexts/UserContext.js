import React, { useContext, useEffect, useState } from 'react'
import { getUser } from '../services/database'
import { useAuth } from './AuthContext'

const UserContext = React.createContext()

export function useUser() {
  return useContext(UserContext)
}

export function UserProvider({ children }) {
  const [userData, setUserData] = useState()
  const user = useAuth()

  useEffect(() => {
    let mounted = true
    async function getUserData() {
      if (user !== null) {
        const data = await getUser(user.uid)
        if (mounted) {
          setUserData(data)
        }
      }
    }
    getUserData()
    return () => mounted = false
  }, [user])

  return (
    <UserContext.Provider value={userData}>
      {children}
    </UserContext.Provider>
  )
}