import { useTheme } from "@emotion/react"

const Divider = () => {
    const theme = useTheme();
    return (
        <div style={{
            width: '100%',
            height: '2px',
            backgroundColor: theme.palette.mixed3.main,
            margin: '16px 0 16px 0'
        }}>

        </div>
    )
}

export default Divider