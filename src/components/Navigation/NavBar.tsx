import { Stack } from "@mui/material"
import CTAButton from "../Buttons/CTAButton"
import TertiaryButton from "../Buttons/TertiaryButton"
import TertiaryNavigationButton from "../Buttons/TertiaryNavigationButton"

const NavBar = () => {
    return (
        <Stack direction="row"
            style={{
                display: 'flex',
                margin: '16px',
                justifyContent: 'space-between',
            }}>

            {/* Icon/Logo */}
            <div style={{
                border: "1px solid gray",
                borderRadius: "50%",
                height: '50px',
                width: '50px'
            }}>
            </div>

            {/* Middle Navigation */}
            <Stack direction="row" spacing={1}>
                <TertiaryNavigationButton
                    text="Features"
                    onClick={() => console.log("Features")} />

                <TertiaryNavigationButton
                    text="Pricing"
                    onClick={() => console.log("Pricing")} />

                <TertiaryNavigationButton
                    text="About Us"
                    onClick={() => console.log("About Us")} />
            </Stack>

            {/* CTA */}
            <div>
                <CTAButton
                    text="Try Now!"
                    size="large"
                    onClick={() => console.log("Try Now!")}
                />
            </div>



        </Stack>
    )
}

export default NavBar