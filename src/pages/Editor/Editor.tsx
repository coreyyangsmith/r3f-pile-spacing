import { Stack } from "@mui/material"
import NavDrawer from "../../components/Navigation/NavDrawer"
import PileMainEditorContainer from "./PileMainEditorContainer"
import SingleEditorContainer from "./PileSingleEditorContainer"
import { useSelection } from "../../hooks/useSelection"
import HelixMainEditorContainer from "./HelixMainEditorContainer"
import PileSingleEditorContainer from "./PileSingleEditorContainer"
import HelixSingleEditorContainer from "./HelixSingleEditorContainer"

const Editor = () => {
    const selection = useSelection();

    const handleSelection = (selection: string) => {
        switch (selection) {
            case 'Conflict':
                return (<PileMainEditorContainer />)
            case 'Pile':
                return (
                    <Stack direction="column" spacing={2}>
                        <PileMainEditorContainer />
                        <PileSingleEditorContainer />
                    </Stack>
                )
            case 'Helix':
                return (
                    <Stack direction="column" spacing={2}>
                        <HelixMainEditorContainer />
                        <HelixSingleEditorContainer />
                    </Stack>
                )
            case 'Settings':
                return (
                    <Stack direction="column" spacing={2}>
                        <PileMainEditorContainer />
                        <SingleEditorContainer />
                    </Stack>
                )
            default:
                return <>No Selection</>
        }
    }

    return (
        <Stack direction="row" sx={{ border: '1px solid white', height: '100%' }}>
            {/* Navigation */}
            <NavDrawer />

            {/* Data Components */}
            {handleSelection(selection?.state.selection.selectedSection)}

            {/* Three.js Scene */}


        </Stack>
    )
}

export default Editor