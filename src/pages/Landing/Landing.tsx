import { useTheme } from "@emotion/react"
import NavBar from "../../components/Navigation/NavBar"
import { Hidden, Stack, Typography } from "@mui/material";
import { Canvas } from "@react-three/fiber";
import LandingScene from "./LandingScene";
import { dark1, dark6, mixed1, mixed2, mixed3, primary6 } from "../../themes/Color";

const Landing = () => {
    const theme = useTheme();

    return (
        <div style={{
            background: theme.palette.mixed1.main,
            width: '100%',
            height: '100%'
        }}>
            {/* NavBar */}
            <NavBar />

            {/* Hero Content */}
            <Stack direction="row" style={{
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
                        width: '525px',
                        height: '100%',
                        flexDirection: 'column',
                        border: '1px solid red',
                        padding: '16px',
                        alignItems: 'flex-start',
                        justifyContent: 'center',

                    }}>
                        {/* Icon */}
                        <div style={{
                            border: '1px solid gray',
                            height: '64px',
                            width: '64px',
                        }} />
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