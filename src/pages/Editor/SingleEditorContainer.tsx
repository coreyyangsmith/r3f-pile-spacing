import { useTheme } from '@emotion/react'
import ChipContainer from './ChipContainer';
import { Stack, Typography } from '@mui/material';
import Divider from '../../components/Divider';
import DataComponent from './DataComponent';
import CTAButton from '../../components/Buttons/CTAButton';
import TertiaryButton from '../../components/Buttons/TertiaryButton';
import PrimaryButton from '../../components/Buttons/PrimaryButton';

const SingleEditorContainer = () => {
    const theme = useTheme();

    return (
        <div
            style={{
                width: "350px",
                borderRadius: "25px",
                backgroundColor: theme.palette.mixed2.main,
                padding: "24px 16px 24px 16px"
            }}
        >
            <ChipContainer />
            <Divider />
            <Typography variant="body1" sx={{
                color: 'white',
            }}>
                Group Pile Settings
            </Typography>

            {/* Form Info */}
            <DataComponent value='8' unit="ea" text="piles in design" />
            <DataComponent value='10' unit="m" text="length" />
            <DataComponent value='235' unit="cm" text="diameter" />
            <DataComponent value='5' unit="degrees" text="batter angle" />
            <DataComponent value='1.50' unit="m" text="spacing radius" />

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

export default SingleEditorContainer