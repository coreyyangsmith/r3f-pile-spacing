import { useTheme } from '@emotion/react'
import { Stack, Typography } from '@mui/material'
import IncrementButton from '../../components/Buttons/IncrementButton'

type PositionDataComponentProps = {
    value: number,
    setter: React.Dispatch<React.SetStateAction<number>>,
    text: string
    style: string,
}

const PositionDataComponent = (props: PositionDataComponentProps) => {
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
                    {props.value}
                </Typography>


                <IncrementButton value={props.value} setter={props.setter} style={props.style} />
            </Stack>

        </div>
    )
}

export default PositionDataComponent