import { Stack, Typography } from '@mui/material'
import IncrementButton from '../../../components/Buttons/IncrementButton'
import { dark6, primary6 } from '../../../themes/Color'

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
    const unlockedStyle = { color: primary6, }
    const lockedStyle = { color: dark6, }
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
                        {parseFloat(`${props.value}`).toFixed(props.precision)} {props.unit}
                    </b></u></Typography>
                <Typography
                    variant='body1'
                    style={{
                        color: dark6,
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