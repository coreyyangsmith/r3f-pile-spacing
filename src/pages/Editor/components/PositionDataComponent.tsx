import { Stack, Typography } from '@mui/material'
import IncrementButton from '../../../components/Buttons/IncrementButton'
import { dark6, primary6 } from '../../../themes/Color'

type PositionDataComponentProps = {
    value: number,
    setter: React.Dispatch<React.SetStateAction<number>>,
    step: number,
    precision: number,
    text: string
    style: string,
}

const PositionDataComponent = (props: PositionDataComponentProps) => {
    const unlockedStyle = { color: primary6, }
    const lockedStyle = { color: dark6, }
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
                    {props.value.toFixed(props.precision)}
                </Typography>


                <IncrementButton
                    value={props.value}
                    setter={props.setter}
                    step={props.step}
                    style={props.style} />
            </Stack>

        </div>
    )
}

export default PositionDataComponent