import React from 'react'
import { useState } from 'react'

export const serviceData = React.createContext(null)

function ServiceContext({children}) {

    let [data, setData] = useState({
        id: "",
        brand: "",
        model: "",
        manufactureyear: "",
        servicetype: "",
      });

  return (
    <serviceData.Provider value={{data, setData}}>
      {children}
    </serviceData.Provider>
  )
}

export default ServiceContext