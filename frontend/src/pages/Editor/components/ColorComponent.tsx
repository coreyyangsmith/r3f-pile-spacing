import { Stack, Typography } from '@mui/material'
import React from 'react';
import { TwitterPicker } from 'react-color';
import { TwitterPickerStylesProps } from 'react-color/lib/components/twitter/Twitter';
import { Classes } from 'reactcss'

import { dark6, mixed2, primary1, primary6 } from '../../../themes/Color';

type ColorComponentProps = {
    value: string,
    colors: Array<string>
    setter: React.Dispatch<React.SetStateAction<string>>,
    text: string,
}

const TwitterStyles: Partial<Classes<TwitterPickerStylesProps>> = {
    default: {
        card: {
            background: mixed2,
        },
        input: {
            background: mixed2,
            color: primary6,
            marginTop: '8px',
            marginBottom: '4px',
        },
        hash: {
            background: mixed2,
            border: '1px solid white',
            color: primary6,
            marginTop: '8px',
            marginBottom: '4px',
        },
        swatch: {
            width: '24px',
            height: '24px',
        },
    }
}

const handleSwatchHover = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    target.style.border = '2px solid ' + primary1

    target.addEventListener('mouseleave', () => {
        target.style.border = 'none'
    })
}

const ColorComponent = (props: ColorComponentProps) => {
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
                spacing={4}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                }}>
                {/* <CustomColorPicker /> */}
                <Typography
                    variant='body1'
                    style={{
                        color: dark6,
                        width: '50px',
                    }}>{props.text}</Typography>

                <TwitterPicker
                    width="200px"
                    triangle='hide'
                    styles={TwitterStyles}
                    color={props.value}
                    colors={props.colors}
                    onChangeComplete={(evt) => { props.setter(evt.hex) }}
                    onSwatchHover={(color, event) => { handleSwatchHover(event) }}
                />



            </Stack>
        </div>
    )
}

export default ColorComponent