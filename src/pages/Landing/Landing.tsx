import { useTheme } from "@emotion/react"
import NavBar from "../../components/Navigation/NavBar"
import { Button, Hidden, Stack, Typography } from "@mui/material";
import { Canvas } from "@react-three/fiber";
import LandingScene from "./LandingScene";
import { dark1, dark6, mixed1, mixed2, mixed3, primary6 } from "../../themes/Color";

const Landing = () => {
    const theme = useTheme();


    const fullLogoPath = "/icons/logo-full.png"
    const smallLogoPath = "/icons/icon-drilling.png"

    const logoColor = {
        filter: 'invert(100%) sepia(99%) saturate(100%) hue-rotate(81deg) brightness(111%) contrast(0%)',
    }

    return (
        <div style={{
            background: theme.palette.mixed1.main,
            width: '100%',
            height: '100%'
        }}>
            {/* NavBar */}
            <NavBar />

            {/* Hero Content */}
            <Stack direction="row"
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    height: '500px',
                }}>
                {/* Copy Block */}
                <div style={{
                    display: 'flex',
                    flexGrow: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                }}>
                    {/* Container */}
                    <div style={{
                        display: 'flex',
                        width: '500px',
                        height: '100%',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                    }}>
                        {/* Icon */}
                        <div style={{
                            height: '64px',
                            width: '64px',
                        }}>
                            <img
                                src={smallLogoPath}
                                style={logoColor}
                                width="100%"
                                alt="icon" />
                        </div>
                        {/* Copy */}
                        <Typography
                            variant="h3"
                            style={{
                                color: 'white',
                                textAlign: 'left',

                            }}
                        >Revolutionize Your Geotechnical Designs with 3D Pile Visualization
                        </Typography>

                        <Typography
                            variant="body2"
                            style={{
                                color: 'gray',
                                textAlign: 'left',

                            }}
                        >Unlock the power of advanced 3d modeling for your geotechnical engineering projects.
                        </Typography>

                        {/* Button Container */}
                        <div style={{
                            width: '100%',
                            height: '50px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingLeft: '32px',
                            paddingRight: '48px',
                            paddingTop: '16px',
                        }}>
                            <Button variant="outlined"
                                color="primary"

                                sx={{
                                    borderRadius: '50px',
                                    color: 'black',
                                    background: primary6,
                                    border: '1px solid ' + primary6,
                                }}>
                                Get Started
                            </Button>

                            <Button
                                sx={{
                                    color: dark6,
                                }}>
                                Learn More
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Three JS */}
                <div className='container' style={{
                    position: 'relative',
                    width: '500px',
                    height: '500px',
                    minHeight: '500px',
                    minWidth: '500px',
                    marginRight: '32px',
                }}>
                    <div style={{
                        zIndex: 10,
                        background: `radial-gradient(circle at center, transparent, transparent 250px, ${mixed1} 150px)`,
                        width: '100%',
                        height: '100%',
                        overflow: 'hidden',
                        position: 'absolute',
                    }} />
                    <div style={{
                        zIndex: 10,
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        border: `2px solid ${primary6}`,
                        position: 'absolute',
                    }} />
                    <LandingScene />
                </div>
            </Stack >


        </div >
    )
}

export default Landing