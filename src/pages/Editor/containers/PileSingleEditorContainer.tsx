import { useTheme } from '@emotion/react'
import { Stack, Typography } from '@mui/material';
import Divider from '../../../components/Divider';
import DataComponent from '../components/DataComponent';
import TertiaryButton from '../../../components/Buttons/TertiaryButton';
import PrimaryButton from '../../../components/Buttons/PrimaryButton';
import PileSelectionChipContainer from './PileSelectionChipContainer';
import PositionDataComponent from '../components/PositionDataComponent';
import { useSelection } from '../../../hooks/useSelection';
import { useSettings } from '../../../hooks/useSettings';
import { useEffect, useState } from 'react';
import { usePiles } from '../../../hooks/usePiles';
import { Pile, Piles } from '../../../components/Pile';
import { PileContextState } from '../../../types/Pile';
import { mixed2 } from '../../../themes/Color';

const PileSingleEditorContainer = () => {
    const theme = useTheme();
    const selection = useSelection();
    const settings = useSettings();
    const piles = usePiles();

    const selectedPile = selection?.state.selection.selectedPile


    const [xPos, setXPos] = useState(selectedPile?.x);
    const [yPos, setYPos] = useState(selectedPile?.y);
    const [zPos, setZPos] = useState(selectedPile?.z);
    const [rotation, setRotation] = useState(selectedPile?.rotation);
    const [length, setLength] = useState(selectedPile?.length);
    const [diameter, setDiameter] = useState(selectedPile?.diameter);
    const [batterAngle, setBatterAngle] = useState(selectedPile?.batterAngle);

    // Individual pile settings edtiable when lockPiles = False
    const style = settings?.state.settings.lockPiles ? 'locked' : 'unlocked';

    /**
     * Update States when PileSelection Changes
     */
    useEffect(() => {
        setXPos(selectedPile?.x);
        setYPos(selectedPile?.y);
        setZPos(selectedPile?.z);
        setRotation(selectedPile?.rotation);
        setLength(selectedPile?.length);
        setDiameter(selectedPile?.diameter);
        setBatterAngle(selectedPile?.batterAngle);
    }, [selectedPile])

    /**
     * Update Pile Context when State Changes
     */
    useEffect(() => {
        // Get New Pile Array
        const newPileArray: Pile[] = [];

        for (let i = 0; i < piles!.state.piles.number; i++) {
            let newPile: Pile;
            if (i === selection?.state.selection.selectedPile?.id) {
                newPile = new Pile(
                    i,
                    length,
                    diameter,
                    batterAngle,
                    null,
                    xPos,
                    yPos,
                    zPos,
                    rotation
                )
            } else {
                newPile = new Pile(
                    i,
                    piles?.state.piles.piles[i].length,
                    piles?.state.piles.piles[i].diameter,
                    piles?.state.piles.piles[i].batterAngle,
                    null,
                    piles?.state.piles.piles[i].x,
                    piles?.state.piles.piles[i].y,
                    piles?.state.piles.piles[i].z,
                    piles?.state.piles.piles[i].rotation,
                )
            }
            newPileArray.push(newPile)
        }

        // Update Piles
        const newPiles: Piles = {
            piles: newPileArray,
            number: piles?.state.piles.number as number,
            spacingRadius: piles?.state.piles.spacingRadius as number,

            addPile: () => { },
            removePile: () => { },
        }
        piles!.setState({ piles: newPiles } as PileContextState)
    }, [
        xPos,
        yPos,
        zPos,
        rotation,
        length,
        diameter,
        batterAngle
    ])

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: "350px",
                borderRadius: "25px",
                backgroundColor: mixed2,
                padding: "24px 16px 24px 16px",
                height: "50%"
            }}
        >

            <PileSelectionChipContainer />
            <Divider />
            {/* Conditional Form Info */}
            <div
                style={{
                    display: 'flex',
                    flexGrow: '1',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}>
                {selection?.state.selection.selectedPile ?
                    <>
                        <Stack direction="row"
                            sx={{
                                marginBottom: '16px',
                            }}>
                            <PositionDataComponent
                                value={xPos}
                                setter={setXPos}
                                step={0.25}
                                precision={2}
                                text="X"
                                style={style} />
                            <PositionDataComponent
                                value={yPos}
                                setter={setYPos}
                                step={0.25}
                                precision={2}
                                text="Y"
                                style={style} />
                            <PositionDataComponent
                                value={zPos}
                                setter={setZPos}
                                step={0.25}
                                precision={2}
                                text="Z"
                                style={style} />
                        </Stack>
                        <DataComponent
                            value={rotation}
                            setter={setRotation}
                            step={2}
                            precision={2}
                            unit="deg"
                            text="rotation"
                            style={style}
                        />
                        <DataComponent
                            value={length}
                            setter={setLength}
                            step={2}
                            precision={2}
                            unit="m"
                            text="length"
                            style={style}
                        />
                        <DataComponent
                            value={diameter}
                            setter={setDiameter}
                            step={2}
                            precision={2}
                            unit="cm"
                            text="diameter"
                            style={style}
                        />
                        <DataComponent
                            value={batterAngle}
                            setter={setBatterAngle}
                            step={2}
                            precision={2}
                            unit="degrees"
                            text="batter angle"
                            style={style}
                        />
                    </>
                    :
                    <Typography variant='body1'
                        style={{
                            display: 'flex',
                            height: '100%',
                            color: theme.palette.primary6.main,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        No Pile Selected
                    </Typography>
                }

            </div>

            <Divider />

            {/* Button Container */}
            <Stack
                direction="row"
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginLeft: "16px",
                    marginRight: '16px',
                }}>
                <PrimaryButton text="Save" size="small" onClick={() => console.log("Save")} />
                <TertiaryButton text="Cancel" onClick={() => console.log("Cancel")} />
            </Stack>

        </div >
    )
}

export default PileSingleEditorContainer