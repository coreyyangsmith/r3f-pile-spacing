import { Stack } from '@mui/material'



const IncrementButton = () => {
    const upArrowPath = "/icons/icon-cheveron-up.svg"
    const downArrowPath = "/icons/icon-cheveron-down.svg"

    const imgStyle = {
        filter: 'invert(100%) sepia(99%) saturate(0%) hue-rotate(81deg) brightness(111%) contrast(100%)',
    }

    return (
        <Stack
            direction="column"
            sx={{
                width: "20px",
                border: '1px solid gray'

            }}>
            <img src={upArrowPath}
                alt="increment"
                onClick={() => console.log('increment')}
                style={imgStyle}
            />
            <img
                src={downArrowPath}
                alt="decrement"
                onClick={() => console.log('decrement')}
                style={imgStyle}
            />
        </Stack>
    )
}

export default IncrementButton