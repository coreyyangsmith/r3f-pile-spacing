import { useTheme } from '@emotion/react'
import ChipContainer from './SelectionChipContainer';
import { Stack, Typography } from '@mui/material';
import Divider from '../../components/Divider';
import DataComponent from './DataComponent';
import CTAButton from '../../components/Buttons/CTAButton';
import TertiaryButton from '../../components/Buttons/TertiaryButton';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import SelectionChipContainer from './SelectionChipContainer';
import CheckboxComponent from './CheckboxComponent';
import { useSettings } from '../../hooks/useSettings';
import BackgroundColor from '../PileSpacing/SettingsConfig/BackgroundColor';
import ColorComponent from './ColorComponent';
import { useEffect, useState } from 'react';

const SettingsMainEditorContainer = () => {
    const theme = useTheme();
    const settings = useSettings();

    const [lockPiles, setLockPiles] = useState(settings?.state.settings.lockPiles)
    const [showFloor, setShowFloor] = useState(settings?.state.settings.showFloor)
    const [floorColor, setFloorColor] = useState(settings?.state.settings.floorColor)
    const [backgroundColor, setBackgroundColor] = useState(settings?.state.settings.backgroundColor)
    const [axesHelper, setAxesHelper] = useState(settings?.state.settings.axesHelper)
    const [pileAxesHelper, setPileAxesHelper] = useState(settings?.state.settings.pileAxesHelper)
    const [helixAxesHelper, setHelixAxesHelper] = useState(settings?.state.settings.helixAxesHelper)
    const [floorWireframe, setFloorWireframe] = useState(settings?.state.settings.floorWireframe)
    const [pileWireframe, setPileWireframe] = useState(settings?.state.settings.pileWireframe)
    const [helixWireframe, setHelixWireframe] = useState(settings?.state.settings.helixWireframe)

    useEffect(() => {
        settings?.setState({
            settings: {
                lockPiles: lockPiles,
                showFloor: showFloor,
                floorColor: floorColor,
                backgroundColor: backgroundColor,
                axesHelper: axesHelper,
                pileAxesHelper: pileAxesHelper,
                helixAxesHelper: helixAxesHelper,
                floorWireframe: floorWireframe,
                pileWireframe: pileWireframe,
                helixWireframe: helixWireframe,
            }
        })
    }, [lockPiles,
        showFloor,
        floorColor,
        backgroundColor,
        axesHelper,
        pileAxesHelper,
        helixAxesHelper,
        floorWireframe,
        pileWireframe,
        helixWireframe])

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: "350px",
                borderRadius: "25px",
                backgroundColor: theme.palette.mixed2.main,
                padding: "24px 16px 24px 16px",
                height: "100%",
            }}
        >
            <SelectionChipContainer />
            <Divider />
            <Typography variant="body1" sx={{
                color: 'white',
            }}>
                Scene Settings
            </Typography>

            {/* Form Info */}
            <CheckboxComponent
                value={lockPiles}
                setter={setLockPiles}
                text="Lock Piles" />
            <CheckboxComponent
                value={showFloor}
                setter={setShowFloor}
                text="Show Floor" />
            <ColorComponent
                value={floorColor}
                setter={setFloorColor}
                text="Floor Color" />
            <ColorComponent
                value={backgroundColor}
                setter={setBackgroundColor}
                text="Background Color" />

            <Typography variant="body1" sx={{
                color: 'white',
                marginTop: '16px'
            }}>
                Debug Settings
            </Typography>
            <CheckboxComponent
                value={axesHelper}
                setter={setAxesHelper}
                text="Show Floor Axes Helper" />
            <CheckboxComponent
                value={pileAxesHelper}
                setter={setPileAxesHelper}
                text="Show Pile Axes Helper" />
            <CheckboxComponent
                value={helixAxesHelper}
                setter={setHelixAxesHelper}
                text="Show Helix Axes Helper" />
            <CheckboxComponent
                value={floorWireframe}
                setter={setFloorWireframe}
                text="Show Floor Wireframe" />
            <CheckboxComponent
                value={pileWireframe}
                setter={setPileWireframe}
                text="Show Pile Wireframe" />
            <CheckboxComponent
                value={helixWireframe}
                setter={setHelixWireframe}
                text="Show Helix Wireframe" />
            <Divider />

            {/* Button Container */}
            {/* <Stack
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
            </Stack> */}

        </div>
    )
}

export default SettingsMainEditorContainer