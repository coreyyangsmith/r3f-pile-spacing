import { useSelection } from "../../hooks/useSelection"
import Chip from "./Chip"
import { BaseSyntheticEvent } from "react"

const ChipContainer = () => {
    const selection = useSelection();

    const handleClick = (event: BaseSyntheticEvent) => {
        const target = event?.currentTarget
        if (target) {
            selection?.setState({
                selection: {
                    ...selection.state.selection,
                    selectedSection: target.id
                }
            })
        }
    }



    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: "100%",
        }}>
            {/* Chips */}
            <Chip
                text="Conflict"
                onClick={handleClick}
                type="selection"
            />
            <Chip
                text="Pile"
                onClick={handleClick}
                type="selection"
            />
            <Chip
                text="Helix"
                onClick={handleClick}
                type="selection"
            />
            <Chip
                text="Settings"
                onClick={handleClick}
                type="selection"
            />
        </div>
    )
}

export default ChipContainer