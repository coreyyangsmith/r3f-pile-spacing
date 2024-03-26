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
import { useEffect, useState } from 'react';
import { useHelices } from '../../hooks/useHelices';
import { usePiles } from '../../hooks/usePiles';
import { getHelixObjectFromPileId } from '../../utils/PileUtils';
import { HelixContextState } from '../../types/Helix';

const HelixSingleEditorContainer = () => {
    const theme = useTheme();
    const selection = useSelection();
    const helices = useHelices()
    const piles = usePiles()

    const [thickness, setThickness] = useState(selection?.state.selection.selectedHelix?.thickness)
    const [diameter, setDiameter] = useState(selection?.state.selection.selectedHelix?.diameter)
    const [rise, setRise] = useState(selection?.state.selection.selectedHelix?.rise)
    const [rotations, setRotations] = useState(selection?.state.selection.selectedHelix?.rotations)
    const [segments, setSegments] = useState(selection?.state.selection.selectedHelix?.segsPerStep)


    /**
     * Update State when HelixSelection Changes
     */
    useEffect(() => {
        setThickness(selection?.state.selection.selectedHelix?.thickness)
        setDiameter(selection?.state.selection.selectedHelix?.diameter)
        setRise(selection?.state.selection.selectedHelix?.rise)
        setRotations(selection?.state.selection.selectedHelix?.rotations)
        setSegments(selection?.state.selection.selectedHelix?.segsPerStep)
    }, [selection?.state.selection.selectedHelix])

    /**
     * Update Pile and Helix Context when State Changes
     */
    useEffect(() => {
        if (selection?.state.selection.selectedPile && selection?.state.selection.selectedHelix) {
            const newHelix = getHelixObjectFromPileId(helices?.state.helices, selection?.state.selection.selectedPile.id)[0]

            // Update Helix Context
            for (let i = 0; i < newHelix.helices.length; i++) {
                if (newHelix.helices[i].id == selection?.state.selection.selectedHelix.id) {
                    newHelix.helices[i].thickness = thickness;
                    newHelix.helices[i].diameter = diameter;
                    newHelix.helices[i].rise = rise;
                    newHelix.helices[i].rotations = rotations;
                    newHelix.helices[i].segsPerStep = segments
                }
            }

            // Set Helices Context
            const newHelices = helices?.state.helices
            for (let i = 0; i < newHelices?.length; i++) {
                if (newHelices[i].pileRef.id == selection?.state.selection.selectedPile.id) {
                    newHelices[i] = newHelix;
                }
            }

            helices?.setState({ helices: newHelices } as HelixContextState)

            // Update Pile Context


        }

    }, [
        thickness,
        diameter,
        rise,
        rotations,
        segments
    ])

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
            <HelixSelectionChipContainer />
            <Divider />

            <div style={{
                display: 'flex',
                flexGrow: '1',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}>
                {/* Conditional Form Info */}
                {selection?.state.selection.selectedHelix ?
                    <>
                        <DataComponent
                            value={thickness}
                            setter={setThickness}
                            step={1}
                            precision={2}
                            unit="cm"
                            text="thickness"
                            style='unlocked'
                        />
                        <DataComponent
                            value={diameter}
                            setter={setDiameter}
                            step={1}
                            precision={2}
                            unit="m"
                            text="diameter"
                            style='unlocked' />
                        <DataComponent
                            value={rise}
                            setter={setRise}
                            step={1}
                            precision={2}
                            unit="m"
                            text="rise"
                            style='unlocked'
                        />
                        <DataComponent
                            value={rotations}
                            setter={setRotations}
                            step={1}
                            precision={2}
                            unit="ea"
                            text="rotations"
                            style='unlocked'
                        />
                        <DataComponent
                            value={segments}
                            setter={setSegments}
                            step={16}
                            precision={0}
                            unit="ea"
                            text="segments per step"
                            style='unlocked' />
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
                        No Helix Selected
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

export default HelixSingleEditorContainer