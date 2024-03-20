import { useTheme } from '@emotion/react'
import { Stack, Typography } from '@mui/material'
import IncrementButton from '../../components/Buttons/IncrementButton'

type PositionDataComponentProps = {
    text: string
    value: string,
}

const PositionDataComponent = (props: PositionDataComponentProps) => {
    const theme = useTheme();
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
                    style={{
                        color: theme.palette.dark6.main,
                    }}>
                    {props.text}
                </Typography>

                <Typography variant='body1'
                    style={{
                        color: theme.palette.primary6.main,
                        paddingRight: '4px'
                    }}>
                    {props.value}
                </Typography>
                <IncrementButton />
            </Stack>

        </div>
    )
}

export default PositionDataComponent