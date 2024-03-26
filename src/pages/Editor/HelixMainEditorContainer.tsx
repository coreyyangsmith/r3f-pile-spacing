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
import { useHelices } from '../../hooks/useHelices';
import { getHelixObjectFromPileId, getPileObjectFromPileId } from '../../utils/PileUtils';
import { HelixContextState } from '../../types/Helix';
import { usePiles } from '../../hooks/usePiles';
import { PileContextState } from '../../types/Pile';

const HelixMainEditorContainer = () => {
    const selection = useSelection();
    const helices = useHelices();
    const piles = usePiles()

    const [number, setNumber] = useState(0);
    const [diameter, setDiameter] = useState(0);
    const [firstDist, setFirstDist] = useState(0);
    const [spacing, setSpacing] = useState(0);

    /**
     * Update State when PileSelection Changes
     */
    useEffect(() => {
        if (selection?.state.selection.selectedPile) {
            const oldHelix = getHelixObjectFromPileId(helices?.state.helices, selection?.state.selection.selectedPile.id)[0]
            setNumber(oldHelix.helices.length);
            setDiameter(oldHelix.helices[0].diameter);
            setFirstDist(oldHelix.distanceFromBottom);
            setSpacing(oldHelix.spacing);
        } else {
            setNumber(0)
            setDiameter(0)
            setFirstDist(0)
            setSpacing(0)
        }
    }, [selection?.state.selection.selectedPile])

    /**
     * Update Pile and Helix Context when State Changes
     */
    useEffect(() => {
        if (selection?.state.selection.selectedPile) {
            const newHelix = getHelixObjectFromPileId(helices?.state.helices, selection?.state.selection.selectedPile.id)[0]

            // Update Helix Context
            if (number > newHelix.helices.length) newHelix.addNewHelix()
            else if (number < newHelix.helices.length) newHelix.removeLastHelix()

            for (let i = 0; i < newHelix.helices.length; i++) {
                newHelix.helices[i].diameter = diameter;
            }

            newHelix.spacing = spacing;
            newHelix.distanceFromBottom = firstDist;

            // Set Helices Context
            const newHelices = helices?.state.helices
            for (let i = 0; i < newHelices?.length; i++) {
                if (newHelices[i].pileRef.id == selection?.state.selection.selectedPile.id) {
                    newHelices[i] = newHelix;
                }
            }

            helices?.setState({ helices: newHelices } as HelixContextState)

            // Update Pile Context
            const newPile = getPileObjectFromPileId(piles?.state.piles, selection?.state.selection.selectedPile.id)
            newPile.helices = newHelix;

            const newPiles = piles?.state.piles;
            for (let i = 0; i < newPiles?.piles.length; i++) {
                if (newPiles.piles[i].id == selection?.state.selection.selectedPile.id) {
                    newPiles.piles[i] = newPile
                }
            }
            piles?.setState({ piles: newPiles } as PileContextState)
        }
    }, [
        number,
        diameter,
        firstDist,
        spacing
    ])

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
                            style='unlocked'
                        />
                        <DataComponent
                            value={diameter}
                            setter={setDiameter}
                            step={0.25}
                            precision={2}
                            unit="m"
                            text="diameter"
                            style='unlocked'
                        />
                        <DataComponent
                            value={firstDist}
                            setter={setFirstDist}
                            step={0.25}
                            precision={2}
                            unit="m"
                            text="first dist from bottom"
                            style='unlocked'
                        />
                        <DataComponent
                            value={spacing}
                            setter={setSpacing}
                            step={0.25}
                            precision={2}
                            unit="m"
                            text="spacing between"
                            style='unlocked'
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