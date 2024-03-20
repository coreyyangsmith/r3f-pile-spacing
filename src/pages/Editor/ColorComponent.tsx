import { useTheme } from '@emotion/react'
import { Stack, Typography } from '@mui/material'
import React from 'react';
import { TwitterPicker } from 'react-color';
import { TwitterPickerStylesProps } from 'react-color/lib/components/twitter/Twitter';
import { Classes } from 'reactcss'

type ColorComponentProps = {
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>,
    text: string,
}

const TwitterStyles: Partial<Classes<TwitterPickerStylesProps>> = {
    default: {
        card: {
            background: "transparent",
            border: 'none'
        },
    },
};

const ColorComponent = (props: ColorComponentProps) => {
    const theme = useTheme();

    return (
        <div style={{
            paddingLeft: "16px",
            paddingRight: "16px",
            marginTop: '4px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
            <Stack
                direction="row"
                spacing={1}
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}>
                {/* <CustomColorPicker /> */}
                <TwitterPicker
                    triangle='hide'
                    width="100%"
                    styles={TwitterStyles}
                    color={props.value}
                    onChangeComplete={(evt) => { props.setter(evt.hex) }} />

                <Typography
                    variant='body1'
                    style={{
                        color: theme.palette.dark6.main,
                    }}>{props.text}</Typography>

            </Stack>
        </div>
    )
}

export default ColorComponent