import { useSelection } from "../../../hooks/useSelection"
import Chip from "../components/Chip"
import { BaseSyntheticEvent } from "react"

const SelectionChipContainer = () => {
    const selection = useSelection();

    const categories = ['Conflict', 'Pile', 'Helix', 'Settings']

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

    const generateChips = (type: string, arr: any) => {
        return arr.map((item, i) => {
            return (
                <Chip
                    key={i}
                    onClick={handleClick}
                    text={item}
                    type={type}
                    class={selection?.state.selection.selectedSection === item ? "active" : ""}
                />
            )
        })
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: "100%",
        }}>
            {/* Chips */}
            {generateChips(
                'section',
                categories
            )}
        </div>
    )
}

export default SelectionChipContainer