import { Stack } from "@mui/material"
import NavDrawer from "../../components/Navigation/NavDrawer"
import PileMainEditorContainer from "./containers/PileMainEditorContainer"
import { useSelection } from "../../hooks/useSelection"
import HelixMainEditorContainer from "./containers/HelixMainEditorContainer"
import PileSingleEditorContainer from "./containers/PileSingleEditorContainer"
import HelixSingleEditorContainer from "./containers/HelixSingleEditorContainer"
import SettingsMainEditorContainer from "./containers/SettingsMainEditorContainer"
import ConflictMainEditorContainer from "./containers/ConflictMainEditorContainer"
import { Canvas } from "@react-three/fiber"
import PileSpacingExperience from "../PileSpacing/Canvas/PileSpacingExperience"

const Editor = () => {
    const selection = useSelection();

    const handleSelection = (selection: string) => {
        switch (selection) {
            case 'Conflict':
                return (
                    <Stack
                        direction="column"
                        spacing={2}
                        sx={{
                            margin: '16px'
                        }}>
                        <ConflictMainEditorContainer />
                    </Stack>
                )
            case 'Pile':
                return (
                    <Stack
                        direction="column"
                        spacing={2}
                        sx={{
                            margin: '16px'
                        }}>
                        <PileMainEditorContainer />
                        <PileSingleEditorContainer />
                    </Stack>
                )
            case 'Helix':
                return (
                    <Stack
                        direction="column"
                        spacing={2}
                        sx={{
                            margin: '16px'
                        }}>
                        <HelixMainEditorContainer />
                        <HelixSingleEditorContainer />
                    </Stack>
                )
            case 'Settings':
                return (
                    <Stack
                        direction="column"
                        spacing={2}
                        sx={{
                            margin: '16px'
                        }}>
                        <SettingsMainEditorContainer />
                    </Stack>
                )
            default:
                return <>No Selection</>
        }
    }

    return (
        <Stack direction="row" sx={{ border: '1px solid white', height: '100vh', width: '100vw' }}>
            {/* Navigation */}
            {/* <NavDrawer /> */}

            {/* Data Components */}
            {handleSelection(selection?.state.selection.selectedSection as string)}

            {/* Three.js Scene */}
            <div style={{
                display: 'flex',
                flexGrow: 1,
                marginTop: '16px',
                marginBottom: '16px',
                marginRight: '16px',
                border: '1px solid #504E45',
            }}>
                <Canvas>
                    <PileSpacingExperience />
                </Canvas>
            </div>


        </Stack>
    )
}

export default Editor