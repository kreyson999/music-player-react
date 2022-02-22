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
    async function getUserData() {
      if (user !== undefined) {
        const data = await getUser(user.uid)
        console.log(data)
        setUserData(data)
      }
    }
    getUserData()
  }, [user])

  return (
    <UserContext.Provider value={userData}>
      {children}
    </UserContext.Provider>
  )
}