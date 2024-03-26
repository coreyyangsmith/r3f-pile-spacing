import { useTheme } from '@emotion/react'
import { Stack, Typography } from '@mui/material';
import Divider from '../../components/Divider';
import DataComponent from './DataComponent';
import TertiaryButton from '../../components/Buttons/TertiaryButton';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import SelectionChipContainer from './SelectionChipContainer';
import { useEffect, useState } from 'react';
import { usePiles } from '../../hooks/usePiles';
import { useSettings } from '../../hooks/useSettings';
import { Pile, Piles } from '../../components/Pile';
import { PileContextState } from '../../types/Pile';
import { Helices } from '../../components/Helix';

const PileMainEditorContainer = () => {
    const theme = useTheme();
    const piles = usePiles();
    const settings = useSettings();

    // Group Settings editable when lockPiles = True
    const style = settings?.state.settings.lockPiles ? 'unlocked' : 'locked';

    const [count, setCount] = useState(piles?.state.piles.number);
    const [length, setLength] = useState(piles?.state.piles.piles[0].length);
    const [diameter, setDiameter] = useState(piles?.state.piles.piles[0].diameter);
    const [batterAngle, setBatterAngle] = useState(piles?.state.piles.piles[0].batterAngle);
    const [spacingRadius, setSpacingRadius] = useState(piles?.state.piles.spacingRadius);


    useEffect(() => {
        const newPileArray: Pile[] = [];

        const defaultHelices: Helices = {
            helices: [],
            distanceFromBottom: 1.25,
            spacing: 1,
            pileRef: null,
            addNewHelix: () => { },
            removeLastHelix: () => { },
        }

        for (let i = 0; i < count; i++) {
            const newPile = new Pile(
                i,
                length,
                diameter,
                batterAngle,
                null,
                0,
                0,
                0,
                0
            )
            defaultHelices.pileRef = newPile;
            newPile.helices = defaultHelices
            newPileArray.push(newPile)
        }

        const newPiles: Piles = {
            piles: newPileArray,
            number: count,
            spacingRadius: spacingRadius,

            addPile: () => { },
            removePile: () => { },
        }

        piles?.setState({ piles: newPiles } as PileContextState);

    }, [count,
        length,
        diameter,
        batterAngle,
        spacingRadius])

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: "350px",
                borderRadius: "25px",
                backgroundColor: theme.palette.mixed2.main,
                padding: "24px 16px 24px 16px",
                height: "50%",
            }}
        >
            <SelectionChipContainer />
            <Divider />
            <Typography variant="body1" sx={{
                color: 'white',
            }}>
                Group Pile Settings
            </Typography>

            {/* Form Info */}
            <div style={{
                display: 'flex',
                flexGrow: '1',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}>
                <DataComponent
                    value={count}
                    setter={setCount}
                    step={1}
                    precision={0}
                    style={style}
                    unit="ea"
                    text="piles in design" />
                <DataComponent
                    value={length}
                    setter={setLength}
                    step={0.25}
                    precision={2}
                    unit="m"
                    style={style}
                    text="length"
                />
                <DataComponent
                    value={diameter}
                    setter={setDiameter}
                    step={0.25}
                    precision={2}
                    unit="cm"
                    style={style}
                    text="diameter"
                />
                <DataComponent
                    value={batterAngle}
                    setter={setBatterAngle}
                    step={1}
                    precision={0}
                    unit="degrees"
                    style={style}
                    text="batter angle"
                />
                <DataComponent
                    value={spacingRadius}
                    setter={setSpacingRadius}
                    step={0.25}
                    precision={2}
                    unit="m"
                    style={style}
                    text="spacing radius" />
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

        </div>
    )
}

export default PileMainEditorContainer