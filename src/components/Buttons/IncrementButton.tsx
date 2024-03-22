import { Stack } from '@mui/material'
import React from 'react'

type IncrementButtonProps = {
    value: number,
    setter: React.Dispatch<React.SetStateAction<number>>,
    step: number,
    style: string,
}

const IncrementButton = (props: IncrementButtonProps) => {
    const upArrowPath = "/icons/icon-cheveron-up.svg"
    const downArrowPath = "/icons/icon-cheveron-down.svg"

    const imgStyleLocked = {
        filter: 'invert(100%) sepia(99%) saturate(100%) hue-rotate(81deg) brightness(111%) contrast(0%)',
    }

    const imgStyleUnlocked = {
        filter: 'invert(100%) sepia(99%) saturate(0%) hue-rotate(81deg) brightness(111%) contrast(100%)',
    }

    const handleChange = (value: number) => {
        if (props.value + value <= 0) return;
        props.setter(props.value + value);
    }

    return (
        <>
            {props.style === 'unlocked' ?
                <Stack
                    direction="column"
                    sx={{
                        width: "16px",
                        border: '1px solid gray'

                    }}>
                    <img src={upArrowPath}
                        alt="increment"
                        onClick={() => handleChange(1 * props.step)}
                        style={imgStyleUnlocked}
                    />
                    <img
                        src={downArrowPath}
                        alt="decrement"
                        onClick={() => handleChange(-1 * props.step)}
                        style={imgStyleUnlocked}
                    />
                </Stack>
                :
                <Stack
                    direction="column"
                    sx={{
                        width: "16px",
                        border: '1px solid gray'

                    }}>
                    <img src={upArrowPath}
                        alt="increment"
                        style={imgStyleLocked}
                    />
                    <img
                        src={downArrowPath}
                        alt="decrement"
                        style={imgStyleLocked}
                    />
                </Stack>
            }
        </>
    )
}

export default IncrementButton