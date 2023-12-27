import React,{useState} from 'react'

export const Updatedata = React.createContext(null)

function UpdateContext({children}) {

    const [data, setdata] = useState({
        userId: "",
        update: "",
      });

  return (
    <Updatedata.Provider value={{data, setdata}}>
      {children}
    </Updatedata.Provider>
  )
}

export default UpdateContext