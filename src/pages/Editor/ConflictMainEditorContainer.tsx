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
import PileSelectionChipContainer from './PileSelectionChipContainer';

const ConflictMainEditorContainer = () => {
    const theme = useTheme();

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
                Conflict Settings
            </Typography>

            {/* Form Info */}
            <div style={{ height: '16px' }} />
            <PileSelectionChipContainer />
            <div style={{ height: '16px' }} />
            <PileSelectionChipContainer />

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
            }}>
                {/* Conflcit Info Here*/}
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

export default ConflictMainEditorContainer