import { useHelices } from "../../../hooks/useHelices";
import { useHelicesFromPileId } from "../../../hooks/useHelicesFromPileId";
import { usePiles } from "../../../hooks/usePiles";
import { useSelection } from "../../../hooks/useSelection"
import { getHelixObjectFromPileAndHelixId } from "../../../utils/PileUtils";
import { extractNumberFromText } from "../../../utils/contextUtils";
import Chip from "../components/Chip"
import { BaseSyntheticEvent } from "react"

const HelixSelectionChipContainer = () => {
    const selection = useSelection();
    const piles = usePiles();
    const helices = useHelices()

    const matchingHelix = useHelicesFromPileId(selection?.state.selection.selectedPile?.id)

    const handleClick = (event: BaseSyntheticEvent) => {
        const target = event?.currentTarget
        if (target) {
            const helixId = extractNumberFromText(target.id)! - 1;
            const pileId = selection?.state.selection.selectedPile?.id
            const helix = getHelixObjectFromPileAndHelixId(
                helices?.state.helices,
                pileId!,
                helixId
            )

            // Check if the target is already selected
            if (selection?.state.selection.selectedHelix?.id === helix?.id) {
                // Deselect the target
                selection?.setState({
                    selection: {
                        ...selection.state.selection,
                        selectedHelix: null
                    }
                })
            } else {
                // Select the target
                selection?.setState({
                    selection: {
                        ...selection.state.selection,
                        selectedHelix: helix
                    }
                })
            }
        }
    }

    const generateChips = (type: string, arr: any) => {
        if (arr) {
            return arr.map((item, i) => {
                const helixText = "Helix " + (item.id + 1)
                // console.log(item)
                return (
                    <Chip
                        key={i}
                        onClick={handleClick}
                        text={helixText}
                        type={type}
                        class={selection?.state.selection.selectedHelix?.id === item.id ? "active" : ""}
                    />
                )
            })
        }

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
            {generateChips(
                'helix',
                matchingHelix?.helices
            )}
            <Chip
                key={-1}
                onClick={handleClick}
                text="+"
                type="null"
                class="cat"
            />
        </div>
    )
}

export default HelixSelectionChipContainer