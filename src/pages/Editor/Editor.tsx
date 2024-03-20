import { Stack } from "@mui/material"
import NavDrawer from "../../components/Navigation/NavDrawer"
import MainEditorContainer from "./MainEditorContainer"
import SingleEditorContainer from "./SingleEditorContainer"

const Editor = () => {
    return (
        <Stack direction="row" sx={{ border: '1px solid white', height: '100%' }}>
            {/* Navigation */}
            <NavDrawer />

            {/* Data Components */}
            <Stack direction="column" >
                <MainEditorContainer />
                <SingleEditorContainer />
            </Stack>

            {/* Three.js Scene */}


        </Stack>
    )
}

export default Editor