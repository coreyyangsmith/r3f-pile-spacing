import { useTheme } from '@emotion/react'
import { Stack, Typography } from '@mui/material'
import IncrementButton from '../../components/Buttons/IncrementButton'

type PositionDataComponentProps = {
    value: any,
    step: number,
    precision: number,
    text: string
    style: string,
}

const PositionDataComponentTest = (props: PositionDataComponentProps) => {
    const theme = useTheme();

    const unlockedStyle = { color: theme.palette.primary6.main, }
    const lockedStyle = { color: theme.palette.dark6.main, }
    const style = props.style === 'unlocked' ? unlockedStyle : lockedStyle;

    return (
        <div style={{
            marginTop: '4px',
            display: 'flex',
            justifyContent: 'center',
            width: "100%"
        }}>
            <Stack direction="row" spacing={0.75}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}>

                <Typography variant='body1'
                    style={lockedStyle}>
                    {props.text}
                </Typography>

                <Typography variant='body1'
                    style={style}>
                    {parseFloat(props.value.current).toFixed(props.precision)}
                </Typography>


                <IncrementButton
                    value={props.value.current}
                    setter={props.setter}
                    step={props.step}
                    style={props.style} />
            </Stack>

        </div>
    )
}

export default PositionDataComponentTest