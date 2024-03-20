import { useTheme } from '@emotion/react'
import { Stack, Typography } from '@mui/material';
import Divider from '../../components/Divider';
import DataComponent from './DataComponent';
import TertiaryButton from '../../components/Buttons/TertiaryButton';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import PileSelectionChipContainer from './PileSelectionChipContainer';
import PositionDataComponent from './PositionDataComponent';
import { useSelection } from '../../hooks/useSelection';
import HelixSelectionChipContainer from './HelixSelectionChipContainer';

const HelixSingleEditorContainer = () => {
    const theme = useTheme();
    const selection = useSelection();

    return (
        <div
            style={{
                width: "350px",
                borderRadius: "25px",
                backgroundColor: theme.palette.mixed2.main,
                padding: "24px 16px 24px 16px",
            }}
        >
            <HelixSelectionChipContainer />
            <Divider />

            {/* Conditional Form Info */}
            {selection?.state.selection.selectedHelix ?
                <>
                    <DataComponent value='25' unit="cm" text="thickness" />
                    <DataComponent value='1.25' unit="m" text="diameter" />
                    <DataComponent value='1.00' unit="m" text="rise" />
                    <DataComponent value='1.00' unit="ea" text="rotations" />
                    <DataComponent value='128' unit="ea" text="segments per step" />
                </>
                :
                <Typography variant='body1'
                    style={{
                        color: theme.palette.primary6.main,
                        textAlign: 'center',
                    }}>
                    No Helix Selected
                </Typography>
            }
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

export default HelixSingleEditorContainer