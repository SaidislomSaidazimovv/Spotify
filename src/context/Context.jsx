import React, { createContext, useState } from 'react'

export const Context = createContext()

function MainContext({children}) {
    const [play, setPlay] = useState()
    const [playing, setPlaying] = useState(false)
  return (
    <Context.Provider value={{play, playing, setPlaying, setPlay}}>{children}</Context.Provider>
  )
}

export default MainContext