import { useTheme } from "@emotion/react"
import { Stack, Typography } from "@mui/material"
import Chip from "./Chip"



const ChipContainer = () => {


    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: "100%",
        }}>
            {/* Chips */}
            <Chip text="Conflict" />
            <Chip text="Pile" />
            <Chip text="Helix" />
            <Chip text="Settings" />
        </div>
    )
}

export default ChipContainer