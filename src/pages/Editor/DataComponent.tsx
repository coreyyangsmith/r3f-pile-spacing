import { useTheme } from '@emotion/react'
import { Stack, Typography } from '@mui/material'
import IncrementButton from '../../components/Buttons/IncrementButton'

type DataComponentProps = {
    value: string,
    setter: any,
    unit: string,
    text: string,
    style: string,
}

const DataComponent = (props: DataComponentProps) => {
    const theme = useTheme();

    const unlockedStyle = { color: theme.palette.primary6.main, }
    const lockedStyle = { color: theme.palette.dark6.main, }

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
                {props.style === 'unlocked'
                    ?
                    <Typography variant='body1'
                        style={unlockedStyle}><u><b>
                            {props.value} {props.unit}
                        </b></u></Typography>
                    :
                    <Typography variant='body1'
                        style={lockedStyle}><u><b>
                            {props.value} {props.unit}
                        </b></u></Typography>
                }

                <Typography
                    variant='body1'
                    style={{
                        color: theme.palette.dark6.main,
                    }}>{props.text}</Typography>
            </Stack>

            <IncrementButton value={parseInt(props.value)} setter={props.setter} />
        </div>
    )
}

export default DataComponent