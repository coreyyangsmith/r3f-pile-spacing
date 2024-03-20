import { Stack } from '@mui/material'

type IncrementButtonProps = {
    value: number,
    setter: any,
}

const IncrementButton = (props: IncrementButtonProps) => {
    const upArrowPath = "/icons/icon-cheveron-up.svg"
    const downArrowPath = "/icons/icon-cheveron-down.svg"

    const imgStyle = {
        filter: 'invert(100%) sepia(99%) saturate(0%) hue-rotate(81deg) brightness(111%) contrast(100%)',
    }

    const handleChange = (value: number) => {
        props.setter(props.value + value);
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
                onClick={() => handleChange(1)}
                style={imgStyle}
            />
            <img
                src={downArrowPath}
                alt="decrement"
                onClick={() => handleChange(-1)}
                style={imgStyle}
            />
        </Stack>
    )
}

export default IncrementButton