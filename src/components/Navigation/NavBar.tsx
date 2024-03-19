import { Stack } from "@mui/material"
import CTAButton from "../Buttons/CTAButton"

const NavBar = () => {
    return (
        <Stack direction="row"
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                margin: '16px'
            }}>
            <CTAButton text="Home" onClick={() => console.log("Try Now!")} />
        </Stack>
    )
}

export default NavBar