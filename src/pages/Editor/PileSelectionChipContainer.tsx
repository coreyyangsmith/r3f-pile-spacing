import { usePiles } from "../../hooks/usePiles";
import { useSelection } from "../../hooks/useSelection"
import { getPileObjectFromPileId } from "../../utils/PileUtils";
import { extractNumberFromText } from "../../utils/contextUtils";
import Chip from "./Chip"
import { BaseSyntheticEvent } from "react"

const PileSelectionChipContainer = () => {
    const selection = useSelection();
    const piles = usePiles();

    const handleClick = (event: BaseSyntheticEvent) => {
        const target = event?.currentTarget
        if (target) {
            const pileId = extractNumberFromText(target.id)! - 1;
            const pile = getPileObjectFromPileId(piles?.state.piles, pileId)

            selection?.setState({
                selection: {
                    ...selection.state.selection,
                    selectedPile: pile,
                    selectedHelix: null
                }
            })
        }
    }

    const generateChips = (type: string, arr: any) => {
        console.log(arr)
        return arr.map((item, i) => {
            const pileText = "Pile " + (item.id + 1)
            return (
                <Chip
                    key={i}
                    onClick={handleClick}
                    text={pileText}
                    type={type}
                    class={selection?.state.selection.selectedPile?.id === item.id ? "active" : ""}
                />
            )
        })
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            width: "100%",
        }}>
            {generateChips(
                'piles',
                piles?.state.piles.piles
            )}
        </div>
    )
}

export default PileSelectionChipContainer