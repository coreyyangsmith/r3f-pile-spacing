/*
Date: 2024-02-26
Author: Corey Yang-Smith
File: CardinalPositionConfig.ts
Type: Data Component

Description:
This is a Data Component for individual Pile Objects.
It configures the position for specific Piles.
*/

// Imports
import { Stack, TextField, Typography } from "@mui/material"
import { ChangeEvent } from "react"

// Components
import { Pile, Piles } from "../../../../components/Pile"

// Context
import { usePiles } from "../../../../hooks/usePiles"
import { useSettings } from "../../../../hooks/useSettings"
import { useSelection } from "../../../../hooks/useSelection"
import { PileContextState } from "../../../../types/Pile"
import { getPileObjectFromPileId } from "../../../../utils/PileUtils"

// Types
type props = {
    text: string,
}

const CardinalPositionConfig = (props: props) => {

    const piles = usePiles()
    const selection = useSelection();
    const settings = useSettings()

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newPosPoint = parseFloat(event.target.value);
        if (newPosPoint !== undefined && piles?.state.piles && settings?.state.settings) {
            if (settings.state.settings.lockPiles) return

            const newPosition = [
                selection?.state.selection.selectedPile?.x,
                selection?.state.selection.selectedPile?.y,
                selection?.state.selection.selectedPile?.z
            ]

            const newPileArray: Pile[] = [];

            if (props.text === 'X') newPosition[0] = newPosPoint;
            else if (props.text === 'Y') newPosition[1] = newPosPoint;
            else if (props.text === 'Z') newPosition[2] = newPosPoint;

            for (let i = 0; i < piles?.state.piles.number; i++) {
                let newPile: Pile;
                if (i === selection?.state.selection.selectedPile?.id) {
                    newPile = new Pile(
                        i,
                        piles.state.piles.piles[i].length,
                        piles.state.piles.piles[i].diameter,
                        piles.state.piles.piles[i].batterAngle,
                        null,
                        newPosition[0],
                        newPosition[1],
                        newPosition[2],
                        piles.state.piles.piles[i].rotation,
                    )
                } else {
                    newPile = new Pile(
                        i,
                        piles.state.piles.piles[i].length,
                        piles.state.piles.piles[i].diameter,
                        piles.state.piles.piles[i].batterAngle,
                        null,
                        piles.state.piles.piles[i].x,
                        piles.state.piles.piles[i].y,
                        piles.state.piles.piles[i].z,
                        piles.state.piles.piles[i].rotation,
                    );
                }
                newPileArray.push(newPile);
            }

            // Update Piles
            const newPiles: Piles = {
                piles: newPileArray,
                number: piles.state.piles.number,
                spacingRadius: piles.state.piles.spacingRadius,

                addPile: () => { },
                removePile: () => { }
            }
            piles.setState({ piles: newPiles } as PileContextState)

            // Update Selection
            const selectedPileId = selection!.state.selection.selectedPile?.id as number;
            const newSelectedPile = getPileObjectFromPileId(newPiles, selectedPileId);
            selection!.setState({
                selection: {
                    selectedPile: newSelectedPile,
                    selectedHelix: null,
                }
            });


        }
    }

    const getPilePosition = (text: string) => {
        let position: number | string;

        if (selection?.state.selection.selectedPile) {
            if (text === 'X') position = selection.state.selection.selectedPile.x
            else if (text === 'Y') position = selection.state.selection.selectedPile.y
            else if (text === 'Z') position = selection.state.selection.selectedPile.z
            else position = '';

            position = position.toFixed(2);

            return position;
        }
        else return '';
    }

    return (
        <Stack direction='row'>
            <Typography sx={{ paddingRight: '16px' }}>{props.text}</Typography>
            <TextField
                type='number'
                variant="standard"
                value={getPilePosition(props.text)}
                onChange={handleChange} />
        </Stack>
    )
}
export default CardinalPositionConfig