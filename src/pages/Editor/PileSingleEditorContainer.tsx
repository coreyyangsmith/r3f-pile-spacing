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
import { useEffect, useRef, useState } from 'react';
import { getPileObjectFromPileId } from '../../utils/PileUtils';
import PositionDataComponentTest from './PositionDataComponentTest';

const PileSingleEditorContainer = () => {
    const theme = useTheme();
    const selection = useSelection();
    const settings = useSettings();

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

    useEffect(() => {
        console.log('new pile selected')
    }, [selectedPile])

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
                                step={0.25}
                                precision={2}
                                text="Y"
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