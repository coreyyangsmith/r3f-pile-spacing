import { Stack, Typography } from '@mui/material';
import { useState } from 'react'
import Divider from '../../../components/Divider';
import TertiaryButton from '../../../components/Buttons/TertiaryButton';
import PrimaryButton from '../../../components/Buttons/PrimaryButton';
import SelectionChipContainer from './SelectionChipContainer';
import { mixed1, mixed2 } from '../../../themes/Color';
import DataComponent from '../components/DataComponent';
import ConflictPileSelectionChipContainer from './ConflictPileSelectionChipContainer';
import Table from "../../../components/Tables/Table.tsx"

const ConflictMainEditorContainer = () => {
    const [firstPile, setFirstPile] = useState();
    const [secondPile, setSecondPile] = useState();
    const [calcDiameter, setCalcDiameter] = useState(2.5);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: "350px",
                borderRadius: "25px",
                backgroundColor: mixed2,
                padding: "24px 16px 24px 16px",
                height: "100%",
            }}
        >
            <SelectionChipContainer />
            {/* Form Info */}
            <div style={{ height: '16px' }} />
            <ConflictPileSelectionChipContainer
                value={firstPile}
                setter={setFirstPile}
            />

            <div style={{ height: '16px' }} />
            <ConflictPileSelectionChipContainer
                value={secondPile}
                setter={setSecondPile}
            />
            <Divider />
            <Typography variant="body1" sx={{
                color: 'white',
            }}>
                Conflict Settings
            </Typography>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
            }}>
                <DataComponent
                    value={calcDiameter}
                    setter={setCalcDiameter}
                    step={0.25}
                    precision={2}
                    unit="x"
                    text="helix diameter"
                    style="unlocked" />
            </div>

            <Divider />
            <Typography variant="body1" sx={{
                color: 'white',
            }}>
                Calculation
            </Typography>

            {/* Table Container */}
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                flexGrow: 1,
                background: mixed1,
                borderRadius: '25px',
                height: '500px',
            }}>
                <Table />
            </div>

            <Divider />
            {/* Button Container */}
            <Stack
                direction="row"
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                }}>
                <TertiaryButton text="Export Design to CSV" onClick={() => console.log("Export Design to CSV")} />
            </Stack>

        </div>
    )
}

export default ConflictMainEditorContainer