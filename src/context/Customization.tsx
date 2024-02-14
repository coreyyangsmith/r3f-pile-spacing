import { createContext, useState, useContext } from 'react';

const CustomizationContext = createContext({});

export const CustomizationProvider = (props) => {
    const [length, setLength] = useState(10);
    const [diameter, setDiameter] = useState(1);

    return <CustomizationContext.Provider value={{
        length,
        setLength,
        diameter,
        setDiameter
    }}>
        {props.children}
    </CustomizationContext.Provider>
}

export const useCustomization = () => {
    const context = useContext(CustomizationContext)
    return context;
}