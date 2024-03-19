import { useTheme } from "@emotion/react"
import NavBar from "../../components/Navigation/NavBar"
import { Stack } from "@mui/material";

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
                border: '1px dashed yellow',
                display: 'flex',
                justifyContent: 'space-around',
            }}>
                {/* Copy */}
                <div style={{
                    border: '1px solid gray',
                    height: '50%',
                    width: '75%',
                }}>
                    <div style={{
                        border: '1px solid gray',
                        height: '128px',
                        width: '128px',
                    }} />

                    <div style={{
                        border: '1px solid gray',
                        background: 'gray',
                        height: '24px',
                        width: '128px',
                        borderRadius: '50px',
                    }} />
                </div>

                <div
                    style={{
                        border: '1px solid gray',
                        borderRadius: '50%',
                        height: '500px',
                        width: '500px',
                    }} />
            </Stack>


        </div>
    )
}

export default Landing