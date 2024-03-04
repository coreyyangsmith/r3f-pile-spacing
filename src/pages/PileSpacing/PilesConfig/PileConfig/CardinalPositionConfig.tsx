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

// Types
type props = {
    text: string,
    selectedPile: number
}

const CardinalPositionConfig = (props: props) => {

    const piles = usePiles()
    const settings = useSettings()

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newPosPoint = parseFloat(event.target.value);
        if (newPosPoint !== undefined && piles?.piles && settings?.settings) {
            if (settings.settings.lockPiles) return

            const newPosition = [
                piles?.piles.piles[props.selectedPile].x,
                piles?.piles.piles[props.selectedPile].y,
                piles?.piles.piles[props.selectedPile].z
            ]

            const newPileArray: Pile[] = [];

            if (props.text === 'X') newPosition[0] = newPosPoint;
            else if (props.text === 'Y') newPosition[1] = newPosPoint;
            else if (props.text === 'Z') newPosition[2] = newPosPoint;

            for (let i = 0; i < piles?.piles.number; i++) {
                let newPile: Pile;
                if (i === props.selectedPile) {
                    newPile = new Pile(
                        i,
                        piles.piles.piles[i].length,
                        piles.piles.piles[i].diameter,
                        piles.piles.piles[i].batterAngle,
                        null,
                        newPosition[0],
                        newPosition[1],
                        newPosition[2],
                        piles.piles.piles[i].rotation,
                    )
                } else {
                    newPile = new Pile(
                        i,
                        piles.piles.piles[i].length,
                        piles.piles.piles[i].diameter,
                        piles.piles.piles[i].batterAngle,
                        null,
                        piles.piles.piles[i].x,
                        piles.piles.piles[i].y,
                        piles.piles.piles[i].z,
                        piles.piles.piles[i].rotation,
                    );
                }
                newPileArray.push(newPile);
            }

            const newPiles: Piles = {
                piles: newPileArray,
                number: piles.piles.number,
                spacingRadius: piles.piles.spacingRadius,

                setPiles: () => { },
                setNumber: () => { },
                setSpacingRadius: () => { }
            }
            piles.setPiles(newPiles)
        }
    }



    const getPilePosition = (id: number, text: string) => {
        let position: number | string;
        if (piles?.piles) {
            if (text === 'X') position = piles?.piles.piles[id].x;
            else if (text === 'Y') position = piles?.piles.piles[id].y;
            else if (text === 'Z') position = piles?.piles.piles[id].z;
            else position = 'error';

            return position;
        }
    }

    return (
        <Stack direction='row'>
            <Typography sx={{ paddingRight: '16px' }}>{props.text}</Typography>
            <TextField
                type='number'
                variant="standard"
                value={getPilePosition(props.selectedPile, props.text)}
                onChange={handleChange} />
        </Stack>
    )
}
export default CardinalPositionConfig