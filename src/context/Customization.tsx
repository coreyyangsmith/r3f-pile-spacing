import { createContext, useState, useContext } from 'react';

const CustomizationContext = createContext({});

export const CustomizationProvider = (props) => {
    const [length, setLength] = useState(10);
    const [diameter, setDiameter] = useState(1);
    const [number, setNumber] = useState(1);
    const [radius, setRadius] = useState(1);

    return <CustomizationContext.Provider value={{
        length,
        setLength,
        diameter,
        setDiameter,
        number,
        setNumber,
        radius,
        setRadius
    }}>
        {props.children}
    </CustomizationContext.Provider>
}

export const useCustomization = () => {
    const context = useContext(CustomizationContext)
    return context;
}