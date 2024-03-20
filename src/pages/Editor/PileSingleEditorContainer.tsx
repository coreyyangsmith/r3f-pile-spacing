import { useTheme } from '@emotion/react'
import { Stack, Typography } from '@mui/material';
import Divider from '../../components/Divider';
import DataComponent from './DataComponent';
import TertiaryButton from '../../components/Buttons/TertiaryButton';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import PileSelectionChipContainer from './PileSelectionChipContainer';
import PositionDataComponent from './PositionDataComponent';
import { useSelection } from '../../hooks/useSelection';

const PileSingleEditorContainer = () => {
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
                            <PositionDataComponent text="X" value="1.00" />
                            <PositionDataComponent text="Y" value="1.00" />
                            <PositionDataComponent text="Z" value="1.00" />
                        </Stack>
                        <DataComponent value='0' unit="deg" text="rotation" />
                        <DataComponent value='10' unit="m" text="length" />
                        <DataComponent value='235' unit="cm" text="diameter" />
                        <DataComponent value='5' unit="degrees" text="batter angle" />
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