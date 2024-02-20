import { createContext, useState, useContext } from 'react'

const SettingsContext = createContext({})

export const SettingsProvider = (props) => {

    {/* Settings Information */ }
    const [backgroundColor, setBackgroundColor] = useState('#0B2847')

    return <SettingsContext.Provider value={{
        backgroundColor,
        setBackgroundColor
    }}>
        {props.children}
    </SettingsContext.Provider>
}

export const useSettings = () => {
    const context = useContext(SettingsContext)
    return context;
}
