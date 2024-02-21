import { createContext, useState, useContext } from 'react'

const SettingsContext = createContext({})

export const SettingsProvider = (props) => {

    {/* Settings Information */ }
    const [backgroundColor, setBackgroundColor] = useState('#0B2847')
    const [useAxesHelper, setUseAxesHelper] = useState(true)

    return <SettingsContext.Provider value={{
        backgroundColor,
        setBackgroundColor,
        useAxesHelper,
        setUseAxesHelper
    }}>
        {props.children}
    </SettingsContext.Provider>
}

export const useSettings = () => {
    const context = useContext(SettingsContext)
    return context;
}
