import { usePiles } from "../../../hooks/usePiles";
import { extractNumberFromText } from "../../../utils/contextUtils";
import Chip from "../components/Chip"
import { BaseSyntheticEvent } from "react"


type ConflictPileSelectionChipContainerProps = {
    value: number
    setter: React.Dispatch<React.SetStateAction<number>>,
}

const ConflictPileSelectionChipContainer = (props: ConflictPileSelectionChipContainerProps) => {
    const piles = usePiles();

    const handleClick = (event: BaseSyntheticEvent) => {
        const target = event?.currentTarget
        if (target) {
            const pileId = extractNumberFromText(target.id)! - 1;

            if (props.value === pileId) {
                // Deselect the target if it is already part of the selection
                props.setter(-1)
            } else {
                // Select the target if it is not part of the selection
                props.setter(pileId)
            }
        }
    }

    const generateChips = (type: string, arr: any) => {
        return arr.map((item, i) => {
            const pileText = "Pile " + (item.id + 1)
            return (
                <Chip
                    key={i}
                    onClick={handleClick}
                    text={pileText}
                    type={type}
                    class={props.value === item.id ? "active" : ""}
                />
            )
        })
    }

    return (
        <div
            className="scrollable-chip-container"
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                width: "100%",
                overflowX: 'scroll',
                zIndex: 10,
            }}>
            {
                generateChips(
                    'piles',
                    piles?.state.piles.piles
                )
            }
        </div >
    )
}

export default ConflictPileSelectionChipContainer