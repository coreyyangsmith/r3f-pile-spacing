import { useTheme } from '@emotion/react'
import { Stack, Typography } from '@mui/material'
import IncrementButton from '../../components/Buttons/IncrementButton'
import { useEffect } from 'react'

type DataComponentProps = {
    value: number,
    setter: React.Dispatch<React.SetStateAction<number>>,
    step: number,
    precision: number,
    unit: string,
    text: string,
    style: string,
}

const DataComponent = (props: DataComponentProps) => {
    const theme = useTheme();

    const unlockedStyle = { color: theme.palette.primary6.main, }
    const lockedStyle = { color: theme.palette.dark6.main, }
    const style = props.style === 'unlocked' ? unlockedStyle : lockedStyle;

    return (
        <div style={{
            paddingLeft: "16px",
            paddingRight: "16px",
            marginTop: '4px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
            <Stack direction="row" spacing={1}>
                <Typography variant='body1'
                    style={style}><u><b>
                        {parseFloat(`${props.value}`).toFixed(`${props.precision}`)} {props.unit}
                    </b></u></Typography>
                <Typography
                    variant='body1'
                    style={{
                        color: theme.palette.dark6.main,
                    }}>{props.text}</Typography>
            </Stack>

            <IncrementButton
                value={props.value}
                setter={props.setter}
                step={props.step}
                style={props.style} />
        </div>
    )
}

export default DataComponent