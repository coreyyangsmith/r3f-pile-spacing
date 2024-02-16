import React from 'react'
import Helix from './Helix'

// Purpose of this class is to handle the claculation regarding positioning each helix on a pile
// After such calculations, it will generate a number of helices appropriate

const Helices = (props) => {

    const generateHelices = (position,
        pileDiameter,
        pileLength,
        numHelices,
        firstHelixDistFromBottom,
        helixSpacing,
        helixDiameter) => {

        // Check NumHelices > 0
        if (numHelices === 0) return (<></>)

        return Array.from({ length: numHelices }, (_, i) => {
            let position = [
                0,
                props.position[1] + -pileLength / 2 + firstHelixDistFromBottom + i * helixSpacing,
                0];
            return <Helix key={i} position={position} diameter={pileDiameter} helixDiameter={helixDiameter} />;
        });


    }

    return (
        <>
            {generateHelices(
                props.position,
                props.diameter,
                props.length,
                props.numHelices,
                props.firstHelixDistFromBottom,
                props.helixSpacing,
                props.helixDiameter)}
        </>
    )
}

export default Helices