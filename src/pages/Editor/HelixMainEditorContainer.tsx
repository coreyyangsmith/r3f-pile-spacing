import { Stack, Typography } from '@mui/material';
import Divider from '../../components/Divider';
import DataComponent from './DataComponent';
import TertiaryButton from '../../components/Buttons/TertiaryButton';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import SelectionChipContainer from './SelectionChipContainer';
import PileSelectionChipContainer from './PileSelectionChipContainer';
import { useSelection } from '../../hooks/useSelection';
import { mixed2, primary6 } from '../../themes/Color';
import { useEffect, useState } from 'react';

const HelixMainEditorContainer = () => {
    const selection = useSelection();
    const unlockedStyle = { color: primary6, }

    const [number, setNumber] = useState();
    const [diameter, setDiameter] = useState();
    const [firstDist, setFirstDist] = useState();
    const [spacing, setSpacing] = useState();

    useEffect(() => {
        if (selection?.state.selection.selectedPile) {
            const helixSettings = selection?.state.selection.selectedPile.helices;
            setNumber(selection.state.selection);
            setDiameter(1.25);
            setFirstDist(0.50);
            setSpacing(2.50);
        }
    }, [selection?.state.selection.selectedPile])

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: "350px",
                borderRadius: "25px",
                backgroundColor: mixed2,
                padding: "24px 16px 24px 16px",
                height: "50%",
            }}
        >
            <SelectionChipContainer />
            <div style={{ marginTop: '16px' }} />
            <PileSelectionChipContainer />
            <Divider />

            <div style={{
                display: 'flex',
                flexGrow: '1',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}>
                {selection?.state.selection.selectedPile ?
                    <>
                        <Typography variant='body1'
                            style={{
                                color: 'white',
                            }}>
                            Group Helix Settings
                        </Typography>

                        {/* Form Info */}
                        <DataComponent
                            value={number}
                            setter={setNumber}
                            step={1}
                            precision={0}
                            unit="ea"
                            text="helices in design"
                            style={unlockedStyle}
                        />
                        <DataComponent
                            value={diameter}
                            setter={setDiameter}
                            step={0.25}
                            precision={2}
                            unit="m"
                            text="diameter"
                            style={unlockedStyle}
                        />
                        <DataComponent
                            value={firstDist}
                            setter={setFirstDist}
                            step={0.25}
                            precision={2}
                            unit="m"
                            text="first dist from bottom"
                            style={unlockedStyle}
                        />
                        <DataComponent
                            value={spacing}
                            setter={setSpacing}
                            step={0.25}
                            precision={2}
                            unit="m"
                            text="spacing between"
                            style={unlockedStyle}
                        />
                    </> :
                    <Typography variant='body1'
                        style={{
                            display: 'flex',
                            height: '100%',
                            color: primary6,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        No Pile Selected
                    </Typography>}
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

export default HelixMainEditorContainer