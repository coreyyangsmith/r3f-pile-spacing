import { useTheme } from '@emotion/react'
import ChipContainer from './SelectionChipContainer';
import { Stack, Typography } from '@mui/material';
import Divider from '../../components/Divider';
import DataComponent from './DataComponent';
import CTAButton from '../../components/Buttons/CTAButton';
import TertiaryButton from '../../components/Buttons/TertiaryButton';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import SelectionChipContainer from './SelectionChipContainer';
import PileSelectionChipContainer from './PileSelectionChipContainer';
import { useSelection } from '../../hooks/useSelection';

const HelixMainEditorContainer = () => {
    const theme = useTheme();
    const selection = useSelection();

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
                        <DataComponent value='8' unit="ea" text="helices in design" />
                        <DataComponent value='1.25' unit="m" text="diameter" />
                        <DataComponent value='0.50' unit="m" text="first dist from bottom" />
                        <DataComponent value='2.50' unit="m" text="spacing between" />
                    </> :
                    <Typography variant='body1'
                        style={{
                            display: 'flex',
                            height: '100%',
                            color: theme.palette.primary6.main,
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