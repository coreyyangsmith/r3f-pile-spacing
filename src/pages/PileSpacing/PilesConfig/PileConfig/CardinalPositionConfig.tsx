import { Stack, TextField, Typography } from "@mui/material"
import { usePiles } from "../../../../hooks/usePiles"
import { ChangeEvent } from "react"
import Pile from "../../../../components/Pile"
import { IPiles } from "../../../../types/Pile"
import { useSettings } from "../../../../hooks/useSettings"

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

            const newPosition = piles?.piles.piles[props.selectedPile].position;
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
                        piles.piles.piles[i].radius,
                        piles.piles.piles[i].batterAngle,
                        newPosition,
                        piles.piles.piles[i].rotation,
                        null,
                    )
                } else {
                    newPile = new Pile(
                        i,
                        piles.piles.piles[i].length,
                        piles.piles.piles[i].diameter,
                        piles.piles.piles[i].radius,
                        piles.piles.piles[i].batterAngle,
                        piles.piles.piles[i].position,
                        piles.piles.piles[i].rotation,
                        null,
                    );
                }
                newPileArray.push(newPile);
            }

            const newPiles: IPiles = {
                piles: newPileArray,
                number: piles.piles.number,
                setPiles: () => { },
                setNumber: () => { }

            }
            piles.setPiles(newPiles)
        }
    }



    const getPilePosition = (id: number, text: string) => {
        let position: number | string;
        if (piles?.piles) {
            if (text === 'X') position = piles?.piles.piles[id].position[0];
            else if (text === 'Y') position = piles?.piles.piles[id].position[1];
            else if (text === 'Z') position = piles?.piles.piles[id].position[2];
            else position = 'error';

            return position;
        }
    }

    return (
        <Stack direction='row'>
            <Typography>{props.text}</Typography>
            <TextField
                size='small'
                type='number'
                value={getPilePosition(props.selectedPile, props.text)}
                onChange={handleChange} />
        </Stack>
    )
}
export default CardinalPositionConfig