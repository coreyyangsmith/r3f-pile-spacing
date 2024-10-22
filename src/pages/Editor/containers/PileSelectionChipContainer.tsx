import { usePiles } from "../../../hooks/usePiles";
import { useSelection } from "../../../hooks/useSelection"
import { mixed2, mixed3 } from "../../../themes/Color";
import { getPileObjectFromPileId } from "../../../utils/PileUtils";
import { extractNumberFromText } from "../../../utils/contextUtils";
import Chip from "../components/Chip"
import { BaseSyntheticEvent } from "react"


const PileSelectionChipContainer = () => {
    const selection = useSelection();
    const piles = usePiles();

    const handleClick = (event: BaseSyntheticEvent) => {
        const target = event?.currentTarget
        if (target) {
            const pileId = extractNumberFromText(target.id)! - 1;
            const pile = getPileObjectFromPileId(piles?.state.piles, pileId)

            if (selection?.state.selection.selectedPile?.id === pileId) {
                // Deselect the target if it is already part of the selection
                selection?.setState({
                    selection: {
                        ...selection.state.selection,
                        selectedPile: null,
                        selectedHelix: null
                    }
                })
            } else {
                // Select the target if it is not part of the selection
                selection?.setState({
                    selection: {
                        ...selection.state.selection,
                        selectedPile: pile,
                        selectedHelix: null
                    }
                })
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
                    class={selection?.state.selection.selectedPile?.id === item.id ? "active" : ""}
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

export default PileSelectionChipContainer