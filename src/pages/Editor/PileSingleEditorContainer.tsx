import { useTheme } from '@emotion/react'
import { Stack, Typography } from '@mui/material';
import Divider from '../../components/Divider';
import DataComponent from './DataComponent';
import TertiaryButton from '../../components/Buttons/TertiaryButton';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import PileSelectionChipContainer from './PileSelectionChipContainer';
import PositionDataComponent from './PositionDataComponent';
import { useSelection } from '../../hooks/useSelection';
import { useSettings } from '../../hooks/useSettings';
import { useEffect, useState } from 'react';
import { getPileObjectFromPileId } from '../../utils/PileUtils';

const PileSingleEditorContainer = () => {
    const theme = useTheme();
    const selection = useSelection();
    const settings = useSettings();

    const selectedPile = selection?.state.selection.selectedPile
    console.log(selectedPile)

    const [xPos, setXPos] = useState(selectedPile?.x as number);
    const [yPos, setYPos] = useState(selectedPile?.y as number);
    const [zPos, setZPos] = useState(selectedPile?.z as number);
    const [rotation, setRotation] = useState(selectedPile?.rotation as number);
    const [length, setLength] = useState(selectedPile?.length as number);
    const [diameter, setDiameter] = useState(selectedPile?.diameter as number);
    const [batterAngle, setBatterAngle] = useState(selectedPile?.batterAngle as number);

    // Individual pile settings edtiable when lockPiles = False
    const style = settings?.state.settings.lockPiles ? 'locked' : 'unlocked';

    useEffect(() => {

    }, [])

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: "350px",
                borderRadius: "25px",
                backgroundColor: theme.palette.mixed2.main,
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
                                text="X"
                                style={style} />
                            <PositionDataComponent
                                value={yPos}
                                setter={setYPos}
                                text="Y"
                                style={style} />
                            <PositionDataComponent
                                value={zPos}
                                setter={setZPos}
                                text="Z"
                                style={style} />
                        </Stack>
                        <DataComponent
                            value={rotation}
                            setter={setRotation}
                            unit="deg"
                            text="rotation"
                            style={style}
                        />
                        <DataComponent
                            value={length}
                            setter={setLength}
                            unit="m"
                            text="length"
                            style={style}
                        />
                        <DataComponent
                            value={diameter}
                            setter={setDiameter}
                            unit="cm"
                            text="diameter"
                            style={style}
                        />
                        <DataComponent
                            value={batterAngle}
                            setter={setBatterAngle}
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