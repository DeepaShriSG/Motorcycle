import { useState } from 'react'
import React from 'react'

export const ProfileData = React.createContext(null)

function ProfileContext({children}) {

    const [initialValues,setInitialValues] = useState({
        name:"",
        email:"",
        phonenumber:"",
       
      })

  return (
    <ProfileData.Provider value={{initialValues,setInitialValues}}>
    {children}
    </ProfileData.Provider>
  )
}

export default ProfileContext