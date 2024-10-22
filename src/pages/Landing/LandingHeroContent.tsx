import { Button, Stack, Typography } from "@mui/material";
import LandingScene from "./LandingScene";
import { dark6, mixed1, primary6 } from "../../themes/Color";

const LandingHeroContent = () => {
    const smallLogoPath = "/icons/icon-drilling.png"
    const circleRadius = 600;

    const logoColor = {
        filter: 'invert(100%) sepia(99%) saturate(100%) hue-rotate(81deg) brightness(111%) contrast(0%)',
    }

    return (
        <Stack direction="row"
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                height: `${circleRadius}px`,
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
                    height: '100%',
                    width: "500px",
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
                        variant="h2"
                        style={{
                            color: 'white',
                            textAlign: 'left',

                        }}
                    >Revolutionize Your Geotechnical Designs with 3D Pile Visualization
                    </Typography>

                    <Typography
                        variant="h3"
                        style={{
                            color: 'gray',
                            textAlign: 'left',
                        }}
                    >Unlock the power of advanced 3d modeling for your geotechnical projects.
                    </Typography>

                    {/* Button Container */}
                    <div style={{
                        width: '100%',
                        height: '50px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        paddingLeft: '32px',
                        paddingRight: '48px',
                    }}>
                        {/* <Button variant="outlined"
                            color="primary"
                            sx={{
                                borderRadius: '50px',
                                color: 'black',
                                background: `${primary6}aa`,
                                border: `1px solid ` + primary6,
                                padding: "8px 16px",
                            }}>
                            <Typography
                                variant="body1" sx={{
                                    '&:hover': {
                                        color: 'white',
                                    }
                                }}>
                                <b>
                                    Get Started
                                </b>
                            </Typography>
                        </Button> */}

                    </div>
                </div>
            </div>

            {/* Three JS */}
            <div className='container' style={{
                position: 'relative',
                width: `${circleRadius}px`,
                height: `${circleRadius}px`,
                minHeight: `${circleRadius}px`,
                minWidth: `${circleRadius}px`,
                marginRight: '64px',
            }}>
                <div style={{
                    zIndex: 10,
                    background: `radial-gradient(circle at center, transparent, transparent ${circleRadius / 2}px, ${mixed1} 150px)`,
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
    )
}

export default LandingHeroContent