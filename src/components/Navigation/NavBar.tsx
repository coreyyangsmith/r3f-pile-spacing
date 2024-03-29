import { Stack } from "@mui/material"
import CTAButton from "../Buttons/CTAButton"
import TertiaryNavigationButton from "../Buttons/TertiaryNavigationButton"
import { useNavigate } from "react-router-dom"

const NavBar = () => {
    const smallLogoPath = "/icons/logo-small.png"
    const logoColor = {
        filter: 'invert(100%) sepia(99%) saturate(100%) hue-rotate(81deg) brightness(111%) contrast(0%)',
    }

    const navigate = useNavigate();

    const startApp = () => {
        navigate("./editor")
    }

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
                width: '50px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <img
                    src={smallLogoPath}
                    style={logoColor}
                    width="75%"
                    alt="icon" />

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
                    onClick={() => startApp()}
                />
            </div>
        </Stack>
    )
}

export default NavBar