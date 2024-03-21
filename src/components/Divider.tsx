import { useTheme } from "@emotion/react"

const Divider = () => {
    const theme = useTheme();
    return (
        <div style={{
            width: '100%',
            height: '2px',
            backgroundColor: theme.palette.mixed3.main,
            marginTop: '16px',
            marginBottom: '8px',
        }}>
        </div>
    )
}

export default Divider