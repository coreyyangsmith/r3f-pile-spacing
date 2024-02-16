import { createContext, useState, useContext } from 'react';

const CustomizationContext = createContext({});

export const CustomizationProvider = (props) => {
    {/* Pile Information */ }
    const [length, setLength] = useState(10);
    const [diameter, setDiameter] = useState(1);
    const [number, setNumber] = useState(1);
    const [radius, setRadius] = useState(1);
    const [batterAngle, setBatterAngle] = useState(5);

    {/* Helix Information */ }
    const [numHelices, setNumHelices] = useState(2);
    const [firstHelixDistFromBottom, setFirstHelixDistFromBottom] = useState(1);
    const [helixSpacing, setHelixSpacing] = useState(1);
    const [helixDiameter, setHelixDiameter] = useState(1);



    return <CustomizationContext.Provider value={{
        length,
        setLength,
        diameter,
        setDiameter,
        number,
        setNumber,
        radius,
        setRadius,
        batterAngle,
        setBatterAngle,
        numHelices,
        setNumHelices,
        firstHelixDistFromBottom,
        setFirstHelixDistFromBottom,
        helixSpacing,
        setHelixSpacing,
        helixDiameter,
        setHelixDiameter,
    }}>
        {props.children}
    </CustomizationContext.Provider>
}

export const useCustomization = () => {
    const context = useContext(CustomizationContext)
    return context;
}