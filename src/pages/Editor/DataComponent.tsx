import { useTheme } from '@emotion/react'
import { Stack, Typography } from '@mui/material'
import IncrementButton from '../../components/Buttons/IncrementButton'

type DataComponentProps = {
    value: string,
    unit: string,
    text: string,
}

const DataComponent = (props: DataComponentProps) => {
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
            <Stack direction="row" spacing={1}>
                <Typography variant='body1'
                    style={{
                        color: theme.palette.primary6.main,
                    }}><u><b>{props.value} {props.unit}</b></u></Typography>
                <Typography
                    variant='body1'
                    style={{
                        color: theme.palette.dark6.main,
                    }}>{props.text}</Typography>
            </Stack>
            <IncrementButton />
        </div>
    )
}

export default DataComponent